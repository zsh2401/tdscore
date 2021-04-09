/*
 * hashForEdge.ts
 * Created on Wed Apr 07 2021 19:20:54
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

import hash from "../../util/hashing";
import IGraphEdge from "./IGraphEdge";

/**
 * Hash function designed for graph edges.
 * @param edge 
 * @returns 
 */
export default function hashForEdge<E>(edge: IGraphEdge<E>) {
    return (hash(edge.from) << 16) ^ hash(edge.to)
}