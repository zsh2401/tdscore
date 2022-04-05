import GList, { isGList, isNormalElement } from "../../../src/data-structure/linear/GList"
import doListTest from "../do-xxx-test/doListTest";

describe("GList test", () => {
    
    doListTest(()=>new GList<any>());

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

    it("Check if it is GList",()=>{
        const glist = new GList<number>();
        glist.listAdd(1);
        glist.listAdd(glist);

        expect(isGList(glist.listGet(0))).toBeFalsy();
        expect(isGList(glist.listGet(1))).toBeTruthy();
    })

    it("Check if it is normal element",()=>{
        const glist = new GList<number>();
        glist.listAdd(1);
        glist.listAdd(glist);

        expect(isNormalElement(glist.listGet(0))).toBeTruthy();
        expect(isNormalElement(glist.listGet(1))).toBeFalsy();
    })
})