import "ts-jest"
import { skip } from "../../../src"
import toJSArray from "../../../src/data-structure/iterating/toJSArrayForItertable"

it("could skip", () => {
    expect(toJSArray(skip([1, 2, 3], 1)))
        .toStrictEqual([2, 3])
})

it("hasNext() works correctly", () => {
    const skipedIterator = skip([1, 2, 3], 1).getIterator()

    expect(skipedIterator.hasNext()).toBeTruthy()
    expect(skipedIterator.hasNext()).toBeTruthy()
    expect(skipedIterator.hasNext()).toBeTruthy()
    
    expect(skipedIterator.next()).toBe(2)
    expect(skipedIterator.next()).toBe(3)
    expect(skipedIterator.hasNext()).toBeFalsy()
})