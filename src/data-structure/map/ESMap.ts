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

/**
 * 映射数据结构，基于ECMAScript原生Map，性能极高。
 */
export default class ESMap<K, V> extends MapBase<K, V> {

    private readonly esmap = new Map<K, V>()

    mapGetKeys(): IIterable<K> {
        return fromESIterator(this.esmap.keys())
    }

    mapGetValues(): IIterable<V> {
        return fromESIterator(this.esmap.values())
    }

    mapGetPairs(): IIterable<IReadonlyKeyValuePair<K, V>> {
        return new Chain(this.mapGetKeys())
            .select<IReadonlyKeyValuePair<K, V>>((key: K) => {
                return { key, value: this.mapGet(key)! }
            })
            .asLinkedList()
    }

    mapPut(key: K, value: V): V | null {
        const oldValue = this.esmap.get(key) ?? null
        this.esmap.set(key, value)
        return oldValue;
    }

    mapGet(key: K): V | null {
        return this.esmap.get(key) ?? null;
    }

    mapRemove(key: K): boolean {
        return this.esmap.delete(key)
    }

    size(): number {
        return this.esmap.size
    }
    collectionClear(): void {
        this.esmap.clear()
    }

}