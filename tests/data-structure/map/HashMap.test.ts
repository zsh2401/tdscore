import HashMap from "../../../src/data-structure/map/HashMap";
import IMap, { ReadonlyKeyValuePair } from "../../../src/data-structure/map/IMap";
import { WEEK_HASHCODE_GETTER_NAME } from "../../../src/util/hash/hashCodeForAny";
import dsEquals from "../../../src/equals";
import ICollection from "../../../src/data-structure/ICollection";
import { doCollectionTest } from "../util/doCollectionTest";
import { DSObject } from "../../../src";
// import { WEEK_HASHCODE_GETTER_NAME } from "../../src/util/hash/weekhash";

describe("HashMap test", () => {
    it("basic put and get", () => {
        const map: IMap<string, number> = new HashMap<string, number>();
        map.mapPut("a", 1);
        expect(map.mapGet("a")).toBe(1);
    });

    it("replace", () => {
        const map: IMap<string, number> = new HashMap<string, number>();
        map.mapPut("a", 1);
        map.mapPut("a", 2);
        // console.log(map.toString());
        expect(map.mapGet("a")).toBe(2);
    })

    it("delete", () => {
        const map: IMap<string, number> = new HashMap<string, number>();
        map.mapPut("a", 1);
        map.mapRemove("a");
        expect(map.mapGet("a")).toBeNull();
    })

    it("get size", () => {
        const map: IMap<string, number> = new HashMap<string, number>();

        map.mapPut("a", 1);
        map.mapRemove("a");

        map.mapPut("a", 1);
        map.mapPut("b", 2401);

        expect(map.size()).toBe(2);
        expect(map.mapGet("b")).toBe(2401);
    });

    it("growable", () => {
        const map: IMap<number, number> = new HashMap<number, number>();
        for (let i = 0; i < 20; i++) {
            map.mapPut(i, i);
        }
        expect(map.mapGet(3)).toBe(3);
    });

    it("mixed display", () => {
        const map: IMap<number, number> = new HashMap<number, number>();
        for (let i = 0; i < 20; i++) {
            if (i == 9) {
                // console.log(map.toString());
            }
            map.mapPut(Math.random() * 1000, i);
        };
        // console.log(map.toString());
    })

    it("remove same hashcode and customed equals object", () => {
        const map = new HashMap<A, boolean>()
        class A extends DSObject {
            value: number = 15;
            constructor(value: number) {
                super()
                this.value = value
            }
            equals(other: any) {
                if (other instanceof A) {
                    return this.value === other.value
                } else {
                    return super.equals(other)
                }
            }
            getHashCode() {
                return this.value ^ 2401
            }
        }
        map.mapPut(new A(20), true)
        map.mapPut(new A(30), true)
        map.mapPut(new A(20), false)
        expect(map.size()).toBe(2)
        expect(map.mapGet(new A(20))).toBeFalsy()
        expect(map.mapGet(new A(30))).toBeTruthy()

        map.mapRemove(new A(20))
        expect(map.size()).toBe(1)
    })

    it("contains", () => {
        const map = new HashMap();
        map.mapPut("a", 1);
        expect(map.contains({ key: "a", value: 1 })).toBeTruthy()
        expect(map.contains({ key: "a", value: 2 })).toBeFalsy()
    })

    it("collection test", () => {
        const map: ICollection<ReadonlyKeyValuePair<string, string>> = new HashMap();
        map.collectionAdd({ key: "1", value: "1" });
        map.collectionAdd({ key: "2", value: "2" })
        map.collectionAdd({ key: "2", value: "3" })

        expect(map.size()).toBe(2);
        expect(map.collectionContains({ key: "1", value: "1" })).toBeTruthy()
        expect(map.collectionContains({ key: "2", value: "2" })).toBeFalsy()
        expect(map.collectionContains({ key: "2", value: "3" })).toBeTruthy()

        expect(map.collectionRemove({ key: "2", value: "2" })).toBeFalsy()
        expect(map.size()).toBe(2);
        expect(map.collectionContains({ key: "2", value: "3" })).toBeTruthy()

        expect(map.collectionRemove({ key: "2", value: "3" })).toBeTruthy()
        expect(map.size()).toBe(1);
        expect(map.collectionContains({ key: "2", value: "3" })).toBeFalsy()

        map.collectionClear();
        expect(map.size()).toBe(0);
        expect(map.isEmpty()).toBeTruthy()
    })


    it("growable", () => {
        const map: IMap<number, number> = new HashMap<number, number>();
        for (let i = 0; i < 20; i++) {
            map.mapPut(i, i);
        }
        // console.log(map.toString());
        //@ts-ignore
        const capcity = map.table.length;
        expect(capcity).toBe(32);
        // console.log(map.toString());
        expect(map.mapGet(3)).toBe(3);
        expect(map.mapGet(19)).toBe(19);

    })

    it("same bucket", () => {
        const map = new HashMap<number, number>();
        //@ts-ignore
        const bucket1: number = map.indexFor(1);
        //@ts-ignore
        const bucket2: number = map.indexFor(1 + 16);
        expect(bucket1).toEqual(bucket2);
    })
    it("function as key", () => {
        const map = new HashMap<() => void, () => void>();
        let flag = false;
        const fKey = () => { };
        const fValue = () => { flag = true };
        map.mapPut(fKey, fValue);
        expect(dsEquals(map.mapGet(fKey), fValue)).toBeTruthy();
        map.mapGet(fKey)!();
        expect(flag).toBeTruthy();
    });
    it("handle null key", () => {
        const map = new HashMap<number | null, number>();

        map.mapPut(null, 2401);
        expect(map.mapGet(null)).toBe(2401);
        expect(map.size()).toBe(1);

        map.mapRemove(null);
        expect(map.size()).toBe(0);
    });

    it("collision test", () => {
        const PRESENT = 2401;
        const map = new HashMap<number | null, number>();

        map.mapPut(1, 1);
        map.mapPut(17, 17);

        expect(map.mapGet(1)).toBe(1);
        expect(map.mapGet(17)).toBe(17);
        expect(map.size()).toBe(2);

        map.mapRemove(17);
        expect(map.mapGet(17)).toBeNull();
        expect(map.size()).toBe(1);

        map.mapPut(null, 2401);
        map.mapPut(0, 2402);

        expect(map.mapGet(null)).toBe(2401);
        expect(map.mapGet(0)).toBe(2402);
    });

    it("extreme collision test", () => {
        const map = new HashMap<number | null, number>();
        for (let i = 0; i < 10; i++) {
            map.mapPut(i * 16, 0);
        }
        // console.log(map.toString());
    });

    it("key is null", () => {
        const map = new HashMap<number | null, number>();
        map.mapPut(null, 0);
        map.mapPut(1, 1);

        expect(map.mapGet(null)).toBe(0);
        expect(map.mapGet(1)).toBe(1);
        expect(map.size()).toBe(2);

        map.mapRemove(null);
        expect(map.mapGet(null)).toBeNull();
        expect(map.size()).toBe(1);

    })

    it("get pairs", () => {
        const map = new HashMap<number, number>();
        expect(map.mapGetPairs().length).toBe(0);
        map.mapPut(1, 1);
        expect(map.mapGetPairs().length).toBe(1);
    })

    it("Could work at exception when there's no element", () => {
        const map = new HashMap<string, number>();
        expect(map.mapGet("a")).toBeNull();
        expect(map.size()).toBe(0);
        expect(map.collectionSize()).toBe(0);
    });

    it("toString", () => {
        const map = new HashMap<number | null, string>();
        map.mapPut(null, "a");
        map.mapPut(0, "b");
        map.mapPut(1, "c");
    })

    it("iterator works", () => {
        const map = new HashMap<number | null, string>();
        map.mapPut(null, "a");
        map.mapPut(0, "b");
        map.mapPut(1, "c");

        const valueList: (string | null)[] = [];
        const iterator = map.getIterator();
        while (iterator.hasNext()) {
            valueList.push(iterator.next().value);
        }

        expect(valueList.length).toBe(3);
        expect(valueList.findIndex(it => it === "a")).not.toBe(-1);
        expect(valueList.findIndex(it => it === "b")).not.toBe(-1);
        expect(valueList.findIndex(it => it === "c")).not.toBe(-1);
    });

    it("week hash test", () => {
        const map = new HashMap<any, string>();
        const keyOne = {};
        const keyTwo = {};
        const keyThree = { f: null };
        map.mapPut(keyOne, "a");

        expect(map.mapGet(keyOne)).toEqual(map.mapGet(keyTwo));
        //@ts-ignore
        expect(keyOne[WEEK_HASHCODE_GETTER_NAME]).toBeDefined();

        expect(map.mapGet(keyThree)).toBeNull();
        map.mapPut(keyThree, "b");
        expect(map.mapGet(keyThree)).toBe("b");

        map.mapRemove(keyOne);
        expect(map.mapGet(keyOne)).toBeNull();
        expect(map.mapGet(keyTwo)).toBeNull();
    });

    it("10,000 times of get() & put()", () => {
        const map = new HashMap<number, number>();
        for (let i = 0; i < 10_000; i++) {
            expect(() => {
                map.mapPut(i, i * 2)
            }).not.toThrow();
            expect(map.mapGet(i)).toBe(i * 2);;
        }
    });

});