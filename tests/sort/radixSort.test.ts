import "ts-jest"
import createSortTestFor from "./createSortTestFor";
import radixSort from "../../src/algorithm/sort/radixSort";
describe("Radix Sort Test", createSortTestFor("Radix Sort", radixSort, { descend: false }));