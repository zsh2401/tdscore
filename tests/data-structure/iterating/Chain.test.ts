import { Chain, last, LinkedList, range } from "../../../src";



it("append", () => {
    expect(new Chain([1, 2])
        .appendAll([3, 4])
        .asJSArray())
        .toStrictEqual([1, 2, 3, 4])
})
it("full use", () => {
    expect(new Chain([100, 9, 11])
        .where(n => n > 10)
        .append(22)
        .sort((a, b) => a - b)
        .select(n => Number(n).toString())
        .asJSArray())
        .toStrictEqual(["11", "22", "100"])
})

it("Non recursive fibonacci", () => {
    //TODO
    // const f = (n: number): number => {
    //     const numbers = new LinkedList<number>()
    //     new Chain(range(0, n))
    //         .asLinkedList()
    //         .forEach((k) => {
    //             const r = k <= 1 ? 1 : numbers.listGet(k - 2) + numbers.listGet(k - 1);
    //             numbers.listAdd(r)
    //         })
    //     // numbers.listInsert(0, 0)
    //     return last(numbers)
    // }
    // expect(f(0)).toBe(1)
    // expect(f(1)).toBe(1)
    // expect(f(2)).toBe(1)
    // expect(f(50)).toBe(7778742049)
    // expect(numbers.l)
})