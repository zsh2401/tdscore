import DSEvent, { EventArgs } from "./util/DSEvent";
import DSObject from "./DSObject";
import { hash } from "./util/hashing";

export class GettingEventArgs<T> extends EventArgs {
    prevent: boolean = false;
    value: T;
    constructor(value: T) {
        super();
        this.value = value;
    }
}
export class SettingEventArgs<T> extends EventArgs {
    prevent: boolean = false;
    newValue: T;
    constructor(value: T) {
        super();
        this.newValue = value;
    }
}
/**
 * Primitive指针
 */
export default class Ref<T extends number | boolean | string> extends DSObject {

    readonly setting: DSEvent<SettingEventArgs<T>> = new DSEvent();
    readonly getting: DSEvent<GettingEventArgs<T>> = new DSEvent();

    private _v: T;

    set value(value: T) {
        const args = new SettingEventArgs(value);
        this.setting.raise(this, args);
        if (!args.prevent) {
            this._v = args.newValue;
        }
    }

    get value() {
        const args = new GettingEventArgs(this._v);
        this.getting.raise(this, args);
        if (args.prevent) {
            throw new Error("Prevented");
        }
        return args.value;
    }

    constructor(value: T) {
        super();
        this._v = value;
    }

    getHashCode() {
        return hash(this._v);
    }

    toString() {
        return this._v + "";
    }
}