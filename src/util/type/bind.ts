export default function () {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        descriptor.value = descriptor.value.bind(target);
    };
}
