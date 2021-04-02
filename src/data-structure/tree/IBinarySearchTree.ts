/*
 * IBinarySearchTree.ts
 * Created on Fri Apr 02 2021 10:10:55
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

import IBTreeNode from "./IBiTreeNode";
import PositionGuider from "../../algorithm/tree/PositionGuider"

/**
 * 二叉查找树定义
 */
export default interface IBinarySearchTree<E> {
    readonly root: IBTreeNode<E>
    /**
     * 插入
     * @param e 
     */
    insert(e: E): void

    /**
     * 删除节点
     * @param e 
     */
    delete(e: E): void

    /**
     * 搜索
     * @param guider 
     */
    search(guider: PositionGuider<E>): E | null;
}