module.exports = {
  root: true,
  extends: '@react-native',
  ignorePatterns: ['coverage/'],
  rules: {
    'no-console': 'error',
  },
  overrides: [
    {
      files: ['jest.setup.js', '**/*.test.ts', '**/*.test.tsx'],
      env: {
        jest: true,
      },
    },
    {
      files: ['src/shared/lib/logger.ts'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
};
