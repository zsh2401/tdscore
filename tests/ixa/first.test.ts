import "ts-jest"
import { first, LinkedList } from "../../src"

it("should be the first one", () => {
    const collection = new LinkedList()
    collection.collectionAdd("A")
    collection.collectionAdd("B")
    expect(first(collection)).toBe("A")
})

it("throws when there's no element", () => {
    const collection = new LinkedList<string>();
    expect(() => first(collection)).toThrow()
})

it("filter", () => {
    const result = first([1, 2, 3, 4], (n) => n > 1)
    expect(result).toBe(2)
})