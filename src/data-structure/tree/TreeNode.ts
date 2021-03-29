/*
 * TreeNode.ts
 * Created on Mon Mar 29 2021 19:45:16
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
import DSObject from "../../DSObject";
import Lazy from "../../Lazy";
import IList from "../linear/IList";
import LinkedList from "../linear/LinkedList";
import Nullable from "../../Nullable";

/**
 * 标准的树节点实现
 */
export default class TreeNode<E> extends DSObject implements ITreeNode<E>{

    parent: Nullable<ITreeNode<E>> = null
    data: E;

    protected lchildren: Lazy<LinkedList<ITreeNode<E>>>;

    get children(): IList<ITreeNode<E>> {
        return this.lchildren.value
    }

    constructor(data: E) {
        super()
        this.data = data
        this.lchildren = new Lazy(() => new LinkedList())
    }

}