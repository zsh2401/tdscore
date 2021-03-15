import UngrowableArrayList from "../../../src/data-structure/linear/UngrowableArrayList"
import ListIterator from "../../../src/data-structure/linear/ListIterator"
import IList from "../../../src/data-structure/linear/IList"
import LinkedList from "../../../src/data-structure/linear/LinkedList";
describe("ListIterator Test",()=>{
    it("basic iterate",()=>{
        const list : IList<number> = new UngrowableArrayList<number>();
        
        list.listAdd(0);
        list.listAdd(1);
        list.listAdd(2);

        const iterator = list.getIterator();
        const valueList:number[] = [];

        while(iterator.hasNext()){
            valueList.push(iterator.next());
        }

        expect(valueList.length).toBe(3);
        expect(valueList[1]).toBe(1);
    });
    
    it("could not iterate when there is no element.",()=>{
        const list : IList<number> = new UngrowableArrayList<number>();
        expect(list.getIterator().hasNext()).toBe(false);
    })

    it("working for LinkedList",()=>{
        const list = new LinkedList<string>();
        const iterator = new ListIterator(list);
        expect(iterator.hasNext()).toBeFalsy();
        list.listAdd("a");
        list.listAdd("b");
        list.listAdd("c");
        list.listAdd("d");
        expect(iterator.hasNext()).toBeTruthy();
        const valueList = [];
        while(iterator.hasNext()){
            valueList.push(iterator.next());
        }
        expect(valueList.length).toBe(4);
    })
})