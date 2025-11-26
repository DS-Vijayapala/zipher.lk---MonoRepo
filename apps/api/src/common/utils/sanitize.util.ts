// sanitize.util.ts

export const SAFE_TEXT_REGEX = /^[a-zA-Z0-9\u00C0-\u024F0-9\s.,;:'"()!?+\-@#&*/]+$/u;

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
