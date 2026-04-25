import { titleToSlug } from "./utils";
import { parseFrontmatter } from "./frontmatter";
import {
  fetchBlogMetadata,
  fetchBlogContent,
  getAllBlogSources,
  getBlogSource,
  BlogSource,
} from "./Services/GitHubBlogService";
import type { SsrData } from "./SsrDataContext";

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

const CACHE_TTL_MS = 10 * 60 * 1000;

// Cache for blog posts metadata
let blogPostsCache: IBlog[] | null = null;
let blogPostsCacheExpiresAt = 0;
let blogPostsPromise: Promise<IBlog[]> | null = null;

// Cache for parsed blog content (after frontmatter removal)
// Key: slug, Value: parsed markdown content
const blogContentCache = new Map<
  string,
  {
    value?: string;
    expiresAt: number;
    promise?: Promise<string | null>;
  }
>();

/**
 * Fetch blog posts metadata from GitHub metadata.json for a specific source
 * This is much more efficient - only 1 API call per source instead of N+1 calls
 */
async function fetchBlogPostsMetadataForSource(
  source: BlogSource
): Promise<IBlog[]> {
  // Fetch metadata.json - single API call for all blog metadata
  const metadata = await fetchBlogMetadata(source);

  // Convert metadata.json structure to IBlog array
  return Object.entries(metadata).map(([filename, data], index) => {
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
  });
}

/**
 * Fetch blog posts metadata from all sources (frontend and backend)
 * This fetches from all configured blog sources and merges them
 */
async function fetchBlogPostsMetadata(): Promise<IBlog[]> {
  const sources = getAllBlogSources();

  // Fetch metadata from all sources in parallel
  const postsPromises = sources.map((source) =>
    fetchBlogPostsMetadataForSource(source)
  );

  const allPostsArrays = await Promise.all(postsPromises);

  // Flatten and merge all posts
  const allPosts = allPostsArrays.flat();

  // Separate posts by sourceCategory (frontend/backend)
  const frontendPosts = allPosts.filter(
    (post) => post.sourceCategory === "frontend"
  );
  const backendPosts = allPosts.filter(
    (post) => post.sourceCategory === "backend"
  );

  // Sort each category alphabetically by title
  frontendPosts.sort((a, b) => a.title.localeCompare(b.title));
  backendPosts.sort((a, b) => a.title.localeCompare(b.title));

  // Combine: frontend first, then backend
  return [...frontendPosts, ...backendPosts];
}

/**
 * Get blog posts - returns cached data or fetches from GitHub
 * This ensures we only fetch once and reuse the data
 */
export async function getBlogPosts(): Promise<IBlog[]> {
  if (blogPostsCache && blogPostsCacheExpiresAt > Date.now()) {
    return blogPostsCache;
  }

  if (!blogPostsPromise) {
    blogPostsPromise = fetchBlogPostsMetadata()
      .then((posts) => {
        blogPostsCache = posts;
        blogPostsCacheExpiresAt = Date.now() + CACHE_TTL_MS;
        return posts;
      })
      .catch((error) => {
        if (blogPostsCache) {
          blogPostsCacheExpiresAt = Date.now() + CACHE_TTL_MS;
          return blogPostsCache;
        }

        throw error;
      })
      .finally(() => {
        blogPostsPromise = null;
      });
  }

  return blogPostsPromise;
}

export function hydrateBlogDataFromSsr(data: SsrData): void {
  if (data.blogPosts) {
    blogPostsCache = data.blogPosts;
    blogPostsCacheExpiresAt = Date.now() + CACHE_TTL_MS;
  }

  if (data.blogContentBySlug) {
    for (const [slug, content] of Object.entries(data.blogContentBySlug)) {
      if (typeof content === "string") {
        primeBlogContentCache(slug, content);
      }
    }
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
    const cached = blogContentCache.get(slug);
    if (cached?.value !== undefined && cached.expiresAt > Date.now()) {
      return cached.value;
    }

    if (cached?.promise) {
      return cached.promise;
    }

    const loadPromise = (async () => {
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
      primeBlogContentCache(slug, parsedContent);

      return parsedContent;
    })()
      .catch((error) => {
        if (cached?.value !== undefined) {
          primeBlogContentCache(slug, cached.value);
          return cached.value;
        }

        throw error;
      })
      .finally(() => {
        const nextCached = blogContentCache.get(slug);
        if (nextCached?.promise) {
          blogContentCache.set(slug, {
            value: nextCached.value,
            expiresAt: nextCached.expiresAt,
          });
        }
      });

    blogContentCache.set(slug, {
      value: cached?.value,
      expiresAt: cached?.expiresAt || 0,
      promise: loadPromise,
    });

    return loadPromise;
  } catch (error) {
    console.error(`Failed to load blog content for ${slug}:`, error);
    return null;
  }
}

export function primeBlogContentCache(slug: string, content: string): void {
  blogContentCache.set(slug, {
    value: content,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
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
