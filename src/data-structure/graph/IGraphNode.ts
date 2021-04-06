/*
 * IGraphNode.ts
 * Created on Tue Apr 06 2021 08:57:54
 *
 * Description: 
 *   The design of graph based on linked graph
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

import ICollection from "../ICollection";

export interface IGraphNodeEdge<E> {
    node: IGraphNode<E>
    weight: number;
}

export default interface IGraphNode<E> {
    readonly in: ICollection<IGraphNodeEdge<E>>
    readonly out: ICollection<IGraphNodeEdge<E>>
    data: E
}