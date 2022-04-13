import "ts-jest"
import LinkedList from "../../src/data-structure/linear/LinkedList"
import { Chain } from "../../src"
it("basic usage", () => {
    const list = new LinkedList<number>();
    list.listAdd(1)
    list.listAdd(2)
    list.listAdd(3)
    list.listAdd(4)

    const r = new Chain(list)
        .where((e) => e > 2)
        .select((e) => e.toString())
        .asJSArray()

    expect(r).toStrictEqual(["3", "4"])
})