import { defineConfig } from 'eslint/config';
import ngneers from '@ngneers/eslint-config';

export default defineConfig([
  ngneers.configs.common,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
  {
    // The shared config only provides the Jest globals. Vitest injects a few additional ones.
    files: ['**/*.spec.ts', '**/*.test.ts'],
    languageOptions: {
      globals: {
        assert: 'readonly',
        bench: 'readonly',
        chai: 'readonly',
        expectTypeOf: 'readonly',
        onTestFailed: 'readonly',
        onTestFinished: 'readonly',
        suite: 'readonly',
        vi: 'readonly',
        vitest: 'readonly',
      },
    },
  },
]);
