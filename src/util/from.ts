export interface To {
    (to: number): ExecutorReceiver
}
export interface ExecutorReceiver {
    (callback: (i: number) => void): void
}
export function from(start: number = 0): To {
    return (_to: number) => {
        return (callback: (i: number) => void) => {
            for (let i = start; i < _to; i++) {
                callback(i)
            }
        }
    }
}