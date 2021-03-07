
import IHashCodeGettable from "./util/hash/IHashCodeGettable";
import { getHashCodeString } from "./util/hash/hashcode.impl";
import _uuid from "./math/uuid";
import dsEquals from "./dsEquals";
import hashCode from "./util/hash";
import dsHashCode from "./dsHashCode";
import Nullable from "./Nullable";

/**
 * 所有本库内类的基类，其类似于Java，C#的Object或Objective-C中的NSObject。
 * 提供了@see {@link DSObject}
 */
export default class DSObject implements IHashCodeGettable {

    protected readonly uuid = _uuid();
    private __hashCode = 0;
    static readonly HASHSEED = "Burning Bright@-*&";

    protected newHashCode(): number {
        try {
            return getHashCodeString(JSON.stringify(this));
        } catch {
            return hashCode(DSObject.HASHSEED + this.constructor.name + this.uuid);
        }
    }

    getClassName() {
        return this.constructor.name;
    }

    getHashCode(): number {
        if (this.__hashCode === 0) {
            this.__hashCode = this.newHashCode();
        }
        return this.__hashCode;
    }

    static typeEquals(a: any, b: any): boolean {
        if (DSObject.isDSObject(a) && DSObject.isDSObject(b)) {
            return a.getClassName() === b.getClassName();
        }
        return false;
    }

    static isDSObject<T extends DSObject = DSObject>(e: any): e is T {
        return typeof (<DSObject>e).getClassName === "function";
    }

    referenceEquals(other: Nullable<DSObject>): boolean {
        return other !== null && other !== undefined && this.uuid === other.uuid && this === other;
    }

    equals(other: Nullable<DSObject>): boolean {
        return other !== null && other !== undefined && this.referenceEquals(other);
    }

    static equals(left: any, right: any) {
        return dsEquals(left, right);
    }

    static hashCode(value: any) {
        return dsHashCode(value);
    }

    static toString(value: any) {
        if (value instanceof DSObject) {
            return value.toString();
        } else {
            return "" + value;
        }
    }

    toString() {
        return `${__dirname}::${this.getClassName()}@${this.getHashCode()}`;
    }

    dsPrint() {
        console.log(this.toString());
    }

    dslog(message?: any, ...optionalParams: any[]) {
        console.log(message, optionalParams);
    }

    dserror(data: any[]) {
        console.error(data);
    }

}