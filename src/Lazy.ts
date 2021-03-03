import DSObject from "./DSObject";
import Func0 from "./Func"
export default class Lazy<R> extends DSObject {

    private readonly factory: Func0<R>;
    private _value:R | undefined = undefined;

    constructor(factory: (Func0<R> | R)) {
        super();
        this.factory = typeof factory === "function"? <Func0<R>>factory : ()=> <R>factory;
    }
    
    get value(): R {
        if (this._value === undefined) {
            this._value = this.factory();
        }
        
        return this._value;
    }
}