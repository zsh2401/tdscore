import MixedArray from "../../MixedArray";

export default interface ISortAlgorithm<E> {
    (target: MixedArray<E>, comparer: IComparer<E>): void;
}

export interface IComparer<E> {
    /**
     * @returns Should exchange elements
     */
    (a: E, b: E): boolean;
}