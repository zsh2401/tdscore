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

import { HashMap } from "..";
import DSObject from "../DSObject";
import InvalidStateError from "../InvalidStateError";

/**
 * StopWatch, designed for record time span.
 * 计时表，设计用于计时。
 */
export default class StopWatch extends DSObject {

    private _passed: number = 0;
    private _resumed: number = -1;
    private _end: number = -1;
    private readonly map: HashMap<string, number>;

    constructor() {
        super();
        this.map = new HashMap()
    }

    /**
     * Get total ms.
     */
    get totalMs(): number {
        return this.getRecord()
    }

    /**
     * Start this stopwatch
     */
    start() {
        if (this._end !== -1) {
            throw new InvalidStateError("StopWatch has been started already.")
        }
        this._resumed = Date.now()
    }

    /**
     * Pause timing.
     */
    pause() {
        this._passed += Date.now() - this._resumed;
    }

    /**
     * make a record
     * @param key 
     */
    record(key: string) {
        const t = this._passed + Date.now() - this._resumed
        this.map.mapPut(key, t)
    }

    getRecord(key?: string): number {
        if (key) {
            return this.map.mapGet(key) ?? 0;
        } else {
            const end = this._end === -1 ? Date.now() : this._end
            return end - this._resumed + this._passed
        }
    }

    /**
     * Stop record.
     */
    end() {
        if (this._resumed !== -1) {
            this._end = Date.now()
        } else {
            throw new InvalidStateError("StopWatch has not been started.");
        }
    }

    /**
     * Clear record.
     * @deprecated use reset() to instead
     */
    clear() {
        this.reset()
    }

    /**
     * Reset the stopwatch
     */
    reset() {
        this._resumed = -1;
        this._end = -1;
        this.map.collectionClear();
    }
}