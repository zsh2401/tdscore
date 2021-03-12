import IUniGraph from "../../src/data-structure/graph/IUniGraph"
import bfs from "../../src/data-structure/graph/bfs"
import MartixGraph from '../../src/data-structure/graph/MartixGraph'
import { IList, LinkedList, toList } from "../../src";
describe("BFS", () => {

    it("No edges", () => {
        const g: IUniGraph<number> = new MartixGraph();
        for (let i = 0; i < 1000; i++) {
            g.vertices.collectionAdd(i);
        }
        const viewed: IList<number> = new LinkedList<number>();
        bfs(g, (node) => viewed.collectionAdd(node));
        expect(viewed.size()).toBe(1);
    })

    it("Work correctly", () => {
        type T = string;
        const graph: IUniGraph<T> = new MartixGraph<T>();
        graph.vertices.collectionAdd("A");
        graph.vertices.collectionAdd("B");
        graph.edges.collectionAdd({
            from: "A",
            to: "B"
        });

        const viewed: IList<T> = new LinkedList<T>();
        bfs(graph, (node) => viewed.collectionAdd(node), "A");
        expect(viewed.size()).toBe(2);
        expect(viewed.contains("A")).toBeTruthy()
        expect(viewed.contains("B")).toBeTruthy()
    });

    it("No cycle and repeat", () => {
        type T = string;
        const graph: IUniGraph<T> = new MartixGraph<T>();
        graph.vertices.collectionAdd("A");
        graph.vertices.collectionAdd("B");
        graph.vertices.collectionAdd("C");
        graph.edges.collectionAdd({
            from: "A",
            to: "B"
        });
        graph.edges.collectionAdd({
            from: "B",
            to: "A"
        });

        graph.edges.collectionAdd({
            from: "B",
            to: "C"
        });
        graph.edges.collectionAdd({
            from: "C",
            to: "B"
        });

        graph.edges.collectionAdd({
            from: "C",
            to: "A"
        });
        graph.edges.collectionAdd({
            from: "A",
            to: "C"
        });

        const viewed: IList<T> = new LinkedList<T>();
        bfs(graph, (node) => viewed.collectionAdd(node), "A");
        expect(viewed.size()).toBe(3);
        expect(viewed.contains("A")).toBeTruthy()
        expect(viewed.contains("B")).toBeTruthy()
        expect(viewed.contains("C")).toBeTruthy()
    })
});