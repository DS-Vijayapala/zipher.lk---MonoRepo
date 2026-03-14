// sanitize.util.ts

export const SAFE_TEXT_REGEX = /^[\p{L}\p{N}\p{M}\p{Pd}\p{Pc}\p{Zs}.,;:'’"()!?+\-@#&*/]+$/u;

// strip HTML tags + collapse whitespace

export function sanitizeText(input?: string): string {
    if (!input) return "";
    const stripped = input.replace(/<[^>]*>/g, "");
    const collapsed = stripped.replace(/\s+/g, " ").trim();
    return collapsed;
}

export function isSafeText(input: string): boolean {
    if (!input) return false;
    const normalized = sanitizeText(input);
    return SAFE_TEXT_REGEX.test(normalized);
}
