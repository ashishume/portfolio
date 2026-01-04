import { titleToSlug } from "./utils";
import { parseFrontmatter } from "./frontmatter";
import {
  fetchBlogMetadata,
  fetchBlogContent,
  getAllBlogSources,
  getBlogSource,
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
  sourceCategory: string; // Store the source category (frontend/backend) for fetching
}

// Cache for blog posts metadata
let blogPostsCache: IBlog[] | null = null;
let blogPostsPromise: Promise<IBlog[]> | null = null;

// Cache for parsed blog content (after frontmatter removal)
// Key: slug, Value: parsed markdown content
const blogContentCache = new Map<string, string>();

/**
 * Fetch blog posts metadata from GitHub metadata.json for a specific source
 * This is much more efficient - only 1 API call per source instead of N+1 calls
 */
async function fetchBlogPostsMetadataForSource(source: {
  owner: string;
  repo: string;
  branch: string;
  path: string;
  category: string;
}): Promise<IBlog[]> {
  try {
    // Fetch metadata.json - single API call for all blog metadata
    const metadata = await fetchBlogMetadata(source);

    // Convert metadata.json structure to IBlog array
    const posts: IBlog[] = Object.entries(metadata).map(
      ([filename, data]: [string, any], index) => {
        // Extract filename without .md extension for fallback
        const filenameWithoutExt = filename.replace(".md", "");

        return {
          id: data.id || `${source.category}-${index + 1}`,
          title: data.title || filenameWithoutExt,
          slug: data.slug || titleToSlug(data.title || filenameWithoutExt),
          date: data.date || new Date().toISOString().split("T")[0],
          excerpt: data.excerpt || "",
          // Content is NOT stored here - loaded on demand via loadBlogContent
          category: data.category || source.category,
          filePath: filename, // Store GitHub filename for lazy loading
          sourceCategory: source.category, // Store source for fetching content
        } as IBlog;
      }
    );

    return posts;
  } catch (error) {
    console.error(
      `Error fetching blog posts metadata for ${source.category}:`,
      error
    );
    return [];
  }
}

/**
 * Fetch blog posts metadata from all sources (frontend and backend)
 * This fetches from all configured blog sources and merges them
 */
async function fetchBlogPostsMetadata(): Promise<IBlog[]> {
  try {
    const sources = getAllBlogSources();

    // Fetch metadata from all sources in parallel
    const postsPromises = sources.map((source) =>
      fetchBlogPostsMetadataForSource(source)
    );

    const allPostsArrays = await Promise.all(postsPromises);

    // Flatten and merge all posts
    const allPosts = allPostsArrays.flat();

    // Sort by date (newest first)
    return allPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error fetching blog posts metadata:", error);
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
 * Results are cached to avoid repetitive API calls and re-parsing
 */
export async function loadBlogContent(slug: string): Promise<string | null> {
  try {
    // Check cache first
    if (blogContentCache.has(slug)) {
      return blogContentCache.get(slug)!;
    }

    // Get blog posts if not already cached
    const posts = await getBlogPosts();
    const blog = posts.find((post) => post.slug === slug);

    if (!blog) {
      return null;
    }

    // Get the blog source configuration
    const source = getBlogSource(blog.sourceCategory || blog.category);

    // Fetch content from GitHub raw URL (this is also cached in GitHubBlogService)
    const rawContent = await fetchBlogContent(blog.filePath, source);
    const { content: markdownContent } = parseFrontmatter(rawContent);
    const parsedContent = markdownContent.trim();

    // Cache the parsed content
    blogContentCache.set(slug, parsedContent);

    return parsedContent;
  } catch (error) {
    console.error(`Failed to load blog content for ${slug}:`, error);
    return null;
  }
}

/**
 * Clear blog content cache (useful for testing or forcing refresh)
 */
export function clearBlogContentCache(): void {
  blogContentCache.clear();
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
export async function getPostsByCategory(category: string): Promise<IBlog[]> {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.category === category);
}
