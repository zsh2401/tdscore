import IQueue from "../../../src/data-structure/linear/IQueue";

export default function (factory: <E>() => IQueue<E>) {
    describe("Standard Queue Test Suite", () => {
        it("Should en & de", () => {
            const q: IQueue<number> = factory()
            q.queueEn(1);
            q.queueEn(2);
            q.queueEn(3);
            expect(q.queueDe()).toBe(1);
            expect(q.queueDe()).toBe(2);
            expect(q.queueDe()).toBe(3);
            expect(q.isEmpty()).toBeTruthy();
        });

        it("Cross", () => {
            const q: IQueue<number> = factory()

            q.queueEn(10)
            expect(q.size()).toBe(1)
            expect(q.queueDe()).toBe(10);
            expect(q.size()).toBe(0)

            q.queueEn(12)
            q.queueEn(13)
            expect(q.contains(12)).toBeTruthy()
            expect(q.contains(13)).toBeTruthy()
            expect(q.size()).toBe(2)
            expect(q.queueDe()).toBe(12);
            expect(q.queueDe()).toBe(13);
            expect(q.size()).toBe(0)

        })

        it("Reusable", () => {
            const q: IQueue<number> = factory()
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

}