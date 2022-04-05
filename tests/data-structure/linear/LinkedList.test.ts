import LinkedList from "../../../src/data-structure/linear/LinkedList";
import doCollectionTest from "../do-xxx-test/doCollectionTest";
import doIterableTest from "../do-xxx-test/doIterableTest";
import doListTest from "../do-xxx-test/doListTest";
import doQueueTest from "../do-xxx-test/doQueueTest";
import doStackTest from "../do-xxx-test/doStackTest";

describe("LinkedList test", () => {
    const f = <E>() => new LinkedList<E>()
    doCollectionTest(f)
    doListTest(f)
    doIterableTest(f)
    doQueueTest(f)
    doStackTest(f)
});