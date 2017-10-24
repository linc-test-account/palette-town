module.exports = {
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  env: {
    'jest': true,
    'browser': true,
    'node': true,
    'es6': true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'no-console': 0,
    'one-var': [2, 'never'],
    'no-var': 2,
    'no-unused-vars': 2,
    'prefer-const': 2
  }
};
