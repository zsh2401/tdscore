import BigNumber from "bignumber.js";
import "ts-jest"
import { dsHashCode, toJSArray } from "../../src";
import DSNumber from "../../src/DSNumber"
describe("DSNumber Test", () => {

    it("Use cache", () => {
        for (let i = -128; i < 128; i++) {
            
            const fromString = DSNumber.valueOf(i + "")
            const fromNumber = DSNumber.valueOf(i)
            const fromBigNumber = DSNumber.valueOf(new BigNumber(i))
            const fromDSNumber = DSNumber.valueOf(fromNumber)

            expect(fromString).toBe(fromNumber)
            expect(fromNumber).toBe(fromBigNumber)
            expect(fromBigNumber).toBe(fromDSNumber)
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


    it("value of DSNumber", () => {
        const x = DSNumber.valueOf(1000)
        expect(DSNumber.valueOf(x)).toBe(x)

        const y = DSNumber.valueOf(10)
        expect(y).toBe(DSNumber.valueOf(10))
        expect(DSNumber.valueOf(10)).toBe(y)
    })

    it("is",()=>{
        expect(DSNumber.valueOf(1).isPosivite()).toBeTruthy()
        expect(DSNumber.valueOf(-1).isPosivite()).toBeFalsy()
        expect(DSNumber.valueOf(0.1).isInteger()).toBeFalsy()
        expect(DSNumber.valueOf(1).isInteger()).toBeTruthy()
    })
    
    it("compare with other", () => {
        expect(DSNumber.valueOf(10).greaterThan(DSNumber.valueOf(9))).toBeTruthy()
        expect(DSNumber.valueOf(10).greaterThan(9)).toBeTruthy()
        expect(DSNumber.valueOf(10).greaterThan(10.1)).toBeFalsy()

        expect(DSNumber.valueOf(10).greaterThanOrEqualsTo(9)).toBeTruthy()
        expect(DSNumber.valueOf(10).greaterThanOrEqualsTo(10)).toBeTruthy()
        expect(DSNumber.valueOf(10).greaterThanOrEqualsTo(10.1)).toBeFalsy()

        expect(DSNumber.valueOf(10).lessThan(DSNumber.valueOf(11))).toBeTruthy()
        expect(DSNumber.valueOf(10).lessThan(11)).toBeTruthy()
        expect(DSNumber.valueOf(10).lessThan(9.9999)).toBeFalsy()

        expect(DSNumber.valueOf(10).lessThanOrEqualsTo(11)).toBeTruthy()
        expect(DSNumber.valueOf(10).lessThanOrEqualsTo(10)).toBeTruthy()
        expect(DSNumber.valueOf(10).lessThanOrEqualsTo(9.9)).toBeFalsy()

        expect(DSNumber.valueOf(10).equals(10)).toBeTruthy()
        expect(DSNumber.valueOf(0.99).equals(1)).toBeFalsy()
        expect(DSNumber.valueOf(10).notEquals(10)).toBeFalsy()
        expect(DSNumber.valueOf(10).notEquals(1)).toBeTruthy()
    })

    it("toBit", () => {
        const bStr = toJSArray(DSNumber.valueOf(100).toBit()).map(b => b ? 1 : 0 + "").join("")
        expect(bStr).toBe(Number(100).toString(2))
    })

    it("toString", () => {
        const n = DSNumber.valueOf(15);
        expect(n.toString(16)).toBe("f")
        expect(n.toString()).toBe("15")
        expect(n.toString(2)).toBe("1111")
        expect(n.toString(8)).toBe("17")
    })

    it("hashcode related works", () => {
        expect(DSNumber.valueOf(1).getHashCode()).toBe(1)
        expect(DSNumber.valueOf(1.1).getHashCode()).toBe(dsHashCode("1.1"))
        expect(DSNumber.valueOf("0.0001").getHashCode()).toBe(dsHashCode("0.0001"))
    })

    it("not equals", () => {
        expect(DSNumber.valueOf(65).notEquals("A")).toBeTruthy();
        expect(DSNumber.valueOf(10).notEquals(11)).toBeTruthy();
        expect(DSNumber.valueOf(10).notEquals(DSNumber.valueOf(11))).toBeTruthy();
    })
});