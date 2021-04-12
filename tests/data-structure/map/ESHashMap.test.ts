import "ts-jest"
import doMapTest from "../util/doMapTest";
import { ESHashMap } from "../../../src";
doMapTest(() => new ESHashMap())