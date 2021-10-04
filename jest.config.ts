export default {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	testMatch: ['<rootDir>/src/__tests__/*.ts'],
	testPathIgnorePatterns: ['/node_modules/'],
	coveragePathIgnorePatterns: ['node_modules'],
	reporters: ['default'],
	globals: { 'ts-jest': { diagnostics: false } },
	transform: {}
};
