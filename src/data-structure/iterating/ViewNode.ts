import IIterator from "../IIterator";
import IIterable from "../IIterable";

export default class ViewNode<E> implements IIterable<E>{
    readonly data: E;
    next: ViewNode<E> | null;
    disabled:boolean = true;
    constructor(data: E, next: ViewNode<E> | null = null) {
        this.data = data;
        this.next = next;
    }
    getIterator(): IIterator<E> {
        if(this.disabled){
            return new UselessIterator<E>();
        }else{
            return new Iterator(this);
        }
    }
}
class UselessIterator<E> implements IIterator<E>{
    reset(): void {
        
    }
    hasNext(): boolean {
        return false;
    }
    next() :E{
        throw new Error("Method not implemented.");
    }
    current() :E{
        throw new Error("Method not implemented.");
    }
}
class Iterator<E> implements IIterator<E>{
    private readonly first: ViewNode<E>;
    private crt: ViewNode<E>;
    constructor(first: ViewNode<E>) {
        this.first = first;
        this.crt = first;
    }
    reset(): void {
        this.crt = this.first;
    }
    hasNext(): boolean {
        return this.crt.next !== null;
    }
    next(): E {
        const v = this.crt.data;
        this.crt = this.crt.next!;
        return v;
    }
    current(): E {
        return this.crt.data;
    }


}