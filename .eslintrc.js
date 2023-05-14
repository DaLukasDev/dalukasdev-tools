/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  extends: ['@dalukasdev/eslint-config'], // uses the config in `packages/config/eslint`
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    tsconfigRootDir: __dirname,
    project: [
      './tsconfig.json',
      './apps/*/tsconfig.json',
      './packages/*/tsconfig.json',
    ],
  },
  settings: {
    next: {
      rootDir: ['apps/docs'],
    },
    react: {
      version: '18.2.0',
    },
  },
};

module.exports = config;
