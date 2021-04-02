import ArrayList from "../../../src/data-structure/linear/ArrayList";
import { doCollectionTest } from "../util/doCollectionTest";
import doListTest from "../util/doListTest";
import doQueueTest from "../util/doQueueTest";
import doStackTest from "../util/doStackTest";

describe("ArrayList test", () => {
    const f = <E>() => new ArrayList<E>()
    doCollectionTest(f)
    doListTest(f)
    doQueueTest(f)
    doStackTest(f)
});