import ICollection from "../../../src/data-structure/ICollection"
import "ts-jest"
import { first } from "../../../src";
export default function doCollectionTest(factory: <E>() => ICollection<E>) {
    describe("Standard Collection Test", () => {
        it("size", () => {
            const collection: ICollection<number> = factory<number>();
            collection.collectionAdd(1);
            collection.collectionAdd(2);

            expect(collection.collectionSize()).toBe(2)
            expect(collection.collectionIsEmpty()).toBeFalsy()
        })

        it("contains", () => {
            const collection: ICollection<number> = factory()
            collection.collectionAdd(1);
            collection.collectionAdd(2);
            expect(collection.collectionContains(1)).toBeTruthy()
            expect(collection.collectionContains(2)).toBeTruthy()
            expect(collection.collectionContains(3)).toBeFalsy()
        })

        it("add", () => {
            const collection: ICollection<number> = factory()
            collection.collectionAdd(1);
            collection.collectionAdd(2);
            expect(collection.collectionSize()).toBe(2)
        })

        it("remove", () => {
            const c = factory<number>()
            c.collectionAdd(1)
            c.collectionAdd(2)
            expect(c.collectionSize()).toBe(2)
            expect(c.collectionRemove(1)).toBeTruthy()
            expect(c.collectionRemove(3)).toBeFalsy()
            expect(c.collectionSize()).toBe(1)
            expect(first(c)).toBe(2)
        })

        it("toJSArray", () => {
            const collection: ICollection<number> = factory()
            collection.collectionAdd(1);
            collection.collectionAdd(2);

            expect(collection.collectionToJSArray()).toStrictEqual([1, 2])
        })

        it("toDSArray", () => {
            const collection: ICollection<number> = factory()
            collection.collectionAdd(1);
            collection.collectionAdd(2);
            const dsArray = collection.collectionToArray();
            expect(dsArray.length).toBe(2)
            expect(dsArray[0]).toBe(1)
            expect(dsArray[1]).toBe(2)
        })
    })
}
