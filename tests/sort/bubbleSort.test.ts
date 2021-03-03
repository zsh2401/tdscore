import "ts-jest"
import createSortTestFor from "./createSortTestFor";
import bubbleSort from "../../src/algorithm/sort/bubbleSort";
describe("Qucik Sort Test", createSortTestFor("Bubble Sort", bubbleSort));