/**
 * GitHub Blog Service
 * Fetches markdown blog files from GitHub repository
 */

// Blog source configuration
export interface BlogSource {
  owner: string;
  repo: string;
  branch: string;
  path: string;
  category: string;
}

export interface BlogMetadataEntry {
  id?: string;
  date: string;
  category: string;
  excerpt: string;
  slug: string;
  title: string;
  tags?: string[];
}

const BLOG_SOURCES: Record<string, BlogSource> = {
  frontend: {
    owner: "ashishume",
    repo: "Front-end-Javascript-Interview-Topics",
    branch: "master",
    path: "frontend-blog-content/frontend",
    category: "frontend",
  },
  backend: {
    owner: "ashishume",
    repo: "backend-engineering-by-ashish",
    branch: "main",
    path: "backend-notes",
    category: "backend",
  },
};

const CACHE_TTL_MS = 10 * 60 * 1000;

interface CacheEntry<T> {
  value?: T;
  expiresAt: number;
  promise?: Promise<T>;
}

// Cache for API responses - key: URL, value: cached response + single-flight promise
const apiCache = new Map<
  string,
  CacheEntry<string | Record<string, BlogMetadataEntry>>
>();

export interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
}

/**
 * Get the raw content URL for a markdown file
 */
export function getRawContentUrl(filename: string, source: BlogSource): string {
  return `https://raw.githubusercontent.com/${source.owner}/${source.repo}/${source.branch}/${source.path}/${filename}`;
}

/**
 * Get the raw content URL for metadata.json
 */
export function getMetadataUrl(source: BlogSource): string {
  return `https://raw.githubusercontent.com/${source.owner}/${source.repo}/${source.branch}/${source.path}/metadata.json`;
}

/**
 * Get blog source configuration
 */
export function getBlogSource(category: string): BlogSource {
  return (
    BLOG_SOURCES[category.toLowerCase()] || BLOG_SOURCES.frontend // Default to frontend
  );
}

/**
 * Get all blog sources
 */
export function getAllBlogSources(): BlogSource[] {
  return Object.values(BLOG_SOURCES);
}

async function getCachedResponse<
  T extends string | Record<string, BlogMetadataEntry>
>(
  url: string,
  fetcher: () => Promise<T>
): Promise<T> {
  const now = Date.now();
  const cached = apiCache.get(url) as CacheEntry<T> | undefined;

  if (cached?.value !== undefined && cached.expiresAt > now) {
    return cached.value;
  }

  if (cached?.promise) {
    return cached.promise;
  }

  const fetchPromise = fetcher()
    .then((value) => {
      apiCache.set(url, {
        value,
        expiresAt: Date.now() + CACHE_TTL_MS,
      });
      return value;
    })
    .catch((error) => {
      if (cached?.value !== undefined) {
        apiCache.set(url, {
          value: cached.value,
          expiresAt: Date.now() + CACHE_TTL_MS,
        });
        return cached.value;
      }

      apiCache.delete(url);
      throw error;
    });

  apiCache.set(url, {
    value: cached?.value,
    expiresAt: cached?.expiresAt || 0,
    promise: fetchPromise,
  });

  return fetchPromise;
}

/**
 * Fetch blog metadata from metadata.json file
 * This is much more efficient than fetching all markdown files
 * Results are cached to avoid repetitive API calls
 */
export async function fetchBlogMetadata(
  source: BlogSource
): Promise<Record<string, BlogMetadataEntry>> {
  const url = getMetadataUrl(source);

  return getCachedResponse(url, async () => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch blog metadata: ${response.statusText}`
        );
      }

      const metadata: Record<string, BlogMetadataEntry> =
        await response.json();

      // Sort entries by date (most recent first) and rebuild the object
      const sortedEntries = Object.entries(metadata).sort(([, a], [, b]) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      const sortedMetadata: typeof metadata = {};
      for (const [key, value] of sortedEntries) {
        value.date = new Date(value.date).toISOString();
        sortedMetadata[key] = value;
      }

      return sortedMetadata;
    } catch (error) {
      console.error(
        `Error fetching blog metadata for ${source.category}:`,
        error
      );
      throw error;
    }
  });
}

/**
 * Fetch list of markdown files from GitHub
 * Note: This is not used when metadata.json is available, but kept for backward compatibility
 */
export async function fetchBlogFileList(
  source: BlogSource
): Promise<GitHubFile[]> {
  try {
    const url = `https://api.github.com/repos/${source.owner}/${source.repo}/contents/${source.path}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch blog list: ${response.statusText}`);
    }

    const files: GitHubFile[] = await response.json();

    // Filter only markdown files
    return files.filter(
      (file) => file.type === "file" && file.name.endsWith(".md")
    );
  } catch (error) {
    console.error(
      `Error fetching blog file list for ${source.category}:`,
      error
    );
    throw error;
  }
}

/**
 * Fetch raw markdown content from GitHub
 * Results are cached to avoid repetitive API calls for the same file
 */
export async function fetchBlogContent(
  filename: string,
  source: BlogSource
): Promise<string> {
  const url = getRawContentUrl(filename, source);

  return getCachedResponse(url, async () => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch blog content: ${response.statusText}`);
      }

      return await response.text();
    } catch (error) {
      console.error(
        `Error fetching blog content for ${filename} from ${source.category}:`,
        error
      );
      throw error;
    }
  });
}

/**
 * Clear the API cache (useful for testing or forcing refresh)
 */
export function clearApiCache(): void {
  apiCache.clear();
}

/**
 * Get cache size (useful for debugging)
 */
export function getCacheSize(): number {
  return apiCache.size;
}
