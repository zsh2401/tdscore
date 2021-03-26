export default function (f: (x: number) => number): (x: number) => number {
    return easy(f, .00000009);
}
function easy(f: (x: number) => number, dx: number):  (x: number) => number {
    //@ts-expect-error
    if (f["___isDerivationFunction"]) {
        throw "目前对二阶以及以上的导数存在巨大误差";
    }

    const result = (x: number) => {
        return (f(x + dx) - f(x)) / dx;
    };
    result["___isDerivationFunction"] = true;
    return result;
}