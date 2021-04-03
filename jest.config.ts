import type { Config } from "@jest/types"
const config: Config.InitialOptions = {
    verbose: true,
    preset: "ts-jest",
    testEnvironment: "node",
    maxConcurrency: 10,
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.test.json'
        }
    }
}
export default config