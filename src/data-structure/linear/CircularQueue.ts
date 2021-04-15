import DSArray from "../../DSArray";
import DSObject from "../../DSObject";
import toDSArray from "../iterating/toDSArrayForItertable"
import toJSArray from "../iterating/toJSArrayForItertable"
import IIterator from "../IIterator";
import IQueue from "./IQueue";
import { Action1 } from "../../Action";
import { Func1 } from "../../Func";
import first from "../iterating/first";

export default class CircularQueue<E> extends DSObject

    implements IQueue<E>
{
    private readonly capcity;
    private readonly array: DSArray<E>;
    private front: number = 0;
    private rear: number = 0;
    private readonly m;

    constructor(capcity: number) {
        super();
        capcity = Math.max(capcity, 0);
        this.m = capcity + 1;
        this.capcity = capcity;
        this.array = new DSArray(capcity);
    }
    forEach(consumer: Action1<E>) {
        this.array
    }
    map<T>(mapper: Func1<E, T>): DSArray<T> {
        return toDSArray(this, mapper);
    }
    collectionIsReadOnly(): boolean {
        return false;
    }
    collectionClear(): void {
        this.clear();
    }
    collectionAny(): E {
        return first(this);
    }
    collectionSize(): number {
        return this.size();
    }
    collectionIsEmpty(): boolean {
        return this.isEmpty();
    }
    collectionContains(e: E): boolean {
        return this.contains(e);
    }
    collectionToArray(): DSArray<E> {
        return toDSArray(this);
    }
    collectionToJSArray(): E[] {
        return toJSArray(this);
    }
    toJSArray(): E[] {
        return this.collectionToJSArray();
    }
    collectionAdd(e: E): void {
        this.queueEn(e);
    }
    collectionRemove(e: E): boolean {
        throw new Error("Method not support.");
    }
    isEmpty(): boolean {
        return this.front == this.rear;
    }
    toArray(): DSArray<E> {
        const result = new DSArray<E>(this.size());
        for (let i = this.front; i != this.front; (i + 1) % this.capcity) {
            result[i] = this.array[i];
        }
        return result;
    }
    contains(o: E): boolean {
        return this.array.contains(o);
    }
    clear(): void {
        this.front = this.rear = 0;
        for (let i = 0; i < this.array.length; i++) {
            this.array[i] = null!;
        }
    }
    size(): number {
        return (this.rear - this.front + this.m) % this.m;
    }
    queueGetHead(): E {
        return this.array[this.front];
    }
    private ensureOneMoreCapcity(): void {
        if (this.size() + 1 > this.capcity) {
            throw new Error("Lacking of capcity.");
        }
    }
    queueEn(e: E): void {
        this.ensureOneMoreCapcity();
        this.array[this.rear] = e;
        this.rear = (this.rear + 1) % this.m;
    }
    queueDe(): E {
        if (this.isEmpty()) {
            throw new Error("There is no element.");
        }
        const v = this.array[this.front];
        this.front = (this.front + 1) % this.m
        return v;
    }
    getIterator(): IIterator<E> {
        return this.toArray().getIterator();
    }

}