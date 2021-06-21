import { Ref } from "../../src"
import Color, { red, green, blue, alpha } from "../../src/math/Color"

describe("Color Test", () => {
    it("basic function test", () => {
        const color = new Ref<number>(0xff_00_ff_00)
        expect(red(color)).toBe(0xff)
    })
    it("basic build", () => {
        const color = new Color(19, 20, 21, 22)
        expect(color.red).toBe(19)
        expect(color.green).toBe(20)
        expect(color.blue).toBe(21)
        expect(color.alpha).toBe(22)
    })
})