import * as tdscore from "./index"

const NAME = "tdscore"

//@ts-ignore
const MOUNT_ROOT = typeof window === 'undefined' ? global : window;

function umd(root: any, factory: any) {
    //@ts-ignore
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        //@ts-ignore
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)

        //@ts-ignore
        root[NAME] = factory();
    }
};

umd(MOUNT_ROOT, () => tdscore);