module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    // 'node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?|@react-navigation)/)', // TODO: Need to revisit if jest is failed on ES5 error
  ],
  haste: {
    defaultPlatform: 'android',
    platforms: ['android', 'ios', 'native'],
  },
  collectCoverage: true,
  coverageReporters: ['text-summary', 'html'],
  collectCoverageFrom: ['./src/**/*.{ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
};
