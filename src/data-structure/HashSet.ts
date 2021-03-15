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

import DSObject from "../DSObject";
import CollectionBase from "./CollectionBase";
import HashMap from "./map/HashMap";
import ICollection from "./ICollection";
import ISet from "./ISet";

const PRESENT = new DSObject();
export default class HashSet<E>
    extends CollectionBase<E>
    implements ISet<E>, ICollection<E>{
    private innerMap: HashMap<E, any>;
    constructor() {
        super();
        this.innerMap = new HashMap();
    }
    setAdd(e: E): void {
        this.add(e);
    }
    setRemove(e: E): boolean {
        return this.remove(e);
    }
    collectionClear(): void {
        this.innerMap.collectionClear();
    }
    collectionAdd(e: E): void {
        this.add(e);
    }
    collectionRemove(e: E): boolean {
        return this.remove(e)
    }
    toArray() {
        return this.innerMap.mapGetKeys();
    }
    getIterator() {
        return this.innerMap.mapGetKeys().getIterator();
    }
    size() {
        return this.innerMap.size();
    }
    contains(e: E) {
        return this.innerMap.mapGetKeys().contains(e);
    }
    isEmpty() {
        return this.innerMap.isEmpty();
    }
    add(e: E) {
        this.innerMap.mapPut(e, PRESENT);
    }
    remove(e: E): boolean {
        return this.innerMap.mapRemove(e);
    }
    toString(): string {
        let str = "";
        const iterator = this.getIterator();
        while(iterator.hasNext()){
            str += iterator.next() + " ";
        }
        return str;
    }
}