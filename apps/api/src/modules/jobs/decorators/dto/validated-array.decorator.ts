import { registerDecorator, ValidationArguments } from "class-validator";
import { SAFE_REGEX } from "../../dto/create-job.dto";
import { sanitizeText } from "src/common/utils/sanitize.util";

export function IsValidTextArray(maxItems = 20) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "IsValidTextArray",
            target: object.constructor,
            propertyName,
            constraints: [maxItems],
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (!Array.isArray(value) || value.length === 0) return false;
                    if (value.length > maxItems) return false;

                    for (const item of value) {
                        const clean = sanitizeText(item);

                        if (clean.length < 1 || clean.length > 300) return false;
                        if (!SAFE_REGEX.test(clean)) return false;
                    }
                    return true;
                },
                defaultMessage(args: ValidationArguments) {
                    return `Invalid ${args.property}. Ensure safe characters, proper length, and max ${args.constraints[0]} items.`;
                },
            },
        });
    };
}
