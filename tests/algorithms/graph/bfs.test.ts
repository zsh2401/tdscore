import "ts-jest"
import { } from "../../../src/data-structure/graph"
import { bfs, toGraphNode } from "../../../src/algorithm/graph"

import IGraph from "../../../src/data-structure/graph/IGraph"
import SimpleGraph from '../../../src/data-structure/graph/SimpleGraph'
import { IList, LinkedList } from "../../../src";
import Edge from "../../../src/data-structure/graph/SimpleEdge";
describe("BFS", () => {

    it("No edges", () => {
        const g: IGraph<number> = new SimpleGraph();
        for (let i = 0; i < 1000; i++) {
            g.vertices.collectionAdd(i);
        }
        const viewed: IList<number> = new LinkedList<number>();
        bfs<number>(toGraphNode(g).getIterator().next(), (node) => viewed.collectionAdd(node));
        expect(viewed.size()).toBe(1);
    })

    it("Won't back", () => {
        const g: IGraph<string> = new SimpleGraph();
        g.vertices.collectionAdd("A");
        g.vertices.collectionAdd("B");
        g.edges.collectionAdd(new Edge("B", "A"));
        const viewed: IList<string> = new LinkedList<string>();
        bfs<string>(toGraphNode(g).getIterator().next(), (node) => viewed.collectionAdd(node));
        expect(viewed.size()).toBe(1);
        expect(viewed.contains("B")).toBeFalsy();
        expect(viewed.contains("A")).toBeTruthy();
    })

    it("IS BFS", () => {
        type T = string;
        const graph: IGraph<T, Edge<T>> = new SimpleGraph();
        graph.vertices.collectionAdd("A");
        graph.vertices.collectionAdd("B");
        graph.vertices.collectionAdd("C");
        graph.edges.collectionAdd(new Edge("A", "B"));
        graph.edges.collectionAdd(new Edge("A", "C"));

        const viewed: IList<T> = new LinkedList<T>();
        bfs(toGraphNode(graph).getIterator().next(), (node) => viewed.collectionAdd(node));
        expect(viewed.size()).toBe(3);
        expect(viewed.listGet(0)).toBe("A")
        expect(viewed.contains("B")).toBeTruthy()
        expect(viewed.contains("C")).toBeTruthy()
    })

    it("Work correctly", () => {
        type T = string;
        const graph: IGraph<T> = new SimpleGraph<T>();
        graph.vertices.collectionAdd("A");
        graph.vertices.collectionAdd("B");
        graph.edges.collectionAdd(new Edge("A", "B"));

        const viewed: IList<T> = new LinkedList<T>();
        bfs(toGraphNode(graph).getIterator().next(), (node) => viewed.collectionAdd(node));
        expect(viewed.size()).toBe(2);
        expect(viewed.contains("A")).toBeTruthy()
        expect(viewed.contains("B")).toBeTruthy()
    });

    it("No cycle and repeat", () => {
        type T = string;
        const graph: IGraph<T> = new SimpleGraph<T>();
        graph.vertices.collectionAdd("A");
        graph.vertices.collectionAdd("B");
        graph.vertices.collectionAdd("C");
        graph.edges.collectionAdd(new Edge("A", "B"));
        graph.edges.collectionAdd(new Edge("B", "A"));
        graph.edges.collectionAdd(new Edge("B", "C"));
        graph.edges.collectionAdd(new Edge("C", "B"));
        graph.edges.collectionAdd(new Edge("C", "A"));
        graph.edges.collectionAdd(new Edge("A", "C"));

        const viewed: IList<T> = new LinkedList<T>();
        bfs(toGraphNode(graph).getIterator().next(), (node) => viewed.collectionAdd(node));
        expect(viewed.size()).toBe(3);
        expect(viewed.contains("A")).toBeTruthy()
        expect(viewed.contains("B")).toBeTruthy()
        expect(viewed.contains("C")).toBeTruthy()
    })
});