module.exports = {
  parser: "babel-eslint",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    "strict": [ 2, "safe" ],
    "no-console": 0,
    "one-var": [2, "never"],
    "no-var": 2,
    "no-unused-vars": 2,
    "no-unreachable": 1,
    "prefer-const": 2,
    "class-methods-use-this": 1,
    "no-useless-constructor": 1,
    "no-unused-expressions": 1,
    "vars-on-top": 1,
    "block-scoped-var": 1,
    // "no-magic-numbers": ["error", { ignoreArrayIndexes: true, "ignore": [1] }] 
  }
};
