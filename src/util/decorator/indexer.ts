/*
 * indexer.ts
 * Created on Tue Apr 05 2022 15:28:59
 *
 * Description: 
 *   No description.
 *
 * Copyright (c) 2022 tdscore
 * 
 * Copyright (c) 2022 Seymour Zhang and all contributors of this project.
 * tdscore is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *          http://license.coscl.org.cn/MulanPSL2
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */

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