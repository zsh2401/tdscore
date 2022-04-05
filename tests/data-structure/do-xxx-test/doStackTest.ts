import IStack from "../../../src/data-structure/linear/IStack";

export default function (factory: <E>() => IStack<E>) {
    describe("Standard Stack Test Suite", () => {


        it("could push element", () => {
            const stack: IStack<number> = factory()
            stack.stackPush(1);
            stack.stackPush(2);
            stack.stackPush(3);
            expect(stack.collectionSize()).toBe(3);
        })

        it("could GetTop", () => {
            const stack: IStack<number> = factory()
            stack.stackPush(1);
            stack.stackPush(2);
            stack.stackPush(3);
            expect(stack.stackGetTop()).toBe(3);
        })

        it("could pop", () => {
            const stack: IStack<number> = factory()
            stack.stackPush(1);
            stack.stackPush(2);
            stack.stackPush(3);
            expect(stack.stackPop()).toBe(3);
            expect(stack.collectionSize()).toBe(2);
        })
    })
}