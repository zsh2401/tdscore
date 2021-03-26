/*
 * getColVectors.ts
 * Created on Sat Mar 27 2021 01:56:40
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
import RawMartix, { RawVector } from "./RawMartix";

//TODO 
export default function <E>(m: RawMartix<E>): RawVector<E>[] {
    const vectors: RawVector<E>[] = []
    m[0].forEach(e => {
        vectors.push([[e]])
    })
    for (let i = 1; i < m.length; i++) {
        for (let j = 0; j < m[0].length; j++) {
            vectors[j].push([m[i][j]])
        }
    }
    return vectors;
}