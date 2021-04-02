/*
 * dsEquals.ts
 * Created on Tue Mar 30 2021 08:37:52
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

import { hash } from "./util/hash";

/**
 * 万能的比较函数。
 * 当任意一个值有比较函数时，则调用其equals方法与另一值比较。
 * 当两个值类型不同时，不相等。
 * 
 * @param left 
 * @param right 
 * @returns 
 */
export default function equals(left: any, right: any): boolean {

    //任意值具有equals函数，则使用其equals函数与其他值对比
    if (typeof left?.equals === "function") {
        return left.equals(right);
    } else if (typeof right?.equals === "function") {
        return right.equals(left);
    }

    //如果类型不同，则必定不同
    if (typeof left !== typeof right) {
        return false;
    }

    //JS严格等，则相等
    if (left === right) {
        return true;
    } else {
        //最差的情况，对比其哈希值 *实验性
        const lHash = hash(left);
        const rHash = hash(right);
        return lHash === rHash;
    }

}