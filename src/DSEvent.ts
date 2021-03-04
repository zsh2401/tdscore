import LinkedList from "./data-structure/linear/LinkedList";
import HashSet from "./data-structure/HashSet";
import ICollection from "./data-structure/ICollection";
import ISet from "./data-structure/ISet";
import DSObject from "./DSObject";
import sha256 from "./util/sha256"
export interface Handler<TArgs, TReturn> {
    (sender: any, args: TArgs): TReturn;
}

export class EventArgs extends DSObject {

}

export default class DSEvent<A = EventArgs, R = void> extends DSObject {

    private readonly listeners: ICollection<Handler<A, R>>;
    private readonly passwordSha256: string | null;

    constructor(password?: string) {
        super();
        this.listeners = new LinkedList();
        this.passwordSha256 = password === undefined ? null : (sha256(password) as string);
    }

    get isProtectedByPassword() {
        return this.passwordSha256 !== null;
    }
    
    private passwordIsCorrect(pwd?: string): boolean {
        if (this.passwordSha256) {
            if (pwd) {
                return sha256(pwd) === this.passwordSha256;
            } else {
                return false;
            }
        }
        return true;
    }

    raise(sender: any, args: A, password?: string) {
        if (!this.passwordIsCorrect(password)) {
            throw new Error("Password is required and your password is not correct.");
        }
        this.listeners.forEach((handler: Handler<A, R>) => {
            handler(sender, args);
        });
    }

    add(handler: Handler<A, R>) {
        this.listeners.collectionAdd(handler);
    }

    remove(handler: Handler<A, R>) {
        this.listeners.collectionRemove(handler);
    }

    clear() {
        this.listeners.clear();
    }

}