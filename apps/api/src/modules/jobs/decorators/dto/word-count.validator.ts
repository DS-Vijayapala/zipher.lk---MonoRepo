import { registerDecorator, ValidationArguments } from "class-validator";

export function MaxWords(limit: number) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "MaxWords",
            target: object.constructor,
            propertyName,
            constraints: [limit],
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (typeof value !== "string") return false;

                    const words = value.trim().split(/\s+/).filter(Boolean).length;
                    return words <= args.constraints[0];
                },
                defaultMessage(args: ValidationArguments) {
                    return `Maximum ${args.constraints[0]} words allowed`;
                },
            },
        });
    };
}
