import "ts-jest"
import { } from "../../../src/data-structure/graph"
import { bfs, toGraphNode } from "../../../src/algorithm/graph"

import IGraph from "../../../src/data-structure/graph/IGraph"
import SetGraph from '../../../src/data-structure/graph/SetGraph'
import { IList, LinkedList } from "../../../src";
import Edge from "../../../src/data-structure/graph/SimpleEdge";
describe("BFS", () => {

    it("No edges", () => {
        const g = new SetGraph<number>();
        for (let i = 0; i < 1000; i++) {
            g.addVertix(i)
        }
        const viewed: IList<number> = new LinkedList<number>();
        bfs<number>(g, (node) => viewed.collectionAdd(node));
        expect(viewed.size()).toBe(1);
    })

    it("Won't back", () => {
        const g = new SetGraph<string>();
        g.addVertix("A");
        g.addVertix("B");
        g.addEdge("B", "A");
        const viewed: IList<string> = new LinkedList<string>();
        bfs<string>(g, (node) => viewed.collectionAdd(node));
        expect(viewed.size()).toBe(1);
        expect(viewed.contains("B")).toBeFalsy();
        expect(viewed.contains("A")).toBeTruthy();
    })

    it("IS BFS", () => {
        type T = string;
        const graph = new SetGraph<T>();
        graph.addVertix("A");
        graph.addVertix("B");
        graph.addVertix("C");
        graph.addEdge("A", "B");
        graph.addEdge("A", "C");

        const viewed: IList<T> = new LinkedList<T>();
        bfs<T>(graph, (node) => viewed.collectionAdd(node));
        expect(viewed.size()).toBe(3);
        expect(viewed.listGet(0)).toBe("A")
        expect(viewed.contains("B")).toBeTruthy()
        expect(viewed.contains("C")).toBeTruthy()
    })

    it("Work correctly", () => {
        type T = string;
        const graph = new SetGraph<T>();
        graph.addVertix("A");
        graph.addVertix("B");
        graph.addEdge("A", "B");

        const viewed: IList<T> = new LinkedList<T>();
        bfs(graph, (node) => viewed.collectionAdd(node));
        expect(viewed.size()).toBe(2);
        expect(viewed.contains("A")).toBeTruthy()
        expect(viewed.contains("B")).toBeTruthy()
    });

    it("No cycle and repeat", () => {
        type T = string;
        const graph= new SetGraph<T>();
        graph.addVertix("A");
        graph.addVertix("B");
        graph.addVertix("C");
        graph.addEdge("A", "B");
        graph.addEdge("B", "A");
        graph.addEdge("B", "C");
        graph.addEdge("C", "B");
        graph.addEdge("C", "A");
        graph.addEdge("A", "C");

        const viewed: IList<T> = new LinkedList<T>();
        bfs(graph, (node) => viewed.collectionAdd(node));
        expect(viewed.size()).toBe(3);
        expect(viewed.contains("A")).toBeTruthy()
        expect(viewed.contains("B")).toBeTruthy()
        expect(viewed.contains("C")).toBeTruthy()
    })
});