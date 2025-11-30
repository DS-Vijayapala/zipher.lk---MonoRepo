// helper functions for job filters and sorting

// Sanitize any incoming string

export function sanitizeString(
    val?: unknown,
    max: number = 60
): string | undefined {
    if (!val || typeof val !== "string") return undefined;

    const clean = val.trim();

    return clean.length > max ? clean.substring(0, max) : clean;

}


// Build the Prisma WHERE clause

export function buildJobWhereQuery(filters: any) {

    const { title, category, location, level } = filters;

    const sTitle = sanitizeString(title, 100);

    const sCategory = sanitizeString(category, 50);

    const sLocation = sanitizeString(location, 50);

    const sLevel = sanitizeString(level, 30);

    const where: any = { visible: true };

    if (sTitle) {
        where.title = { contains: sTitle, mode: "insensitive" };
    }

    if (sCategory) {
        where.category = { equals: sCategory, mode: "insensitive" };
    }

    if (sLocation) {
        where.location = { equals: sLocation, mode: "insensitive" };
    }

    if (sLevel) {
        where.level = { equals: sLevel, mode: "insensitive" };
    }

    return where;

}

// Safe sorting (whitelist)

export function buildSortOrder(sortBy: string, sortOrder: string) {

    const allowedSortFields = ["createdAt", "salary", "date", "title"];

    const safeField = allowedSortFields.includes(sortBy)
        ? sortBy
        : "createdAt";

    return {

        [safeField]: sortOrder === "asc" ? "asc" : "desc",

    };
}
