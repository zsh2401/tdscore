import DSObject from "../../src/DSObject";
import Lazy from "../../src/Lazy";

describe("Lazy test", () => {
    it("Value type", () => {
        const a = new Lazy<number>(() => Math.random());
        expect(a.value).toBe(a.value);
    });

    it("Reference equals", () => {
        class A extends DSObject { }
        const a = new Lazy<A>(() => new A());
        expect(a.value).toBe(a.value);
        expect(a.value.referenceEquals(a.value)).toBeTruthy();
    });

    
    it("Called once", () => {
        let i = 0;
        class A extends DSObject { }
        const a = new Lazy<A>(() => {
            i++;
            return new A();
        });
        expect(a.value).toBe(a.value);
        expect(a.value.referenceEquals(a.value)).toBeTruthy();
        expect(i).toBe(1);
    });

})