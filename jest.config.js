const { join } = require('path');

const baseUrl = './src';

const srcRoot = `${join('<rootDir>', baseUrl)}/`;

module.exports = {
  roots: [srcRoot],
  transform: {
    '^.+\\.svg$': '<rootDir>/mocks/svg.js',
    '^.+\\.(ts|tsx)?$': [
      'esbuild-jest',
      { sourcemap: true, loader: { '.svg': 'file' } },
    ],
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  coveragePathIgnorePatterns: [
    'types.ts',
    'embeded.tsx',
    'index.ts',
    'index.tsx',
    'custom.d.ts',
  ],
  setupFilesAfterEnv: ['./setupTests.js'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  coverageReporters: ['text', 'json'],
  coverageThreshold: {
    global: {
      branches: 57.46,
      functions: 60.51,
      lines: 78.45,
    },
  },
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
