/*
 * det.ts
 * Created on Tue Mar 23 2021 09:21:48
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

import IElementOperator from "./IElementOperator";
import RawMatrix from "./MatrixTypes";

//TODO

export default function<E>(m: RawMatrix<E>, operator: IElementOperator<E>): E {
    const fnp = (n: number): E => {
        const eles: E[] = [];
        for (let i = 0; i < m.length; i++) {
            const li = i;
            const lj = (m.length - i + n) % m.length;
            if (n === 2) {
                console.log(`p ${n} : ${li}-${lj} -> ${m[li][lj]} `);
            }

            eles.push(m[li][lj]);
        }

        if (eles.length > 0) {
            let v = eles[0];
            for (let i = 1; i < eles.length; i++) {
                v = operator.mul(v, eles[i]);
            }
            return v;
        } else {
            return operator.defaultValue;
        }
    };

    const fpp = (n: number): E => {
        const eles: E[] = [];
        for (let i = 0; i < m.length; i++) {
            const li = i;
            const lj = (i + n) % m.length;
            // console.log(`p ${n} : ${li}-${lj} -> ${m[li][lj]} `);
            eles.push(m[li][lj]);
        }

        if (eles.length > 0) {
            let v = eles[0];
            for (let i = 1; i < eles.length; i++) {
                v = operator.mul(v, eles[i]);
            }
            return v;
        } else {
            return operator.defaultValue;
        }
    };
    let result: E = operator.defaultValue;
    for (let n = 0; n < m.length; n++) {
        console.log(`p(${n}) p: ${fpp(n)}`);
        console.log(`p(${n}) n: ${fnp(n)}`);
        result = operator.add(result, fpp(n));
        result = operator.sub(result, fnp(n));
    }
    return result;
}
