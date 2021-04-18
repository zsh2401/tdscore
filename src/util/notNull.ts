type NonNullable<T> = T extends null | undefined ? never : T
export default function notNull<T>(
    value: NonNullable<T> | null | undefined,
    defaultValue?: NonNullable<T>):

    NonNullable<T> {

    if (value) {
        return value
    } else if (defaultValue) {
        return defaultValue
    } else {
        throw new Error("Can not be not null");
    }

}