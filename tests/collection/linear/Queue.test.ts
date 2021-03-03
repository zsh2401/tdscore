import IQueue from "../../../src/data-structure/linear/IQueue";
import LinkedList from "../../../src/data-structure/linear/LinkedList"

describe("Queue Test",()=>{
    it("Should en & de",()=>{
        const q:IQueue<number> = new LinkedList<number>();
        q.queueEn(1);
        q.queueEn(2);
        q.queueEn(3);
        expect(q.queueDe()).toBe(1);
        expect(q.queueDe()).toBe(2);
        expect(q.isEmpty()).toBeFalsy();
        expect(q.queueDe()).toBe(3);
        expect(q.isEmpty()).toBeTruthy();
    });

    it("Reusable",()=>{
        const q:IQueue<number> = new LinkedList<number>();
        q.queueEn(1);
        q.queueEn(2);
        q.queueEn(3);
        expect(q.queueDe()).toBe(1);
        expect(q.queueDe()).toBe(2);
        expect(q.queueDe()).toBe(3);
        q.queueEn(1);
        expect(q.size()).toBe(1);
        expect(q.isEmpty()).toBeFalsy();
    });
})