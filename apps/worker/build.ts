import { argv, env } from 'node:process';
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
  await ctx.rebuild();
  ctx.dispose();
}
