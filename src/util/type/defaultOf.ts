const DEFAULT_SYMBOL = Symbol("0");
export default function defaultOf<E>(type: string): E {
    switch (type) {
        case "bigint":
        case "number":
            //@ts-expect-error
            return 0;
        case "boolean":
            //@ts-expect-error
            return false;
        case "symbol":
            //@ts-expect-error
            return DEFAULT_SYMBOL;
        case "function":
        case "object":
        case "string":
        case "undefined":
        default:
            //@ts-expect-error
            return null;
    }
}