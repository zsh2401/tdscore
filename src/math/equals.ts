import abs from "./abs"
const MINIUM_PRECISION = 0.0001;
export default function equals(left: number, right: number, precision: number = MINIUM_PRECISION): boolean {
    return abs(left - right) < MINIUM_PRECISION;
}