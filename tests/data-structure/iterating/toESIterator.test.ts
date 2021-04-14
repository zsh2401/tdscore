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


it("double for of", () => {
    const elements = ["a", "b", "c", "d"]

    const list = new LinkedList<string>()
    list.listAddAll(elements)
    const result1 = []
    const result2 = []
    for (let e of list) {
        result1.push(e)
    }
    for (let e of list) {
        result2.push(e)
    }
    expect(result1).toStrictEqual(elements)
    expect(result2).toStrictEqual(elements)
})

