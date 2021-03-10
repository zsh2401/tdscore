import "ts-jest"
import { seal } from "../../../src/util/type";
describe("seal", () => {
    it("Seald", () => {
        @seal
        class A { }
        class B{}

        expect(Object.isSealed(A)).toBeTruthy();
        expect(Object.isSealed(B)).toBeFalsy();
    })
});