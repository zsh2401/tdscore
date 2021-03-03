import { toDSArray } from "../../../data-structure/iterating";
import DSArray from "../../../DSArray";

/**
 * 2 ^ n bits data block.
 * 2 ^ n - n bits could use for store data.
 */
//TODO waiting to be implemented
export default class Block {
    // private readonly block: DSArray<boolean>;
    // readonly dataCapcity: number;
    // readonly blockSize: number;
    // readonly controlBitsCount: number;
    // constructor(source: DSArray<boolean>) {
    //     this.blockSize = this.roundUp2(source.length);
    //     this.controlBitsCount = Math.log2(this.blockSize);
    //     this.dataCapcity = this.blockSize - this.controlBitsCount;
    // }
    // private roundUp2(num: number) {
    //     if (num % 2 === 0) {
    //         return num;
    //     } else {
    //         const times = (Math.log2(num) + 1);
    //         return Math.pow(2, times);
    //     }
    // }
    // private updateControlBits() {
    //     for (let i = 0; i < this.controlBitsCount; i++) {
    //         const index = 2 ** i;

    //     }
    // }
    // private realIndexFor(x: number): number {
    //     if (x >= 248 || x < 0) {
    //         throw new Error("Index out of range.");
    //     }
    //     if (x === 0) {
    //         return 0;
    //     }
    //     const v = x + (Math.log2(x * 2) + 1);
    //     return Math.floor(v);
    // }
    // toDSArray(): DSArray<boolean> {
    //     return toDSArray(this.block);
    // }
    // toDSArray2(): DSArray<0 | 1> {
    //     return toDSArray(this.block, (e) => e ? 1 : 0);
    // }
    // toDSArrayNumber(): DSArray<number> {
    //     return this.toDSArray2();
    // }
    // set(index: number, data: boolean) {
    //     this.block[this.realIndexFor(index)] = data;
    //     this.updateControlBits();
    // }
    // get(index: number): boolean {
    //     return this.block[this.realIndexFor(index)];
    // }
}