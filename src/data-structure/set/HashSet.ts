/*
 * HashSet.ts
 * Created on Wed Mar 10 2021 19:54:31
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

import CollectionBase from "../CollectionBase";
import ICollection from "../ICollection";
import ISet from "./ISet";
import ESHashMap from "../map/ESHashMap";
import IMap from "../map/IMap"
import toDSArray from "../iterating/toDSArrayForItertable";
import contains from "../iterating/contains";
import { HashMap } from "../map";

const PRESENT = true
export default class HashSet<E>
    extends CollectionBase<E>
    implements ISet<E>, ICollection<E>

{

    private innerMap: IMap<E, any> = new ESHashMap();


    setClear() {
        this.innerMap.clear()
    }

    setAdd(e: E): HashSet<E> {
        this.innerMap.mapPut(e, PRESENT)
        return this;
    }

    setRemove(e: E): boolean {
        return this.innerMap.mapRemove(e)
    }

    collectionClear(): void {
        this.setClear()
    }

    collectionAdd(e: E): void {
        this.setAdd(e)
    }

    collectionRemove(e: E): boolean {
        return this.setRemove(e)
    }

    toArray() {
        return toDSArray(this.innerMap.mapGetKeys())
    }

    getIterator() {
        return this.innerMap.mapGetKeys().getIterator();
    }

    size() {
        return this.innerMap.size();
    }

    contains(e: E) {
        return contains(this.innerMap.mapGetKeys(), e);
    }

    isEmpty() {
        return this.innerMap.isEmpty();
    }

    add(e: E) {
        this.setAdd(e)
    }

    remove(e: E): boolean {
        return this.setRemove(e)
    }

    toString(): string {
        let str = "";
        const iterator = this.getIterator();
        while (iterator.hasNext()) {
            str += iterator.next() + ",";
        }
        return `HashSet{ ${str} }`;
    }
}