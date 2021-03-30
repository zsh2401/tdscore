import "ts-jest"
import { BTreeNode, IBTreeNode, toJSArrayForItertable, treeAsIterable } from "../../src"
import { blanceFactorOf, avlInsert, avlRotateRight, avlRotateLeft } from "../../src/algorithm/avl"
it("blance factor to be zero", () => {
    expect(blanceFactorOf(null)).toBe(0)
    expect(blanceFactorOf(void 0)).toBe(0)
    const tree = new BTreeNode(0)
    tree.left = new BTreeNode(1)
    tree.right = new BTreeNode(2)
    expect(blanceFactorOf(tree)).toBe(0)
    tree.left.right = new BTreeNode(1)
    expect(blanceFactorOf(tree)).toBe(1)

    tree.left.right.left = new BTreeNode(10)
    expect(blanceFactorOf(tree)).toBe(2)
})
it("normal value", () => {
    const tree = new BTreeNode(0)
    tree.left = new BTreeNode(1)
    tree.right = new BTreeNode(2)
    tree.left.right = new BTreeNode(1)

    expect(blanceFactorOf(tree)).toBe(1)

    tree.left.right.left = new BTreeNode(10)
    expect(blanceFactorOf(tree)).toBe(2)

    tree.right.right = new BTreeNode(12)
    tree.right.right.right = new BTreeNode(13)
    tree.right.right.right.right = new BTreeNode(1231)
    expect(blanceFactorOf(tree)).toBe(-1)
})
it("rotate left", () => {
    let tree: IBTreeNode<number> = new BTreeNode(66)
    tree.left = new BTreeNode(60)
    tree.right = new BTreeNode(77)
    tree.right.left = new BTreeNode(75)
    tree.right.right = new BTreeNode(88)
    tree.right.right.right = new BTreeNode(99)

    expect(toJSArrayForItertable(treeAsIterable(tree, "in-order")))
        .toStrictEqual([60, 66, 75, 77, 88, 99])
    expect(blanceFactorOf(tree)).toBe(-2)


    tree = avlRotateLeft(tree)
    expect(blanceFactorOf(tree)).toBe(0)
    expect(toJSArrayForItertable(treeAsIterable(tree, "in-order")))
        .toStrictEqual([60, 66, 75, 77, 88, 99])
})

it("rotate right", () => {
    let tree: IBTreeNode<number> = new BTreeNode(66)
    tree.left = new BTreeNode(60)
    tree.right = new BTreeNode(77)
    tree.left.left = new BTreeNode(55)
    tree.left.right = new BTreeNode(65)
    tree.left.left.left = new BTreeNode(43)

    expect(toJSArrayForItertable(treeAsIterable(tree, "in-order")))
        .toStrictEqual([43, 55, 60, 65, 66, 77])
    expect(blanceFactorOf(tree)).toBe(2)

    tree = avlRotateRight(tree)
    expect(blanceFactorOf(tree)).toBe(0)
    expect(toJSArrayForItertable(treeAsIterable(tree, "in-order")))
        .toStrictEqual([43, 55, 60, 65, 66, 77])
})

// it("insert", () => {
//     let tree: IBTreeNode<number> = new BTreeNode(10)
//     tree = avlInsert(tree, 11, (a, b) => {
//         return a - b
//     })
//     tree = avlInsert(tree, 9, (a, b) => {
//         return a - b
//     })
//     tree = avlInsert(tree, 12, (a, b) => {
//         return a - b
//     })
//     tree = avlInsert(tree, 13, (a, b) => {
//         return a - b
//     })
//     tree = avlInsert(tree, 14, (a, b) => {
//         return a - b
//     })
//     expect(toJSArrayForItertable(treeAsIterable(tree, "in-order")))
//         .toStrictEqual([9, 10, 11, 12, 13, 14])
//     const bf = blanceFactorOf(tree)
//     console.log(bf)
//     expect(bf >= -1 && bf <= 1).toBeTruthy()
// })