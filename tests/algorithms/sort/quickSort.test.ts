import "ts-jest"
import createSortTestFor from "./createSortTestFor";
import qucikSort from "../../../src/algorithm/sort/quickSort"
describe("Qucik Sort Test", createSortTestFor("Quick Sort", qucikSort));