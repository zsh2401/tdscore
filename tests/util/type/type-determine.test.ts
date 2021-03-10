import "ts-jest"
import DSArray from "../../../src/DSArray";
import DSObject from "../../../src/DSObject";
import { isArrayLike, isDSArray, isDSObject, isFunction, isJSArray } from "../../../src/util/type"
describe("Type determine", () => {
    it("isDSObject()", () => {
        expect(isDSObject(new DSObject())).toBeTruthy();

        class A extends DSObject { }
        expect(isDSObject(new A())).toBeTruthy();

        class B extends A { }
        expect(isDSObject(new B())).toBeTruthy();

        expect(isDSObject([])).toBeFalsy();
    })

    it("isFunction()", () => {
        expect(isFunction(() => { })).toBeTruthy();
        expect(isFunction([])).toBeFalsy();
    })

    it("isDSArray()", () => {
        expect(isDSArray(new DSArray(0))).toBeTruthy();
        expect(isDSArray([])).toBeFalsy();
    })

    it("isJSArray()", () => {
        expect(isJSArray(new DSArray(0))).toBeFalsy();
        expect(isJSArray([])).toBeTruthy();
    })

    it("isArrayLike", () => {
        expect(isArrayLike(new DSArray(0))).toBeTruthy();
        expect(isArrayLike([])).toBeTruthy();
    })
});