import Fun from "../../src/math/Fun";
import sin from "../../src/math/sin"
import derivation from "../../src/math/derivation"
import { derivationOf } from "../../src/math/DSFun"
import cos from "../../src/math/cos";
import { DSNumber } from "../../src";
describe("Derivative Test", () => {

    it("f(x) = C, f'(x) should be equals to zero", () => {
        const df = derivation(x => 10);

        expect(df(100)).toBeCloseTo(0);
    })

    it("f(x) = x, f'(x) should be equals to 1", () => {
        const df = derivation((x: number) => x);

        expect(df(1)).toBeCloseTo(1);
        expect(df(2)).toBeCloseTo(1);
        expect(df(3)).toBeCloseTo(df(4))
    })


    it("sin' x should be equals to cos' x", () => {
        const fsin: Fun = sin;
        const dfsin = derivation(sin);
        // expect(cos(0)).toBeCloseTo(1);
        // expect(sin(0)).toBeCloseTo(0);
        expect(dfsin(0)).toBeCloseTo(cos(0));
    });

    it("DSFun's derivation: sin'' x should be -sin x", () => {
        const originalF = (x: DSNumber): DSNumber => {
            return x.sin();
        }
        const f = derivationOf(derivationOf(originalF));
        expect(f(DSNumber.ONE).toJSNumber()).toBeCloseTo(-sin(1))
    })

    // it("DSFun's derivation: sin''''' x should be sin x", () => {
    //     const originalF = (x: DSNumber): DSNumber => {
    //         return x.sin();
    //     }
    //     const f = derivationOf(derivationOf(derivationOf(derivationOf(derivationOf(originalF)))));
    //     expect(f(DSNumber.ONE).toJSNumber()).toBeCloseTo(sin(1))
    // })
});