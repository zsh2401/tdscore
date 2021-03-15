import Complex from "../../src/math/Complex"
describe("Complex test", () => {
    it("add", () => {
        const a = new Complex(3, 4);
        const b = new Complex(5, -6);
        expect(a.add(b).toTuple()).toStrictEqual([8, -2]);
    });

    it("sub", () => {
        const a = new Complex(1, 2);
        const b = new Complex(3, 4);
        expect(a.sub(b).toTuple()).toStrictEqual([-2, -2]);
    })

    it("mul", () => {
        const a = new Complex(1, 2);
        const b = new Complex(3, 4);
        expect(a.mul(b).toTuple()).toStrictEqual([-5, 10]);

        const c = new Complex(2, -3);
        const d = new Complex(4, 2);
        expect(c.mul(d).toTuple()).toStrictEqual([14, -8]);
    });

    it("div by", () => {

        const a = new Complex(3, 2);
        const b = new Complex(4, 5);
        const [real, img] = a.divBy(b).toTuple();
        expect(real).toBeCloseTo(22 / 41);
        expect(img).toBeCloseTo(-7 / 41);
    });
})