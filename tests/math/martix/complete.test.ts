import "ts-jest"
import { RawMartix } from "../../../src/math"
import complete from "../../../src/math/martix/raw/complete"
it("should auto complete", () => {
    const m: RawMartix<number> = [
        [1, 2, 3, 1],
        [1],
        [1, 2]
    ]
    complete(m, 0)
    expect(m).toStrictEqual([
        [1, 2, 3, 1],
        [1, 0, 0, 0],
        [1, 2, 0, 0]
    ])
})

it("more and more", () => {
    const m: RawMartix<number> = [
        [1, 2, 3, 1],
        [1, 2, 3, 4, 5, 6],
        [],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    ]
    complete(m, 0)
    expect(m).toStrictEqual([
        [1, 2, 3, 1, 0, 0, 0, 0, 0, 0],
        [1, 2, 3, 4, 5, 6, 0, 0, 0, 0],
        Array(10).fill(0),
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    ])
})