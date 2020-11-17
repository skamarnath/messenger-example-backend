module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ['standard'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {
    semi: ['warn', 'always'],
    'no-console': ['warn']
  }
};
