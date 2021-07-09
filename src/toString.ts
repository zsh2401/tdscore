import ArgumentError from "./ArgumentError"
export default function toString(value: any): string {
    try {
        return value.toString()
    } catch {
        try {
            return JSON.parse(value)
        } catch {
            throw new ArgumentError("")
        }

    }
}