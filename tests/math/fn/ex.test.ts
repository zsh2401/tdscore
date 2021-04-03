import { ex } from "../../../src/math"

it("test", () => {
    expect(ex(1)).toBeCloseTo(Math.E)
})