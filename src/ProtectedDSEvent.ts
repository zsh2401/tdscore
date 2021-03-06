/*
 * ProtectedDSEvent.ts
 * Created on Sat Mar 06 2021 21:39:07
 *
 * Description: 
 *   No description.
 *
 * Copyright (c) 2021 tdscore
 * 
 * Copyright (c) 2021 Seymour Zhang and all contributors of this project.
 * tdscore is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *          http://license.coscl.org.cn/MulanPSL2
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 * Mulan Permissive Software License，Version 2
 */

import LinkedList from "./data-structure/linear/LinkedList";
import ICollection from "./data-structure/ICollection";
import DSObject from "./DSObject";
import sha256 from "./util/sha256"
import { EventArgs, Handler } from "./DSEvent";
export default class DSProtectedEvent<A = EventArgs, R = void> extends DSObject {

    private readonly listeners: ICollection<Handler<A, R>>;
    private readonly passwordSha256: string;
    private readonly throwError: boolean;

    constructor(password: string, throwWhenPasswordIsntCorrect: boolean = true) {
        super();
        this.listeners = this.createListenersCollection();
        this.passwordSha256 = sha256(password) as string;
        this.throwError = throwWhenPasswordIsntCorrect;
    }

    protected createListenersCollection(): ICollection<Handler<A, R>> {
        return new LinkedList<Handler<A, R>>();
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
            if (this.throwError) {
                throw new Error("Password is required and your password is not correct.");
            } else {
                return;
            }
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

    clear(password?: string) {
        if (!this.passwordIsCorrect(password)) {
            if (this.throwError) {
                throw new Error("Password is required and your password is not correct.");
            } else {
                return;
            }
        }
        this.listeners.clear();
    }

}