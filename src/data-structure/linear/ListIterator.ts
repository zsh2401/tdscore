import IList from "./IList";
import IListIterator from "./IListIterator";

export default class ListIterator<E> implements IListIterator<E>{

    private list: IList<E>;
    private position: number = -1;

    constructor(list: IList<E>) {
        this.list = list
    }

    reset(): void {
        this.position = -1;
    }

    hasPrevious(): boolean {
        return this.list.size() > 0 && this.position > 0;
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
        return this.position + 1 < this.list.size();
    }

    next(): E {
        return this.list.listGet(++this.position);
    }

}