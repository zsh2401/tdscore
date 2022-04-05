import indexer from "../../../src/util/decorator/indexer"
import HashMap from "../../../src/data-structure/map/HashMap"
import { DSObject } from "../../../src";
describe("Indexer Test", () => {
    it("Getter Test", () => {
        @indexer({ getter: "get" })
        class GetterTest {
            get(index: number) {
                return index;
            }
        }
        const testObject = new GetterTest();
        for (let i = 0; i < 3; i++) {
            let number = Math.random() * Number.MAX_SAFE_INTEGER;
            number = Number.parseInt(number.toFixed(0));
            expect(testObject[number]).toBe(number);
        }
    })

    it("Setter Test", () => {

        @indexer({ setter: "set" })
        class SetterTest {
            // Use ES map to test, avoid possible circular reference.
            map = new Map<number, any>();
            set(index: number, newValue: any) {
                this.map.set(index, newValue);
            }
        }

        const testObject = new SetterTest();
        for (let i = 0; i < 3; i++) {
            let number = Math.random() * Number.MAX_SAFE_INTEGER;
            number = Number.parseInt(number.toFixed(0));
            testObject[number] = number;
            expect(testObject.map.get(number)).toBe(number);
        }
    })

    it("Getter and Setter", () => {

        @indexer({ getter: "get", setter: "set" })
        class A {
            private map = new Map();
            set(index: number, value: string) {
                this.map.set(index, value);
            }
            get(index: number) {
                return this.map.get(index);
            }
        }
        const a = new A();

        a[20010922] = 7;
        a[19991125] = 7 * 7 * 7 * 7; // a.k.a 2401

        expect(a.get(20010922)).toBe(7);
        expect(a.get(19991125)).toBe(2401);

    })

    it("Won't pollute prototype", () => {
        @indexer({})
        class A extends HashMap<any, any>{
        }

        expect(new A() instanceof HashMap).toBeTruthy();
    })

    it("Get class name",()=>{
        @indexer({})
        class A extends DSObject{
    
        }
        expect(new A().getClassName()).toBe("A");
    })

    it("Passing static properties", () => {
        const MAGIC_NUMBER = 2401;

        @indexer({})
        class A {
            static value = MAGIC_NUMBER;
            static doSomething(): void {
                A.value++;
            }
        }

        expect(() => A.doSomething()).not.toThrowError();
        expect(A.value).toBe(MAGIC_NUMBER + 1);
    })
})