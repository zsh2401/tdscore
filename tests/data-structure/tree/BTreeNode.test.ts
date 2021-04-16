import "ts-jest"
import { BiTreeNode } from "../../../src"
it("set the left & right child", () => {
    const tNode = new BiTreeNode(0)
    tNode.left = new BiTreeNode(1)
    tNode.right = new BiTreeNode(2)
    expect(tNode.left.data).toBe(1)
    expect(tNode.right.data).toBe(2)
    expect(tNode.children.contains(tNode.left)).toBeTruthy()
    expect(tNode.children.contains(tNode.right)).toBeTruthy()
})
it("delete left child", () => {
    const tNode = new BiTreeNode(0)
    tNode.left = new BiTreeNode(1)
    tNode.right = new BiTreeNode(2)

    tNode.left = null
    expect(tNode.left).toBeNull()
    expect(tNode.right).not.toBeNull()
    expect(tNode.children.size()).toBe(1)
    expect(tNode.children.collectionContains(tNode.right)).toBeTruthy()
})