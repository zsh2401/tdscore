import DSDataType from "./DSDataType";

export default class DSString extends DSDataType<string> {
    private constructor(data: string) {
        super(data);
    }
    static valueOf(raw: string): DSString {
        return new DSString(raw);
    }
    format(a:any) {
        //TODO not implemented
    }
    slice(){
        //TODO not implemented
    }
}