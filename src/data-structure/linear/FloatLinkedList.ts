import abs from "../../math/fn/abs";
import { asJSNumber } from "../../MixedNumber";
import NotImplementedError from "../../NotImplementedError";
import ListBase from "./ListBase";
interface Node<E> {
    prev: Node<E> | null;
    data: E;
    next: Node<E> | null;
}
interface Cursor<E> {
    position: number;
    node: Node<E>;
}
//TODO waiting to be implementd.
export default class FloatLinkedList<E> extends ListBase<E> {
    head: Node<E> = {
        prev: null,
        next: null,
        data: null!
    }
    cursor: Cursor<E> = {
        node: this.head,
        position: -1
    }
    last: Node<E> = this.head;
    private findNode(position: number) {
        if (position == -1) {
            return this.head;
        } else if (position < -1 || position >= this.__size) {
            throw new RangeError("Node not found.");
        }
        this.moveCursorTo(position);
        return this.cursor.node;
    }

    private autoMoveCursor(position: number): void {
        let distance = position - this.cursor.position;
        let direction: "left" | "right" = distance < 0 ? "left" : "right";
        distance = asJSNumber(abs(distance))
        const shouldReset = distance > position;

        if (shouldReset) {
            this.resetCursor();
            direction = "right";
        }
        for (let moved = 0; moved < distance; moved++) {
            if (direction === "left") {
                this.moveCursorToLeft();
            } else {
                this.moveCursorToRight();
            }
        }
    }
    private resetCursor() {
        this.cursor.position = -1;
        this.cursor.node = this.head;
    }
    private moveCursorToLeft() {
        if (this.cursor.node.prev) {
            this.cursor.position--;
            this.cursor.node = this.cursor.node.prev;
        }
    }
    private moveCursorToRight() {
        if (this.cursor.node.next) {
            this.cursor.position++;
            this.cursor.node = this.cursor.node.next;
        }
    }
    listDelete(position: number): void {
        this.throwIfIndexOutOfBound(position);
        const prev = this.findNode(position - 1);
        const next = prev.next?.next;
        if (prev) {
            prev.next = null;
        }
        if (next) {
            next.prev = prev;
        }
        this.decreaseSize();
    }
    listInsert(position: number, element: E): void {
        const target = this.findNode(position);
        const node: Node<E> = {
            prev: target.prev,
            data: element,
            next: target
        }
        target.prev!.next = node; 23
        target.prev = node;
        this.increaseSize();
    }
    listGet(position: number): E {
        this.throwIfIndexOutOfBound(position);
        return this.findNode(position).data;
    }
    listSet(position: number, element: E): void {
        this.throwIfIndexOutOfBound(position);
        this.findNode(position).data = element;
    }
    listAdd(element: E): void {
        const lastNode = this.findNode(this.listSize() - 1);
        const node: Node<E> = {
            prev: lastNode,
            data: element,
            next: null
        };
        lastNode.next = node;
        this.last = node;
        this.increaseSize();
    }
    listClear(): void {
        this.resetCursor();
        this.resetSize();
        this.head.next = null;
        this.last = this.head;
    }
    private __size = 0;
    private increaseSize() {
        this.__size++;
    }
    private decreaseSize() {
        this.__size--;
    }
    private resetSize() {
        this.__size = 0;
    }
    listSize(): number {
        return this.__size;
    }
    private moveCursorToLastNode() {
        this.cursor.node = this.last;
        this.cursor.position = this.listSize() - 1;
    }
    private optimizeCursor() {
        throw new NotImplementedError()
    }
    
    private moveCursorToFirst() {
        if (this.head.next !== null) {
            this.cursor.node = this.head.next;
            this.cursor.position = 0;
        } else {
            throw new Error("There is no first element.");
        }
    }
    private moveCursorToNext() {
        if (this.cursor.node.next) {
            this.cursor.node = this.cursor.node.next;
            this.cursor.position++;
        }
    }
    private moveCursorToPrev() {
        if (this.cursor.node.next) {
            this.cursor.node = this.cursor.node.next;
            this.cursor.position--;
        }
    }
    private moveCursorTo(position: number) {
        let distance = position - this.cursor.position;
        let direction: "left" | "right" = distance < 0 ? "left" : "right";
        distance = asJSNumber(abs(distance))
        const shouldReset = distance > position;

        if (shouldReset) {
            this.resetCursor();
            direction = "right";
        }
        for (let moved = 0; moved < distance; moved++) {
            if (direction === "left") {
                this.moveCursorToPrev();
            } else {
                this.moveCursorToNext();
            }
        }
    }
}
