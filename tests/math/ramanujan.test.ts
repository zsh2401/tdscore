import { getPI } from "../../src/math/ramanujan"

describe("ramanujan", () => {
    it("equals to PI", () => {
        expect(getPI()).toBeCloseTo(Math.PI);
    })
})