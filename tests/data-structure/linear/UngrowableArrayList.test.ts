import UngrowableArrayList from "../../../src/data-structure/linear/UngrowableArrayList"
describe("ArrayList's test", () => {

    it("create ArrayList",()=>{
        new UngrowableArrayList(10 * 1000 * 1000);
    })

    it("size increments to 1", () => {
        const list = new UngrowableArrayList<number>(100);
        list.listAdd(1);
        expect(list.size()).toBe(1);
    });

    it("size to be zero after clear", () => {
        const list = new UngrowableArrayList<number>(100);
        list.listAdd(1);
        list.listClear();
        expect(list.size()).toBe(0);
    });

    it("operation: delete", () => {
        const list = new UngrowableArrayList<number>(100);
        list.listAdd(0);
        list.listAdd(1);
        list.listAdd(2);

        list.listDelete(list.size() - 1);
        expect(list.listGet(list.size() - 1)).toBe(1);

        list.listDelete(0);
        expect(list.listGet(0)).toBe(1);
    });

    it("operation: insert", () => {
        const list = new UngrowableArrayList<number>(100);

        list.listAdd(0);
        list.listAdd(1);
        list.listAdd(2);
        list.listInsert(1, 3);
        
        expect(list.size()).toBe(4);
        expect(list.listGet(1)).toBe(3);
        expect(list.listGet(3)).toBe(2);
    });

    it("could find element's location by content", () => {
        const list = new UngrowableArrayList<string>(100);

        list.listAdd("abc");
        list.listAdd("cde");
        list.listAdd("qqq");

        expect(list.listIndexOf("abc")).toBe(0);
        expect(list.listIndexOf("cde")).toBe(1);
        expect(list.listIndexOf("asd")).toBe(-1);
    })

    it("no more space",()=>{
        const list = new UngrowableArrayList<string>(1);
        list.listAdd("");
        expect(()=>list.listAdd("")).toThrow();
    })

});