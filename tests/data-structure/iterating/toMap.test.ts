import "ts-jest"
import { DSArray, toMap } from "../../../src"
import "../../../src/ext"
it("To map", () => {
    const map = toMap(DSArray.from([1, 2, 3]), item => item);

    expect(map.size()).toBe(3)
    expect(map.mapGetKeys().contains(1)).toBeTruthy()
    expect(map.mapGetKeys().contains(2)).toBeTruthy()
    expect(map.mapGetKeys().contains(3)).toBeTruthy()
    expect(map.mapGetKeys().contains(4)).toBeFalsy()
})