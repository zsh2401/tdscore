import BigNumber from "bignumber.js"
import DSObject from "./DSObject";
import dsHashCode from "./dsHashCode";
import IArrayLike from "./IArrayLike";
import MixedNumber from "./MixedNumber";

const cache: DSNumber[] = [];
function initCache(factory: (num: number) => DSNumber) {
    for (let i = 0; i < 2 ** 8; i++) {
        cache[i] = factory(i - 128);
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
        } else {
            return super.equals(other);
        }
    }

    toBit(): IArrayLike<boolean> {
        return (this.toJSNumber() >>> 0).toString(2).split('').map((b) => {
            return b === "1" ? true : false;
        });
    }

    notEquals(other: any): boolean {
        return !this.equals(other);
    }


    pow(n: MixedNumber): DSNumber {
        // this.value.ex
        if (!DSNumber.valueOf(n).isInteger()) {
            const jv = typeof n === "number" ? Math.pow(this.value.toNumber(), n) : Math.pow(this.value.toNumber(), n.toJSNumber())
            return DSNumber.valueOf(jv)
        }
        return new DSNumber(this.value.pow(DSNumber.valueOf(n).value));
    }

    lessThan(other: MixedNumber): boolean {
        return this.value.isLessThan(DSNumber.valueOf(other).value);
    }

    lessThanOrEqualsTo(other: MixedNumber): boolean {
        return this.value.isLessThanOrEqualTo(DSNumber.valueOf(other).value);
    }

    greaterThan(other: MixedNumber): boolean {
        return this.value.isGreaterThan(DSNumber.valueOf(other).value);
    }

    greaterThanOrEqualsTo(other: MixedNumber): boolean {
        return this.value.isGreaterThanOrEqualTo(DSNumber.valueOf(other).value);
    }

    plus(other: MixedNumber): DSNumber {
        return new DSNumber(this.value.plus(DSNumber.valueOf(other).value));
    }

    sub(other: MixedNumber): DSNumber {
        return new DSNumber(this.value.minus(DSNumber.valueOf(other).value));
    }

    mul(other: MixedNumber): DSNumber {
        return new DSNumber(this.value.multipliedBy(DSNumber.valueOf(other).value));
    }

    dividedBy(other: MixedNumber): DSNumber {
        return new DSNumber(this.value.dividedBy(DSNumber.valueOf(other).value));
    }


    isPosivite(): boolean {
        return this.value.isPositive();
    }

    negated(): DSNumber {
        return new DSNumber(this.value.negated());
    }

    abs(): DSNumber {
        return DSNumber.valueOf(this.value.absoluteValue());
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

    isInteger(): boolean {
        return this.value.isInteger()
    }

    toJSNumber(): number {
        return this.value.toNumber();
    }

    newHashCode(): number {
        if (this.value.isInteger()) {
            return dsHashCode(this.toJSNumber());
        } else {
            return dsHashCode(this.decString());
        }
    }

    static valueOf(data: number | string | DSNumber | BigNumber): DSNumber {

        //如果是DSNumber
        const [isInCacheRange, indexInCache] = inCacheRange(data);
        if (isInCacheRange) {
            //初始化缓存
            if (cache[0] === undefined) {
                initCache((n) => new DSNumber(new BigNumber(n)));
            }
            return cache[indexInCache]
        } else if (data instanceof DSNumber) {
            return data;
        } else {
            return new DSNumber(new BigNumber(data));

        }
    }

    static v(data: number | string | DSNumber): DSNumber {
        return DSNumber.valueOf(data);
    }
}


function inCacheRange(data: number | string | DSNumber | BigNumber): [boolean, number] {
    let n = 1000;
    switch (typeof data) {
        case "string":
            n = Number.parseFloat(data)
            break;
        case "number":
            n = data;
            break;
        case "object":
            if (data instanceof DSNumber) {
                n = data.toJSNumber()
            } else {
                n = data.toNumber()
            }
            break;
    }

    if (Number.isInteger(n) && n >= -128 && n <= 127) {
        return [true, n + 128]
    } else {
        return [false, -1]
    }
}