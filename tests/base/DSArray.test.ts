import DSArray from "../../src/DSArray"

describe("DSArray Test", () => {
    it("could create instance", () => {
        expect(() => new DSArray<number>(1000)).not.toThrow();
    });

    it("length", () => {
        const array = new DSArray<number>(1000);
        expect(array.length).toBe(1000)
    });

    it("default value", () => {
        //Value provider
        let array = new DSArray<number>(10000, 2401);
        expect(array[2401]).toBe(2401);

        //Function provider
        array = new DSArray<number>(10000, (i: number) => i);
        expect(array[2401]).toBe(2401);

        //It's lazy loading
        let flag = false;
        array = new DSArray<number>(10, (i: number) => { flag = true; return i });
        expect(flag).toBeFalsy();
        expect(array[1]).toBe(1);
        expect(flag).toBeTruthy();
    });

    it("access control.", () => {
        const array = new DSArray<number>(0);
        expect(() => array[-1]).toThrow();
        expect(() => array[0]).toThrow();
        expect(() => array[1]).toThrow();
    });

    it("get and set.", () => {
        const array = new DSArray<number>(10);
        // expect(()=>array[10]).toBeUndefined();
        array[9] = 1;
        array[8] = 2;
        expect(array[8]).toBe(2);
    });

    it("getting empty", () => {
        const array = new DSArray<number>(10);
        expect(array[0]).toBeUndefined();
    });
})