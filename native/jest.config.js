module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.json'
    },
    "__DEV__": true // not sure why this is needed?
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'tsx',
    'jsx'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js$': '<rootDir>/../node_modules/react-native/jest/preprocessor.js',
  },
  transformIgnorePatterns: [
    '/node_modules/?!(react-native)/',
    'galette/node_modules/?!(react-native)/'
  ],
  testMatch: [
    '**/*.test.(ts|js)'
  ],
  preset: "react-native"
};
