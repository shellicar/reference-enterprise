import versionPlugin from '@shellicar/build-version/esbuild';
import { build } from 'esbuild';
import { cleanPlugin } from 'esbuild-clean-plugin';
import { glob } from 'glob';

const entryPoints = await glob('./src/main.ts');
const inject = await glob('./inject/*.ts');

await build({
  bundle: true,
  entryPoints,
  outdir: './dist',
  format: 'esm',
  external: ['@temporalio/worker'],
  platform: 'node',
  treeShaking: true,
  minify: true,
  sourcemap: true,
  metafile: true,
  splitting: true,
  keepNames: true,
  inject,
  plugins: [cleanPlugin({}), versionPlugin({})],
  tsconfig: './tsconfig.json',
});
