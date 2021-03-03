import Martix from "../../src/math/linear-algebra/Martix";

describe("Martix", () => {


    it("Plus", () => {
        const a = new Martix([
            [1],
            [1]
        ]);

        const b = new Martix([
            [1],
            [1]
        ]);

        const result = a.plus(b);
        expect(result.at(0, 0)).toBe(2);
    });

    it("Complete", () => {
        const a = new Martix([
            [1, 2],
            [1],
            [1]
        ]);
        expect(a.row).toBe(3)
        expect(a.col).toBe(2)
        expect(a.toArray()).toStrictEqual([
            [1, 2],
            [1, 0],
            [1, 0]
        ]);
    })

    it("Mul", () => {
        const a = new Martix([
            [0, 2],
            [1, 0]
        ]);

        const b = new Martix([
            [-2],
            [0]
        ]);

        const c = a.mul(b);
        expect(c.row).toBe(a.row);
        expect(c.col).toBe(b.col);
        expect(c.toArray()).toStrictEqual([
            [0],
            [-2]
        ]);
    });

    it("Mul a number", () => {
        const a = new Martix([
            [1],
            [1]
        ]);

        const result = a.mul(3);
        expect(result.toArray()).toStrictEqual([
            [3],
            [3]
        ]);
    });

    it("exchange row", () => {
        const a = new Martix([
            [1, 2],
            [3, 4]
        ]);
        const result = a.exchangeRow(0, 1)
        const arrayResult = result.toArray();

        expect(result.getSign()).toBeFalsy();
        expect(arrayResult).toStrictEqual([
            [3, 4],
            [1, 2],
        ]);
    })

    it("exchange col", () => {
        const a = new Martix([
            [1, 2],
            [3, 4]
        ]);
        const result = a.exchangeCol(0, 1)
        const arrayResult = result.toArray();

        expect(result.getSign()).toBeFalsy();
        expect(arrayResult).toStrictEqual([
            [2, 1],
            [4, 3],
        ]);
    });


    it("inner add", () => {
        const a = new Martix([
            [1, 2],
            [3, 4]
        ]);
        const result = a.innerRowPlus(1, 0)
        const arrayResult = result.toArray();

        expect(arrayResult).toStrictEqual([
            [1, 2],
            [4, 6],
        ]);
    })

    // it("toString", () => {
    //     /**
    //     *  { 0,0, 0,1 }
    //     *  { 1,0, 1,1 }
    //     */
    //     const str = new Martix([
    //         [0, 0, 0, 1],
    //         [1, 0, 1, 1]
    //     ]).toHumanReadableString();
    //     console.log(str);
    //     expect(str.substr(13, 7)).toBe("{ 1,0, ");
    // })
})