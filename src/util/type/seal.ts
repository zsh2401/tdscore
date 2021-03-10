export default function <R extends { new(...args: any[]): {} }>(constructor: R):
    R {
    return Object.seal(constructor);
}