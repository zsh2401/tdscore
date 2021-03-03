import IIterable from "../IIterable";

export default function toJSArray<E, V = E>(iterable: IIterable<E>, covertor?: ((e: E) => V)): V[] {
    const iterator = iterable.getIterator();
    const v: V[] = [];
    while (iterator.hasNext()) {
        if (covertor) {
            v.push(covertor(iterator.next()));
        } else {
            //@ts-ignore
            v.push(iterator.next());
        }
    }
    return v;
}