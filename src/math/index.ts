const PI = Math.PI;
const ONE_DEGREE = PI / 180;
const DEGREE_30 = PI / 6;
const DEGREE_45 = PI / 4;
const DEGREE_90 = PI / 2
const DEGREE_120 = 2 * PI / 3
const DEGREE_135 = 3 * PI / 4
const DEGREE_150 = 5 * PI / 6
const DEGREE_180 = PI;
export {
    PI,
    ONE_DEGREE, DEGREE_30, DEGREE_45, DEGREE_90,
    DEGREE_120, DEGREE_135, DEGREE_150, DEGREE_180
}
export { default as Complex } from "./Complex"
export { default as Color } from "./Color"
export { default as max } from "./max"
export * as ramnujan from "./ramanujan"
export { default as uuid } from "./uuid"
export * from "./fn"
export * from "./martix"
export * from "./linear-algebra"