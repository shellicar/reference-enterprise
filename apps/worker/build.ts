import { argv } from 'node:process';
import cleanPlugin from '@shellicar/build-clean/esbuild';
import versionPlugin from '@shellicar/build-version/esbuild';
import { context } from 'esbuild';
import { glob } from 'glob';

const entryPoints = await glob('./src/main.ts');
const inject = await glob('./inject/*.ts');
const watch = argv.includes('--watch');
const external = ['@temporalio/worker'];
const plugins = [cleanPlugin({ destructive: true }), versionPlugin({})];

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
