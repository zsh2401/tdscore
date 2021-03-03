import IIterator from "../IIterator";
import IList from "./IList";
import LinkedList from "./LinkedList";
import ListBase from "./ListBase";

type GListElemType<E> = E | GList<E>;
/**
 * Is GList a linear structure?
 */
export default class GList<E> extends ListBase<GListElemType<E>> {

    size(): number {
        return this.getInnerList().size();
    }

    listDelete(position: number): void {
        this.getInnerList().listDelete(position);
    }
    listInsert(position: number, element: GListElemType<E>): void {
        this.getInnerList().listInsert(position, element);
    }
    listGet(position: number): GListElemType<E> {
        return this.getInnerList().listGet(position);
    }
    /**
     * 
     * @throws if the target is not a GList
     * @param position 
     */
    getAsGList(position: number): GList<E> {
        const v = this.listGet(position);
        if (isGList(v)) {
            return v;
        } else {
            throw new Error("the target is not glist.");
        }
    }

    getAsElement(position: number): E {
        const v = this.listGet(position);
        if (isNormalElement(v)) {
            return v;
        } else {
            throw new Error("the target is glist.");
        }
    }
    listSet(position: number, element: GListElemType<E>): void {
        this.getInnerList().listSet(position, element);
    }
    listAdd(element: GListElemType<E>): void {
        this.getInnerList().listAdd(element);
    }
    listClear(): void {
        this.getInnerList().listClear();
    }
    getIterator() {
        return this.getInnerList().getIterator();
    }

    private list: IList<GListElemType<E>> = new LinkedList<GListElemType<E>>();

    constructor(initialElems: E[] = []) {
        super();
        this.listAddAll(initialElems);
    }

    protected getInnerList() {
        return this.list;
    }
}

export function isGList<E>(element: GListElemType<E>): element is GList<E> {
    const fGlist = (<GList<E>>element);
    const clazzName: string | undefined = fGlist.getClassName && fGlist.getClassName();
    return clazzName === "GList";
}

export function isNormalElement<E>(element: GListElemType<E>): element is E {
    const fGlist = (<GList<E>>element);
    const clazzName: string | undefined = fGlist.getClassName && fGlist.getClassName();
    return clazzName !== "GList";
} 