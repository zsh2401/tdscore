import AbstractMartix from "./AbstractMartix";
export default class Martix extends AbstractMartix<number, Martix>{

    public constructor(data: number[][], sign: boolean = true) {
        super(data, {
            add: (a: number, b: number) => (a ?? 0) + (b ?? 0),
            sub: (a: number, b: number) => (a ?? 0) - (b ?? 0),
            divBy: (a: number, b: number) => (a ?? 0) / (b ?? 0),
            mul: (a: number, b: number) => (a ?? 0) * (b ?? 0),
            nagated: (x) => -x,
            defaultValue: 0
        }, sign);
    }
    newInstanceOf(data: number[][], sign: boolean) {
        return new Martix(data, sign);
    }
}