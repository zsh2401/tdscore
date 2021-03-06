import { ESMap, IMap, size, toESIterable, TreeMap } from "../../../src";
import toJSArray from "../../../src/ixa/toJSArrayForItertable";

export default function (factory: <K, V>() => IMap<K, V>) {
    describe("Map Test Suite", () => {
        it("put & get", () => {
            const map = factory()
            expect(() => map.mapPut("a", 1)).not.toThrow()
            expect(map.mapGet("a")).toBe(1)
        })

        it("remove", () => {
            const map = factory()
            map.mapPut("a", 1);
            map.mapPut("b", 2)
            map.mapPut("c", 3)
            expect(map.collectionSize()).toBe(3)
            expect(map.mapGet("a")).toBe(1)
            map.mapRemove("c")
            expect(() => map.mapRemove("d")).not.toThrow()
            expect(map.collectionSize()).toBe(2)
        })

        it("handle null key", () => {
            const map = factory()
            map.mapPut("a", 1);
            map.mapPut("b", 2)
            map.mapPut("c", 3)
            map.mapPut(null, 2401)
            expect(map.collectionSize()).toBe(4)
            expect(map.mapGet(null)).toBe(2401)
        })

        it("get pairs", () => {
            const map = factory()
            expect(size(map.mapGetPairs())).toBe(0);
            map.mapPut(1, 1);
            expect(size(map.mapGetPairs())).toBe(1);
        })

        it("same key", () => {
            const map = factory<string, string>()
            map.mapPut("a", "a")
            map.mapPut("a", "b")
            expect(map.collectionSize()).toBe(1)
            expect(map.mapGet("a")).toBe("b")
        })

        it("return expected old value", () => {
            const map = factory<string, string>()
            expect(map.mapPut("a", "2401")).toBeNull()
            expect(map.mapPut("a", "2402")).toBe("2401")
        })

        it("contains", () => {
            const map = factory()
            map.mapPut("a", "b")
            expect(map.collectionContains({ key: "a", value: "b" })).toBeTruthy()
            expect(map.collectionContains({ key: "a", value: "c" })).toBeFalsy()
        })

        it("clear", () => {
            const map = factory()
            const MAX_SIZE = 100;
            for (let i = 0; i < MAX_SIZE; i++) {
                map.mapPut(i, i)
            }
            expect(map.collectionSize()).toBe(MAX_SIZE)
            expect(() => map.collectionClear()).not.toThrow()
            expect(() => map.collectionClear()).not.toThrow()
            expect(map.collectionSize()).toBe(0)
        })

        it("get keys", () => {
            const map = factory<number, number>()
            const MAX_SIZE = 100;
            for (let i = 0; i < MAX_SIZE; i++) {
                expect(map.mapPut(i, i)).toBeNull()
            }
            const keys = map.mapGetKeys();
            expect(keys).not.toBe(map.mapGetKeys())
            // console.log(toESIterable(keys)[Symbol.iterator]().next())

            // expect(keys.getIterator().hasNext()).toBeTruthy()
            // console.log(hash(keys.getIterator()))

            expect(size(keys)).toBe(MAX_SIZE)


            let realSize = 0;
            // toJSArray(keys)
            // expect(toESIterable<number>(keys) === toESIterable<number>(keys)).toBeFalsy()
            const keysi = (toESIterable<number>(keys))
            // expect(keysi[Symbol.iterator]().next().done).toBeFalsy()

            //@ts-expect-error
            for (const key of (map instanceof ESMap ? map.esmap.keys() : keysi)) {
                realSize++
                expect(map.mapGet(key)).toBe(key)
            }

            expect(realSize).toBe(MAX_SIZE)
        })

        it("iterator works", () => {
            const map = factory<number | null, string>()
            map.mapPut(0, "a");
            map.mapPut(1, "b");

            const valueList: (string | null)[] = [];
            const iterator = map.getIterator();
            while (iterator.hasNext()) {
                valueList.push(iterator.next().value);
            }

            expect(valueList.length).toBe(2);
            expect(valueList.findIndex(it => it === "a")).not.toBe(-1);
            expect(valueList.findIndex(it => it === "b")).not.toBe(-1);
        });

        it("performance test: 10_000 random get & put", () => {
            const map = factory<number, number>()
            if (map instanceof TreeMap) {
                return;//skip Tree Map
            }
            for (let i = 0; i < 10_000; i++) {
                map.mapPut(i, i)
                map.mapGet(i)
                // expect().toBe(i)
            }

        })
    })
}