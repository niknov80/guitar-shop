const eslint = require('@eslint/js');
const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const eslintConfigPrettier = require('eslint-config-prettier');
const importPlugin = require('eslint-plugin-import');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const unusedImports = require('eslint-plugin-unused-imports');
const tsImportResolver = require('eslint-import-resolver-typescript');

module.exports = [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/*.log', '**/.env*', 'specification/', 'tmp/'],
  },
  eslintConfigPrettier,
  importPlugin.flatConfigs.recommended,
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      'eslint-import-resolver-typescript': tsImportResolver,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        project: 'tsconfig.json',
        projectService: true,
      },
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      camelcase: 'error',
      eqeqeq: 'error',
      'no-alert': 'error',
      'no-eval': 'error',
      'no-var': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-iterator': 'error',
      'no-labels': 'error',
      'no-extend-native': 'error',
      'no-invalid-this': 'error',
      'no-self-compare': 'error',
      'no-throw-literal': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-useless-concat': 'warn',
      'no-useless-escape': 'warn',
      'no-useless-return': 'warn',
      'no-with': 'error',
      'no-console': 'off',
      'no-else-return': 'warn',
      'no-empty': 'warn',
      'default-case': 'off',
      'max-classes-per-file': 'off',
      'spaced-comment': 'warn',
      'consistent-return': 'error',
      'no-compare-neg-zero': 'warn',
      'no-case-declarations': 'off',
      'no-prototype-builtins': 'off',
      'no-sequences': 'error',
      'no-new': 'error',
      'no-void': 'error',
      curly: ['error', 'all'],

      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',

      'import/first': 'warn',
      'import/newline-after-import': 'warn',
      'import/no-duplicates': 'warn',
      'unused-imports/no-unused-imports': 'warn',
      'simple-import-sort/imports': ['warn', { groups: [['^\\u0000', '^@?\\w', '^[^.]', '^\\.']] }],
    },
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-undef': 'off',
    },
  },
  eslintPluginPrettierRecommended,
];
