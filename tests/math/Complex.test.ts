import Complex  from "../../src/math/Complex"
describe("Complex test", () => {
    it("add", () => {
        expect(Complex.plainAdd(3, 4, 5, -6)).toStrictEqual([8, -2]);
    });
    it("sub", () => {
        expect(Complex.plainSub(1, 2, 3, 4)).toStrictEqual([-2, -2]);
    })
    it("mul", () => {
        expect(Complex.plainMul(1, 2, 3, 4)).toStrictEqual([-5, 10]);
        expect(Complex.plainMul(2, -3, 4, 2)).toStrictEqual([14, -8]);
    });
    it("div", () => {
        const [real, img] = Complex.plainDiv(3, 2, 4, 5);
        expect(real).toBeCloseTo(22 / 41);
        expect(img).toBeCloseTo(-7 / 41);
    });
})