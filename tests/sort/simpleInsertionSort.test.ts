import "ts-jest"
import createSortTestFor from "./createSortTestFor";
import simpleInsertionSort from "../../src/algorithm/sort/simpleInsertionSort";
describe("Simple Insertion Sort Test", createSortTestFor("Simple Insertion Sort", simpleInsertionSort));