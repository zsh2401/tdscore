import IQueue from "../../../src/data-structure/linear/IQueue";

export default function (factory: <E>() => IQueue<E>) {
    it("Should en & de",()=>{
        const q:IQueue<number> = factory()
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
        const q:IQueue<number> = factory()
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
}