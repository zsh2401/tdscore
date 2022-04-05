import { LinkedList } from "../../../src";
import IList from "../../../src/data-structure/linear/IList";
import DSObject from "../../../src/DSObject";
import RandomBooleanIterator from "../../../src/util/RandomBooleanIterator"
export default function (factory: <E>() => IList<E>) {
    describe("Standard List Test Suite", () => {

        it("initialize", () => {
            const list: IList<number> = factory<number>();
            expect(list.collectionSize()).toBe(0);
            expect(list.getIterator().hasNext()).toBeFalsy()
        })

        it("float index", () => {
            const list = factory<number>()
            expect(() => {
                list.listInsert(0.5, 10)
            }).toThrow()

            expect(() => {
                list.listGet(0.5)
            }).toThrow()
        })

        it("Random insert/add delete", () => {
            const list = factory<number>()
            let delta = 0;
            const ran = new RandomBooleanIterator();
            for (let i = 0; i < 100; i++) {
                const v = ran.next()
                if (v) {
                    delta++
                    ran.next() ? list.listAdd(i) : list.listInsert(list.collectionSize(), i)
                } else {
                    if (list.collectionSize() > 0) {
                        delta--
                        list.listDelete(list.collectionSize() - 1)
                    }
                }
            }
            expect(list.collectionSize()).toBe(delta)
        })

        it("get", () => {
            const list = factory<number>();
            list.listAdd(2401);
            expect(list.listGet(0)).toBe(2401);

            expect(() => list.listGet(2401)).toThrow();
            expect(() => list.listGet(-1)).toThrow();
            expect(() => list.listGet(1)).toThrow();
        })

        it("insert last one", () => {
            const list = factory<number>()

            for (let i = 0; i < 100; i++) {
                list.listInsert(i, i)
                expect(list.listGet(i)).toBe(i)
            }
        })

        it("clear", () => {
            const list: IList<number> = factory<number>();
            list.listAdd(1);
            list.listAdd(3);
            list.listClear();

            expect(list.collectionSize()).toBe(0);

            list.listAdd(3);

            expect(list.listGet(0)).toBe(3);
            expect(list.collectionSize()).toBe(1);
            list.listClear();

            expect(list.collectionSize()).toBe(0);
        });

        it("add", () => {
            const list: IList<number> = factory<number>();
            list.listAdd(1);
            list.listAdd(2);
            list.listAdd(3);
            list.listAdd(4);
            expect(list.collectionSize()).toBe(4);
            expect(list.listGet(0)).toBe(1);
            expect(list.listGet(1)).toBe(2);
        });
        it("addAll", () => {
            const list = factory<number>()
            list.listAddAll([9, 8, 7])
            list.listAddAll([1, 2, 3])
            expect(list.collectionToJSArray()).toStrictEqual([9, 8, 7, 1, 2, 3])
        })

        it("delete", () => {
            const list: IList<number> = factory<number>();
            list.listAddAll([6, 7, 8])
            expect(list.collectionToJSArray()).toStrictEqual([6, 7, 8])

            expect(() => {
                list.listDelete(4)
            }).toThrow()
            expect(list.collectionToJSArray()).toStrictEqual([6, 7, 8])

            list.listDelete(1);
            expect(list.collectionToJSArray()).toStrictEqual([6, 8])

            list.listDelete(0);
            list.listDelete(0);
            expect(list.collectionToJSArray()).toStrictEqual([])
            expect(() => list.listGet(0)).toThrow()

            expect(() => list.listDelete(0)).toThrow();
            expect(() => list.listDelete(-1)).toThrow();
        });



        //To test if a implementation of list has a strange bug which I have named it as "Losing-Chain".
        it("delete element at zero", () => {
            const list = factory<number>();
            list.listAdd(2401);
            expect(list.collectionSize()).toBe(1);
            list.listDelete(0);
            expect(list.collectionSize()).toBe(0);
            list.listAdd(2401);
            expect(list.collectionSize()).toBe(1);
            expect(list.listGet(0)).toBe(2401);
        });

        it("delete all", () => {
            const list = factory<number>();
            list.listAddAll([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            expect(list.collectionSize()).toBe(9);
            while (!list.collectionIsEmpty()) {
                list.listDelete(list.collectionSize() - 1);
            }
            expect(list.collectionSize()).toBe(0);
            list.listAdd(5);
            expect(list.collectionSize()).toBe(1);
        });

        it("find", () => {
            class SomeComplexedObject extends DSObject { }
            const list = factory<any>();
            const obj = new SomeComplexedObject();
            list.listAdd("a");
            list.listAdd(obj);
            list.listAdd("d");
            list.listAdd(null);
            list.listAdd(undefined);
            expect(list.collectionSize()).toBe(5);

            expect((list.listGet(1) as SomeComplexedObject).getHashCode()).toBe(obj.getHashCode());
            expect(list.collectionContains("a")).toBeTruthy();
            expect(list.collectionContains(null)).toBeTruthy();
            expect(list.collectionContains(undefined)).toBeTruthy();
            expect(list.collectionContains(obj)).toBeTruthy();
        })

        it("contains", () => {
            const list = factory();
            list.listAdd(2401);
            expect(list.collectionContains(2401)).toBeTruthy();
            expect(list.collectionContains(2402)).toBeFalsy();
            list.listDelete(list.listIndexOf(2401));
            expect(list.collectionContains(2401)).toBeFalsy();
        });

        it("index of", () => {
            class B extends DSObject { }
            const list = factory();
            const bInstance = 0;
            list.listAdd(bInstance);
            expect(list.listIndexOf(bInstance)).not.toBe(-1);
        })

        it("insert", () => {
            const l = factory<number>()
            l.listAddAll([1, 2, 3])
            l.listInsert(0, 0)
            expect(l.collectionToJSArray()).toStrictEqual([0, 1, 2, 3])

            expect(() => l.listInsert(-1, 0)).toThrow()
        })

        it("set", () => {
            const l = factory<number>()
            l.listAddAll([1, 2, 3, 4, 5])
            l.listSet(0, 2)
            l.listSet(4, 3)
            expect(l.collectionToJSArray()).toStrictEqual([2, 2, 3, 4, 3])

            expect(() => l.listSet(-1, 5)).toThrow()
            expect(() => l.listSet(5, 10)).toThrow()
        })
    })
}