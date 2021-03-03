export default interface MathFunction {
    /**
     * @param x is for f(x)
     * @returns [thereIsValid, y] 
     */
    (x: number): [boolean, number];
}