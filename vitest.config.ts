import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./tests/setup.ts'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html', 'json-summary'],
        exclude: [
          'node_modules/',
          'tests/',
          'dist/',
          'vite.config.ts',
          'vitest.config.ts',
          'postcss.config.js',
          'tailwind.config.js',
          'src/main.tsx',
          'src/types/',
        ],
      },
    },
  })
);