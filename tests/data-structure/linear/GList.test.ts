import GList from "../../../src/data-structure/linear/GList"

describe("GList test", () => {
    it("length to be 2", () => {
        const glist = new GList<number>();
        glist.listAdd(1);
        glist.listAdd(glist);
        expect(glist.size()).toBe(2);
    })

    it("getting glist", () => {
        const glist = new GList<number>();
        glist.listAdd(1);
        glist.listAdd(glist);

        expect(() => glist.getAsGList(1)).not.toThrow();
        expect(glist.getAsGList(1).listGet(0)).toBe(1);

        expect(() => glist.getAsElement(1)).toThrow();
    })

    it("getting element", () => {
        const glist = new GList<number>();
        glist.listAdd(1);
        glist.listAdd(glist);

        expect(() => glist.getAsElement(0)).not.toThrow();
        expect(glist.getAsElement(0)).toBe(1);

        expect(() => glist.getAsGList(0)).toThrow();
    })
})