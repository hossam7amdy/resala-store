// @ts-check
import { defineConfig } from '@eslint/config-helpers'
import { config as baseConfig } from '@repo/eslint-config'

export default defineConfig(baseConfig, {
  rules: {
    '@typescript-eslint/naming-convention': [
      'warn',
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
})
