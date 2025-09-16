// @ts-check
import js from '@eslint/js'
import { defineConfig } from '@eslint/config-helpers'
import eslintConfigPrettier from 'eslint-config-prettier'
import turboPlugin from 'eslint-plugin-turbo'
import tseslint from 'typescript-eslint'
import onlyWarn from 'eslint-plugin-only-warn'

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export default defineConfig(
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'no-console': 'warn',
      'turbo/no-undeclared-env-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    // @ts-expect-error missing type declaration file
    plugins: { onlyWarn },
  },
  {
    ignores: ['**/dist/**', '**/.medusa/**', '**/.next/**'],
  }
)
