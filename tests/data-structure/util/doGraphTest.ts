import { contains, size } from "../../../src";
import IGraph from "../../../src/data-structure/graph/IGraph";
import toJSArray from "../../../src/ixa/toJSArrayForItertable";

export default function (factory: <E>() => IGraph<E>) {
    describe("Standard Graph Test Suite", () => {
        
        it("add & remove vertices", () => {
            const g = factory<string>()
            g.addVertix("A")
            g.addVertix("B")
            expect(contains(g.vertices, "A")).toBeTruthy()
            expect(contains(g.vertices, "B")).toBeTruthy()
            g.removeVertix("A")
            g.removeVertix("B")
            expect(contains(g.vertices, "A")).toBeFalsy()
            expect(contains(g.vertices, "B")).toBeFalsy()
        })

        it("add & remove edges", () => {
            const g = factory<string>()
            g.addVertix("A")
            g.addVertix("B")
            g.addVertix("C")
            g.addVertix("D")
            g.addEdge("A", "C")
            g.addEdge("C", "D", 10)
            g.addEdge("B", "C", -100)

            let edges = toJSArray(g.edges)
            expect(edges.length).toBe(3)

            expect(edges.findIndex(_edge => {
                return _edge.from === "A" && _edge.to === "C" && _edge.weight === 0
            })).not.toBe(-1)

            expect(edges.findIndex(_edge => {
                return _edge.from === "C" && _edge.to === "D" && _edge.weight === 10
            })).not.toBe(-1)

            expect(edges.findIndex(_edge => {
                return _edge.from === "B" && _edge.to === "C" && _edge.weight === -100
            })).not.toBe(-1)

            g.removeEdge("C", "D")
            g.removeEdge("A", "C")
            edges = toJSArray(g.edges)

            expect(edges.length).toBe(1)

            expect(edges.findIndex(_edge => {
                return _edge.from === "B" && _edge.to === "C" && _edge.weight === -100
            })).not.toBe(-1)
        })

        it("no direction", () => {
            const g = factory<number>()
            g.addVertix(1)
            g.addVertix(2)
            g.addVertix(3)

            g.addEdge(1, 2)
            g.addEdge(2, 1)

            g.addEdge(2, 3)
            g.addEdge(3, 2)

            g.addEdge(1, 3)
            g.addEdge(3, 1)

            expect(size(g.edges)).toBe(6)

            expect(size(g.outOf(1))).toBe(2)
            expect(size(g.outOf(2))).toBe(2)
            expect(size(g.outOf(3))).toBe(2)

            expect(contains(g.outOf(1), 2)).toBeTruthy()
            expect(contains(g.outOf(1), 3)).toBeTruthy()

            expect(contains(g.outOf(2), 1)).toBeTruthy()
            expect(contains(g.outOf(2), 3)).toBeTruthy()

            expect(contains(g.outOf(3), 1)).toBeTruthy()
            expect(contains(g.outOf(3), 2)).toBeTruthy()



            expect(contains(g.inOf(1), 2)).toBeTruthy()
            expect(contains(g.inOf(1), 3)).toBeTruthy()

            expect(contains(g.inOf(2), 1)).toBeTruthy()
            expect(contains(g.inOf(2), 3)).toBeTruthy()

            expect(contains(g.inOf(3), 1)).toBeTruthy()
            expect(contains(g.inOf(3), 2)).toBeTruthy()
        })

        it("in of", () => {
            const g = factory<string>()
            g.addVertix("A")
            g.addVertix("B")
            g.addEdge("A", "B")
            expect(toJSArray(g.inOf("B"))).toStrictEqual(["A"])
            expect(toJSArray(g.inOf("A"))).toStrictEqual([])
        })

        it("out of", () => {
            const g = factory<string>()
            g.addVertix("A")
            g.addVertix("B")
            g.addEdge("A", "B")
            expect(toJSArray(g.outOf("B"))).toStrictEqual([])
            expect(toJSArray(g.outOf("A"))).toStrictEqual(["B"])
        })

        it("add invalid edge", () => {
            const g = factory<string>()
            expect(() => {
                g.addEdge("A", "B")
            }).toThrow()
        })
    })
}