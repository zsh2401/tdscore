/*
 * ESSet.ts
 * Created on Mon Apr 12 2021 11:05:33
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

import CollectionBase from "../CollectionBase";
import ESMap from "../map/ESMap";
import ICollection from "../ICollection";
import ISet from "./ISet";
import IMap from "../map/IMap";
import toDSArray from "../../ixa/toDSArrayForItertable";
import contains from "../../ixa/contains";
import DSArray from "../../DSArray";
import IIterator from "../IIterator";

const PRESENT = true
export default class ESSet<E>
    extends CollectionBase<E>
    implements ISet<E>, ICollection<E>{

    private innerMap: IMap<E, any>;

    constructor() {
        super();
        this.innerMap = new ESMap();
    }

    setClear(): void {
        this.innerMap.collectionClear()
    }

    setAdd(e: E): ESSet<E> {
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

    toArray(): DSArray<E> {
        return toDSArray(this.innerMap.mapGetKeys())
    }
    getIterator(): IIterator<E> {
        return this.innerMap.mapGetKeys().getIterator();
    }

    size(): number {
        return this.innerMap.collectionSize();
    }

    contains(e: E): boolean {
        return contains(this.innerMap.mapGetKeys(), e)
    }

    isEmpty(): boolean {
        return this.innerMap.collectionIsEmpty();
    }

    add(e: E): void {
        this.setAdd(e)
    }

    remove(e: E): boolean {
        return this.setRemove(e)
    }

    toString(): string {
        let str = "";
        const iterator = this.getIterator();
        while (iterator.hasNext()) {
            str += iterator.next() + " ";
        }
        return str;
    }
}