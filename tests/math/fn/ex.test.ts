import { math } from "../../../src"

it("test", () => {
    expect(math.ex(1).toJSNumber()).toBeCloseTo(Math.E)
})