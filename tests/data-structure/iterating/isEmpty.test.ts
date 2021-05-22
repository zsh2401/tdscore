import "ts-jest"
import { HashSet, isEmpty } from "../../../src"

it("Is empty", () => {
    const set = new HashSet()
    expect(isEmpty(set)).toBeTruthy()
})

it("Is not empty", () => {
    const set = new HashSet()
    set.add(1)
    expect(isEmpty(set)).toBeFalsy()
})