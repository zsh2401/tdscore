import sin from "../../src/math/sin"
import { PI } from "../../src/math"
import root from "../../src/math/root";
import cos from "../../src/math/cos";
describe("Trigonometric function's test", () => {
    it("sin", () => {
        expect(sin(0)).toBeCloseTo(0); // 0°

        expect(sin(PI / 6)).toBeCloseTo(1 / 2); // 30°
        expect(sin(PI / 4)).toBeCloseTo(root(2) / 2); // 45°
        expect(sin(PI / 3)).toBeCloseTo(root(3) / 2); // 60°

        expect(sin(PI / 2)).toBeCloseTo(1); // 90°

        expect(sin(2 * PI / 3)).toBeCloseTo(root(3) / 2); // 120°
        expect(sin(3 * PI / 4)).toBeCloseTo(root(2) / 2); // 135°
        expect(sin(5 * PI / 6)).toBeCloseTo(1 / 2); // 150°

        expect(sin(PI)).toBeCloseTo(0); // 180°
    });

    it("cos", () => {
        expect(cos(0)).toBeCloseTo(1); // 0°

        expect(cos(PI / 6)).toBeCloseTo(root(3) / 2); // 30°
        expect(cos(PI / 4)).toBeCloseTo(root(2) / 2); // 45°
        expect(cos(PI / 3)).toBeCloseTo(1 / 2); // 60°

        expect(cos(PI / 2)).toBeCloseTo(0); // 90°

        expect(cos(2 * PI / 3)).toBeCloseTo(-(1 / 2)); // 120°
        expect(cos(3 * PI / 4)).toBeCloseTo(-(root(2) / 2)); // 135°
        expect(cos(5 * PI / 6)).toBeCloseTo(-(root(3) / 2)); // 150°

        expect(cos(PI)).toBeCloseTo(-1); // 180°
    })
})