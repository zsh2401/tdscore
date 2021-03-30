import { DSNumber } from "../../../src"
import { PI, sin, cos } from "../../../src/math"

const sqrt = Math.sqrt;
describe("Trigonometric function's test", () => {
    it("sin", () => {
        expect(sin(0)).toBeCloseTo(0); // 0°

        expect(sin(PI / 6)).toBeCloseTo(1 / 2); // 30°
        expect(sin(PI / 4)).toBeCloseTo(sqrt(2) / 2); // 45°
        expect(sin(PI / 3)).toBeCloseTo(sqrt(3) / 2); // 60°

        expect(sin(PI / 2)).toBeCloseTo(1); // 90°

        expect(sin(2 * PI / 3)).toBeCloseTo(sqrt(3) / 2); // 120°
        expect(sin(3 * PI / 4)).toBeCloseTo(sqrt(2) / 2); // 135°
        expect(sin(5 * PI / 6)).toBeCloseTo(1 / 2); // 150°

        expect(sin(PI)).toBeCloseTo(0); // 180°
    });

    it("sin with DSNumber", () => {
        expect(sin(DSNumber.valueOf(0)).toJSNumber()).toBeCloseTo(0); // 0°

        expect(sin(DSNumber.valueOf(PI / 6)).toJSNumber()).toBeCloseTo(1 / 2); // 30°
        expect(sin(DSNumber.valueOf(PI / 4)).toJSNumber()).toBeCloseTo(sqrt(2) / 2); // 45°
        expect(sin(DSNumber.valueOf(PI / 3)).toJSNumber()).toBeCloseTo(sqrt(3) / 2); // 60°

        expect(sin(DSNumber.valueOf(PI / 2)).toJSNumber()).toBeCloseTo(1); // 90°

        expect(sin(DSNumber.valueOf(2 * PI / 3)).toJSNumber()).toBeCloseTo(sqrt(3) / 2); // 120°
        expect(sin(DSNumber.valueOf(3 * PI / 4)).toJSNumber()).toBeCloseTo(sqrt(2) / 2); // 135°
        expect(sin(DSNumber.valueOf(5 * PI / 6)).toJSNumber()).toBeCloseTo(1 / 2); // 150°

        expect(sin(PI)).toBeCloseTo(0); // 180°
    });

    it("cos", () => {
        expect(cos(0)).toBeCloseTo(1); // 0°

        expect(cos(PI / 6)).toBeCloseTo(sqrt(3) / 2); // 30°
        expect(cos(PI / 4)).toBeCloseTo(sqrt(2) / 2); // 45°
        expect(cos(PI / 3)).toBeCloseTo(1 / 2); // 60°

        expect(cos(PI / 2)).toBeCloseTo(0); // 90°

        expect(cos(2 * PI / 3)).toBeCloseTo(-(1 / 2)); // 120°
        expect(cos(3 * PI / 4)).toBeCloseTo(-(sqrt(2) / 2)); // 135°
        expect(cos(5 * PI / 6)).toBeCloseTo(-(sqrt(3) / 2)); // 150°

        expect(cos(PI)).toBeCloseTo(-1); // 180°
    })

    it("cos with DSNumber", () => {
        expect(cos(DSNumber.valueOf(0).toJSNumber())).toBeCloseTo(1); // 0°

        expect(cos(DSNumber.valueOf(PI / 6)).toJSNumber()).toBeCloseTo(sqrt(3) / 2); // 30°
        expect(cos(DSNumber.valueOf(PI / 4)).toJSNumber()).toBeCloseTo(sqrt(2) / 2); // 45°
        expect(cos(DSNumber.valueOf(PI / 3)).toJSNumber()).toBeCloseTo(1 / 2); // 60°

        expect(cos(DSNumber.valueOf(PI / 2)).toJSNumber()).toBeCloseTo(0); // 90°

        expect(cos(DSNumber.valueOf(2 * PI / 3)).toJSNumber()).toBeCloseTo(-(1 / 2)); // 120°
        expect(cos(DSNumber.valueOf(3 * PI / 4)).toJSNumber()).toBeCloseTo(-(sqrt(2) / 2)); // 135°
        expect(cos(DSNumber.valueOf(5 * PI / 6)).toJSNumber()).toBeCloseTo(-(sqrt(3) / 2)); // 150°

        expect(cos(DSNumber.valueOf(PI)).toJSNumber()).toBeCloseTo(-1); // 180°
    })
})