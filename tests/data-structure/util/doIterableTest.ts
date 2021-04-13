import IIterable from "../../../src/data-structure/IIterable";
export default function (factory: <E>() => IIterable<E>) {
    it("can get iterator", () => {
        expect(factory().getIterator()).not.toBeNull()
    })

    it("getIterator() returns new iterator", () => {
        const iterable = factory()
        expect(iterable.getIterator() === iterable.getIterator()).toBeFalsy()
    })
}