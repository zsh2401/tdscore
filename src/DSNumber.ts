import BigNumber from "bignumber.js"
import DSObject from "./DSObject";
import dsHashCode from "./dsHashCode";

export type MixedNumber = DSNumber | number;

const cache: DSNumber[] = [];
function initCache(factory: (num: number) => DSNumber) {
    for (let i = 0; i < 2 ** 8; i++) {
        cache[i] = factory(i);
    }
}

// type CoreNumber =
/**
 * 支持任意精度计算的DSNumber包装类
 */
export default class DSNumber extends DSObject {

    static readonly ZERO = DSNumber.valueOf(0);
    static readonly E = DSNumber.valueOf(Math.E);
    static readonly PI = DSNumber.valueOf(Math.PI);
    static readonly ONE = DSNumber.valueOf(1);

    private readonly value: BigNumber;

    private constructor(value: BigNumber) {
        super();
        this.value = value;
    }

    toDSNumber() {
        return this;
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
            return this.value.isEqualTo(o.value);
        } else if (typeof other === "number") {
            return this.value.isEqualTo(other);
        }
        return super.equals(other);
    }

    toBit(): ArrayLike<boolean> {
        return (this.toJSNumber() >>> 0).toString(2).split('').map((b) => {
            return b === "1" ? true : false;
        });
    }

    notEquals(other: any): boolean {
        return !this.equals(other);
    }


    pow(n: MixedNumber): DSNumber {
        return new DSNumber(this.value.pow(n.toDSNumber().value));
    }

    lessThan(other: MixedNumber): boolean {
        return this.value.isLessThan(other.toDSNumber().value);
    }

    lessThanOrEqualsTo(other: MixedNumber): boolean {
        return this.value.isLessThanOrEqualTo(other.toDSNumber().value);
    }

    greaterThan(other: MixedNumber): boolean {
        return this.value.isGreaterThan(other.toDSNumber().value);
    }

    greaterThanOrEqualsTo(other: MixedNumber): boolean {
        return this.value.isGreaterThanOrEqualTo(other.toDSNumber().value);
    }

    plus(other: MixedNumber): DSNumber {
        return new DSNumber(this.value.plus(other.toDSNumber().value));
    }

    sub(other: MixedNumber): DSNumber {
        return new DSNumber(this.value.minus(other.toDSNumber().value));
    }

    mul(other: MixedNumber): DSNumber {
        return new DSNumber(this.value.multipliedBy(other.toDSNumber().value));
    }

    dividedBy(other: MixedNumber): DSNumber {
        return new DSNumber(this.value.dividedBy(other.toDSNumber().value));
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
        return this.value.toString(16);
    }

    binString(): string {
        return this.value.toString(2);
    }

    octString(): string {
        return this.value.toString(8);
    }

    decString(): string {
        return this.value.toString(10);
    }

    toJSNumber(): number {
        return this.value.toNumber();
    }

    newHashCode(): number {
        return dsHashCode(this.decString());
    }

    static valueOf(data: number | string | DSNumber): DSNumber {
        if (data instanceof DSNumber) {
            return data;
        }
        if (typeof data === "number" && data >= -128 && data <= 127 && Number.isInteger(data)) {
            if (cache[0] === undefined) {
                initCache((n) => new DSNumber(new BigNumber(n)));
            }
            return cache[data + 128];
        } else {
            return new DSNumber(new BigNumber(data));
        }
    }

    static v(data: number | string | DSNumber): DSNumber {
        return DSNumber.valueOf(data);
    }
}