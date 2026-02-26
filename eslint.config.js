// eslint.config.js

import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
  js.configs.recommended,

  {
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },

  ...tseslint.configs.recommended,

  ...vue.configs['flat/recommended'],

  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    }
  },

  prettier,

  {
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  }
]