// .eslintrc.js
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json', // ajuste se necessário
    tsconfigRootDir: __dirname,
  },
  rules: {
    'linebreak-style': 'off',  // Desabilita a verificação de estilo de quebra de linha
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/no-unsafe-argument': 'warn',
  },
  env: {
    node: true,
    jest: true,
  },
  globals: {
    ...globals.node,
    ...globals.jest,
  },
};
