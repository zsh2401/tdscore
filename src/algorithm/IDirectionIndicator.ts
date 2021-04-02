/*
 * PositionGuider.ts
 * Created on Tue Mar 30 2021 16:55:10
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

/**
 * DirectionIndicator
 * 方向指示器
 */
export default interface IDirectionIndicator<E> {

    /**
     * 
     * 返回正数，表示当前值大于查找目标，负数表示当前值小于查找目标，等于则表示找到该目标。
     * 
     * @returns positive number if e greater than the unknown number, zero if equals and negative number if e less than the unknownn umber.
     */
    (e: E): number;
}
