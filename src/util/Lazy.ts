import DSObject from "../DSObject";
import Func0 from "../Func"

/**
 * 懒加载器
 */
export default class Lazy<R> extends DSObject {

    /**
     * 工厂函数
     */
    private factory: Func0<R> | null = null;

    /**
     * 缓存
     */
    private _value: R | undefined = undefined;

    /**
     * 构造一个懒加载器
     * @param factory 
     */
    constructor(factory: (Func0<R> | R)) {
        super();
        this.factory = typeof factory === "function" ? <Func0<R>>factory : () => <R>factory;
    }

    /**
     * 获取值，第一次获取时将调用工厂函数，而后的调用将直接使用缓存
     */
    get value(): R {
        if (this.factory !== null) {
            this._value = this.factory();
            //抛弃
            this.factory = null
        }
        return this._value!;
    }
}