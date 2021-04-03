import "ts-jest"
import { buildBinarySearchTree, treeForEach } from "../../../src/algorithm"

it("can build", () => {
    const a: number[] = [10, 104, -45, 36, 7, 9, -165]
    const root = buildBinarySearchTree(a)
    const result: number[] = []
    treeForEach(root, (e: number) => {
        result.push(e)
    }, "in-order")
    expect(result).toStrictEqual([-165, -45, 7, 9, 10, 36, 104])
})