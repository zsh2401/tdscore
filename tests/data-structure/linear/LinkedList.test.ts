import LinkedList from "../../../src/data-structure/linear/LinkedList";
import { doCollectionTest } from "../util/doCollectionTest";
import doListTest from "../util/doListTest";
import doQueueTest from "../util/doQueueTest";
import doStackTest from "../util/doStackTest";

describe("LinkedList test", () => {
    const f = <E>() => new LinkedList<E>()
    doCollectionTest(f)
    doListTest(f)
    doQueueTest(f)
    doStackTest(f)
});