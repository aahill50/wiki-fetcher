/**
 * For a detailed explanation regarding each configuration property, visit:
 */

/** @type {import('jest').Config} */
const config = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**'],
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: ['fonts.ts', 'store.ts', 'types.ts', '.*\.snap'],
    coverageProvider: 'v8',
    moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/src/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            { tsconfig: '<rootDir>/tsconfig.jest.json' },
        ],
    },
};

module.exports = config;
