/*
 * toTreeNode.ts
 * Created on Mon Mar 15 2021 15:32:41
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

import Tree from "./Tree";
import ITreeNode from "./ITreeNode";

/**
 * 将多远的树定义转化为更易处理的根节点
 * @param tree 
 * @returns 
 */
export default function <E>(tree: Tree<E>):
    ITreeNode<E> | null {
    if (tree === null || tree === undefined) {
        return null;
    } else {
        //@ts-ignore
        return (tree.root !== undefined) ? tree.root : tree;
    }
}