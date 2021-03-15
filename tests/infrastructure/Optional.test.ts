import "ts-jest"
import { Optional } from "../../src";

it("Should passes the correct value", () => {
    expect(new Optional(2401).value).toBe(2401);
})


it("Should be presented", () => {
    expect(new Optional<number>(0).isPresent).toBeTruthy();
    expect(new Optional<boolean>(false).isPresent).toBeTruthy();
})

it("Should not be presented", () => {
    const opt = new Optional<number>(null);
    expect(opt.isPresent).toBeFalsy();

    const opt2 = new Optional<number>(void 0);
    expect(opt2.isPresent).toBeFalsy();
})

it("Should throw error when value not presented", () => {
    expect(() => {
        new Optional(null).value
    }).toThrow();
})