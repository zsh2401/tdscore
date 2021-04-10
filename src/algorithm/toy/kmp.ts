import DSArray from "../../DSArray";
import IArrayLike from "../../IArrayLike";

export default function <E>(master: IArrayLike<E>, child: IArrayLike<E>,
    equator: (a: E, b: E) => boolean): number {

    const next = getNext(child)

    let dismatched = 0
    for (let i = 0; i < master.length; i++) {
        for (let i = 0; i < child.length; i++) {
            if(equator(master[i],child[i]))
        }
    }
}
function getNext<E>(child: IArrayLike<E>): DSArray<number> {

}