import { UngrowableArrayList } from "../linear";

export default class BTreeChildrenList<E> extends UngrowableArrayList<E>{
    constructor() {
        super(2)
    }

    listSet(position: number, element: E): void {
        if (position !== 1 && position !== 0) {
            this.throwIfOutOfRange(position);
        }
        this.array[position] = element;
    }

    protected throwIfOutOfRange(position: number) {
        if (position !== 1 && position !== 0) {
            throw new Error("Index out of bound!");
        }
    }

    listGet(position: number) {
        try {
            return super.listGet(position)
        } catch (err) {
            throw new Error("Element not exist!" + err);
        }
    }
}