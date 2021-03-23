/**
 * Copyright (c) 2021 Seymour Zhang and other contributors.
 * tdscore is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *       http://license.coscl.org.cn/MulanPSL2
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 * Mulan Permissive Software License，Version 2
 */

export { default as DSNumber } from "./DSNumber"
export { default as DSArray } from "./DSArray"
export { default as DSObject } from "./DSObject"
export { default as DSEvent } from "./DSEvent"
export { default as dsEquals } from "./dsEquals"
export { default as equals } from "./dsEquals"
export { default as dsHashCode } from "./dsHashCode"
export { default as hashcode } from "./dsHashCode"
export { default as Lazy } from "./Lazy"
export { default as INotifyCollectionChanged } from "./INotifyCollectionChanged"
export { default as Ref } from "./Ref"
export { default as Nullable } from "./Nullable"
export { default as Optional } from "./Optional"
export { default as DSObjectType } from "./DSObjectType"
export { default as defaultOf } from './util/type/defaultOf'
export { default as StopWatch } from "./StopWatch"
export { default as MixedNumber } from "./MixedNumber"
export { default as AsyncDSEvent } from "./AsyncDSEvent"
export { default as ProtectedDSEvent } from "./ProtectedDSEvent"
export {
    default as IArrayLike,
    toJSArray,
    toDSArray
} from "./IArrayLike"

export * from "./Func"
export * from "./Action"

export * as algorithm from "./algorithm"
export * as math from "./math"
/**
 * @deprecated
 */
export * as DSMath from "./math"
export * as util from "./util"

export * from "./data-structure"

import "./ext"