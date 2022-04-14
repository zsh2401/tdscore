import IClonable from "../../data-structure/IClonable";
import DSObject from "../../DSObject";
import IIterable from "../../data-structure/IIterable"
import IIterator from "../../data-structure/IIterator"
import defaultValue from "../../util/type/defaultOf";
import IElementOperator from "./raw/IElementOperator"
import matrixAdd from "./raw/add"
import matrixSub from "./raw/sub"
import matrixMul from "./raw/mul"
import RawMatrix from "./raw/MatrixTypes";
import getIterator from "../../ixa/getIterator";

export type RowIndex = number;
export type ColIndex = number;
//TODO waiting for more test cases.
export default abstract class
    AbstractMatrix<E, M extends AbstractMatrix<E, M>>/*
 * AbstractMatrix.ts
 * Created on Thu Apr 14 2022 14:13:44
 *
 * Description: 
 *   No description.
 *
 * Copyright (c) 2022 tdscore
 * 
 * Copyright (c) 2022 Seymour Zhang and all contributors of this project.
 * tdscore is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *          http://license.coscl.org.cn/MulanPSL2
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */

    extends DSObject
    implements IClonable<M>, IIterable<E>
{

    protected readonly data: RawMatrix<E>;
    readonly row: number;
    readonly col: number;
    private readonly elementOperator: IElementOperator<E>;

    protected constructor(data: RawMatrix<E>, elementOperator: IElementOperator<E>, sign: boolean = true) {
        super();
        [this.data, this.row, this.col] = AbstractMatrix.complete(data);
        this.sign = sign;
        this.elementOperator = elementOperator
    }

    /**
     * 补完矩阵，使其规则化
     * @param data 
     */
    protected static complete<E>(data: RawMatrix<E>): [RawMatrix<E>, number, number] {
        const [row, col] = AbstractMatrix.sizeof(data);
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
    protected static sizeof<E>(data: RawMatrix<E>): [number, number] {
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
        const newData = matrixAdd(this.data, other.data, this.elementOperator)
        return this.newInstanceOf(newData, this.sign);
    }

    sub(other: M): M {
        const newData = matrixSub(this.data, other.data, this.elementOperator)
        return this.newInstanceOf(newData, this.sign);
    }

    mul(other: E | M): M {
        const newData = matrixMul<E>(this.data, other instanceof AbstractMatrix ? other.data : other,
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