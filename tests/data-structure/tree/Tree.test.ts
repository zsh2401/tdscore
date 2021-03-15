import { levelOrder } from "../../../src/data-structure/tree/torder";
import TreeNode from "../../../src/data-structure/tree/TreeNode"

describe("Tree Test", () => {
    it("One plus one", () => {
        expect(1 + 1).toBe(2);
    })
    // it("Level Order Iterate", () => {
    //     const root = new TreeNode(0);
    //     const a = new TreeNode(1)
    //     a.children.collectionAdd(new TreeNode(9));
    //     a.children.collectionAdd(new TreeNode(19));
    //     root.children.collectionAdd(a);
    //     root.children.collectionAdd(new TreeNode(2));
    //     root.children.collectionAdd(new TreeNode(3));
    //     const vList: number[] = [];
    //     levelOrder(root, (it) => {
    //         // console.log(it);
    //         vList[vList.length] = it
    //     });
    //     expect(vList[0]).toBe(0);
    // });

    // it("depth",()=>{
    //     /**
    //      *                   0 
    //      *                /  \  \
    //      *               1    2   3
    //      *              / \
    //      *             9  19
    //      * */
    //     const root = new TreeNode(0);
    //     const a = new TreeNode(1)
    //     a.children.collectionAdd(new TreeNode(9));
    //     a.children.collectionAdd(new TreeNode(19));
    //     root.children.collectionAdd(a);
    //     root.children.collectionAdd(new TreeNode(2));
    //     root.children.collectionAdd(new TreeNode(3));
    //     expect(root.depth).toBe(3);
    //     a.children.collectionClear();
    //     levelOrder(root, (it,l) => {
    //         console.log(`${l}| ${it}`);
    //         // vList[vList.length] = it
    //     });
    //     expect(root.depth).toBe(2);
    // })
})