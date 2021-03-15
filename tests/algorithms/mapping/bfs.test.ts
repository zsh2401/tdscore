import IUniGraph from "../../../src/data-structure/graph/IUniGraph"
import bfs from "../../../src/data-structure/graph/bfs"
import Graph from '../../../src/data-structure/graph/Graph'
import { IList, LinkedList } from "../../../src";
import Edge from "../../../src/data-structure/graph/Edge";
describe("BFS", () => {

    it("No edges", () => {
        const g: IUniGraph<number> = new Graph();
        for (let i = 0; i < 1000; i++) {
            g.vertices.collectionAdd(i);
        }
        const viewed: IList<number> = new LinkedList<number>();
        bfs(g, (node) => viewed.collectionAdd(node));
        expect(viewed.size()).toBe(1);
    })

    it("Won't back", () => {
        const g: IUniGraph<string> = new Graph();
        g.vertices.collectionAdd("A");
        g.vertices.collectionAdd("B");
        g.edges.collectionAdd(new Edge("B", "A"));
        const viewed: IList<string> = new LinkedList<string>();
        bfs(g, (node) => viewed.collectionAdd(node), "A");
        expect(viewed.size()).toBe(1);
        expect(viewed.contains("B")).toBeFalsy();
        expect(viewed.contains("A")).toBeTruthy();
    })

    it("IS BFS", () => {
        type T = string;
        const graph: IUniGraph<T, Edge<T>> = new Graph();
        graph.vertices.collectionAdd("A");
        graph.vertices.collectionAdd("B");
        graph.vertices.collectionAdd("C");
        graph.edges.collectionAdd(new Edge("A", "B"));
        graph.edges.collectionAdd(new Edge("A", "C"));

        const viewed: IList<T> = new LinkedList<T>();
        bfs(graph, (node) => viewed.collectionAdd(node), "A");
        expect(viewed.size()).toBe(3);
        expect(viewed.listGet(0)).toBe("A")
        expect(viewed.contains("B")).toBeTruthy()
        expect(viewed.contains("C")).toBeTruthy()
    })

    it("Work correctly", () => {
        type T = string;
        const graph: IUniGraph<T> = new Graph<T>();
        graph.vertices.collectionAdd("A");
        graph.vertices.collectionAdd("B");
        graph.edges.collectionAdd(new Edge("A", "B"));

        const viewed: IList<T> = new LinkedList<T>();
        bfs(graph, (node) => viewed.collectionAdd(node), "A");
        expect(viewed.size()).toBe(2);
        expect(viewed.contains("A")).toBeTruthy()
        expect(viewed.contains("B")).toBeTruthy()
    });

    it("No cycle and repeat", () => {
        type T = string;
        const graph: IUniGraph<T> = new Graph<T>();
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
        bfs(graph, (node) => viewed.collectionAdd(node), "A");
        expect(viewed.size()).toBe(3);
        expect(viewed.contains("A")).toBeTruthy()
        expect(viewed.contains("B")).toBeTruthy()
        expect(viewed.contains("C")).toBeTruthy()
    })
});