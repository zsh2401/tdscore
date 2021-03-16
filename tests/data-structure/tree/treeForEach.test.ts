
import "ts-jest"
import { BTreeChildrenList, ITreeNode, treeForEach, UngrowableArrayList } from "../../../src"

const treeForTraverse: ITreeNode<number> = {
    parent: null,
    data: 0,
    children: new BTreeChildrenList()
}
treeForTraverse.children?.listAdd({ data: 1, children: new BTreeChildrenList() })
treeForTraverse.children?.listAdd({ data: 2, children: new BTreeChildrenList() })
treeForTraverse.children?.listGet(0).children?.listAdd({ data: 3, children: new BTreeChildrenList() });

it("pre order", () => {
    const result: number[] = [];
    treeForEach(treeForTraverse, (d) => result.push(d), "pre-order");
    expect(result).toStrictEqual([0, 1, 3, 2]);
})

it("in-order which is only designed for BinTree", () => {
    const result: number[] = [];
    treeForEach(treeForTraverse, (d) => result.push(d), "in-order");
    expect(result).toStrictEqual([3, 1, 0, 2]);

    const notBTree: ITreeNode<number> = {
        data: 1,
        children: new UngrowableArrayList(4)
    }
    notBTree.children?.listAdd({
        data: 1,
        children: new UngrowableArrayList(4)
    })
    notBTree.children?.listAdd({
        data: 1,
        children: new UngrowableArrayList(4)
    })
    notBTree.children?.listAdd({
        data: 1,
        children: new UngrowableArrayList(4)
    })

    expect(() => {
        treeForEach(notBTree, (d) => { }, "in-order");
    }).toThrow()
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