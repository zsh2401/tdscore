import "ts-jest"
import { contains, HashSet } from "../../../src"
it("contains value", () => {
    const set = new HashSet();
    set.add(1);
    expect(contains(set, 1)).toBeTruthy();
})

it("not contains", () => {
    const set = new HashSet();
    set.add(1);
    expect(contains(set, 2401)).toBeFalsy();
})

it("not contains element with equal hashcode", () => {
    const set = new HashSet();

    set.add("a");
    expect(contains(set, 97)).toBeFalsy();
})