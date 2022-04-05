export default function (target: Function) {
    Object.seal(target);
    Object.seal(target.prototype);
}