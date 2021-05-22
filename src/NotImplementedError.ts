export default class NotImplementedError extends Error {
    constructor(msg: string = "") {
        super("Not implemented: " + msg)
    }
}