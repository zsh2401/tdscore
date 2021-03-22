/*
 * RawMartix.ts
 * Created on Sun Mar 14 2021 01:21:37
 *
 * Description: 
 *   No description.
 *
 * Copyright (c) 2021 tdscore
 * 
 * Copyright (c) 2021 Seymour Zhang and all contributors of this project.
 * tdscore is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *          http://license.coscl.org.cn/MulanPSL2
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */

import DSNumber from "../DSNumber"
import MixedNumber from "../MixedNumber"

export type RawMartix<E> = E[][]
export type RawVector<E> = ([E])[]
export type RawVector2<E> = [[E], [E]]
export type RawVector3<E> = [[E], [E], [E]]
export type RawTransformation2<E> = [[E, E], [E, E]]
export type RawTransformation3<E> = [[E, E, E], [E, E, E], [E, E, E]]

export interface IElementOperator<E> {
    add(a: E, b: E): E
    sub(a: E, b: E): E
    mul(a: E, b: E): E
    divBy(a: E, b: E): E
    nagated(x: E): E;
    readonly defaultValue: E;
}
export const NumberOperator: IElementOperator<MixedNumber> = {
    add: (a: MixedNumber, b: MixedNumber): MixedNumber => {
        return DSNumber.valueOf(a).plus(b)
    },
    sub: (a: MixedNumber, b: MixedNumber): MixedNumber => {
        return DSNumber.valueOf(a).sub(b)
    },
    mul: (a: MixedNumber, b: MixedNumber): MixedNumber => {
        return DSNumber.valueOf(a).mul(b)
    },
    divBy: (a: MixedNumber, b: MixedNumber): MixedNumber => {
        return DSNumber.valueOf(a).dividedBy(b)
    },
    nagated: (x: MixedNumber): MixedNumber => {
        return x.toDSNumber().negated();
    },
    defaultValue: 0
}
export function martixAdd<E>(a: RawMartix<E>, b: RawMartix<E>,
    eleOperator: IElementOperator<E>): RawMartix<E> {
    const [am, an] = martixSizeOf(a)
    const [bn, bp] = martixSizeOf(b)
    if (!(am == bn && an == bp)) {
        throw new Error();
    }
    const result: RawMartix<E> = [];
    for (let i = 0; i < am; i++) {
        result[i] = [];
        for (let j = 0; j < an; j++) {
            result[i][j] = eleOperator.add(a[i][j], b[i][j]);
        }
    }
    return result;
}
export function martixSub<E>(a: RawMartix<E>, b: RawMartix<E>,
    eleOperator: IElementOperator<E>): RawMartix<E> {
    const [am, an] = martixSizeOf(a)
    const [bn, bp] = martixSizeOf(b)
    if (!(am == bn && an == bp)) {
        throw new Error();
    }
    const result: RawMartix<E> = [];
    for (let i = 0; i < am; i++) {
        result[i] = [];
        for (let j = 0; j < an; j++) {
            result[i][j] = eleOperator.sub(a[i][j], b[i][j]);
        }
    }
    return result;
}
export function martixMul<E>(a: RawMartix<E>, b: RawMartix<E>,
    eleOperator: IElementOperator<E>): RawMartix<E> {
    const [am, an] = martixSizeOf(a)
    const [bn, bp] = martixSizeOf(b)
    if (an !== bn) {
        throw new Error();
    }
    const result: RawMartix<E> = [];
    for (let i = 0; i < am; i++) {
        result[i] = [];
        for (let j = 0; j < bp; j++) {
            let rij: E = eleOperator.defaultValue;
            for (let n = 0; n < an; n++) {
                const term = eleOperator.mul(a[i][n], b[n][j])
                rij = rij === null ? term : eleOperator.add(rij, term)
            }
            result[i][j] = rij;
        }
    }
    return result;
}

//TODO
export function martixDet<E>(m: RawMartix<E>, operator: IElementOperator<E>): E {
    const fnp = (n: number): E => {
        const eles = [];
        for (let i = 0; i < m.length; i++) {
            const li = i;
            const lj = (m.length - i + n) % m.length;
            if (n === 2) {
                console.log(`p ${n} : ${li}-${lj} -> ${m[li][lj]} `);
            }

            eles.push(m[li][lj])
        }

        if (eles.length > 0) {
            let v = eles[0];
            for (let i = 1; i < eles.length; i++) {
                v = operator.mul(v, eles[i])
            }
            return v
        } else {
            return operator.defaultValue
        }
    }

    const fpp = (n: number): E => {
        const eles = [];
        for (let i = 0; i < m.length; i++) {
            const li = i;
            const lj = (i + n) % m.length;
            // console.log(`p ${n} : ${li}-${lj} -> ${m[li][lj]} `);
            eles.push(m[li][lj])
        }

        if (eles.length > 0) {
            let v = eles[0];
            for (let i = 1; i < eles.length; i++) {
                v = operator.mul(v, eles[i])
            }
            return v
        } else {
            return operator.defaultValue
        }
    }
    let result: E = operator.defaultValue;
    for (let n = 0; n < m.length; n++) {
        console.log(`p(${n}) p: ${fpp(n)}`);
        console.log(`p(${n}) n: ${fnp(n)}`);
        result = operator.add(result, fpp(n))
        result = operator.sub(result, fnp(n))
    }
    return result;
}

export function martixSizeOf<E>(m: RawMartix<E>): [number, number] {
    return [m.length, m.length > 0 ? m[0].length : 0]
}