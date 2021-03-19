import "ts-jest"
import { CollectionBase, LinkedList, util } from "../../src"
import ICollection from "../../src/data-structure/ICollection";
it("add collection", () => {
    const collection: ICollection<number> = new LinkedList<number>();
    collection.collectionAdd(1);
    collection.collectionAdd(2);
    expect(collection.size()).toBe(2)
})

it("contains", () => {
    const collection: ICollection<number> = new LinkedList<number>();
    collection.collectionAdd(1);
    collection.collectionAdd(2);
    expect(collection.contains(1)).toBeTruthy()
    expect(collection.contains(2)).toBeTruthy()
    expect(collection.contains(3)).toBeFalsy()
})



it("size", () => {
    const collection: ICollection<number> = new LinkedList<number>();
    collection.collectionAdd(1);
    collection.collectionAdd(2);

    expect(collection.size()).toBe(2)
    expect(collection.isEmpty()).toBeFalsy()
})

it("any", () => {
    const collection: ICollection<number> = new LinkedList<number>();
    collection.collectionAdd(1);
    collection.collectionAdd(2);

    expect(collection.collectionAny() === 1 || collection.collectionAny() === 2).toBeTruthy()

    collection.clear()
    expect(() => collection.collectionAny()).toThrow()
})

it("toJSArray", () => {
    const collection: ICollection<number> = new LinkedList<number>();
    collection.collectionAdd(1);
    collection.collectionAdd(2);

    expect(collection.toJSArray()).toStrictEqual([1, 2])
})
it("clone", () => {

})

it("toDSArray", () => {
    const collection: ICollection<number> = new LinkedList<number>();
    collection.collectionAdd(1);
    collection.collectionAdd(2);
    const dsArray = collection.toArray();
    expect(dsArray.length).toBe(2)
    expect(dsArray[0]).toBe(1)
    expect(dsArray[1]).toBe(2)
})