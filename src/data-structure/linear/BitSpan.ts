/*
 * BitSpan.ts
 * Created on Wed Mar 03 2021 23:54:13
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

import { ArrayList, IList } from ".";
import { IIterable, IIterator } from "..";
import { DSObject } from "../..";
import { Action1 } from "../../Action";
import DSArray from "../../DSArray";
import { MixedNumber } from "../../DSNumber";
import { Func1 } from "../../Func";
import ICollection from "../ICollection";
import { toDSArrayForItertable, toJSArrayForItertable } from "../iterating";

type Data = boolean[] | MixedNumber[] | DSArray<boolean> | DSArray<MixedNumber>;

//TODO
export default class BitSpan extends DSObject implements ICollection<boolean>, IIterable<boolean>{

    private list: DSArray<boolean>;

    constructor(data: boolean[]) {
        super();
        this.list = toDSArrayForItertable(data);
    }
    collectionIsReadOnly(): boolean {
        return true;
    }
    collectionAdd(e: boolean): void {
        throw new Error("Method not implemented.");
    }
    collectionRemove(e: boolean): boolean {
        throw new Error("Method not implemented.");
    }
    collectionClear(): void {
        throw new Error("Method not implemented.");
    }
    collectionAny(): boolean {
        throw new Error("Method not implemented.");
    }
    collectionSize(): number {
        throw new Error("Method not implemented.");
    }
    collectionIsEmpty(): boolean {
        throw new Error("Method not implemented.");
    }
    collectionContains(e: boolean): boolean {
        throw new Error("Method not implemented.");
    }
    collectionToArray(): DSArray<boolean> {
        throw new Error("Method not implemented.");
    }
    collectionToJSArray(): boolean[] {
        throw new Error("Method not implemented.");
    }
    forEach(consumer: Action1<boolean>): void {
        throw new Error("Method not implemented.");
    }
    map<T>(consumer: Func1<boolean, T>): DSArray<T> {
        throw new Error("Method not implemented.");
    }
    clear(): void {
        throw new Error("Method not implemented.");
    }
    size(): number {
        throw new Error("Method not implemented.");
    }
    isEmpty(): boolean {
        throw new Error("Method not implemented.");
    }
    toArray(): DSArray<boolean> {
        throw new Error("Method not implemented.");
    }
    toJSArray(): boolean[] {
        throw new Error("Method not implemented.");
    }
    contains(o: boolean): boolean {
        throw new Error("Method not implemented.");
    }

    static of(...rest: (boolean | MixedNumber)[]): BitSpan {
        const result = new ArrayList<boolean>(rest.length);
        rest.forEach(element => {
            if (typeof element === "boolean") {
                result.listAdd(element);
            } else {

            }
        });
        return new BitSpan(result.toJSArray());
    }
    static ofDSA(data: DSArray<(boolean | MixedNumber)>) {
        BitSpan.of(...toJSArrayForItertable(data))
    }

    moveRight(bit: number) {
        throw new Error("Method not implemented.");
    }

    moveLeft(bit: number) {
        throw new Error("Method not implemented.");
    }

    or(other: BitSpan): BitSpan {
        throw new Error("Method not implemented.");
    }

    and(other: BitSpan): BitSpan {
        throw new Error("Method not implemented.");
    }

    nor(other: BitSpan): BitSpan {
        throw new Error("Method not implemented.");
    }

    set(index: number, value: boolean): BitSpan {
        throw new Error("Method not implemented.");
    }

    setAll(value: boolean): BitSpan {
        throw new Error("Method not implemented.");
    }

    not(): BitSpan {
        throw new Error("Method not implemented.");
    }

    xor(other: BitSpan): BitSpan {
        throw new Error("Method not implemented.");
    }

    // toArray(): DSArray<number> {
    //     throw new Error("Method not implemented.");
    // }

    getIterator(): IIterator<boolean> {
        return this.list.getIterator();
    }

}