import { append, defaultOrFirst, size,last } from "../../../src/data-structure/iterating"
import IIterable from "../../../src/data-structure/IIterable"
// import last from "../../src/data-structure/iterating/last";
import DSArray from "../../../src/DSArray"

describe("append test", () => {
    it("could append", () => {
        const TEST_NUMBER = 2401;
        let i: IIterable<number> = new DSArray(0);
        i = append(i, TEST_NUMBER);
        i = append(i, TEST_NUMBER + 1)
        expect(size(i)).toBe(2);
        expect(defaultOrFirst(i)).toBe(TEST_NUMBER);
        expect(last(i)).toBe(TEST_NUMBER + 1);
    });
});