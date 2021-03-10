import { DSObject } from "..";

export interface Resolver<T> {
    (data: T): void;
}
export interface Rejecter {
    (reason: any): void;
}
export interface ThenHandler<T> {
    (data: T): void;
}
export interface CatchHandler {
    (reason: any): void;
}
export interface FinnalyHandler {
    (): void;
}
export interface Executor<T> {
    (resolve: Resolver<T>, rejecter: Rejecter): void;
}
export type PromiseStatus = "pending" | "fullfilled" | "rejected";

export default class MyPromise<T> extends DSObject{

    private status: PromiseStatus = "pending";

    private readonly thenHandlers: ThenHandler<T>[] = [];
    private readonly catchHandler: CatchHandler[] = [];
    private readonly finallyHandler: FinnalyHandler[] = [];

    constructor(executor: Executor<T>) {
        super();
        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (reason: any) {
            this.reject(reason);
        }
    }

    private data: T | null = null;
    private errorReason: any = null;
    private resolve(data: T) {
        if (this.status === "pending") {
            this.data = data;
            this.thenHandlers.forEach((h) => {
                try {
                    h(data);
                } catch (err) {
                    this.reject(err);
                }
            });
            this.status = "fullfilled";
        }
    }

    private reject(reason: any) {
        if (this.status === "pending") {
            this.errorReason = reason;
            this.thenHandlers.forEach((h) => {
                try {
                    h(reason);
                } catch (err) {
                }
            });
            this.status = "rejected";
        }
    }

    then(h: ThenHandler<T>) {
        if (this.status === "pending") {
            this.thenHandlers.push(h);
        } else if (this.status === "fullfilled") {
            h(this.data!)
        }
    }

    catch(h: CatchHandler) {
        if (this.status === "pending") {
            this.catchHandler.push(h);
        } else if (this.status === "fullfilled") {
            h(this.errorReason)
        }
    }
    finally(h: FinnalyHandler) {
        if (this.status === "pending") {
            this.finallyHandler.push(h);
        } else if (this.status === "fullfilled") {
            h();
        }
    }

    static async any<T>(...promises: Promise<T>[]): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            let err = 0;
            promises.forEach(promise => {
                promise.then((data) => {
                    resolve(data);
                }).catch((reason) => {
                    if (++err === promises.length) {
                        reject(reason);
                    }
                });
            });
        });
    }
}