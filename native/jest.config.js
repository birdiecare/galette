// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaults: tsjPreset } = require('ts-jest/presets');


module.exports = {
  ...tsjPreset,
  preset: 'react-native',
  transform: {
    ...(tsjPreset.transform || {}),
    '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    '^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$':
      '<rootDir>/node_modules/react-native/jest/assetFileTransformer.js',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  cacheDirectory: '.jest/cache',
  transformIgnorePatterns: [
    // Override default transformIgnorePatterns to not omit node_modules
    // Necessary to transform native libraries
  ],
  testPathIgnorePatterns: [
    '\\.snap$',
    '<rootDir>/lib/',
    '<rootDir>/node_modules/',
  ],
  watchPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/\\.\\w*/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  coverageDirectory: '../coverage',
};



