export default function factorial(x: number): number {
    if(x < 0){
        throw new RangeError("negative number is meaningless.");
    }
    if (x === 0 || x === 1) {
        return 1;
    }
    return x * factorial(x - 1);
}