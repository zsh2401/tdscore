import DSArray from "../../DSArray";

export default class MartixGraph{
    private readonly array;
    constructor(nodeCount:number){
        this.array = new DSArray<DSArray<number>>(nodeCount,
            (i:number)=>new DSArray<number>(nodeCount));
    }
}