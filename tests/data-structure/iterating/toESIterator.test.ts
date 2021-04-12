import { LinkedList } from "../../../src";

it("for of", () => {
    const elements = ["a", "b", "c", "d"]

    const list = new LinkedList<string>()
    list.listAddAll(elements)
    const result = []
    for (let e of list) {
        result.push(e)
    }
    expect(result).toStrictEqual(elements)
})

