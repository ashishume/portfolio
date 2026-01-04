/**
 * Converts a blog title to a URL-friendly slug
 * Replaces spaces with hyphens and converts to lowercase
 */
export const titleToSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
};

/**
 * Converts a slug back to a title (for display purposes)
 */
export const slugToTitle = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

