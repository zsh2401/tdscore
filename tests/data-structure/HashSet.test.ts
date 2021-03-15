import "ts-jest"
import { HashSet } from "../../src"
it("add repeated", () => {
    const set = new HashSet<string>();
    set.add("A");
    set.add("A");
    set.add("B");
    expect(set.size()).toBe(2);
    expect(set.contains("A")).toBeTruthy()
    expect(set.contains("B")).toBeTruthy()
    expect(set.contains("C")).toBeFalsy()
})

it("remove", () => {
    const set = new HashSet<string>();
    set.add("A");
    set.add("B");
    set.remove("A");
    expect(set.size()).toBe(1);
    expect(set.contains("A")).toBeFalsy()
    expect(set.contains("B")).toBeTruthy();
})

it("contains", () => {
    const set = new HashSet<number>();
    set.add(1);
    expect(set.contains(17)).toBeFalsy()
    expect(set.contains(1)).toBeTruthy()
    // expect(set.contains("B")).toBeFalsy()
})

it("clear", () => {
    const set = new HashSet<string>();
    set.add("A")
    set.add("B")
    set.clear()
    expect(set.isEmpty()).toBeTruthy()
})