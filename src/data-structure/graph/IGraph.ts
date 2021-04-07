/*
 * IGraph.ts
 * Created on Wed Apr 07 2021 19:19:29
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

import IIterable from "../IIterable";
import IGraphEdge from "./IGraphEdge";

/**
 * 图
 */
export default interface IGraph<E> {

    /**
     * 顶点集，只读
     */
    readonly vertices: IIterable<E>

    /**
     * 边集，只读
     */
    readonly edges: IIterable<IGraphEdge<E>>

    /**
     * 添加顶点
     * @param e 
     */
    addVertix(e: E): void

    /**
     * 移除顶点
     * @param e 
     */
    removeVertix(e: E): void

    /**
     * 添加一条边
     * @param from 始点，必须确保其存在于顶点集
     * @param to 终点，必须确保其存在于顶点集
     * @param weight 权重/消费，默认为0
     */
    addEdge(from: E, to: E, weight?: number): void

    /**
     * 移除一条边
     * @param from 始点，必须确保其存在于顶点集
     * @param to 终点，必须确保其存在于顶点集
     */
    removeEdge(from: E, to: E): void

    /**
     * 获取所有终点为e的边的起点
     * @param e 终点
     */
    inOf(e: E): IIterable<E>

    /**
     * 获取所有起点为e的边的终点
     * @param e 起点
     */
    outOf(e: E): IIterable<E>

    /**
     * 获取某一条边的权重
     * @param from 
     * @param to 
     * @returns 如果边不存在，则返回无穷 Number.POSITIVE_INFINITY
     */
    weightOf(from: E, to: E): number
}