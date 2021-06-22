import CircularQueue from "../../../src/data-structure/linear/CircularQueue"
import IQueue from "../../../src/data-structure/linear/IQueue"

describe("", () => {
    it("Enq & Deq", () => {
        const queue: IQueue<number> = new CircularQueue<number>(5);
        queue.queueEn(1);
        queue.queueEn(2);
        queue.queueEn(3);
        expect(queue.queueDe()).toBe(1);
        expect(queue.queueDe()).toBe(2);
        expect(queue.queueDe()).toBe(3);
    });

    it("Enq & Deq crosswise", () => {
        const queue: IQueue<number> = new CircularQueue<number>(50);
        const jsArray: number[] = [];
        for (let i = 0; i < Math.random() * 50; i++) {
            if (Math.random() < 0.5 && !queue.collectionIsEmpty()) {
                expect(queue.queueDe()).toBe(jsArray.shift());
            } else {
                queue.queueEn(i);
                jsArray.push(i);
            }
            expect(queue.collectionSize()).toBe(jsArray.length);
        }
    });

    it("size()", () => {
        const queue: IQueue<number> = new CircularQueue<number>(5);
        queue.queueEn(1);
        queue.queueEn(2);
        queue.queueEn(3);
        expect(queue.collectionSize()).toBe(3);
    });

    it("de empty queue", () => {
        const queue: IQueue<number> = new CircularQueue<number>(1);
        expect(() => queue.queueDe()).toThrow();
    });

    it("lacking for capcity", () => {
        const queue: IQueue<number> = new CircularQueue<number>(1);
        expect(() => queue.queueEn(1)).not.toThrow();
        expect(() => queue.queueEn(1)).toThrow();
        expect(() => queue.queueEn(1)).toThrow();
        expect(queue.collectionSize()).toBe(1);
    });

    it("Clear works", () => {
        const queue: IQueue<number> = new CircularQueue<number>(100);
        for (let i = 0; i < 100; i++) {
            queue.queueEn(i);
        }
        expect(() => queue.clear()).not.toThrow();
        expect(queue.collectionIsEmpty()).toBeTruthy();
        expect(() => queue.clear()).not.toThrow();
    })
})