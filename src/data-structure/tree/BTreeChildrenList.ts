/*
 * BTreeChildrenList.ts
 * Created on Tue Mar 23 2021 17:45:35
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

import { UngrowableArrayList } from "../linear";

/**
 * 专为二叉树设计的孩子列表
 */
export default class BTreeChildrenList<E> extends UngrowableArrayList<E>{
    constructor() {
        super(2)
    }

    listSet(position: number, element: E): void {
        if (position !== 1 && position !== 0) {
            this.throwIfOutOfRange(position);
        }
        this.array[position] = element;
    }

    protected throwIfOutOfRange(position: number) {
        if (position !== 1 && position !== 0) {
            throw new Error("Index out of bound!");
        }
    }

    listGet(position: number) {
        try {
            return super.listGet(position)
        } catch (err) {
            throw new Error("Element not exist!" + err);
        }
    }
}