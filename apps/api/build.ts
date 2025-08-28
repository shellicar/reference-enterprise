/**
 * @fileoverview Build script for API App Azure Functions
 * @description Bundles all functions/*.ts files into minified ES modules with code splitting for Azure Functions deployment
 * @author Stephen Hellicar
 */

import { argv, env } from 'node:process';
import cleanPlugin from '@shellicar/build-clean/esbuild';
import versionPlugin from '@shellicar/build-version/esbuild';
import { graphqlDiscoveryPlugin } from '@shellicar-reference-enterprise/server-common/core/plugins/graphqlDiscoveryPlugin';
import { serviceModuleDiscoveryPlugin } from '@shellicar-reference-enterprise/server-common/core/plugins/serviceModuleDiscoveryPlugin';
import { context } from 'esbuild';
import { glob } from 'glob';

const entryPoints = await glob('./src/functions/*.ts');
const inject = await glob('./inject/*.ts');
const watch = argv.includes('--watch');
const external = ['@azure/functions'];
const plugins = [cleanPlugin({ destructive: true }), graphqlDiscoveryPlugin({ logger: { debug: true, verbose: true } }), serviceModuleDiscoveryPlugin({ patterns: ['src/**/*Module.ts', '../../packages/server-common/src/**/*Module.ts'] }), versionPlugin({})];

const ctx = await context({
  bundle: true,
  chunkNames: 'chunks/[name]-[hash]',
  drop: env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  entryNames: 'functions/[name]',
  entryPoints,
  external,
  format: 'esm',
  inject,
  keepNames: true,
  minify: !watch,
  outdir: './dist',
  platform: 'node',
  plugins,
  sourcemap: true,
  splitting: true,
  target: 'es2024',
  treeShaking: true,
  tsconfig: './tsconfig.json',
});

if (watch) {
  await ctx.watch();
  console.log('watching...');
} else {
  console.log('building...');
  await ctx.rebuild();
  ctx.dispose();
}
