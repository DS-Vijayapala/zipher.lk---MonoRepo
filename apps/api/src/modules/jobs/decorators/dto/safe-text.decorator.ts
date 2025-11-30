import { registerDecorator, ValidationOptions } from "class-validator";
import { SAFE_REGEX } from "../../dto/create-job.dto";

export function IsSafeText(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "IsSafeText",
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    if (typeof value !== "string") return false;
                    return SAFE_REGEX.test(value);
                },
                defaultMessage() {
                    return "Contains unsafe characters";
                },
            },
        });
    };
}
