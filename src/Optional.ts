/*
 * Optional.ts
 * Created on Sat Mar 06 2021 00:59:28
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

import DSObject from "./DSObject";

export default class Optional<E> extends DSObject {
    private readonly _innerValue: E | undefined | null;
    constructor(value?: E | null | undefined) {
        super();
        this._innerValue = value;
    }

    get isPresent() {
        return this._innerValue !== null && this._innerValue !== undefined;
    }

    get value(): E {
        if (!this.isPresent) {
            throw new Error("Value not presented!");
        }
        return this._innerValue!;
    }
}