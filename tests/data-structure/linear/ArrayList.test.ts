import ArrayList from "../../../src/data-structure/linear/ArrayList";
import doCollectionTest from "../util/doCollectionTest";
import doIterableTest from "../util/doIterableTest";
import doListTest from "../util/doListTest";
import doQueueTest from "../util/doQueueTest";
import doStackTest from "../util/doStackTest";

describe("ArrayList test", () => {
    const f = <E>() => new ArrayList<E>()
    doCollectionTest(f)
    doListTest(f)
    doIterableTest(f)
    doQueueTest(f)
    doStackTest(f)
});