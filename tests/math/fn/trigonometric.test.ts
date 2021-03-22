import { math } from "../../../src"
import { PI } from "../../../src/math"
import root from "../../../src/math/root";
const sin = math.sin
const cos = math.cos

describe("Trigonometric function's test", () => {
    it("sin", () => {
        expect(sin(0).toJSNumber()).toBeCloseTo(0); // 0°

        expect(sin(PI / 6).toJSNumber()).toBeCloseTo(1 / 2); // 30°
        expect(sin(PI / 4).toJSNumber()).toBeCloseTo(root(2) / 2); // 45°
        expect(sin(PI / 3).toJSNumber()).toBeCloseTo(root(3) / 2); // 60°

        expect(sin(PI / 2).toJSNumber()).toBeCloseTo(1); // 90°

        expect(sin(2 * PI / 3).toJSNumber()).toBeCloseTo(root(3) / 2); // 120°
        expect(sin(3 * PI / 4).toJSNumber()).toBeCloseTo(root(2) / 2); // 135°
        expect(sin(5 * PI / 6).toJSNumber()).toBeCloseTo(1 / 2); // 150°

        expect(sin(PI).toJSNumber()).toBeCloseTo(0); // 180°
    });

    it("cos", () => {
        expect(cos(0).toJSNumber()).toBeCloseTo(1); // 0°

        expect(cos(PI / 6).toJSNumber()).toBeCloseTo(root(3) / 2); // 30°
        expect(cos(PI / 4).toJSNumber()).toBeCloseTo(root(2) / 2); // 45°
        expect(cos(PI / 3).toJSNumber()).toBeCloseTo(1 / 2); // 60°

        expect(cos(PI / 2).toJSNumber()).toBeCloseTo(0); // 90°

        expect(cos(2 * PI / 3).toJSNumber()).toBeCloseTo(-(1 / 2)); // 120°
        expect(cos(3 * PI / 4).toJSNumber()).toBeCloseTo(-(root(2) / 2)); // 135°
        expect(cos(5 * PI / 6).toJSNumber()).toBeCloseTo(-(root(3) / 2)); // 150°

        expect(cos(PI).toJSNumber()).toBeCloseTo(-1); // 180°
    })
})