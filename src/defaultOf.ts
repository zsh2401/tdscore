export default function defaultOf<E>(type: string): E {
    switch (type) {
        case "bigint":
        case "number":
            //@ts-expect-error
            return 0;
        case "boolean":
            //@ts-expect-error
            return false;
        case "function":
        case "object":
        case "string":
        case "symbol":
        case "undefined":
        default:
            //@ts-expect-error
            return null;
    }
}