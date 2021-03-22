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
import { hashCode } from "./util/hash";
import Nullable from "./Nullable";

/**
 * 所有本库内类的基类，其类似于Java，C#的Object或Objective-C中的NSObject。
 */
export default class DSObject implements IHashCodeGettable {

    /**
     * 标记对象的不变的UUID
     */
    protected readonly __dsuuid = _uuid();

    /**
     * 哈希码
     */
    private __hashCode = 0;

    /**
     * 哈希种子，将来可能会变更
     */
    static readonly HASHSEED = "Burning Bright@-*&";

    /**
     * 计算新的哈希码
     * @returns 
     */
    protected newHashCode(): number {
        try {
            return getHashCodeString(JSON.stringify(this));
        } catch {
            return hashCode(DSObject.HASHSEED + this.constructor.name + this.__dsuuid);
        }
    }

    /**
     * 获取类名(构造函数名)
     * @returns 
     */
    getClassName() {
        return this.constructor.name;
    }

    /**
     * 获取哈希码
     * 通常不建议覆写本函数，本函数中提供了缓存功能，为提高性能建议覆写newHashCode函数
     * @returns 
     */
    getHashCode(): number {
        if (this.__hashCode === 0) {
            this.__hashCode = this.newHashCode();
        }
        return this.__hashCode;
    }

    /**
     * 判断两个值的类型是否相等
     * @param a 
     * @param b 
     * @returns 
     */
    static typeEquals(a: any, b: any): boolean {
        if (DSObject.isDSObject(a) && DSObject.isDSObject(b)) {
            return a.getClassName() === b.getClassName();
        }
        return false;
    }

    /**
     * 判断某个值是否是DSObject
     * @param e 
     * @returns 
     */
    static isDSObject<T extends DSObject = DSObject>(e: any): e is T {
        return e instanceof DSObject;
    }

    /**
     * 判断当前对象是否与另一个对象引用相等
     * @param other 
     * @returns 
     */
    referenceEquals(other: Nullable<DSObject>): boolean {
        return other !== null && other !== undefined && this.__dsuuid === other.__dsuuid && this === other;
    }

    /**
     * 与另一个值进行对比
     * @param other 
     * @returns 
     */
    equals(other: any): boolean {
        return other !== null && other !== undefined && this.referenceEquals(other);
    }

    /**
     * 得到该对象的字符串化表示
     * @returns 
     */
    toString() {
        return `${__dirname}::${this.getClassName()}@${this.getHashCode()}`;
    }

}