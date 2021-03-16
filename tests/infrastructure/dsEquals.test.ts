import { dsHashCode } from "../../src";
import dsEquals from "../../src/dsEquals"
import DSObject from "../../src/DSObject";
import { IHashCodeGettable } from "../../src/util/hash";

describe("dsEquals' test", () => {
    it("null related", () => {
        expect(dsEquals(null, null)).toBeTruthy();
        expect(dsEquals("", null)).toBeFalsy();
        expect(dsEquals(null, "null")).toBeFalsy();
        expect(dsEquals(null, undefined)).toBeFalsy();
    });

    it("undefiened related", () => {
        expect(dsEquals(undefined, undefined)).toBeTruthy();
        expect(dsEquals("", undefined)).toBeFalsy();
        expect(dsEquals(undefined, "null")).toBeFalsy();
        expect(dsEquals(undefined, null)).toBeFalsy();
    });
    it("call equals method", () => {
        let times = 0;
        class Test extends DSObject {
            equals(other: any) {
                times++;
                return other instanceof Test;
            }
        }
        expect(dsEquals(new Test(), new Test())).toBeTruthy();
        expect(dsEquals(new Test(), null)).toBeFalsy();
        expect(dsEquals(null, new Test())).toBeFalsy();
        expect(times).toBe(1);
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
        expect(dsEquals(new Test(), new Test())).toBeTruthy();
        expect(dsEquals(new Test(), new TestB())).toBeTruthy();
        expect(times).toBe(4);
    })

    it("same hashscode", () => {
        expect(dsHashCode("A") === dsHashCode(65) && dsEquals("A", 65)).toBeFalsy()
        expect(dsHashCode("a") === dsHashCode(97) && dsEquals("a", 97)).toBeFalsy()
    });
});

