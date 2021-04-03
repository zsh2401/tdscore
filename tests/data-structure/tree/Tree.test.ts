import "ts-jest"
import { ArrayList, ITreeNode, TreeNode } from "../../../src"
import { depthOf } from "../../../src/algorithm"
import ITree from "../../../src/data-structure/tree/Tree"
//TODO waiting to add more tests

it("depth", () => {
    const tree: ITree<number> = new TreeNode(10)
    const a: ITreeNode<number> = {
        data: 20,
        parent: tree,
        children: new ArrayList()
    }
    const b: ITreeNode<number> = {
        data: 20,
        parent: a,
        children: new ArrayList()
    }
    const c: ITreeNode<number> = {
        data: 20,
        parent: b,
        children: new ArrayList()
    }
    const d: ITreeNode<number> = {
        data: 20,
        parent: c,
        children: new ArrayList()
    }
    tree.children?.listAdd(a);
    a.children?.listAdd(b)
    b.children?.listAdd(c)
    c.children?.listAdd(d)

    expect(depthOf(tree)).toBe(5)
    expect(depthOf({ root: null })).toBe(0)
    expect(depthOf(null)).toBe(0)
})