/**
 * Codes come from https://github.com/NoHomey/bind-decorator/blob/master/src/index.ts
 */
import { bind } from "../../../src/util/decorator"
import dsEquals from "../../../src/dsEquals"
describe("bind decorator", () => {
    it("bind", () => {
        class A {
            @bind
            f() {
                return this;
            }
            g() {
                return this;
            }
        }

        const a = new A();
        const af = a.f;
        const ag = a.g;

        expect(dsEquals(af(), a)).toBeTruthy();
        expect(dsEquals(ag(), a)).not.toBeTruthy();
    })
})