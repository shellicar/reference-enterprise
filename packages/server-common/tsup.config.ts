import { defineConfig } from 'tsup';

export default defineConfig({
  bundle: true,
  dts: false,
  entry: ['src/**/*.ts'],
  format: ['esm'],
  keepNames: true,
  minify: true,
  outDir: 'dist',
  platform: 'node',
  sourcemap: true,
  splitting: true,
  treeshake: true,
  tsconfig: './tsconfig.json',
  metafile: true,
});
