import IList from "./IList";
import LinkedList from "./LinkedList";
import ListBase from "./ListBase";

type GListElemType<E> = E | GList<E>;

/**
 * Is GList a linear structure?
 */
export default class GList<E> extends LinkedList<GListElemType<E>> {

    constructor(initialElems: E[] = []) {
        super();
        this.listAddAll(initialElems);
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

    isNormalElementAt(position: number): boolean {
        if (isNormalElement(this.listGet(position))) {
            return true;
        } else {
            return false;
        }
    }

    isGListAt(position: number): boolean {
        if (isGList(this.listGet(position))) {
            return true;
        } else {
            return false;
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