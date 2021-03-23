/*
 * Tree.ts
 * Created on Tue Mar 23 2021 17:43:09
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

import ITreeNode from "./ITreeNode";
import IRootGettable from "./IRootGettable";

/**
 * 指示一棵树
 * 为null或undefined时视为空树，否则视为非空树
 */
type Tree<E> = IRootGettable<E> | ITreeNode<E> | null | undefined;
export default Tree;