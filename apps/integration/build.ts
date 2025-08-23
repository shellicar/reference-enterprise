/**
 * @fileoverview Build script for Integration App Azure Functions
 * @description Bundles all functions/*.ts files into minified ES modules with code splitting for Azure Functions deployment
 * @author Stephen Hellicar
 */

import { argv } from 'node:process';
import cleanPlugin from '@shellicar/build-clean/esbuild';
import graphqlPlugin from '@shellicar/build-graphql/esbuild';
import versionPlugin from '@shellicar/build-version/esbuild';
import { context } from 'esbuild';
import { glob } from 'glob';

const entryPoints = await glob('./src/functions/*.ts');
const inject = await glob('./inject/*.ts');
const watch = argv.includes('--watch');
const external = ['@azure/functions'];
const plugins = [cleanPlugin({ destructive: true }), graphqlPlugin({}), versionPlugin({})];

const ctx = await context({
  bundle: true,
  entryPoints,
  entryNames: 'functions/[name]',
  chunkNames: 'chunks/[name]-[hash]',
  drop: watch ? [] : ['console', 'debugger'],
  outdir: './dist',
  format: 'esm',
  external,
  platform: 'node',
  target: 'es2024',
  treeShaking: true,
  minify: !watch,
  sourcemap: true,
  splitting: true,
  keepNames: true,
  inject,
  plugins,
  tsconfig: './tsconfig.json',
});

if (watch) {
  await ctx.watch();
  console.log('watching...');
} else {
  await ctx.rebuild();
  ctx.dispose();
}
