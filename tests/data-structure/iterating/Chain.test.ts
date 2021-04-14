import { Chain } from "../../../src";



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