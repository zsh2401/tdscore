import { DSObject } from ".";

export default DSObjectType;
type DSObjectType<T extends DSObject> = {
    new(): T;
}