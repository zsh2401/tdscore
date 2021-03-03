
import IStack from "../../../src/data-structure/linear/IStack"
import LinkedList from "../../../src/data-structure/linear/LinkedList";

describe("LinkedStack Test",()=>{
    
    it("could push element",()=>{
        const stack : IStack<number> = new LinkedList<number>();
        stack.stackPush(1);
        stack.stackPush(2);
        stack.stackPush(3);
        expect(stack.size()).toBe(3);
    })

    it("could GetTop",()=>{
        const stack : IStack<number> = new LinkedList<number>();
        stack.stackPush(1);
        stack.stackPush(2);
        stack.stackPush(3);
        expect(stack.stackGetTop()).toBe(3);
    })

    it("could pop",()=>{
        const stack : IStack<number> = new LinkedList<number>();
        stack.stackPush(1);
        stack.stackPush(2);
        stack.stackPush(3);
        expect(stack.stackPop()).toBe(3);
        expect(stack.size()).toBe(2);
    });
})