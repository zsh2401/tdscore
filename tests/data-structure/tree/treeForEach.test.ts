
import "ts-jest"
import { BTreeNode, ITreeNode, LinkedList, treeForEach, TreeNode, UngrowableArrayList } from "../../../src"

const treeForTraverse: ITreeNode<number> = {
    parent: null,
    data: 0,
    children: new LinkedList()
}
treeForTraverse.children.listAdd({ parent: null, data: 1, children: new LinkedList() })
treeForTraverse.children.listAdd({ parent: null, data: 2, children: new LinkedList() })
treeForTraverse.children.listGet(0).children?.listAdd({ parent: null, data: 3, children: new LinkedList() });

it("pre order", () => {
    const result: number[] = [];
    treeForEach(treeForTraverse, (d) => result.push(d), "pre-order");
    expect(result).toStrictEqual([0, 1, 3, 2]);
})

it("in-order with binary tree", () => {
    const result: number[] = [];
    const tree = new BTreeNode(0)
    tree.left = new BTreeNode(1)
    tree.right = new BTreeNode(2)
    tree.left.right = new BTreeNode(3)
    treeForEach(treeForTraverse, (d) => result.push(d), "in-order");
    expect(result).not.toStrictEqual([3, 1, 0, 2]);
})

it("in-order with non-binary tree", () => {
    let result: number[] = [];
    treeForEach(treeForTraverse, (d) => result.push(d), "in-order");
    expect(result).not.toStrictEqual([3, 1, 0, 2]);

    const notBTree: ITreeNode<number> = {
        parent: null,
        data: 1,
        children: new UngrowableArrayList(4)
    }
    notBTree.children?.listAdd({
        parent: notBTree,
        data: 1,
        children: new UngrowableArrayList(4)
    })
    notBTree.children?.listAdd({
        parent: notBTree,
        data: 1,
        children: new UngrowableArrayList(4)
    })
    notBTree.children?.listAdd({
        parent: notBTree,
        data: 1,
        children: new UngrowableArrayList(4)
    })

    expect(() => {
        treeForEach(notBTree, (d) => { }, "in-order");
    }).not.toThrow()
})

it("post order", () => {
    const result: number[] = [];
    treeForEach(treeForTraverse, (d) => { result.push(d) }, "post-order");
    expect(result).toStrictEqual([3, 1, 2, 0]);
})

it("will be aborted when consumer throws error", () => {
    expect(() => {
        treeForEach(treeForTraverse, (d) => { throw "Error" }, "post-order");
    }).toThrow("Error");
})