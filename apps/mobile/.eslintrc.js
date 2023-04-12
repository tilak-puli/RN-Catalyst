module.exports = {
  extends: [
    'airbnb',
    'plugin:import/typescript',
    'airbnb-typescript',
    'plugin:react-hooks/recommended',
    '../../.eslintrc.js', // check for merging/import
  ],
  ignorePatterns: [
    '.eslintrc.js',
    'babel.config.js',
    'metro.config.js',
    'jest.config.js',
    'jest.setup.js',
    'commitlint.config.js',
    'coverage',
  ],

  overrides: [
    {
      files: '**/*.+(ts|tsx)',
      env: {
        node: true,
        jest: true,
      },
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
      rules: {
        'import/extensions': 'off',
        'no-unused-vars': 'warn',
        '@typescript-eslint/no-use-before-define': 'off',
        'no-use-before-define': [
          'error',
          {functions: true, classes: true, variables: false},
        ],
        'react/prop-types': 'off',
        'import/prefer-default-export': 'off',
        'react/require-default-props': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'react/jsx-filename-extension': [1, {extensions: ['.tsx', '.jsx']}],
        'react/function-component-definition': [
          2,
          {
            namedComponents: ['arrow-function', 'function-declaration'],
            unnamedComponents: ['arrow-function', 'function-expression'],
          },
        ],
        'react-hooks/exhaustive-deps': 'error',
        'class-methods-use-this': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',
        'import/no-relative-packages': 'off',
      },
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
          typescript: true,
        },
      },
    },
  ],
};
