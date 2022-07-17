import { pathsToModuleNameMapper } from 'ts-jest';
import { Config } from '@jest/types';

const { compilerOptions } = require('./tsconfig.json');

function makeProject(
  options: Partial<Config.InitialOptions>
): Config.InitialOptions {
  return {
    collectCoverageFrom: ['<rootDir>/src'],
    coveragePathIgnorePatterns: ['<rootDir>/tests'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    ...options,
  };
}

const jestConfig: Config.InitialOptions = {
  projects: [
    makeProject({
      displayName: 'unit-tests',
      testMatch: ['<rootDir>/src/**/*.test.ts'],
    }),
    makeProject({
      displayName: 'functional-tests',
      testMatch: ['<rootDir>/tests/**/*.test.ts'],
    }),
  ],
};

export default jestConfig;
