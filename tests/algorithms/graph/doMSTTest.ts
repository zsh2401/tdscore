import "ts-jest"
import { forEach, IGraph, SetGraph, size } from "../../../src";
import { MSTreeNode, prim, treeForEach } from "../../../src/algorithm";
import toJSArray from "../../../src/data-structure/iterating/toJSArrayForItertable";
export default function (f: <E>(g: IGraph<E>, start: E) => MSTreeNode<E>) {
    it("contains all linked element", () => {
        const g = new SetGraph<number>()
        const addDBEdge = (from: number, to: number, weight: number) => {
            g.addVertix(from)
            g.addVertix(to)
            g.addEdge(from, to, weight)
            g.addEdge(to, from, weight)
        }


        addDBEdge(1, 3, 9)
        addDBEdge(1, 4, 8)
        addDBEdge(1, 6, 60)
        addDBEdge(6, 2, 3)
        addDBEdge(2, 5, 50)
        addDBEdge(2, 4, 13)
        addDBEdge(4, 5, 2)
        addDBEdge(9, 10, 0)

        const tree = prim(g, 1)
        const nodes: number[] = []

        treeForEach(tree, (n) => nodes.push(n.data))

        expect(nodes.length).toBe(size(g.vertices) - 2)//There're two island
        expect(nodes.includes(1)).toBeTruthy()
        expect(nodes.includes(2)).toBeTruthy()
        expect(nodes.includes(3)).toBeTruthy()
        expect(nodes.includes(4)).toBeTruthy()
        expect(nodes.includes(5)).toBeTruthy()
        expect(nodes.includes(6)).toBeTruthy()
        expect(nodes.includes(9)).toBeFalsy()
        expect(nodes.includes(10)).toBeFalsy()
    })

    it("smallest cost", () => {
        const g = new SetGraph<number>()
        const addDBEdge = (from: number, to: number, weight: number) => {
            g.addVertix(from)
            g.addVertix(to)
            g.addEdge(from, to, weight)
            g.addEdge(to, from, weight)
        }
        addDBEdge(1, 3, 9)
        addDBEdge(1, 4, 8)
        addDBEdge(1, 6, 60)
        addDBEdge(6, 2, 3)
        addDBEdge(2, 5, 50)
        addDBEdge(4, 2, 13)
        addDBEdge(4, 5, 2)
        const outOf4 = g.outOf(4)
        expect(size(outOf4)).toBe(3)
        const tree = prim(g, 1)
        let cost = 0
        treeForEach(tree, (n) => {
            // console.log(n.cost)
            cost += n.cost
        })
        expect(cost).toBe(9 + 8 + 2 + 13 + 3)
    })
}