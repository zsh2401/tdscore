import hashCode from "../../src/util/hash";

describe("Hash test",()=>{
    it("function hashcode",()=>{
        let flag = false;
        const a = ()=>{flag = true;};
        expect(hashCode(a)).toBe(hashCode(a));
        a();
        expect(flag).toBeTruthy();
        expect(hashCode(a)).toBe(hashCode(a));
    });
})