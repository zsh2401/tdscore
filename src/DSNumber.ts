import Decimal from "decimal.js";
import DSObject from "./DSObject";
import dsHashCode from "./dsHashCode";

export type MixedNumber = DSNumber | number;

/**
 * 支持任意精度计算的DSNumber包装类
 */
export default class DSNumber extends DSObject {

    static readonly ZERO = DSNumber.valueOf(0);
    static readonly E = DSNumber.valueOf(Math.E);
    static readonly PI = DSNumber.valueOf(Math.PI);
    static readonly ONE = DSNumber.valueOf(1);

    private readonly value: Decimal;

    private constructor(value: Decimal) {
        super();
        this.value = value;
    }

    toString(): string {
        return this.value.toString();
    }

    isCloseTo(other: MixedNumber, p: number = 5): boolean {
        const maxDiff = 1 / (p ** 10);
        const actualDiff = this.sub(other).abs();
        return actualDiff.lessThan(maxDiff);
    }

    equals(other: any): boolean {
        if (DSObject.typeEquals(this, other)) {
            const o = other as DSNumber;
            return this.value.equals(o.value);
        } else if (typeof other === "number") {
            return this.value.equals(other);
        }
        return super.equals(other);
    }

    notEquals(other: any): boolean {
        return !super.equals(other);
    }

    sin(): DSNumber {
        return new DSNumber(this.value.sin());
    }

    pow(n: MixedNumber): DSNumber {
        return new DSNumber(this.value.pow(this.toDeciaml(n)));
    }

    lessThan(other: MixedNumber): boolean {
        return this.value.lessThan(this.toDeciaml(other));
    }

    lessThanOrEqualsTo(other: MixedNumber): boolean {
        return this.value.lessThanOrEqualTo(this.toDeciaml(other));
    }

    greaterThan(other: MixedNumber): boolean {
        return this.value.greaterThan(this.toDeciaml(other));
    }

    greaterThanOrEqualsTo(other: MixedNumber): boolean {
        return this.value.greaterThanOrEqualTo(this.toDeciaml(other));
    }

    plus(other: MixedNumber): DSNumber {
        return new DSNumber(this.value.plus(this.toDeciaml(other)));
    }

    sub(other: MixedNumber): DSNumber {
        return new DSNumber(this.value.sub(this.toDeciaml(other)));
    }

    mul(other: MixedNumber): DSNumber {
        return new DSNumber(this.value.mul(this.toDeciaml(other)));
    }

    dividedBy(other: MixedNumber): DSNumber {
        return new DSNumber(this.value.dividedBy(this.toDeciaml(other)));
    }

    private toDeciaml(o: MixedNumber): Decimal {
        if (typeof o === "number") {
            return new Decimal(o);
        } else {
            return o.value;
        }
    }

    isPosivite(): boolean {
        return this.value.isPositive();
    }

    negated(): DSNumber {
        return new DSNumber(this.value.negated());
    }

    abs(): DSNumber {
        return new DSNumber(this.value.absoluteValue());
    }

    hexString(): string {
        return this.value.toHex();
    }

    binString(): string {
        return this.value.toBinary();
    }

    octString(): string {
        return this.value.toOctal();
    }

    decString(): string {
        return this.value.toString();
    }

    toJSNumber(): number {
        return this.value.toNumber();
    }

    newHashCode(): number {

        return dsHashCode(this.decString());
    }

    static valueOf(data: number | string | DSNumber): DSNumber {
        if (DSNumber.isDSObject<DSNumber>(data)) {
            return data;
        }
        return new DSNumber(new Decimal(data));
    }

    static v(data: number | string | DSNumber): DSNumber {
        return DSNumber.valueOf(data);
    }
}
/**
 * The fastest way to covert your number to DSNumber!
 * @param data 
 */
export function asdn(data: number | string | DSNumber): DSNumber {
    return DSNumber.valueOf(data);
}