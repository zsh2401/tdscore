/*
 * ES6Map.ts
 * Created on Mon Apr 12 2021 09:09:32
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

import IIterable from "../IIterable";
import Chain from "../iterating/Chain";
import fromESIterator from "../iterating/fromESIterator";
import { IReadonlyKeyValuePair } from "./IMap";
import MapBase from "./MapBase";

export default class ES6Map<K, V> extends MapBase<K, V> {
    private readonly es6map = new Map<K, V>()
    mapGetKeys(): IIterable<K> {
        return fromESIterator(this.es6map.keys())
    }

    mapGetValues(): IIterable<V> {
        return fromESIterator(this.es6map.values())
    }

    mapGetPairs(): IIterable<IReadonlyKeyValuePair<K, V>> {
        return new Chain(this.mapGetKeys())
            .select<IReadonlyKeyValuePair<K, V>>((key: K) => {
                return { key, value: this.mapGet(key)! }
            })
            .asLinkedList()
    }

    mapPut(key: K, value: V): V | null {
        const oldValue = this.es6map.get(key) ?? null
        this.es6map.set(key, value)
        return oldValue;
    }

    mapGet(key: K): V | null {
        return this.es6map.get(key) ?? null;
    }

    mapRemove(key: K): void {
        this.es6map.delete(key)
    }

    size(): number {
        return this.es6map.size
    }
    collectionClear(): void {
        this.es6map.clear()
    }

}