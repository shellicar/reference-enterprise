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
  pattern?: string;
}

export function serviceModuleDiscoveryPlugin(options: ServiceModuleDiscoveryOptions = {}): Plugin {
  const { pattern = 'src/**/*.ts' } = options;

  return {
    name: 'service-module-discovery',
    setup(build) {
      // Handle the virtual module import
      build.onResolve({ filter: /^@modules\/generated$/ }, (args) => ({
        path: args.path,
        namespace: 'modules-generated',
      }));

      build.onLoad({ filter: /.*/, namespace: 'modules-generated' }, async () => {
        try {
          const tsFiles = await glob(pattern);

          console.log('=== SERVICE MODULE DISCOVERY PLUGIN ===');
          console.log('Pattern:', pattern);
          console.log('Scanning files:', tsFiles.length);

          const moduleFiles: string[] = [];

          // Check each file for IServiceModule exports
          for (const filePath of tsFiles) {
            const content = await readFile(filePath, 'utf-8');

            // Create TypeScript source file
            const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true);

            // Check if file has exports extending IServiceModule
            if (hasServiceModuleExport(sourceFile)) {
              moduleFiles.push(filePath);
              console.log('Found service module:', filePath);
            }
          }

          console.log('Total service modules found:', moduleFiles.length);
          console.log('=== END SERVICE MODULE DISCOVERY ===');

          // Generate the virtual module content
          const code = generateModulesFile(moduleFiles);

          return {
            contents: code,
            loader: 'ts',
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

function hasServiceModuleExport(sourceFile: ts.SourceFile): boolean {
  let hasModule = false;

  function visit(node: ts.Node) {
    // Check for export declarations
    if (ts.isExportDeclaration(node) || ts.isVariableStatement(node)) {
      // Look for IServiceModule references in the text
      const nodeText = node.getFullText();
      if (nodeText.includes('IServiceModule') || nodeText.includes('ServiceModule')) {
        hasModule = true;
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return hasModule;
}

function generateModulesFile(moduleFiles: string[]): string {
  if (moduleFiles.length === 0) {
    return `
// Auto-generated modules file - DO NOT EDIT
// No service modules found

export const modules = [];

export default {
  modules,
};
    `.trim();
  }

  // Generate imports using relative paths
  const imports = moduleFiles
    .map((file, index) => {
      // Remove .ts extension and make relative import
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
