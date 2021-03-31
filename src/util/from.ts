export interface To {
    to(to: number): ExecutorReceiver
}
export interface ExecutorReceiver {
    execute(callback: (i: number) => void): void
}
export function from(start: number = 0): To {
    return {
        to: (_to: number) => {
            return {
                execute: (callback: (i: number) => void) => {
                    for (let i = start; i < _to; i++) {
                        callback(i)
                    }
                }
            }
        }
    }
}
