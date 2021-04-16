import ListBase from "./ListBase";
import IList from "./IList";

import IIterable from "../IIterable";
import asIterable from "../iterating/asIterable";
import NoMoreElementError from "../NoMoreElementError";
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

    size(): number {
        let current = this.headNode;
        let _size = 0;
        while (current.next) {
            current = current.next;
            _size++;
        }
        return _size;
    }

    private findNode(position: number): LinkedListNode<E> {

        if (position === -1) {
            return this.headNode;
        }
        if (position < -1) {
            throw new ArgumentError("position")
        }
        let current: LinkedListNode<E> = this.headNode;
        for (let i = 0; i <= position; i++) {
            if (current.next) {
                current = current.next;
            } else {
                throw new ElementNotFoundError()
            }
        }
        if (current === this.headNode) {
            throw new ElementNotFoundError()
        }
        return current;
    }

    /**
     * O(n)
     * @param position O
     */
    listDelete(position: number): void {
        this.throwIfIndexOutOfBound(position);
        const prev = this.findNode(position - 1);
        if (prev) {
            this.lastNode = prev;
            const next = prev.next?.next;
            prev.next = next ?? null;
        } else {
            throw new RangeError("Node not found.");
        }
    }

    listInsert(position: number, element: E): void {
        // this.throwIfIndexOutOfBound(position);
        const prev = this.findNode(position - 1)!;
        const newNode: LinkedListNode<E> = {
            next: prev.next ?? null,
            data: element,
        };
        prev.next = newNode;
    }

    isEmpty(): boolean {
        return this.headNode.next === null;
    }

    listGet(position: number): E {
        if (position < 0) {
            throw new ArgumentError("position")
        }
        return this.findNode(position)?.data!;
    }

    listSet(position: number, element: E): void {
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
    }

    /**
     * O(1)
     */
    listClear(): void {
        this.lastNode = this.headNode;
        this.lastNode.next = null;
    }
}