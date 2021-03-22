import DSNumber, { MixedNumber } from "../DSNumber";

export default interface DSFun {
    (x: MixedNumber): DSNumber
    fname?: string;
    range?: [MixedNumber, MixedNumber]
}