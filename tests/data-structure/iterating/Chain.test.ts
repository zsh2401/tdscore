import { Chain, IList, last, LinkedList, range } from "../../../src";
import toJSArray from "../../../src/data-structure/iterating/toJSArrayForItertable";

it("append", () => {
    expect(new Chain([1, 2])
        .appendAll([3, 4])
        .asJSArray())
        .toStrictEqual([1, 2, 3, 4])
})

it("classic usage", () => {

    const iterable = new Chain([100, 9, 11])
        .where(n => n > 10) // [100, 11]
        .append(22) // [100, 11, 22]
        .sort((a, b) => a - b) // [11, 22, 100]
        .select(n => Number(n).toString()) //[ "11", "22" ,"100"]

    expect(toJSArray(iterable))
        .toStrictEqual(["11", "22", "100"])
})

it("Non recursive fibonacci", () => {

    const getFibonacciSequence = (count: number): IList<number> => {

        const numbers = new LinkedList<number>()
        new Chain(range(0, count - 1))
            .forEach((k) => {
                const r = k <= 1 ? 1 : numbers.listGet(k - 2) + numbers.listGet(k - 1);
                numbers.listAdd(r)
            })

        numbers.listInsert(0, 0)
        return numbers;
    }

    const seq = getFibonacciSequence(50)
    expect(seq.listGet(0)).toBe(0)
    expect(seq.listGet(1)).toBe(1)
    expect(seq.listGet(50)).toBe(12586269025)

})