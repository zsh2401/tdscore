import LinkedList from "./data-structure/linear/LinkedList";
import IList from "./data-structure/linear/IList";
import { EventArgs } from "./DSEvent";
import DSObject from "./DSObject";
import NotImplementedError from "./NotImplementedError";



/**
 * 异步事件处理器函数定义
 */
export interface AsyncEventHandler<TArgs> {
    /**
     * @param sender 为事件发送者，可空
     * @param args 事件参数
     */
    (sender: any, args: TArgs): void | Promise<void>;
}

/**
 * 
 * 异步事件处理器(暂未实现)
 * 具有如下特性:
 * 0. 当任意事件处理函数发生异常，不会影响其他函数
 * 1. 严格保证事件处理函数调用顺序
 * 
 */
//TODO waiting to be tested
export default class DSEvent<TEventArgs = EventArgs> extends DSObject {

    /**
     * 监听器
     */
    private readonly handlers: IList<AsyncEventHandler<TEventArgs>>;

    /**
     * 构造一个DSEvent函数
     */
    constructor() {
        super();
        this.handlers = new LinkedList<AsyncEventHandler<TEventArgs>>();
        throw new NotImplementedError()
    }


    /**
     * 触发事件，并等待每一个异步处理函数
     * @param sender 
     * @param args 
     */
    async raise(sender: any, args: TEventArgs): Promise<void> {
        const _size = this.handlers.size();
        for (let i = 0; i < _size; i++) {
            const handler = this.handlers.listGet(i)

            try {
                await handler(sender, args)
            } finally {

            }
        }
    }

    /**
     * 添加监听器
     * @param handler 
     */
    add(handler: AsyncEventHandler<TEventArgs>) {
        this.handlers.collectionAdd(handler);
    }

    /**
     * 移除一个事件监听函数
     * @param handler 
     */
    remove(handler: AsyncEventHandler<TEventArgs>) {
        this.handlers.collectionRemove(handler);
    }

    /**
     * 清空所有事件监听函数
     */
    clear() {
        this.handlers.clear();
    }
}