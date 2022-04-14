import Vector2 from "../../../src/math/matrix/Vector2"
import Transformation2 from "../../../src/math/matrix/Transformation2"
import { cos, sin, DEGREE_90, DEGREE_180 } from "../../../src/math"
import "ts-jest"
describe("Vector Test", () => {
    it("add", () => {
        const a = new Vector2(1, 1);
        const b = new Vector2(5, 10);
        const result = a.plus(b);
        expect(result.toArray()).toStrictEqual([
            [6],
            [11]
        ]);

        expect(result.mul(3).toArray()).toStrictEqual([
            [18],
            [33]
        ]);
    });

    it("Multiply a constant number", () => {
        expect(new Vector2(6, 11).mul(3).toArray()).toStrictEqual([
            [18],
            [33]
        ]);
    })

    it("2D transformation: no transformation", () => {
        const vector = new Vector2(1, 1);
        const uselessTransformation = new Transformation2(1, 0, 0, 1);
        const result = uselessTransformation.mul(vector);
        expect(result.toArray()).toStrictEqual([
            [1],
            [1]
        ]);
    });

    it("2D transformation: rotation", () => {
        const transform = (vector: Vector2, theta: number): Vector2 => {
            const t = new Transformation2(
                cos(theta),
                -sin(theta),
                sin(theta),
                cos(theta)
            );
            return vector.transform(t);
        };
        const right90 = transform(new Vector2(0, 1), DEGREE_90);
        expect(right90.x).toBeCloseTo(1);
        expect(right90.y).toBeCloseTo(0);

        const right180 = transform(new Vector2(0, 1), DEGREE_180);
        expect(right180.x).toBeCloseTo(0);
        expect(right180.y).toBeCloseTo(-1);

        const right270 = transform(new Vector2(0, 1), DEGREE_180 + DEGREE_90);
        expect(right270.x).toBeCloseTo(-1);
        expect(right270.y).toBeCloseTo(0);

        const right360 = transform(new Vector2(0, 1), DEGREE_180 * 2);
        expect(right360.x).toBeCloseTo(0);
        expect(right360.y).toBeCloseTo(1);

        const right90innerResult = new Vector2(0, 1).rotateClockwisely(90);
        expect(right90innerResult.equals(right90)).toBeTruthy()
    });

})