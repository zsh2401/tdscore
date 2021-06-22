import { fromESIterator, toJSArray, toJSArrayForItertable } from "../../../src"
import asIterable from "../../../src/ixa/asIterable"
import zip from "../../../src/ixa/zip"
it("combined", () => {
    const a = ["a", "b", "c", "d", "e"]
    const b = ["a", "b", "c", "d", "e"]
    const zipped = zip(asIterable(a), asIterable(b), (a1, a2) => a1 + a2)
    const result = toJSArrayForItertable<string>(zipped)
    expect(result).toStrictEqual(
        ["aa", "bb", "cc", "dd", "ee"]
    )
})
it("not same length", () => {
    const a = ["a", "b"]
    const b = ["a", "b", "c"]
    const zipped = zip(asIterable(a), asIterable(b), (a1, a2) => a1 + a2)
    const result = toJSArrayForItertable<string>(zipped)
    expect(result).toStrictEqual(
        ["aa", "bb"]
    )
})