// import equals from "../../src/math/equals";
import factorial from "../../src/math/fn/factorial"

describe("basic math function test", () => {
    it("fac", () => {
        expect(factorial(0)).toBe(1);
        expect(factorial(1)).toBe(1);
        expect(factorial(2)).toBe(2);
        expect(factorial(12)).toBe(479_001_600);
    })

    // it("ignore diff",()=>{
    //     expect(equals(1,1.0)).toBeTruthy();
    //     expect(equals(1,1.01)).toBeFalsy();
    //     expect(equals(1,1.00000000001)).toBeTruthy();
    // })
})