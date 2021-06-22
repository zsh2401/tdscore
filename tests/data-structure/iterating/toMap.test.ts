import "ts-jest"
import { contains, DSArray, toMap } from "../../../src"
it("To map", () => {
    const map = toMap(DSArray.from([1, 2, 3]), item => item);

    expect(map.collectionSize()).toBe(3)
    expect(contains(map.mapGetKeys(), 1)).toBeTruthy()
    expect(contains(map.mapGetKeys(), 2)).toBeTruthy()
    expect(contains(map.mapGetKeys(), 3)).toBeTruthy()
    expect(contains(map.mapGetKeys(), 4)).toBeFalsy()
})