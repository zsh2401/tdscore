import DSEvent, { EventArgs } from "./DSEvent";
import DSObject from "./DSObject";
import hashCode from "./util/hash";

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
        const args = new GettingEventArgs(this.value);
        this.getting.raise(this, args);
        if (args.prevent) {
            return args.value;
        } else {
            throw new Error("Prevented");
        }
    }

    constructor(value: T) {
        super();
        this._v = value;
    }

    getHashCode() {
        return hashCode(this._v);
    }
    
    toString() {
        return DSObject.toString(this._v);
    }
}