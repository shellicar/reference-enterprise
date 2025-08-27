/**
 * @fileoverview ESBuild plugin for GraphQL auto-discovery
 * @description Automatically discovers and combines GraphQL schemas, resolvers, and rules
 * @author Stephen Hellicar
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Plugin } from 'esbuild';
import { glob } from 'glob';

export interface GraphQLDiscoveryOptions {
  baseDir?: string;
  apiType: 'Api' | 'Int' | 'Dash' | 'Admin';
}

export function graphqlDiscoveryPlugin(options: GraphQLDiscoveryOptions): Plugin {
  const { baseDir = 'src', apiType } = options;

  // Generate patterns based on API type
  const schemaPattern = `**/*${apiType}.graphql`;
  const resolverPattern = `**/*${apiType}Resolvers.ts`;
  const rulesPattern = `**/*${apiType}Rules.ts`;

  return {
    name: 'graphql-discovery',
    setup(build) {
      // Handle the virtual module import
      build.onResolve({ filter: /^@graphql\/generated$/ }, (args) => ({
        path: args.path,
        namespace: 'graphql-generated',
      }));

      build.onLoad({ filter: /.*/, namespace: 'graphql-generated' }, async () => {
        try {
          // Discover all GraphQL files
          const schemaFiles = await glob(path.join(baseDir, schemaPattern));
          const resolverFiles = await glob(path.join(baseDir, resolverPattern));
          const rulesFiles = await glob(path.join(baseDir, rulesPattern));

          // Detect modules and check completeness
          const detectedModules = detectModules(schemaFiles, resolverFiles, rulesFiles, apiType);

          console.log('=== GRAPHQL DISCOVERY PLUGIN ===');
          console.log('Schema files found:', schemaFiles);
          console.log('Resolver files found:', resolverFiles);
          console.log('Rules files found:', rulesFiles);
          console.log('Detected modules:', detectedModules);

          // Check for issues
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
              console.log(`Module ${moduleName} is missing: ${missing.join(', ')}`);
            } else {
              console.log(`Module ${moduleName} is complete`);
            }
          }

          console.log('=== END GRAPHQL DISCOVERY ===');

          const schemas = await Promise.all(
            schemaFiles.map(async (file) => {
              const content = await readFile(file, 'utf-8');
              return { file, content };
            }),
          );

          // Check if no modules found
          if (Object.keys(detectedModules).length === 0) {
            console.error('❌ NO MODULES FOUND! Check your file naming patterns.');
          }

          // Generate the virtual module content
          const code = generateVirtualModule({
            schemas,
            resolverFiles,
            rulesFiles,
            baseDir,
          });

          return {
            contents: code,
            loader: 'ts',
            resolveDir: baseDir,
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

function detectModules(schemaFiles: string[], resolverFiles: string[], rulesFiles: string[], apiType: string) {
  const modules: Record<string, { schema: boolean; resolvers: boolean; rules: boolean }> = {};

  const operations = [
    {
      files: schemaFiles,
      type: 'schema' as const,
      pattern: new RegExp(`(.+)${apiType}\\.graphql$`),
    },
    {
      files: resolverFiles,
      type: 'resolvers' as const,
      pattern: new RegExp(`(.+)${apiType}Resolvers\\.ts$`),
    },
    {
      files: rulesFiles,
      type: 'rules' as const,
      pattern: new RegExp(`(.+)${apiType}Rules\\.ts$`),
    },
  ];

  for (const operation of operations) {
    for (const file of operation.files) {
      const basename = path.basename(file);
      const match = basename.match(operation.pattern);
      if (match) {
        const moduleName = match[1]!;
        modules[moduleName] ??= { schema: false, resolvers: false, rules: false };
        modules[moduleName][operation.type] = true;
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
