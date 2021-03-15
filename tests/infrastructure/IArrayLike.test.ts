import "ts-jest"
import { DSArray } from "../../src";
import IArrayLike, { clone, copyTo, toDSArray, toESArray, toJSArray } from "../../src/IArrayLike"

it("ES Array is ArrayLike", () => {
    //@ts-ignore
    const a: IArrayLike<number> = [];
})

it("DS Array is ArrayLike", () => {
    const a: IArrayLike<number> = new DSArray<number>(0);
})

it("copyTo", () => {
    //@ts-ignore
    const a: IArrayLike<number> = [10, 9, 8]

    const b = new DSArray(3);
    copyTo(a, b);
    expect(b.toJSArray()).toStrictEqual([10, 9, 8]);

    //@ts-ignore
    const c: IArrayLike<number> = [];
    copyTo(a, c);
    expect(c).toStrictEqual([10, 9, 8]);

    const d = new DSArray(1);
    copyTo(a, d, 1, 1)
    expect(d.toJSArray()).toStrictEqual([9]);

    //@ts-ignore
    const e: IArrayLike<number> = [];
    copyTo(a, e, -10, -10);
    expect(e).toStrictEqual([]);
})

it("clone", () => {
    //@ts-ignore
    const a: IArrayLike<number> = [3, 2, 1];

    expect(toJSArray(clone(a))).toStrictEqual(a);

})

it("to DSArray", () => {
    const a: IArrayLike<number> = [5, 6, 7, 8, 9]
    //@ts-ignore
    expect(toESArray(toJSArray(toDSArray(a)))).toStrictEqual(a)
})
