/*
 * connectNodes.ts
 * Created on Fri Apr 02 2021 11:29:16
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

import IGraphNode from "../../data-structure/graph/IGraphNode";

/**
 * 
 * 将两个节点进行连接
 * 
 * @param from 
 * @param to 
 * @param weight 
 * @param doubleLinked 
 */
export default function <E>
    (
        from: IGraphNode<E>,
        to: IGraphNode<E>,
        weight: number = 0,
        doubleLinked: boolean = true
    ) {

    from.out.collectionAdd({
        node: to,
        weight
    })

    if (doubleLinked) {
        to.in.collectionAdd({
            node: from,
            weight
        })
    }
}