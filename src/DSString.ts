import DSDataType from "./DSDataType";

//TODO
export default class DSString extends DSDataType<string> {
    private constructor(data: string) {
        super(data);
        throw new Error("Class still has not been implemented.");
    }
    static valueOf(raw: string): DSString {
        return new DSString(raw);
    }
    format(a: any) {
        //TODO not implemented
    }
    slice() {
        //TODO not implemented
    }
}