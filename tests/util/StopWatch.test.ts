import StopWatch from "../../src/util/StopWatch"
import sleep from "../../src/util/sleep"
describe("Stop Watch Test", () => {

    test("no pause", async () => {
        const sw = new StopWatch()
        sw.start()
        await sleep(50)
        sw.record("a")
        await sleep(50)
        sw.record("b")

        sw.end()

        expect(sw.getRecord("a") / 100).toBeCloseTo(0.5, 1)
        expect(sw.getRecord("b") / 100).toBeCloseTo(1.03, 1)
    })

    test("with pause", async () => {
        const sw = new StopWatch()
        sw.start()

        await sleep(100)
        sw.record("a")
        sw.pause()
        await sleep(100)
        sw.start()

        sw.record("b")


        expect(sw.getRecord("a") / 100).toBeCloseTo(1, 1)
        expect(sw.getRecord("b") / 100).toBeCloseTo(1, 1)

        expect
    })

    test("total", async () => {
        const sw = new StopWatch()
        sw.start()
        await sleep(100)
        expect(sw.getRecord() / 100).toBeCloseTo(1, 1)
    })

    test("reset", async () => {
        const sw = new StopWatch()

        sw.start()
        await sleep(100)
        sw.end()

        sw.reset()
        sw.start()
        await sleep(50)
        expect(sw.getRecord() / 100).toBeCloseTo(0.5, 1)

    })
})