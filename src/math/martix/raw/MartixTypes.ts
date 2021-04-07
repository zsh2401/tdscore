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

export type RawMartix<E> = E[][]
export type RawVector<E> = ([E])[]
export type RawVector2<E> = [[E], [E]]
export type RawVector3<E> = [[E], [E], [E]]
export type RawTransformation2<E> = [[E, E], [E, E]]
export type RawTransformation3<E> = [[E, E, E], [E, E, E], [E, E, E]]

export default RawMartix;