/*
 * StopWatch.ts
 * Created on Sat Mar 06 2021 21:38:59
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

/**
 * StopWatch, designed for record time span.
 * 计时表，设计用于计时。
 */
export default class StopWatch extends DSObject {

    private _start: Date | null = null;
    private _end: Date | null = null;

    constructor() {
        super();
        this.end = this.end.bind(this);
        this.start = this.start.bind(this);
    }

    /**
     * Get total ms.
     */
    get totalMs(): number {
        if (this._start && this._end) {
            return this._end.getTime() - this._start.getTime();
        } else {
            throw new Error("Invalid state.");
        }
    }

    /**
     * Start this stopwatch
     */
    start() {
        this._start = new Date();
    }

    /**
     * Stop record.
     */
    end() {
        this._end = new Date();
    }

    /**
     * Clear record.
     */
    clear() {
        this._start = null;
        this._end = null;
    }
}