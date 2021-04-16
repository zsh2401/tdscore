import ICollection from "../../../src/data-structure/ICollection"
import "ts-jest"
export function doCollectionTest(factory: <E>() => ICollection<E>) {
    describe("Standard Collection Test", () => {
        it("size", () => {
            const collection: ICollection<number> = factory<number>();
            collection.collectionAdd(1);
            collection.collectionAdd(2);

            expect(collection.size()).toBe(2)
            expect(collection.isEmpty()).toBeFalsy()
        })

        it("contains", () => {
            const collection: ICollection<number> = factory()
            collection.collectionAdd(1);
            collection.collectionAdd(2);
            expect(collection.contains(1)).toBeTruthy()
            expect(collection.contains(2)).toBeTruthy()
            expect(collection.contains(3)).toBeFalsy()
        })

        it("add", () => {
            const collection: ICollection<number> = factory()
            collection.collectionAdd(1);
            collection.collectionAdd(2);
            expect(collection.size()).toBe(2)
        })

        it("toJSArray", () => {
            const collection: ICollection<number> = factory()
            collection.collectionAdd(1);
            collection.collectionAdd(2);

            expect(collection.toJSArray()).toStrictEqual([1, 2])
        })

        it("toDSArray", () => {
            const collection: ICollection<number> = factory()
            collection.collectionAdd(1);
            collection.collectionAdd(2);
            const dsArray = collection.toArray();
            expect(dsArray.length).toBe(2)
            expect(dsArray[0]).toBe(1)
            expect(dsArray[1]).toBe(2)
        })
    })
}
