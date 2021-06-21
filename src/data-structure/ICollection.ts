/*
 * ICollection.ts
 * Created on Mon Jun 21 2021 18:33:37
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
 */

import { Action1 } from "../Action";
import DSArray from "../DSArray";
import DSObject from "../DSObject";
import { Func1 } from "../Func";
import IIterable from "./IIterable";

/**
 * 集合的基础接口定义
 */
export default interface ICollection<E> extends DSObject, IIterable<E> {

    /**
   * 检查集合是否为只读
   * @returns 
   */
    collectionIsReadOnly(): boolean;

    /**
     * 向集合中新增一个元素
     * @param e 
     */
    collectionAdd(e: E): void;

    /**
     * 移除一个集合中的元素
     * @param e 
     */
    collectionRemove(e: E): boolean;

    /**
     * 清空集合
     */
    collectionClear(): void;

    /**
     * 获取任意一个集合内的元素
     * @returns 任意元素
     */
    collectionAny(): E;

    /**
     * 获取集合内的元素数量
     * @returns 
     */
    collectionSize(): number;

    /**
     * 判断集合是否为空
     * @returns 
     */
    collectionIsEmpty(): boolean;

    /**
     * 判断集合中是否包含某个元素
     * 其内部应当基于tdscore.equals方法
     * @param e 
     * @returns 
     */
    collectionContains(e: E): boolean;

    /**
     * 将元素内容复制到一个新的DSArray中
     */
    collectionToArray(): DSArray<E>;

    /**
     * 将集合内部元素复制到一个新的数组中
     */
    collectionToJSArray(): E[];

    /**
     * 遍历集合所有元素
     * @param consumer 
     */
    collectionForEach(consumer: Action1<E>): void;

    /**
     * 对集合内所有元素进行映射操作
     * @param consumer 
     */
    collectionMap<T>(consumer: Func1<E, T>): DSArray<T>;

}