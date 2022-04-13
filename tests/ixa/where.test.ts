import "ts-jest"
import { append, size } from "../../src"
import toJSArray from "../../src/ixa/toJSArrayForItertable"
import where from "../../src/ixa/where"

it("greater than", () => {
    const i = where([1, 2, 3, 4], (n) => n > 2)
    expect(size(i)).toBe(2)
    expect(toJSArray(i)).toStrictEqual([3, 4])
})

it("Won't change current if call hasNext", () => {
    const iterable = where([1, 2], () => true);
    const iterator = iterable.getIterator();
    expect(iterator.hasNext()).toBeTruthy();
    expect(() => iterator.current()).toThrow();

    expect(iterator.next()).toBe(1)
    expect(iterator.hasNext()).toBeTruthy();
    expect(iterator.current()).toBe(1);
    expect(iterator.next()).toBe(2);

})
it("skip mid", () => {
    const i = where([1, 2, "", "", "", 4, 5], (n) => typeof n === "number")
    expect(toJSArray(i)).toStrictEqual([1, 2, 4, 5])
})

it("has next", () => {
    const i = where([1, 2], () => true).getIterator()
    expect(i.hasNext()).toBeTruthy()
    expect(i.hasNext()).toBeTruthy()
    expect(i.hasNext()).toBeTruthy()
})
it("use with append", () => {
    const i = append(where([1, 2, 3], n => n > 1), [4, 5, 6])
    expect(toJSArray(i)).toStrictEqual([2, 3, 4, 5, 6])
})