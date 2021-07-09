import toString from "../../src/toString"
import DSObject from "../../src/DSObject"
describe("toString's test", () => {
    it("call es toString", () => {
        const target = {}
        expect(toString(target)).toBe(Object.prototype.toString.call(target))
    })
    it("call custom toString", () => {
        class A {
            toString() {
                return "Hello!"
            }
        }
        expect(toString(new A())).toBe("Hello!")
    })

    it("call DSObject#toString", () => {
        const obj = new DSObject()
        expect(toString(obj)).toBe(obj.toString())
    })
})