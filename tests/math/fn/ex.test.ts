import { ex } from "../../../src"

it("test", () => {
    expect(ex(1)).toBeCloseTo(Math.E)
})