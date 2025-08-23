import cleanPlugin from '@shellicar/build-clean/esbuild';
import { defineConfig } from 'tsup';

export default defineConfig(({ watch }) => ({
  bundle: true,
  dts: false,
  entry: ['src/**/*.ts'],
  format: ['esm'],
  keepNames: true,
  minify: !watch,
  clean: false,
  outDir: 'dist',
  platform: 'node',
  target: 'es2024',
  sourcemap: true,
  splitting: true,
  treeshake: true,
  tsconfig: './tsconfig.json',
  esbuildOptions: (options) => {
    if (!watch) {
      options.drop = ['console', 'debugger'];
    }
    options.chunkNames = 'chunks/[name]-[hash]';
  },
  esbuildPlugins: [cleanPlugin({ destructive: true })],
}));
