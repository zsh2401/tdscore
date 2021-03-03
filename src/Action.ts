/*
 * Action.ts
 * Created on Wed Mar 03 2021 22:31:34
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
 * Mulan Permissive Software License，Version 2
 */

export default Action0;

export interface Action0 {
    (): void;
}
export interface Action1<A0> {
    (arg0: A0): void;
}
export interface Action2<A0, A1> {
    (arg0: A0, arg1: A1): void;
}
export interface Action3<A0, A1, A2> {
    (arg0: A0, arg1: A1, arg2: A2): void;
}
export interface Action4<A0, A1, A2, A3> {
    (arg0: A0, arg1: A1, arg2: A2, arg3: A3): void;
}