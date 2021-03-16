import "ts-jest"
import DSNumber from "../../src/DSNumber"
describe("DSNumber Test", () => {

    it("Use cache", () => {
        for (let i = -128; i < 128; i++) {
            expect(DSNumber.valueOf(i).toJSNumber()).toBe(i);
            const isSameObject = DSNumber.valueOf(i).referenceEquals(DSNumber.valueOf(i))
            expect(isSameObject).toBeTruthy();
        }
    });

    it("No caching when out of range", () => {
        const a = DSNumber.valueOf(1000);
        const b = DSNumber.valueOf(1000);
        expect(a.referenceEquals(b)).toBeFalsy();
    });

    it("0.1 + 0.2", () => {
        const r = DSNumber.valueOf("0.1").plus(DSNumber.valueOf("0.2"));
        expect(r.equals(DSNumber.valueOf("0.3"))).toBeTruthy();
    })

    it("equals", () => {
        expect(DSNumber.valueOf(10).equals(10)).toBeTruthy();
        expect(DSNumber.valueOf(10).equals(DSNumber.valueOf(10))).toBeTruthy();
    })



    it("not equals", () => {
        expect(DSNumber.valueOf(65).notEquals("A")).toBeTruthy();
        expect(DSNumber.valueOf(10).notEquals(11)).toBeTruthy();
        expect(DSNumber.valueOf(10).notEquals(DSNumber.valueOf(11))).toBeTruthy();
    })


    it("toString", () => {
        expect(DSNumber.valueOf(10).toString()).toBe("10")
    })
});