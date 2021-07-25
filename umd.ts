import * as tdscore from "./src/index"

const NAME = "tdscore"
const MOUNT_ROOT = typeof window === 'undefined' ? global : window;

(function (root, factory) {
    console.log("exporting")
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
}(MOUNT_ROOT, function () {

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return tdscore;
}));