import DSObject from "./DSObject";

export default DSObjectType;
type DSObjectType<T extends DSObject> = {
    new(): T;
}