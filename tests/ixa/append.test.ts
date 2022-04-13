import { append, size, last, first } from "../../src/ixa"
import IIterable from "../../src/data-structure/IIterable"
import DSArray from "../../src/DSArray"
import toJSArray from "../../src/ixa/toJSArrayForItertable";

describe("append test", () => {
    it("could append", () => {
        const TEST_NUMBER = 2401;
        let i: IIterable<number> = new DSArray(0)
        i = append(i, TEST_NUMBER);
        i = append(i, TEST_NUMBER + 1)
        expect(size(i)).toBe(2)
        expect(first(i)).toBe(TEST_NUMBER)
        expect(last(i)).toBe(TEST_NUMBER + 1);
    });

    it("reset", () => {
        let i: IIterable<number> = new DSArray(0);
        i = append(i, 1)
        i = append(i, 2)
        expect(size(i)).toBe(2)

        let iterator = i.getIterator();
        expect(iterator.hasNext()).toBeTruthy()
        expect(iterator.next()).toBe(1)
        expect(iterator.current()).toBe(1)
        expect(iterator.next()).toBe(2)
        expect(iterator.hasNext()).toBeFalsy()
        expect(() => iterator.next()).toThrow()

        expect(() => iterator.reset()).not.toThrow()
        expect(iterator.hasNext()).toBeTruthy()
        expect(iterator.next()).toBe(1)
        expect(iterator.next()).toBe(2)
        expect(iterator.current()).toBe(2)
        expect(iterator.hasNext()).toBeFalsy()
    })

    it("append more element", () => {
        expect(toJSArray(append([1, 2, 3], [4, 5, 6])))
            .toStrictEqual([1, 2, 3, 4, 5, 6])
    })

    it("mixed append", () => {
        const i = append(1, [2, 3], 4, [5, 6], 7, 8, 9)
        const jsArray = toJSArray(i);
        expect(jsArray)
            .toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    })
});