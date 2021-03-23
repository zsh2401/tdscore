import DSNumber from "../DSNumber";
import MixedNumber from "../MixedNumber";

export default interface DSFun {
    (x: MixedNumber): DSNumber
    fname?: string;
    range?: [MixedNumber, MixedNumber]
}