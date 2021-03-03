import max from "../math/max";

export default async function (ms: number) {
    ms = max(ms, 0);
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}