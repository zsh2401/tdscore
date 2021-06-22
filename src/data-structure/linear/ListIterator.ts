import IList from "./IList";
import IListIterator from "./IListIterator";

export default class ListIterator<E> implements IListIterator<E>{

    private list: IList<E>;
    private position: number;

    constructor(list: IList<E>) {
        this.list = list
        this.position = -1
    }

    reset(): void {
        this.position = -1;
    }

    hasPrevious(): boolean {
        return this.list.listSize() > 0 && this.position > 0;
    }

    previous(): E {
        return this.list.listGet(--this.position);
    }

    getPosition(): number {
        return this.position;
    }

    current(): E {
        return this.list.listGet(this.position);
    }

    hasNext(): boolean {
        return this.position + 1 < this.list.listSize();
    }

    next(): E {
        return this.list.listGet(++this.position);
    }

}