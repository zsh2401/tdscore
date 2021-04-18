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
            expect(set.size()).toBe(2);
            expect(set.contains("A")).toBeTruthy()
            expect(set.contains("B")).toBeTruthy()
            expect(set.contains("C")).toBeFalsy()
        })

        it("size", () => {
            const set = factory()
            set.setAdd(1)
            set.setAdd(2)
            expect(set.size()).toBe(2)
        })

        it("remove", () => {
            const set = factory()
            set.setAdd("A")
            set.setAdd("B")
            set.setRemove("A");
            expect(set.size()).toBe(1);
            expect(set.contains("A")).toBeFalsy()
            expect(set.contains("B")).toBeTruthy();
        })

        it("contains", () => {
            const set = factory()
            set.setAdd(1)
            expect(set.contains(17)).toBeFalsy()
            expect(set.contains(1)).toBeTruthy()
            // expect(set.contains("B")).toBeFalsy()
        })

        it("clear", () => {
            const set = factory()
            set.setAdd("A")
            set.setAdd("B")
            set.clear()
            expect(set.isEmpty()).toBeTruthy()
        })
    })
}
