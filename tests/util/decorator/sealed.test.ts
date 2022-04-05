import "ts-jest"
import { sealed } from "../../../src/util/decorator";
describe("seal", () => {
    it("is sealed", () => {
        @sealed
        class A { }
        class B{}

        expect(Object.isSealed(A)).toBeTruthy();
        expect(Object.isSealed(B)).toBeFalsy();
    })
});