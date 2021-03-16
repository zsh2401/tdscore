module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    maxConcurrency: 1,
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.test.json'
        }
    }
}