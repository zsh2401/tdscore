import "ts-jest"
import { HashSet, DSObject } from "../../../src"
import doCollectionTest from "../do-xxx-test/doCollectionTest";
import doSetTest from "../do-xxx-test/doSetTest"
doCollectionTest(() => new HashSet())
doSetTest(()=>new HashSet())
