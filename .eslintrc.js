module.exports = {
  root: true,
  extends: ['airbnb-base', 'prettier'],
  env: {
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-console': 'off',
    'linebreak-style': ['error', 'windows'],
    'no-useless-return': 'off',
    'no-param-reassign': ['error', { props: false }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['gulp/**', 'gulpfile.babel.js'],
        optionalDependencies: false,
      },
    ],
  },
};
