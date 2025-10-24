/**
 * @fileoverview ESBuild plugin for GraphQL auto-discovery
 * @description Automatically discovers and combines GraphQL schemas, resolvers, and rules
 * @author Stephen Hellicar
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { inspect } from 'node:util';
import type { Plugin } from 'esbuild';
import { glob } from 'glob';
import { createLogger, type ILogger, type LoggerOptions } from './createLogger';

type GraphqlFile = {
  path: string;
  name: string;
};

const findGraphQLFiles = async (options: { globPattern: string; globIgnore: string }): Promise<GraphqlFile[]> => {
  const files = await glob(options.globPattern, { ignore: options.globIgnore });
  return files.map((file, index) => ({
    path: path.join(process.cwd(), file).replace(/\\/g, '/'),
    name: `gql_${index}`,
  }));
};

export interface GraphQLDiscoveryOptions {
  prefix: string;
  separator: string;
  suffixes: {
    schema: string;
    resolvers: string;
    rules: string;
  };
  logger?: LoggerOptions;
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

const defaultOptions: GraphQLDiscoveryOptions = {
  prefix: 'src/**',
  separator: '',
  suffixes: {
    schema: '',
    resolvers: 'Resolvers',
    rules: 'Rules',
  },
  logger: {
    debug: true,
    verbose: false,
  },
};

function buildGlobPattern(prefix: string, separator: string, suffix: string, extension: string): string {
  let glob = prefix;
  if (separator) {
    glob += `/${separator}`;
  }
  glob += `/*${suffix}.${extension}`;
  return glob;
}

function buildRegexPattern(separator: string, suffix: string, extension: string): RegExp {
  let regexPattern = '/([^/]+)';
  if (separator) {
    regexPattern += `/${separator}`;
  }
  regexPattern += `/[^/]*${suffix}\\.${extension}$`;
  return new RegExp(regexPattern);
}

function generatePatterns(prefix: string, separator: string, suffix: string, extension: string) {
  // Validate format
  if (prefix.endsWith('/')) {
    throw new Error('prefix should not end with a slash');
  }
  if (separator && (separator.startsWith('/') || separator.endsWith('/'))) {
    throw new Error('separator should not start or end with a slash');
  }

  const glob = buildGlobPattern(prefix, separator, suffix, extension);
  const regex = buildRegexPattern(separator, suffix, extension);

  return { glob, regex };
}

export function graphqlDiscoveryPlugin(initialOptions?: DeepPartial<GraphQLDiscoveryOptions>): Plugin {
  const options: GraphQLDiscoveryOptions = {
    ...defaultOptions,
    ...initialOptions,
    suffixes: {
      ...defaultOptions.suffixes,
      ...initialOptions?.suffixes,
    },
    logger: {
      ...defaultOptions.logger,
      ...initialOptions?.logger,
    },
  };

  const logger = createLogger('graphql-discovery', options.logger);

  logger.debug('Plugin loaded with options:', inspect(options, { colors: true, compact: true, breakLength: Infinity }));

  const { prefix, separator, suffixes } = options;

  // Generate patterns and regex for each file type
  const schema = generatePatterns(prefix, separator, suffixes.schema, 'graphql');
  const resolvers = generatePatterns(prefix, separator, suffixes.resolvers, 'ts');
  const rules = generatePatterns(prefix, separator, suffixes.rules, 'ts');

  const schemaPattern = schema.glob;
  const resolverPattern = resolvers.glob;
  const rulesPattern = rules.glob;

  const moduleRegex = {
    schema: schema.regex,
    resolvers: resolvers.regex,
    rules: rules.regex,
  };

  return {
    name: 'graphql-discovery',
    setup(build) {
      // Handle the virtual module import
      build.onResolve({ filter: /^@graphql\/generated$/ }, (args) => {
        return {
          path: args.path,
          namespace: 'graphql-generated',
        };
      });

      build.onLoad({ filter: /.*/, namespace: 'graphql-generated' }, async () => {
        try {
          logger.debug('Looking for schema files with pattern:', schemaPattern);
          const graphqlFiles = await findGraphQLFiles({
            globPattern: schemaPattern,
            globIgnore: '',
          });
          logger.debug(`Found ${graphqlFiles.length} schema files`);
          graphqlFiles.forEach((file) => {
            logger.verbose(`Found schema: ${file.path}`);
          });

          // Convert absolute paths to relative paths for consistency
          const schemaFiles = graphqlFiles.map((f) => {
            const absolutePath = f.path;
            // Convert absolute path to relative by removing everything up to and including '/src/'
            const srcIndex = absolutePath.indexOf('/src/');
            return srcIndex !== -1 ? absolutePath.substring(srcIndex + 1) : absolutePath;
          });

          logger.debug('Looking for resolver files with pattern:', resolverPattern);
          const resolverFiles = await glob(resolverPattern);
          logger.debug(`Found ${resolverFiles.length} resolver files`);
          resolverFiles.forEach((file) => {
            logger.verbose(`Found resolver: ${file}`);
          });

          logger.debug('Looking for rules files with pattern:', rulesPattern);
          const rulesFiles = await glob(rulesPattern);
          logger.debug(`Found ${rulesFiles.length} rules files`);
          rulesFiles.forEach((file) => {
            logger.verbose(`Found rules: ${file}`);
          });

          const detectedModules = detectModules(schemaFiles, resolverFiles, rulesFiles, moduleRegex, logger);

          logger.info(`Found ${schemaFiles.length} schema files, ${resolverFiles.length} resolver files, ${rulesFiles.length} rules files`);

          // Check for issues and separate complete vs incomplete modules
          const completeModules: string[] = [];
          const incompleteModules: string[] = [];

          for (const [moduleName, module] of Object.entries(detectedModules)) {
            const missing: string[] = [];
            if (!module.schema) {
              missing.push('schema');
            }
            if (!module.resolvers) {
              missing.push('resolvers');
            }
            if (!module.rules) {
              missing.push('rules');
            }

            if (missing.length > 0) {
              logger.warn(`Module ${moduleName} is missing: ${missing.join(', ')}`);
              incompleteModules.push(moduleName);
            } else {
              completeModules.push(moduleName);
            }
          }

          if (completeModules.length > 0) {
            logger.info(`Complete modules: ${completeModules.join(', ')}`);
          } else {
            logger.error('No complete modules found');
          }

          // Check if no modules found
          if (Object.keys(detectedModules).length === 0) {
            logger.error('No modules found! Check your file naming patterns.');
          }

          const schemas = await Promise.all(
            schemaFiles.map(async (file) => {
              const content = await readFile(file, 'utf-8');
              return { file, content };
            }),
          );

          // Generate the virtual module content
          const code = generateVirtualModule({
            schemas,
            resolverFiles,
            rulesFiles,
            baseDir: process.cwd(),
          });

          return {
            contents: code,
            loader: 'ts',
            resolveDir: process.cwd(),
            watchFiles: [...schemaFiles, ...resolverFiles, ...rulesFiles],
          };
        } catch (error) {
          return {
            errors: [
              {
                text: `GraphQL discovery failed: ${error instanceof Error ? error.message : String(error)}`,
                location: null,
              },
            ],
          };
        }
      });
    },
  };
}

function detectModules(
  schemaFiles: string[],
  resolverFiles: string[],
  rulesFiles: string[],
  moduleRegex: {
    schema: RegExp;
    resolvers: RegExp;
    rules: RegExp;
  },
  logger: ILogger,
) {
  const modules: Record<string, { schema: boolean; resolvers: boolean; rules: boolean }> = {};

  const operations = [
    {
      files: schemaFiles,
      type: 'schema' as const,
      pattern: moduleRegex.schema,
    },
    {
      files: resolverFiles,
      type: 'resolvers' as const,
      pattern: moduleRegex.resolvers,
    },
    {
      files: rulesFiles,
      type: 'rules' as const,
      pattern: moduleRegex.rules,
    },
  ];

  for (const operation of operations) {
    for (const file of operation.files) {
      const match = file.match(operation.pattern);
      if (match?.[1]) {
        const moduleName = match[1];
        modules[moduleName] ??= { schema: false, resolvers: false, rules: false };
        modules[moduleName][operation.type] = true;
        logger.verbose(`Detected ${operation.type} for module: ${moduleName}`);
      }
    }
  }

  return modules;
}

function getImportPath(filePath: string, baseDir: string): string {
  const relativePath = path.relative(baseDir, filePath);
  return relativePath.replace(/\.ts$/, '');
}

function generateVirtualModule(options: { schemas: Array<{ file: string; content: string }>; resolverFiles: string[]; rulesFiles: string[]; baseDir: string }): string {
  const { schemas, resolverFiles, rulesFiles, baseDir } = options;

  // Generate schema imports and array
  const schemaImports = schemas.map((schema, index) => `const schema${index} = ${JSON.stringify(schema.content)};`).join('\n');

  const schemaArray = `[${schemas.map((_, index) => `schema${index}`).join(', ')}]`;

  // Generate resolver imports
  const resolverImports = resolverFiles
    .map((file, index) => {
      const importPath = getImportPath(file, baseDir);
      return `import * as resolvers${index} from './${importPath}';`;
    })
    .join('\n');

  // Generate rules imports
  const rulesImports = rulesFiles
    .map((file, index) => {
      const importPath = getImportPath(file, baseDir);
      return `import * as rules${index} from './${importPath}';`;
    })
    .join('\n');

  // Create arrays (not merged objects)
  const resolversArray = resolverFiles.length > 0 ? `[${resolverFiles.map((_, index) => `...Object.values(resolvers${index})`).join(', ')}]` : '[]';

  const rulesArray = rulesFiles.length > 0 ? `[${rulesFiles.map((_, index) => `...Object.values(rules${index})`).join(', ')}]` : '[]';

  return `
// Auto-generated GraphQL module - DO NOT EDIT
${schemaImports}
${resolverImports}
${rulesImports}

export const typeDefs = ${schemaArray};
export const resolvers = ${resolversArray};
export const rules = ${rulesArray};

// Re-export for convenience
export default {
  typeDefs,
  resolvers,
  rules,
};
  `.trim();
}
