const expoPreset = require('jest-expo/jest-preset');

module.exports = {
  ...expoPreset,
  roots: ['<rootDir>/tests'],
  setupFiles: [],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  moduleNameMapper: {
    '^react-native$': '<rootDir>/tests/reactNativeMock.tsx',
    '^react-native/(.*)$': '<rootDir>/tests/reactNativeMock.tsx',
    '^@react-x2-native/tokens$': '<rootDir>/packages/tokens/src',
    '^@react-x2-native/core$': '<rootDir>/packages/core/src',
    '^react-x2-native$': '<rootDir>/packages/ui/src',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?|react-navigation|@react-native/js-polyfills|react-native-reanimated|react-native-worklets))',
  ],
};
