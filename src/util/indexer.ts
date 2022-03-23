//@ts-ignore
export default function (getter?: string, setter?: string) {
    return (clazz: any): any => {
        const newClazz = function (...args: any[]): {} {
            const oldInstance = new clazz(...args);
            const handeler: ProxyHandler<any> = {
                get: (target: any, p): any => {
                    try {
                        if (typeof p === "string") {
                            const index: number = Number.parseInt(p);
                            if (!Number.isNaN(index) && getter) {
                                return target[getter](index);
                            }
                        }
                        return target[p];
                    }catch{
                        return target[p];
                    }
                },
                set: (target: any, p, value):boolean => {
                    try {
                        if (typeof p === "string") {
                            const index: number = Number.parseInt(p);
                            if (!Number.isNaN(index) && setter) {
                                target[setter](index, value);
                                return true;
                            }
                        }
                    } catch {
                        
                    }
                    target[p] = value;
                    return true;
                }
            }
            return new Proxy(oldInstance, handeler);
        }
        newClazz.prototype = clazz.prototype;
        //@ts-ignore
        return newClazz;
    }
}
type ConstructorFunction = new (...args: any[]) => any;