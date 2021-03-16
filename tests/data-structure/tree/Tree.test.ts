import "ts-jest"
import { ArrayList, BTreeChildrenList, depthOf, ITreeNode, treeForEach, UngrowableArrayList } from "../../../src"
import ITree from "../../../src/data-structure/tree/ITree"

const treeForTraverse: ITreeNode<number> = {
    parent: null,
    data: 0,
    children: new BTreeChildrenList()
}
treeForTraverse.children?.listAdd({ data: 1, children: new BTreeChildrenList() })
treeForTraverse.children?.listAdd({ data: 2, children: new BTreeChildrenList() })
treeForTraverse.children?.listGet(0).children?.listAdd({ data: 3, children: new BTreeChildrenList() });


//TODO waiting to add more tests

it("depth", () => {
    const tree: ITree<number> = {
        root: {
            parent: null,
            data: 10,
            children: new ArrayList()
        }
    }
    const a: ITreeNode<number> = {
        data: 20,
        parent: tree.root,
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
    tree.root!.children?.listAdd(a);
    a.children?.listAdd(b)
    b.children?.listAdd(c)
    c.children?.listAdd(d)

    expect(depthOf(tree)).toBe(5)
    expect(depthOf({ root: null })).toBe(0)
    expect(depthOf(null)).toBe(0)
})