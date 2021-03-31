import "ts-jest"
import { BTreeNode, IBTreeNode, toJSArrayForItertable, treeAsIterable } from "../../src"
import { blanceFactorOf, avlInsert, createAvlInserter, avlRotateRight, avlRotateLeft, avlDelete } from "../../src/algorithm/tree/avltree"
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

it("insert", () => {
    let tree: IBTreeNode<number> = new BTreeNode(10)
    tree = avlInsert(tree, 11, (a, b) => {
        return a - b
    })
    tree = avlInsert(tree, 9, (a, b) => {
        return a - b
    })
    tree = avlInsert(tree, 12, (a, b) => {
        return a - b
    })
    tree = avlInsert(tree, 13, (a, b) => {
        return a - b
    })
    tree = avlInsert(tree, 14, (a, b) => {
        return a - b
    })
    expect(toJSArrayForItertable(treeAsIterable(tree, "in-order")))
        .toStrictEqual([9, 10, 11, 12, 13, 14])
    const bf = blanceFactorOf(tree)
    expect(bf >= -1 && bf <= 1).toBeTruthy()
})

it("delete the only one element of tree", () => {
    let tree: IBTreeNode<number> = new BTreeNode(10)

    const r = avlDelete(tree, 10, (a, b) => {
        return a - b
    })
    expect(r).toBeNull()
})

it("delete the element which had one right child", () => {
    let tree: IBTreeNode<number> = new BTreeNode(10)
    tree = avlInsert(tree, 11, (a, b) => {
        return a - b
    })
    tree = avlInsert(tree, 9, (a, b) => {
        return a - b
    })
    tree = avlInsert(tree, 12, (a, b) => {
        return a - b
    })
    tree = avlInsert(tree, 13, (a, b) => {
        return a - b
    })
    tree = avlInsert(tree, 14, (a, b) => {
        return a - b
    })
    let result = avlDelete(tree, 13, (a, b) => {
        return a - b
    })
    expect(result).not.toBeNull()
    const bf = blanceFactorOf(result)
    expect(bf >= -1 && bf <= 1).toBeTruthy()
    expect(toJSArrayForItertable(treeAsIterable(result, "in-order")))
        .toStrictEqual([9, 10, 11, 12, 14])
})

it("delete the element which had one left child", () => {
    let tree: IBTreeNode<number> = new BTreeNode(10)
    const insert = createAvlInserter(tree, (a: number, b: number) => {
        return a - b
    });
    tree = insert(12) //Right
    tree = insert(9) //Keep balance
    tree = insert(11) //Right -> Left
    expect(toJSArrayForItertable(treeAsIterable(tree, "in-order")))
        .toStrictEqual([9, 10, 11, 12])

    let deletedTree = avlDelete(tree, 12, (a, b) => {
        return a - b
    })
    expect(deletedTree).not.toBeNull()
    const bf = blanceFactorOf(deletedTree)
    expect(bf >= -1 && bf <= 1).toBeTruthy()
    expect(toJSArrayForItertable(treeAsIterable(deletedTree, "in-order")))
        .toStrictEqual([9, 10, 11])
})
it("delete the element which had one right child", () => {
    let tree: IBTreeNode<number> = new BTreeNode(10)
    const insert = createAvlInserter(tree, (a: number, b: number) => {
        return a - b
    });
    tree = insert(9) //Left Keep balance
    tree = insert(11) //Right
    tree = insert(12) //Right -> Right
    expect(toJSArrayForItertable(treeAsIterable(tree, "in-order")))
        .toStrictEqual([9, 10, 11, 12])

    let deletedTree = avlDelete(tree, 11, (a, b) => {
        return a - b
    })
    expect(deletedTree).not.toBeNull()
    const bf = blanceFactorOf(deletedTree)
    expect(bf >= -1 && bf <= 1).toBeTruthy()
    expect(toJSArrayForItertable(treeAsIterable(deletedTree, "in-order")))
        .toStrictEqual([9, 10, 12])
})

it("delete with double child (bf: 0)", () => {
    let tree: IBTreeNode<number> = new BTreeNode(10)
    const insert = createAvlInserter(tree, (a: number, b: number) => {
        return a - b
    });
    tree = insert(9)
    tree = insert(11)
    expect(toJSArrayForItertable(treeAsIterable(tree, "in-order")))
        .toStrictEqual([9, 10, 11])

    const r = avlDelete(tree, 10, (a: number, b: number) => {
        return a - b
    })

    expect(r).not.toBeNull()
    expect(blanceFactorOf(r)).toBeLessThanOrEqual(1)
    expect(blanceFactorOf(r)).toBeGreaterThanOrEqual(-1)
    expect(toJSArrayForItertable(treeAsIterable(r, "in-order")))
        .toStrictEqual([9, 11])
})

it("delete with double child (bf: 1)", () => {
    let tree: IBTreeNode<number> = new BTreeNode(10)
    const insert = createAvlInserter(tree, (a: number, b: number) => {
        return a - b
    });
    tree = insert(8) //left
    tree = insert(11) //right, keep balance
    tree = insert(9) //left->right
    expect(blanceFactorOf(tree)).toBe(1)
    expect(toJSArrayForItertable(treeAsIterable(tree, "in-order")))
        .toStrictEqual([8, 9, 10, 11])

    const r = avlDelete(tree, 10, (a: number, b: number) => {
        return a - b
    })

    expect(r).not.toBeNull()
    expect(blanceFactorOf(r)).toBeLessThanOrEqual(1)
    expect(blanceFactorOf(r)).toBeGreaterThanOrEqual(-1)
    expect(toJSArrayForItertable(treeAsIterable(r, "in-order")))
        .toStrictEqual([8, 9, 11])
})

it("delete with double child (bf: -1)", () => {
    let tree: IBTreeNode<number> = new BTreeNode(10)
    const insert = createAvlInserter(tree, (a: number, b: number) => {
        return a - b
    });
    tree = insert(8) //left, keep balance
    tree = insert(12) //right
    tree = insert(11) //left->right
    expect(blanceFactorOf(tree)).toBe(-1)
    expect(tree.data).toBe(10)
    expect(toJSArrayForItertable(treeAsIterable(tree, "in-order")))
        .toStrictEqual([8, 10, 11, 12])

    const r = avlDelete(tree, 10, (a: number, b: number) => {
        return a - b
    })

    expect(r).not.toBeNull()
    expect(blanceFactorOf(r)).toBeLessThanOrEqual(1)
    expect(blanceFactorOf(r)).toBeGreaterThanOrEqual(-1)
    expect(toJSArrayForItertable(treeAsIterable(r, "in-order")))
        .toStrictEqual([8, 11, 12])
})
