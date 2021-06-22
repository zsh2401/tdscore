import "ts-jest"
import select from "../../../src/ixa/select"
it("lazy", () => {
    let times = 0
    let shouldBe = 0
    const s = select([1, 2, 3, 4], (n: number) => {
        times++
        return n
    })
    expect(times).toBe(shouldBe)
    const i = s.getIterator()
    while (i.hasNext()) {
        i.next()
        shouldBe++
        expect(times).toBe(shouldBe)
    }

})