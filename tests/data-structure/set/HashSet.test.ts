import "ts-jest"
import { HashSet, DSObject } from "../../../src"
import doCollectionTest from "../util/doCollectionTest";
import doSetTest from "../util/doSetTest"
doCollectionTest(() => new HashSet())
doSetTest(()=>new HashSet())
