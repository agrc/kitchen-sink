import eslint from '@eslint/js';
import tanstack from '@tanstack/eslint-plugin-query';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export const browser = tseslint.config(
  {
    ignores: [
      '**/__mocks__',
      '**/__snapshots__',
      '**/node_modules',
      '**/dist',
      '**/package-lock.json',
      '**/pnpm-lock.yaml',
      '**/.vscode',
      'public/*',
      '**/coverage',
      '!.storybook',
    ],
  },
  ...storybook.configs['flat/recommended'],
  ...tanstack.configs['flat/recommended'],
  importPlugin.flatConfigs.recommended,
  jsxA11Y.flatConfigs.recommended,
  eslint.configs.recommended,
  tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  prettier,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // ref: https://typescript-eslint.io/troubleshooting/typed-linting/performance/#eslint-plugin-import
      'import/named': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-unresolved': 'off',
    },
  },
  // ref: https://github.com/jsx-eslint/eslint-plugin-react/issues/3862#issuecomment-2553313433
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
);
