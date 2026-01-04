import { titleToSlug } from "./utils";
import { parseFrontmatter } from "./frontmatter";

export interface IBlog {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content?: string; // Content is optional - loaded on demand
  category: string;
  filePath: string; // Store path for lazy loading
}

// Lazy loader for markdown content (code-split per file)
// This loads files on-demand when viewing a blog post, keeping them out of the initial bundle
const blogContentLoader = import.meta.glob("../blogs/**/*.md", {
  query: "?raw",
  import: "default",
});

// For build-time metadata extraction: We need to read files to extract frontmatter
// Note: With eager: true, files are still bundled, but we only store metadata (not content)
// This is a trade-off - we need frontmatter for the blog listing page
// The content itself is loaded lazily via loadBlogContent() to keep it code-split
const blogModulesForMetadata = import.meta.glob("../blogs/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Parse markdown files and convert to blog posts (metadata only)
// Note: Files are still loaded at build time for frontmatter extraction,
// but content is not stored in the bundle - only metadata
export const blogPosts: IBlog[] = Object.entries(blogModulesForMetadata)
  .map(([path, content], index) => {
    const rawContent = content as string;
    const { data } = parseFrontmatter(rawContent);

    // Extract category from path (e.g., ../blogs/frontend/file.md -> frontend)
    const pathParts = path.split("/");
    const blogsIndex = pathParts.findIndex((part) => part === "blogs");
    const category =
      blogsIndex !== -1 && pathParts[blogsIndex + 1]
        ? pathParts[blogsIndex + 1]
        : "uncategorized";

    // Extract filename for slug if title is not provided
    const filename = path.split("/").pop()?.replace(".md", "") || "";
    const slug = data.slug || titleToSlug(data.title || filename);

    return {
      id: data.id || String(index + 1),
      title: data.title || filename,
      slug: slug,
      date: data.date || new Date().toISOString().split("T")[0],
      excerpt: data.excerpt || "",
      // Content is NOT stored here - loaded on demand via loadBlogContent
      category: data.category || category,
      filePath: path, // Store path for lazy loading
    } as IBlog;
  })
  // Sort by date (newest first)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

/**
 * Lazy load markdown content for a specific blog post
 * This function loads the content on-demand, keeping it code-split
 */
export async function loadBlogContent(slug: string): Promise<string | null> {
  const blog = blogPosts.find((post) => post.slug === slug);
  if (!blog) {
    return null;
  }

  const loader = blogContentLoader[blog.filePath];
  if (!loader) {
    return null;
  }

  try {
    const content = (await loader()) as string;
    const { content: markdownContent } = parseFrontmatter(content);
    return markdownContent.trim();
  } catch (error) {
    console.error(`Failed to load blog content for ${slug}:`, error);
    return null;
  }
}

// Get all unique categories
export const categories = Array.from(
  new Set(blogPosts.map((post) => post.category))
).sort();

// Get posts by category
export const getPostsByCategory = (category: string): IBlog[] => {
  return blogPosts.filter((post) => post.category === category);
};
