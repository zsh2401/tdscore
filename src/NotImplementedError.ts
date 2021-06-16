export default class NotImplementedError extends Error {
    constructor(msg: string = "") {
        super("The part of program has still not been not implemented. " + msg)
    }
}