/*
 * LinkedList.ts
 * Created on Unknown
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

import ListBase from "./ListBase";
import IList from "./IList";
import IIterable from "../IIterable";
import asIterable from "../iterating/asIterable";
import ElementNotFoundError from "../ElementNotFoundError";
import ArgumentError from "../../ArgumentError";
interface LinkedListNode<E> {
    data: E | null;
    next: LinkedListNode<E> | null;
}
export default class LinkedList<E> extends ListBase<E> implements IList<E> {

    private readonly headNode: LinkedListNode<E> = {
        data: null,
        next: null,
    }

    private lastNode: LinkedListNode<E> = this.headNode;

    private _size = 0;

    size(): number {
        return this._size;
    }

    private findNode(position: number): LinkedListNode<E> {

        if (position === -1) {
            return this.headNode;
        }
        if (position < -1) {
            throw new ArgumentError("position")
        }
        let current: LinkedListNode<E> | null = this.headNode;
        for (let i = 0; i <= position && current; i++) {
            current = current.next;
        }
        if (current === this.headNode || current === null) {
            throw new ElementNotFoundError()
        }
        return current;
    }

    /**
     * O(n)
     * @param position O
     */
    listDelete(position: number): void {
        if (!Number.isInteger(position)) {
            throw new ArgumentError("the argument position should be integer")
        }
        this.throwIfIndexOutOfBound(position);
        const prev = this.findNode(position - 1);
        if (this.lastNode === prev.next) {
            this.lastNode = prev;
        }
        prev.next = prev.next?.next ?? null
        this._size--
    }

    listInsert(position: number, element: E): void {
        if (!Number.isInteger(position)) {
            throw new ArgumentError("the argument position should be integer")
        }
        const prev = this.findNode(position - 1)!;
        const newNode: LinkedListNode<E> = {
            next: prev.next ?? null,
            data: element,
        };
        if (newNode.next === null) {
            this.lastNode = newNode
        }
        prev.next = newNode;
        this._size++
    }

    isEmpty(): boolean {
        return this.headNode.next === null;
    }

    listGet(position: number): E {
        if (!Number.isInteger(position)) {
            throw new ArgumentError("the argument position should be integer")
        }
        if (position < 0) {
            throw new ArgumentError("position")
        }
        return this.findNode(position)?.data!;
    }

    listSet(position: number, element: E): void {
        if (!Number.isInteger(position)) {
            throw new ArgumentError("the argument position should be integer")
        }
        this.throwIfIndexOutOfBound(position);
        const node = this.findNode(position);
        if (node) {
            node.data = element;
        }
    }

    listAppend(iterable: IIterable<E>) {
        const i = iterable.getIterator()
        while (i.hasNext()) {
            this.listAdd(i.next())
        }
    }

    static from<E>(e: ArrayLike<E>): LinkedList<E> {
        const l = new LinkedList<E>()
        l.listAppend(asIterable(e))
        return l;
    }

    static fromR<E>(...e: E[]): LinkedList<E> {
        const l = new LinkedList<E>()
        l.listAppend(asIterable(e))
        return l;
    }

    /**
     * O(1)
     */
    listAdd(element: E): void {
        const newNode: LinkedListNode<E> = {
            data: element,
            next: null
        }

        this.lastNode.next = newNode;
        this.lastNode = newNode;
        this._size++
    }

    /**
     * O(1)
     */
    listClear(): void {
        this.lastNode = this.headNode;
        this.lastNode.next = null;
        this._size = 0
    }
}