import HashMap from "../../src/data-structure/map/HashMap";
import DSObject from "../../src/DSObject";
import { Vector2 } from "../../src/math"
import "ts-jest"
describe("DSObject", () => {

    it("call toString", () => {
        Object.prototype.toString.call(new DSObject());
    });

    it("default to string implements.", () => {
        class B extends DSObject { }
        let b = new B()
        expect(b.toString().endsWith("B@" + b.getHashCode())).toBeTruthy();
    });

    it("override newHashCode()", () => {
        class A extends DSObject {
            newHashCode(): number {
                return 1;
            }
        }
        expect(new A().getHashCode()).toBe(1);
    });

    it("referenceEquals() test", () => {
        class A extends DSObject {
            x: number = 0;
        }
        expect(new A().referenceEquals(new A())).toBeFalsy();
        const a = new A();
        const b = a;
        b.x = 1;
        expect(a.referenceEquals(b)).toBeTruthy();
        expect(a.referenceEquals(null)).toBeFalsy();
        expect(a.referenceEquals(undefined)).toBeFalsy();
    })

    it("equals", () => {
        class A extends DSObject { }
        const a = new A();
        expect(a.equals(a)).toBeTruthy()
    });

    it("getHashCode()'s stability", () => {
        class A extends DSObject {
            x: number = 0;
        }
        const a = new A();
        const b = a;
        expect(a.getHashCode()).toBe(b.getHashCode());
        a.x = 2401;
        expect(b.getHashCode()).toBe(a.getHashCode());
    });

    it("should get class name", () => {
        class A {
        }
        let a = new A();
        expect(a.constructor.name).toBe("A");
    });

    it("get get hashmap classname", () => {
        expect(new HashMap<string, number>().getClassName()).toBe("HashMap");
    })

    it("isDSObject", () => {
        expect(DSObject.isDSObject(new Vector2(0, 0))).toBeTruthy()
    })
});