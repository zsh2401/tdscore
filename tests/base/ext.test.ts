import "ts-jest"
import "../../src/ext"
describe("Extension Test", () => {
    it("remove", () => {
        const a: number[] = [1, 2, 3];
        a.remove(2);
        expect(a).toStrictEqual([1, 3]);
    });
});