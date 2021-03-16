import "ts-jest"
import { sleep } from "../../src/util"
it("can sleep", async () => {
    const start = new Date().getTime()
    await sleep(1000)
    const end = new Date().getTime()
    expect(end - start).toBeGreaterThanOrEqual(1000)
})

it("no error when sleep time is negative number", async () => {
    expect(async () => {
        await sleep(-1)
    }).not.toThrow()
})