import "ts-jest"
import createSortTestFor from "./createSortTestFor";
import shellSort from "../../../src/algorithm/sort/shellSort";
describe("Shell Sort Test", createSortTestFor("Shell Sort", shellSort));