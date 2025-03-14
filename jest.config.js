const nextJest = require('next/jest');

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        // Handle module aliases (if you configured them in tsconfig.json)
        '^@/(.*)$': '<rootDir>/$1'
    },
    collectCoverageFrom: [
        'app/**/*.{js,jsx,ts,tsx}',
        '!app/**/*.d.ts',
        '!app/mock/**/*',
        '!app/**/layout.tsx',
    ],
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    // Ignore .history directory to avoid running tests on old versions
    testPathIgnorePatterns: ['/node_modules/', '/.next/', '/.history/'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig); 