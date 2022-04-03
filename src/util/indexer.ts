export interface IndexerCongfiguration {
    readonly getter?: string;
    readonly setter?: string;
}
//@ts-ignore
export default function (conf: IndexerCongfiguration) {
    return (clazz: any): any => {

        function _getter(target: any, p: any) {
            const [valid, index] = toValidIndex(p);
            if (valid && conf.getter) {
                return target[conf.getter](index);
            } else {
                return target[p];
            }
        }

        function _setter(target: any, p: string | symbol, value: any): boolean {
            const [valid, index] = toValidIndex(p);
            if (valid && conf.setter) {
                target[conf.setter](index, value);
            } else {
                target[p] = value;
            }
            return true;
        }


        const newClazz = function (...args: any[]): {} {
            const oldInstance = new clazz(...args);
            const handeler: ProxyHandler<any> = {
                get: _getter,
                set: _setter
            }
            return new Proxy(oldInstance, handeler);
        }

        // // newClazz extends clazz
        // newClazz.prototype = clazz.prototype;

        // copy static properties
        const staticProperties = Object.getOwnPropertyNames(clazz)
            .filter((prop: string)=>{
                return prop !== "length" && prop !== "name";
            });
        
            for (const key of staticProperties) {
            newClazz[key] = clazz[key];
        }

        //@ts-ignore
        return newClazz;
    }
}
function toValidIndex(symbol: any): [boolean, number] {
    if (typeof symbol === "string") {
        const index = Number.parseFloat(symbol)
        return [Number.isInteger(index), index]
    } else {
        return [false, 0];
    }
}