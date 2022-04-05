import ICollection from "../../../src/data-structure/ICollection"
import "ts-jest"
import { first, firstOrDefault, ISet } from "../../../src";
export default function doSetTest(factory: <E>() => ISet<E>) {
    describe("Standard Set Test", () => {
        it("add repeated", () => {
            const set = factory()
            set.setAdd("A")
            set.setAdd("A")
            set.setAdd("B")
            expect(set.collectionSize()).toBe(2);
            expect(set.collectionContains("A")).toBeTruthy()
            expect(set.collectionContains("B")).toBeTruthy()
            expect(set.collectionContains("C")).toBeFalsy()
        })

        it("size", () => {
            const set = factory()
            set.setAdd(1)
            set.setAdd(2)
            expect(set.collectionSize()).toBe(2)
        })

        it("remove", () => {
            const set = factory()
            set.setAdd("A")
            set.setAdd("B")
            set.setRemove("A");
            expect(set.collectionSize()).toBe(1);
            expect(set.collectionContains("A")).toBeFalsy()
            expect(set.collectionContains("B")).toBeTruthy();
        })

        it("contains", () => {
            const set = factory()
            set.setAdd(1)
            expect(set.collectionContains(17)).toBeFalsy()
            expect(set.collectionContains(1)).toBeTruthy()
            // expect(set.collectionContains("B")).toBeFalsy()
        })

        it("clear", () => {
            const set = factory()
            set.setAdd("A")
            set.setAdd("B")
            set.collectionClear()
            expect(set.collectionIsEmpty()).toBeTruthy()
        })
    })
}
