import "ts-jest"
import { defaultOrFirst, HashSet, LinkedList } from "../../../src"

it("should be the first one", () => {
    const collection = new LinkedList();
    collection.collectionAdd("A")
    collection.collectionAdd("B")
    expect(defaultOrFirst(collection)).toBe("A");
})

it("returns default value when there's no elemen", () => {
    const collection = new LinkedList<string>();
    expect(defaultOrFirst(collection, "A")).toBe("A")
})

it("returns null if no default value passed and there's no element in the collection", () => {
    const collection = new LinkedList<string>();
    expect(defaultOrFirst(collection)).toBeNull();
})