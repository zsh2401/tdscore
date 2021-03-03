import dsEquals from "./dsEquals";
import DSObject from "./DSObject";
import hashCode from "./util/hash";

export default abstract class DSDataType<E> extends DSObject {

    protected readonly rawValue: E;
    protected constructor(value: E) {
        super();
        this.rawValue = value;
    }

    equals(other: DSObject | null | undefined): boolean {
        if (other instanceof DSDataType) {
            return dsEquals(this.value(), other.value());
        } else {
            return super.equals(other);
        }
    }

    newHashCode(): number {
        return hashCode(this.value()) | 0b101 << 25;
    }

    toString() {
        return "" + this.value();
    }

    value(): E {
        return this.rawValue;
    }
}