import "ts-jest"
import { ArrayList, indexOf } from "../../../src"
it("can find a value", () => {
    const collection = new ArrayList();
    collection.listAdd("A");
    collection.listAdd("B")

    expect(indexOf(collection, "A")).toBe(0)
    expect(indexOf(collection, "B")).toBe(1)
    expect(indexOf(collection, "C")).toBe(-1)
    // hashcode("a") => 65
    expect(indexOf(collection, 65)).toBe(-1)
})