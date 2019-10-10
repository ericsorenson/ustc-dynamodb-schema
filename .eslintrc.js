module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier/standard',
  ],
  plugins: [
    'eslint-plugin-sort-imports-es6-autofix',
    'jest',
    'prettier',
    'sort-destructure-keys',
    'sort-keys-fix',
  ],
  rules: {
    'no-prototype-builtins': 0,
    'require-atomic-updates': 0,
    'arrow-parens': ['error', 'as-needed'],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'prettier/prettier': 'error',
    quotes: ['error', 'single', { avoidEscape: true }],
    'sort-imports-es6-autofix/sort-imports-es6': [
      2,
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'sort-keys-fix/sort-keys-fix': [
      'error',
      'asc',
      { caseSensitive: true, natural: true },
    ],
    'sort-destructure-keys/sort-destructure-keys': [
      2,
      { caseSensitive: false },
    ],
  },
  settings: {
  },
  env: {
    'jest/globals': true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
  },
};
