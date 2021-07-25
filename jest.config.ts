import type { Config } from "@jest/types"
const config: Config.InitialOptions = {
    verbose: true,
    preset: "ts-jest",
    testEnvironment: "jsdom",
    maxConcurrency: 5,
    globals: {
        'ts-jest': { 
            tsconfig: 'tsconfig.test.json'
        }
    },
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    }
}
export default config