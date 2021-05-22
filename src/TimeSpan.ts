/*
 * TimeSpan.ts
 * Created on Sat May 22 2021 12:49:11
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

import NotImplementedError from "./NotImplementedError";

export default class TimeSpan {
    private readonly _totalMS: number;
    constructor(ms: number) {
        this._totalMS = ms
    }
    
    get totalMS(): number {
        return this._totalMS
    }

    get days(): number {
        throw new NotImplementedError()
    }

    get hours(): number {
        throw new NotImplementedError()
    }

    get minutes(): number {
        throw new NotImplementedError()
    }

    get seconds(): number {
        throw new NotImplementedError()
    }

    get ms(): number {
        throw new NotImplementedError()
    }

}