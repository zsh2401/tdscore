import { IIterator } from "../data-structure";

/*
 * RandomBooleanIterator.ts
 * Created on Fri Apr 16 2021 15:42:55
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
export default class RandomBooleanIterator implements IIterator<boolean>{

    reset(): void {

    }

    hasNext(): boolean {
        return true;
    }

    private _value: boolean = false;

    next(): boolean {
        const value = this._value
        this._value = Math.random() > 0.5
        return value;
    }

    current(): boolean {
        return this._value
    }

}