import { IHashCodeGettable } from "../../src/util/hashing";
import dsHashCode from "../../src/hash"
import DSObject from "../../src/DSObject"
import { WEEK_HASHCODE_GETTER_NAME } from "../../src/util/hashing/hashCodeForAny";
import { HASHCODE_FOR_TRUE, HASHCODE_FOR_FALSE } from "../../src/util/hashing/hashCodeForPrimitiveType"
describe("Hash test", () => {
    it("For function", () => {
        let flag = false;
        const a = () => { flag = true; };
        expect(dsHashCode(a)).toBe(dsHashCode(a));
        a();
        expect(flag).toBeTruthy();
        expect(dsHashCode(a)).toBe(dsHashCode(a));
    });

    it("for boolean", () => {
        expect(dsHashCode(true)).toBe(HASHCODE_FOR_TRUE)
        expect(dsHashCode(false)).toBe(HASHCODE_FOR_FALSE)
    })

    it("Custom HashCode", () => {
        const value = Math.random() * 1000;
        class A implements IHashCodeGettable {
            getHashCode(): number {
                return value;
            }
        }
        class B extends DSObject {
            getHashCode(): number {
                return value;
            }
        }
        const a = new A();
        const b = new B();
        const c: any = {};
        c.getHashCode = () => value;

        expect(dsHashCode(a)).toBe(value);
        expect(dsHashCode(b)).toBe(value);
        expect(dsHashCode(c)).toBe(value);
    })

    it("Strictly equal objects have equal hash codes", () => {
        const a = {};
        const b = a;
        expect(a === b && (dsHashCode(a) === dsHashCode(b))).toBeTruthy();

        const c = 1;
        const d = 1;
        expect(a === b && (dsHashCode(c) === dsHashCode(d))).toBeTruthy();

        const e = null;
        const f = undefined;
        expect(e !== f && (dsHashCode(e) !== dsHashCode(f))).toBeTruthy();

        const h = new DSObject();
        const i = new DSObject();
        expect(h !== i && (dsHashCode(h) !== dsHashCode(i))).toBeTruthy();
    })

    it("Works with cycle dependency", () => {
        const a: any = {}
        a.a = a;
        expect(()=>dsHashCode(a)).not.toThrow()
    })
    
    it("Always equal in whole lifecycle", () => {
        const a: any = {};
        const value1 = dsHashCode(a);
        a.test = 1;
        const value2 = dsHashCode(a);
        expect(value1).toBe(value2);
    })

    it("impression is not enumerable", () => {
        const a: any = {};
        dsHashCode(a);
        for (const key in a) {
            expect(key).not.toBe(WEEK_HASHCODE_GETTER_NAME);
        }
    });

    it("Won't leave any trace in object which implemented IHashCodeGettable", () => {
        class A implements IHashCodeGettable {
            getHashCode(): number {
                return 2401;
            }
        }
        const a: any = new A()
        dsHashCode(a);
        expect(a[WEEK_HASHCODE_GETTER_NAME]).toBeUndefined();
    })
})