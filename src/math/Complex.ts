import DSObject from "../DSObject";
import hashCode from "../util/hash";

export default class Complex extends DSObject {
    private readonly _real;
    private readonly _imaginary;
    toString() {
        let result = "";
        if (this.real != 0) {
            result += this.real;
        }
        if (this.imaginary != 0) {
            if (this.imaginary < 0) {
                result += "+";
            }
            result += this.imaginary + "i";
        }
        return `(${result})`;
    }
    get real() {
        return this._real;
    }
    get imaginary() {
        return this._imaginary;
    }
    constructor(real: number, imagnary: number) {
        super();
        this._real = real;
        this._imaginary = imagnary;
    }

    newHashCode() {
        return hashCode(this._real + " " + this._imaginary)
    }

    referenceEquals(other: any) {
        return this.getHashCode() === hashCode(other);
    }

    add(other: Complex): Complex {
        return Complex.add(this, other);
    }

    sub(other: Complex): Complex {
        return Complex.sub(this, other);
    }
    mul(other: Complex): Complex {
        return Complex.mul(this, other);
    }
    div(other: Complex): Complex {
        return Complex.div(this, other);
    }
    static plainAdd(a: number, b: number, c: number, d: number): [number, number] {
        return [a + c, b + d];
    }
    static plainSub(a: number, b: number, c: number, d: number): [number, number] {
        return [a - c, b - d];
    }
    static plainMul(a: number, b: number, c: number, d: number): [number, number] {
        return [a * c - b * d, b * c + a * d];
    }
    static plainDiv(a: number, b: number, c: number, d: number): [number, number] {
        return [(a * c + b * d) / (c * c + d * d), (b * c - a * d) / (c * c + d * d)];
    }
    static add(left: Complex, right: Complex) {
        const [real, im] = Complex.plainAdd(left.real, left.imaginary, right.real, right.imaginary);
        return new Complex(real, im);
    }
    static sub(left: Complex, right: Complex) {
        const [real, im] = Complex.plainSub(left.real, left.imaginary, right.real, right.imaginary);
        return new Complex(real, im);
    }
    static mul(left: Complex, right: Complex) {
        const [real, im] = Complex.plainMul(left.real, left.imaginary, right.real, right.imaginary);
        return new Complex(real, im);
    }
    static div(left: Complex, right: Complex) {
        const [real, im] = Complex.plainDiv(left.real, left.imaginary, right.real, right.imaginary);
        return new Complex(real, im);
    }
}