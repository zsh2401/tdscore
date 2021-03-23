/*
 * DSEvent.ts
 * Created on Mon Mar 22 2021 10:55:17
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

import LinkedList from "./data-structure/linear/LinkedList";
import DSObject from "./DSObject";
import IList from "./data-structure/linear/IList";

/**
 * 事件处理器函数定义
 */
export interface EventHandler<TArgs> {
    /**
     * @param sender 为事件发送者，可空
     * @param args 事件参数
     */
    (sender: any, args: TArgs): void;
}

/**
 * 建议的事件参数
 */
export class EventArgs extends DSObject {

}

/**
 * 
 * 同步事件处理器
 * 具有如下特性:
 * 0. 当任意事件处理函数发生异常，不会影响其他函数
 * 1. 严格保证事件处理函数调用顺序
 * 
 */
export default class DSEvent<TEventArgs = EventArgs> extends DSObject {

    /**
     * 监听器
     */
    private readonly handlers: IList<EventHandler<TEventArgs>>;

    /**
     * 构造一个DSEvent函数
     */
    constructor() {
        super();
        this.handlers = new LinkedList<EventHandler<TEventArgs>>();
    }


    /**
     * 触发事件
     * @param sender 
     * @param args 
     */
    raise(sender: any, args: TEventArgs): void {
        const _size = this.handlers.size();
        for (let i = 0; i < _size; i++) {
            const handler = this.handlers.listGet(i)

            try {
                handler(sender, args)
            } finally {

            }
        }
    }

    /**
     * 添加监听器
     * @param handler 
     */
    add(handler: EventHandler<TEventArgs>) {
        this.handlers.collectionAdd(handler);
    }

    /**
     * 移除一个事件监听函数
     * @param handler 
     */
    remove(handler: EventHandler<TEventArgs>) {
        this.handlers.collectionRemove(handler);
    }

    /**
     * 清空所有事件监听函数
     */
    clear() {
        this.handlers.clear();
    }
}