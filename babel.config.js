const path = require('path');

const srcPath = path.resolve(__dirname, 'src');

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: [srcPath],
        alias: {
          '@': srcPath,
        },
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      },
    ],
  ],
};
