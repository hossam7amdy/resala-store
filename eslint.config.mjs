// @ts-check
import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import { defineConfig } from '@eslint/config-helpers'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh'
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports'

/**
 * @see https://eslint.org/docs/latest/use/configure/configuration-files
 * @type {import("eslint").Linter.Config[]}
 * */
export default defineConfig(
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'no-console': 'warn',
      'prefer-rest-params': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: [
      './apps/admin/**/*.{js,jsx,ts,tsx}',
      './apps/storefront/**/*.{js,jsx,ts,tsx}',
    ],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': eslintPluginReactRefresh,
      'unused-imports': eslintPluginUnusedImports,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',

      'prettier/prettier': 'error',
      'react/prop-types': 'off',
      'new-cap': 'off',
      'require-jsdoc': 'off',
      'valid-jsdoc': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-expressions': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    ignores: ['**/dist/**', '**/.medusa/**', '**/.next/**'],
  }
)
