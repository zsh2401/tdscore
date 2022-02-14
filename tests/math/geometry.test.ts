import inRect from "../../src/math/geometry/inRect"
import Vector2 from "../../src/math/martix/Vector2"
describe("Geometry Test", () => {
    test("in rect", () => {

        const rect: [Vector2, Vector2, Vector2, Vector2] = [
            new Vector2(10, 10),
            new Vector2(100, 10),
            new Vector2(100, 100),
            new Vector2(10, 100)
        ]

        expect(inRect(new Vector2(20, 20), rect)).toBeTruthy()
        expect(inRect(new Vector2(1, 1), rect)).toBeFalsy()
    })
})