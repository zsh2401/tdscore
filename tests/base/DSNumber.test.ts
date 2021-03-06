import "ts-jest"
import DSNumber from "../../src/DSNumber"
describe("DSNumber Test", () => {

    it("Use cache", () => {
        for (let i = -128; i < 128; i++) {
            const isSameObject = DSNumber.valueOf(i).referenceEquals(DSNumber.valueOf(i))
            expect(isSameObject).toBeTruthy();
        }
    });

    it("No caching when out of range", () => {
        const a = DSNumber.valueOf(1000);
        const b = DSNumber.valueOf(1000);
        expect(a.referenceEquals(b)).toBeFalsy();
    });
});