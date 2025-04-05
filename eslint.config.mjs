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
]);
