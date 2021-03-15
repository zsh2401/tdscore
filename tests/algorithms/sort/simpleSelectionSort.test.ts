import "ts-jest"
import createSortTestFor from "./createSortTestFor";
import simpleSelectionSort from "../../../src/algorithm/sort/simpleSelectionSort";
describe("Simple Selection Sort Test", createSortTestFor("Simple Selection Sort", simpleSelectionSort));