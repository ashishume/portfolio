import { titleToSlug } from "./utils";
import { parseFrontmatter } from "./frontmatter";
import {
  fetchBlogFileList,
  fetchBlogContent,
  getRawContentUrl,
} from "./Services/GitHubBlogService";

export interface IBlog {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content?: string; // Content is optional - loaded on demand
  category: string;
  filePath: string; // Store GitHub filename for lazy loading
}

// Cache for blog posts metadata
let blogPostsCache: IBlog[] | null = null;
let blogPostsPromise: Promise<IBlog[]> | null = null;

/**
 * Fetch blog posts metadata from GitHub
 * This function fetches the list of markdown files and extracts frontmatter
 */
async function fetchBlogPostsMetadata(): Promise<IBlog[]> {
  try {
    const files = await fetchBlogFileList();

    // Fetch content for each file to extract frontmatter
    const postsPromises = files.map(async (file, index) => {
      try {
        const content = await fetchBlogContent(file.name);
        const { data } = parseFrontmatter(content);

        // Extract category from filename or use frontmatter
        // Assuming all files are in frontend category, but can be overridden in frontmatter
        const category = data.category || "frontend";

        // Extract filename for slug if title is not provided
        const filename = file.name.replace(".md", "");
        const slug = data.slug || titleToSlug(data.title || filename);

        return {
          id: data.id || String(index + 1),
          title: data.title || filename,
          slug: slug,
          date: data.date || new Date().toISOString().split("T")[0],
          excerpt: data.excerpt || "",
          // Content is NOT stored here - loaded on demand via loadBlogContent
          category: category,
          filePath: file.name, // Store GitHub filename for lazy loading
        } as IBlog;
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
        return null;
      }
    });

    const posts = (await Promise.all(postsPromises)).filter(
      (post): post is IBlog => post !== null
    );

    // Sort by date (newest first)
    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

/**
 * Get blog posts - returns cached data or fetches from GitHub
 * This ensures we only fetch once and reuse the data
 */
export async function getBlogPosts(): Promise<IBlog[]> {
  if (blogPostsCache) {
    return blogPostsCache;
  }

  if (!blogPostsPromise) {
    blogPostsPromise = fetchBlogPostsMetadata().then((posts) => {
      blogPostsCache = posts;
      return posts;
    });
  }

  return blogPostsPromise;
}

/**
 * Initialize blog posts (call this early in the app lifecycle)
 * This pre-fetches the blog list so it's ready when needed
 */
export function initializeBlogPosts(): void {
  if (!blogPostsPromise) {
    getBlogPosts();
  }
}

// For backward compatibility, export a synchronous getter that returns empty array initially
// Components should use getBlogPosts() or useBlogPosts() hook instead
export const blogPosts: IBlog[] = [];

/**
 * Lazy load markdown content for a specific blog post from GitHub
 * This function loads the content on-demand from GitHub raw content URL
 */
export async function loadBlogContent(slug: string): Promise<string | null> {
  try {
    // Get blog posts if not already cached
    const posts = await getBlogPosts();
    const blog = posts.find((post) => post.slug === slug);

    if (!blog) {
      return null;
    }

    // Fetch content from GitHub raw URL
    const rawContent = await fetchBlogContent(blog.filePath);
    const { content: markdownContent } = parseFrontmatter(rawContent);
    return markdownContent.trim();
  } catch (error) {
    console.error(`Failed to load blog content for ${slug}:`, error);
    return null;
  }
}

/**
 * Get all unique categories from blog posts
 */
export async function getCategories(): Promise<string[]> {
  const posts = await getBlogPosts();
  return Array.from(new Set(posts.map((post) => post.category))).sort();
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(
  category: string
): Promise<IBlog[]> {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.category === category);
}
