import DSNumber from "../../DSNumber";
import AbstractMartix from "./AbstractMartix";
export default class Martix extends AbstractMartix<number, Martix>{

    public constructor(data: number[][], sign: boolean = true) {
        super(data, sign);
    }
    newInstanceOf(data: number[][], sign: boolean) {
        return new Martix(data, sign);
    }
    det(): DSNumber {
        return DSNumber.ZERO;
    }
    protected elementPlus(a: number, b: number) {
        return (a ?? 0) + (b ?? 0);
    }
    protected elementSub(a: number, b: number) {
        return (a ?? 0) - (b ?? 0);
    }
    protected elementMul(a: number, b: number) {
        return (a ?? 0) * (b ?? 0);
    }
    protected elementDiv(a: number, b: number) {
        return (a ?? 0) / (b ?? 0);
    }
}