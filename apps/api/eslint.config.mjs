// @ts-check
import eslint from '@eslint/js'
import { defineConfig } from '@eslint/config-helpers'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        // Private and protected members must have underscore prefix
        {
          selector: ['classProperty', 'classMethod', 'accessor'],
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'require',
        },
        {
          selector: ['classProperty', 'classMethod', 'accessor'],
          modifiers: ['protected'],
          format: ['camelCase'],
          leadingUnderscore: 'require',
        },
        // Functions can use camelCase or PascalCase (for React components)
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        // Methods must use camelCase
        {
          selector: 'method',
          format: ['camelCase'],
        },
        // Classes, types, interfaces must use PascalCase
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
        },
        // Parameters can use camelCase or snake_case
        {
          selector: 'parameter',
          format: ['camelCase', 'snake_case'],
          leadingUnderscore: 'allow',
        },
      ],
    },
  }
)
