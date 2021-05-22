import IClonable from "../../data-structure/IClonable";
import toDSArray from "../../data-structure/iterating/toDSArrayForItertable";
import DSObject from "../../DSObject";
import IIterable from "../../data-structure/IIterable"
import IIterator from "../../data-structure/IIterator"
import defaultValue from "../../util/type/defaultOf";
import IElementOperator from "./raw/IElementOperator"
import martixAdd from "./raw/add"
import martixSub from "./raw/sub"
import martixMul from "./raw/mul"
import RawMartix from "./raw/MartixTypes";
import { getIterator } from "../../data-structure";

export type RowIndex = number;
export type ColIndex = number;
//TODO waiting for more test cases.
export default abstract class
    AbstractMartix<E, M extends AbstractMartix<E, M>>
    extends DSObject
    implements IClonable<M>, IIterable<E>
{

    protected readonly data: RawMartix<E>;
    readonly row: number;
    readonly col: number;
    private readonly elementOperator: IElementOperator<E>;

    protected constructor(data: RawMartix<E>, elementOperator: IElementOperator<E>, sign: boolean = true) {
        super();
        [this.data, this.row, this.col] = AbstractMartix.complete(data);
        this.sign = sign;
        this.elementOperator = elementOperator
    }

    /**
     * 补完矩阵，使其规则化
     * @param data 
     */
    protected static complete<E>(data: RawMartix<E>): [RawMartix<E>, number, number] {
        const [row, col] = AbstractMartix.sizeof(data);
        const defaultData: E = (row + col) >= 2
            ? defaultValue<E>(typeof data[0][0]) : defaultValue<E>("object");
        for (let r = 0; r < row; r++) {
            const row = data[r];
            if (row.length < col) {
                for (let i = row.length; i < col; i++) {
                    data[r][i] = defaultData;
                }
            }
        }
        return [data, row, col]
    }
    protected static sizeof<E>(data: RawMartix<E>): [number, number] {
        let row = data.length;
        let col = 0;
        if (row > 0) {
            for (let r = 0; r < row; r++) {
                const len = data[r].length;
                if (len > col) {
                    col = len
                }
            }
        }
        return [row, col];
    }

    getIterator(): IIterator<E> {
        return getIterator(reduceDimension(this.data))
    }

    clone(): M {
        return this.newInstanceOf(this.cloneData(), this.sign);
    }

    toString(): string {
        return this.toHumanReadableString();
    }

    toHumanReadableString(): string {
        let r = (this.sign ? "+" : "-") + "\n";
        for (let row = 0; row < this.data.length; row++) {
            r += "{ ";
            for (let col = 0; col < this.data[row].length; col++) {
                r += this.data[row][col];
                if (col < this.data[row].length - 1) {
                    r += ", "
                }
            }
            r += " }\n"
        }
        return r;
    }

    at(row: RowIndex, col: ColIndex, newValue?: E): E {
        if (newValue !== undefined) {
            this.data[row][col] = newValue
        }
        return this.data[row][col];
    }
    private sign: boolean = true;

    private cloneData(): E[][] {
        return this.data.map(row => row.map(d => d));
    }

    exchangeRow(aRowIndex: RowIndex, bRowIndex: RowIndex): M {
        const data = this.cloneData();
        const tmp = data[aRowIndex];
        data[aRowIndex] = data[bRowIndex];
        data[bRowIndex] = tmp;
        return this.newInstanceOf(data, !this.sign);
    }

    exchangeCol(aColIndex: ColIndex, bColIndex: ColIndex): M {
        const data = this.cloneData();
        for (let i = 0; i < data.length; i++) {
            const tmp = data[i][aColIndex];
            data[i][aColIndex] = data[i][bColIndex];
            data[i][bColIndex] = tmp;
        }
        return this.newInstanceOf(data, !this.sign);
    }

    toArray(): E[][] {
        return this.cloneData();
    }
    getSign(): boolean {
        return this.sign;
    }

    changeSign(newSign?: boolean) {
        newSign = newSign ?? !this.sign;
        return this.newInstanceOf(this.data, newSign);
    }

    innerRowOperate(targetRow: RowIndex, valueRow: RowIndex, calculator: (a: E, b: E) => E): M {
        const newData = this.cloneData();
        newData[targetRow] = newData[targetRow].map((value, colIndex) =>
            calculator(value, newData[valueRow][colIndex]));
        return this.newInstanceOf(newData, this.sign);
    }

    innerColOperate(targetCol: ColIndex, valueCol: ColIndex, calculator: (a: E, b: E) => E): M {
        const newData = this.cloneData();
        for (let i = 0; i < newData.length; i++) {
            const a = newData[i][targetCol];
            const b = newData[i][valueCol];
            newData[i][targetCol] = calculator(a, b);
        }
        return this.newInstanceOf(newData, this.sign);
    }

    innerColPlus(target: ColIndex, value: ColIndex): M {
        return this.innerColOperate(
            target, value, this.elementOperator.add.bind(this.elementOperator));
    }
    innerColSub(target: ColIndex, value: ColIndex): M {
        return this.innerColOperate(
            target, value, this.elementOperator.sub.bind(this.elementOperator));
    }
    innerColDiv(target: ColIndex, value: ColIndex): M {
        return this.innerColOperate(
            target, value, this.elementOperator.divBy.bind(this.elementOperator));
    }
    innerColMul(target: ColIndex, value: ColIndex): M {
        return this.innerColOperate(
            target, value, this.elementOperator.mul.bind(this.elementOperator));
    }

    innerRowPlus(targetRow: RowIndex, valueRow: RowIndex): M {
        return this.innerRowOperate(
            targetRow, valueRow, this.elementOperator.add.bind(this.elementOperator));
    }
    innerRowSub(targetRow: RowIndex, valueRow: RowIndex): M {
        return this.innerRowOperate(
            targetRow, valueRow, this.elementOperator.sub.bind(this.elementOperator));
    }
    innerRowDiv(targetRow: RowIndex, valueRow: RowIndex): M {
        return this.innerRowOperate(
            targetRow, valueRow, this.elementOperator.divBy.bind(this.elementOperator));
    }
    innerRowMul(targetRow: RowIndex, valueRow: RowIndex): M {
        return this.innerRowOperate(
            targetRow, valueRow, this.elementOperator.mul.bind(this.elementOperator));
    }

    plus(other: M): M {
        const newData = martixAdd(this.data, other.data, this.elementOperator)
        return this.newInstanceOf(newData, this.sign);
    }

    sub(other: M): M {
        const newData = martixSub(this.data, other.data, this.elementOperator)
        return this.newInstanceOf(newData, this.sign);
    }

    mul(other: E | M): M {
        const newData = martixMul<E>(this.data, other instanceof AbstractMartix ? other.data : other,
            this.elementOperator)
        return this.newInstanceOf(newData, this.sign);
    }

    protected abstract newInstanceOf(data: E[][], sign: boolean): M;
}

function reduceDimension<E>(data: E[][]): E[] {
    const r: E[] = [];
    data.forEach(row => row.forEach(v => r.push(v)));
    return r;
}