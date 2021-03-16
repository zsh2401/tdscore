// /*
//  * dfs.ts
//  * Created on Tue Mar 16 2021 08:49:42
//  *
//  * Description: 
//  *   No description.
//  *
//  * Copyright (c) 2021 tdscore
//  * 
//  * Copyright (c) 2021 Seymour Zhang and all contributors of this project.
//  * tdscore is licensed under Mulan PSL v2.
//  * You can use this software according to the terms and conditions of the Mulan PSL v2.
//  * You may obtain a copy of Mulan PSL v2 at:
//  *          http://license.coscl.org.cn/MulanPSL2
//  * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
//  * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
//  * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
//  * See the Mulan PSL v2 for more details.
//  */

// import Graph from "./SimpleGraph";
// import { Action1 } from "../../Action";
// import HashSet from "../HashSet";
// export default function dfs<E>(node: GraphNode<E>, consumer: Action1<GraphNode<E>>) {
//     _dfs(node, consumer, new HashSet());
// }
// function _dfs<E>(node: GraphNode<E>, consumer: Action1<GraphNode<E>>,
//     travered: HashSet<GraphNode<E>>) {
//     const iterator = node.out.getIterator();
//     while (iterator.hasNext()) {
//         const node = iterator.next().key;
//         if (!travered.contains(node)) {
//             consumer(node);
//             travered.setAdd(node);
//             _dfs(node, consumer, travered);
//         }
//     }
// }