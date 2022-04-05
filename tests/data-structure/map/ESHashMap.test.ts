import "ts-jest"
import doMapTest from "../do-xxx-test/doMapTest";
import { ESHashMap } from "../../../src";
doMapTest(() => new ESHashMap())