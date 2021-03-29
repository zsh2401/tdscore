import "ts-jest"
import { HashSet, ITreeNode, LinkedList, treeForEach, treeForEachNode, TreeNode } from "../../../src"
it("travel", () => {
    const node = new TreeNode(0)
    node.children!.listAddAll(
        [
            new TreeNode(1),
            new TreeNode(2),
            new TreeNode(3),
            new TreeNode(4),
            new TreeNode(5)
        ]
    )

    const c = new LinkedList<number>();
    treeForEach(node, (_n) => {
        c.collectionAdd(_n)
    })
    expect(c.size()).toBe(6)
    expect(c.toJSArray()).toStrictEqual([0, 1, 2, 3, 4, 5])

})