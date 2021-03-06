import derivation from "../../src/math/derivation"
describe("Derivative Test", () => {

    it("f(x) = C, f'(x) should be equals to zero", () => {
        const df = derivation(x => 10);

        expect(df(100)).toBeCloseTo(0);
    })

    it("f(x) = 10x, f'(x) should be equals to 10", () => {
        const df = derivation(x => 10 * x);

        expect(df(100)).toBeCloseTo(10);
    })

    it("f(x) = x, f'(x) should be equals to 1", () => {
        const df = derivation((x: number) => x);

        expect(df(1)).toBeCloseTo(1);
        expect(df(2)).toBeCloseTo(1);
        expect(df(3)).toBeCloseTo(df(4))
    })


    // it("sin' x should be equals to cos' x", () => {
    //     const fsin: Fun = sin;
    //     const dfsin = derivation(sin);
    //     expect(dfsin(0)).toBeCloseTo(cos(0));
    // });

});