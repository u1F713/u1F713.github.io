import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginAstro from 'eslint-plugin-astro'
import solid from 'eslint-plugin-solid/configs/typescript'
import * as tsParser from '@typescript-eslint/parser'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  ...eslintPluginAstro.configs.recommended,
  {
    ...solid,
    files: ['**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: 'tsconfig.json'
      }
    }
  },
  { ignores: ['.astro'] }
)
