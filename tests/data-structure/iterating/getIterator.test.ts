import "ts-jest"
import { DSArray, getIterator, IIterable, IIterator } from "../../../src"
it("for ECMA Script array", () => {
    const iterator = getIterator([1, 2, 3, 4])
    const buffer: number[] = [];
    while (iterator.hasNext()) {
        buffer.push(iterator.next());
    }
    expect(buffer).toStrictEqual([1, 2, 3, 4]);
})

it("for Itertable", () => {
    class A implements IIterable<any>{
        getIterator(): IIterator<any> {
            //@ts-ignore
            return "fuck"
        }
    }
    expect(getIterator(new A)).toBe("fuck");
})

it("for an element", () => {
    const iterator = getIterator("a")
    const buffer: string[] = [];
    while (iterator.hasNext()) {
        buffer.push(iterator.next());
    }
    expect(buffer).toStrictEqual(["a"]);
})

it("for DSArray", () => {
    const iterator = getIterator(DSArray.from([1, 2, 3, 4]))
    const buffer: number[] = [];
    while (iterator.hasNext()) {
        buffer.push(iterator.next());
    }
    expect(buffer).toStrictEqual([1, 2, 3, 4]);
})