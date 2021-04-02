import { dsHashCode, DSNumber } from "../../src";
import equals from "../../src/equals"
import DSObject from "../../src/DSObject";
import { IHashCodeGettable } from "../../src/util/hash";

describe("dsEquals' test", () => {
    it("null related", () => {
        expect(equals(null, null)).toBeTruthy();
        expect(equals("", null)).toBeFalsy();
        expect(equals(null, "null")).toBeFalsy();
        expect(equals(null, undefined)).toBeFalsy();
        expect(equals(undefined, null)).toBeFalsy();
    });

    it("Does a DSObject equals to other?", () => {
        const a = new DSObject();
        expect(equals(a, 1)).toBeFalsy()
        expect(equals(1, a)).toBeFalsy()

        class CustomEquals extends DSObject {
            equals(other: any) {
                return other === 1;
            }
        }
        expect(equals(1, new CustomEquals())).toBeTruthy()
        expect(equals(new CustomEquals(), 1)).toBeTruthy()
    })

    it("abs", () => {
        expect(DSNumber.valueOf(-1).abs().equals(1)).toBeTruthy()
    })
    it("undefiened related", () => {
        expect(equals(undefined, undefined)).toBeTruthy();
        expect(equals("", undefined)).toBeFalsy();
        expect(equals(undefined, "null")).toBeFalsy();
        expect(equals(undefined, null)).toBeFalsy();
    });
    it("call equals method", () => {
        let times = 0;
        class Test extends DSObject {
            equals(other: any) {
                times++;
                return other instanceof Test;
            }
        }
        expect(equals(new Test(), new Test())).toBeTruthy();
        expect(equals(new Test(), null)).toBeFalsy();
        expect(equals(null, new Test())).toBeFalsy();
        expect(times).toBe(3);
    });

    it("call hash code method", () => {
        let times = 0;
        class Test implements IHashCodeGettable {
            getHashCode() {
                times++;
                return 0;
            }
        }
        class TestB implements IHashCodeGettable {
            getHashCode() {
                times++;
                return 0;
            }
        }
        expect(equals(new Test(), new Test())).toBeTruthy();
        expect(equals(new Test(), new TestB())).toBeTruthy();
        expect(times).toBe(4);
    })

    it("same hashscode", () => {
        expect(dsHashCode("A") === dsHashCode(65) && equals("A", 65)).toBeFalsy()
        expect(dsHashCode("a") === dsHashCode(97) && equals("a", 97)).toBeFalsy()
    });
});

