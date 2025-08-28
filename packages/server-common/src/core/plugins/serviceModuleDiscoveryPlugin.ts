/**
 * @fileoverview ESBuild plugin for Service Module auto-discovery
 * @description Automatically discovers and imports all service modules that extend IServiceModule
 * @author Stephen Hellicar
 */

import { readFile } from 'node:fs/promises';
import type { Plugin } from 'esbuild';
import { glob } from 'glob';
import * as ts from 'typescript';

export interface ServiceModuleDiscoveryOptions {
  patterns?: string[];
}

export function serviceModuleDiscoveryPlugin(options: ServiceModuleDiscoveryOptions = {}): Plugin {
  const { patterns = ['src/**/*.ts'] } = options;

  return {
    name: 'service-module-discovery',
    setup(build) {
      // Handle the virtual module import
      build.onResolve({ filter: /^@shellicar-reference-enterprise\/server-common\/generated$/ }, (args) => ({
        path: args.path,
        namespace: 'modules-generated',
      }));

      build.onLoad({ filter: /.*/, namespace: 'modules-generated' }, async () => {
        try {
          const tsFiles = await glob(patterns);

          console.log('=== SERVICE MODULE DISCOVERY PLUGIN ===');
          console.log('Pattern:', patterns);
          console.log('Scanning files:', tsFiles.length);

          const moduleFiles: string[] = [];

          // Check each file for IServiceModule exports
          for (const filePath of tsFiles) {
            const content = await readFile(filePath, 'utf-8');

            // Create TypeScript source file
            const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true);

            // Check if file has exports extending IServiceModule
            const serviceModuleClasses = findServiceModuleExports(sourceFile);
            if (serviceModuleClasses.length > 0) {
              moduleFiles.push(filePath);
              console.log(`Found service modules in ${filePath}:`, serviceModuleClasses);
            }
          }

          console.log('Total service modules found:', moduleFiles.length);
          console.log('=== END SERVICE MODULE DISCOVERY ===');

          // Generate the virtual module content
          const code = generateModulesFile(moduleFiles);

          return {
            contents: code,
            loader: 'ts',
            resolveDir: process.cwd(), // Set resolve directory for imports
            watchFiles: tsFiles,
          };
        } catch (error) {
          return {
            errors: [
              {
                text: `Service module discovery failed: ${error instanceof Error ? error.message : String(error)}`,
                location: null,
              },
            ],
          };
        }
      });
    },
  };
}

function findServiceModuleExports(sourceFile: ts.SourceFile): string[] {
  const serviceModules: string[] = [];

  // First, check if IServiceModule is imported from @shellicar/core-di
  let hasValidImport = false;
  sourceFile.statements.forEach((statement) => {
    if (ts.isImportDeclaration(statement) && statement.moduleSpecifier) {
      const moduleSpecifier = statement.moduleSpecifier.getText().replace(/['"]/g, '');
      if (moduleSpecifier === '@shellicar/core-di' && statement.importClause?.namedBindings) {
        if (ts.isNamedImports(statement.importClause.namedBindings)) {
          const hasIServiceModule = statement.importClause.namedBindings.elements.some((element) => element.name.getText() === 'IServiceModule');
          if (hasIServiceModule) {
            hasValidImport = true;
            console.log('✅ Found valid IServiceModule import from @shellicar/core-di');
          }
        }
      }
    }
  });

  if (!hasValidImport) {
    console.log('❌ No valid IServiceModule import found');
    return serviceModules;
  }

  // Find classes that extend IServiceModule
  function visit(node: ts.Node) {
    if (ts.isClassDeclaration(node) && node.name && node.heritageClauses) {
      for (const heritageClause of node.heritageClauses) {
        if (heritageClause.token === ts.SyntaxKind.ExtendsKeyword) {
          for (const type of heritageClause.types) {
            const typeName = type.expression.getText();
            if (typeName === 'IServiceModule') {
              const className = node.name.getText();
              console.log(`✅ Found service module class: ${className}`);
              serviceModules.push(className);
            }
          }
        }
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return serviceModules;
}

function generateModulesFile(moduleFiles: string[]): string {
  if (moduleFiles.length === 0) {
    throw new Error('No service modules found! Check that you have classes extending IServiceModule from @shellicar/core-di');
  }

  // Generate imports using relative paths from current working directory
  const imports = moduleFiles
    .map((file, index) => {
      // Remove .ts extension - keep the full path as-is since resolveDir is set to process.cwd()
      const importPath = file.replace(/\.ts$/, '');
      return `import * as module${index} from './${importPath}';`;
    })
    .join('\n');

  // Generate module array
  const moduleExports = moduleFiles.map((_, index) => `...Object.values(module${index})`).join(', ');

  return `
// Auto-generated modules file - DO NOT EDIT
${imports}

export const modules = [${moduleExports}];

export default {
  modules,
};
  `.trim();
}
