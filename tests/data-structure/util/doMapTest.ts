import { IMap } from "../../../src";

export default function (factory: <K, V>() => IMap<K, V>) {
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
        expect(map.size()).toBe(3)
        expect(map.mapGet("a")).toBe(1)
        map.mapRemove("c")
        expect(() => map.mapRemove("d")).not.toThrow()
        expect(map.size()).toBe(2)
    })

    it("handle null key", () => {
        const map = factory()
        map.mapPut("a", 1);
        map.mapPut("b", 2)
        map.mapPut("c", 3)
        map.mapPut(null, 2401)
        expect(map.size()).toBe(4)
        expect(map.mapGet(null)).toBe(2401)
    })

    it("get pairs", () => {
        const map = factory()
        expect(map.mapGetPairs().length).toBe(0);
        map.mapPut(1, 1);
        expect(map.mapGetPairs().length).toBe(1);
    })

    it("same key", () => {
        const map = factory<string, string>()
        map.mapPut("a", "a")
        map.mapPut("a", "b")
        expect(map.size()).toBe(1)
        expect(map.mapGet("a")).toBe("b")
    })

    it("contains", () => {
        const map = factory()
        map.mapPut("a", "b")
        expect(map.contains({ key: "a", value: "b" })).toBeTruthy()
        expect(map.contains({ key: "a", value: "c" })).toBeFalsy()
    })

    it("clear", () => {
        const map = factory()
        const MAX_SIZE = 100;
        for (let i = 0; i < MAX_SIZE; i++) {
            map.mapPut(i, i)
        }
        expect(map.size()).toBe(MAX_SIZE)
        expect(() => map.clear()).not.toThrow()
        expect(() => map.clear()).not.toThrow()
        expect(map.size()).toBe(0)
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

}