import cleanPlugin from '@shellicar/build-clean/esbuild';
import { defineConfig } from 'tsup';

export default defineConfig({
  bundle: true,
  dts: false,
  entry: ['src/**/*.ts', '!src/**/*.d.ts'],
  format: ['esm'],
  keepNames: true,
  minify: false,
  clean: false,
  outDir: 'dist',
  platform: 'node',
  target: 'es2024',
  sourcemap: true,
  splitting: true,
  treeshake: true,
  tsconfig: './tsconfig.json',
  esbuildOptions: (options) => {
    options.chunkNames = 'chunks/[name]-[hash]';
  },
  esbuildPlugins: [cleanPlugin({ destructive: true })],
});
