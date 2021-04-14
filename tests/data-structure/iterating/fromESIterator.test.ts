import "ts-jest"
import { fromESIterator } from "../../../src"
import toJSArray from "../../../src/data-structure/iterating/toJSArrayForItertable"
it("test all function", () => {
    const i = fromESIterator("abcdefg").getIterator()
    expect(i.hasNext()).toBeTruthy()
    expect(i.next()).toBe("a")
    expect(i.next()).toBe("b")
    expect(() => i.reset()).not.toThrow()
    expect(i.next()).toBe("a")
    i.next()
    i.next()
    i.next()
    i.next()
    i.next()
    i.next()
    expect(i.hasNext()).toBeFalsy()
    expect(() => i.next()).toThrow()
})
it("for string", () => {
    const a = toJSArray(fromESIterator("abcdefg"))
    expect(a).toStrictEqual(["a", "b", "c", "d", "e", "f", "g"])
})

it("two iterator", () => {
    
    const a = fromESIterator("abc")
    const b = fromESIterator("abc")
    const ai1 = a.getIterator()
    const ai2 = a.getIterator()
    const bi = b.getIterator()

    expect(ai1.next()).toBe("a")
    expect(ai2.next()).toBe("a")
    expect(bi.next()).toBe("a")

    expect(ai1.next()).toBe("b")
    expect(ai1.next()).toBe("c")

    expect(ai2.next()).toBe("b")
    expect(bi.next()).toBe("b")

    expect(ai2.next()).toBe("c")
    expect(bi.current()).toBe("b")
})