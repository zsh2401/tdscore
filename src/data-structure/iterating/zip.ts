import { IIterable, IIterator } from "..";
import { Func2 } from "../../Func";
import getIterator from "./getIterator";

/*
 * zip.ts
 * Created on Thu Apr 15 2021 14:44:31
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
 */
export default function <EA, EB, R>(a: IIterable<EA>, b: IIterable<EB>, zipper: Func2<EA, EB, R>):
    IIterable<R> {
    return {
        getIterator: () => new Zipper(getIterator(a), getIterator(b), zipper)
    }
}
class Zipper<EA, EB, R> implements IIterator<R>{
    private readonly sourceA: IIterator<EA>
    private readonly sourceB: IIterator<EB>
    private readonly zipper: Func2<EA, EB, R>
    constructor(a: IIterator<EA>, b: IIterator<EB>, zipper: Func2<EA, EB, R>) {
        this.sourceA = a
        this.sourceB = b
        this.zipper = zipper
    }
    
    reset(): void {
        this.sourceA.reset()
        this.sourceB.reset()
    }

    hasNext(): boolean {
        return this.sourceA.hasNext() && this.sourceB.hasNext()
    }

    next(): R {
        return this.zipper(this.sourceA.next(), this.sourceB.next())
    }

    current(): R {
        return this.zipper(this.sourceA.current(), this.sourceB.current())
    }
}