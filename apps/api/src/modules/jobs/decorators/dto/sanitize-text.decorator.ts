import { Transform } from "class-transformer";
import { sanitizeText } from "src/common/utils/sanitize.util";


export function Sanitize() {
    return Transform(({ value }) => sanitizeText(String(value ?? "")));
}
