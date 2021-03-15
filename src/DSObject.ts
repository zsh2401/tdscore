/*
 * DSObject.ts
 * Created on Wed Mar 10 2021 19:55:35
 *
 * Description: 
 *   No description.
 *
 * Copyright (c) 2021 tdscore
 * 
 * Copyright (c) 2021 Seymour Zhang and all contributors of this project.
 * tdscore is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *          http://license.coscl.org.cn/MulanPSL2
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 * Mulan Permissive Software License，Version 2
 */

import IHashCodeGettable from "./util/hash/IHashCodeGettable";
import { getHashCodeString } from "./util/hash/hashCodeForPrimitiveType";
import _uuid from "./math/uuid";
import dsEquals from "./dsEquals";
import { hashCode } from "./util/hash";
import dsHashCode from "./dsHashCode";
import Nullable from "./Nullable";

/**
 * 所有本库内类的基类，其类似于Java，C#的Object或Objective-C中的NSObject。
 * 提供了@see {@link DSObject}
 */
export default class DSObject implements IHashCodeGettable {

    protected readonly __dsuuid = _uuid();
    private __hashCode = 0;
    static readonly HASHSEED = "Burning Bright@-*&";

    protected newHashCode(): number {
        try {
            return getHashCodeString(JSON.stringify(this));
        } catch {
            return hashCode(DSObject.HASHSEED + this.constructor.name + this.__dsuuid);
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
        return e instanceof DSObject;
    }

    referenceEquals(other: Nullable<DSObject>): boolean {
        return other !== null && other !== undefined && this.__dsuuid === other.__dsuuid && this === other;
    }

    equals(other: Nullable<DSObject>): boolean {
        return other !== null && other !== undefined && this.referenceEquals(other);
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