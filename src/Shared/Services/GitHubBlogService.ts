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

// Cache for API responses - key: URL, value: Promise<string | Record<string, any>>
const apiCache = new Map<string, Promise<string | Record<string, any>>>();

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

/**
 * Fetch blog metadata from metadata.json file
 * This is much more efficient than fetching all markdown files
 * Results are cached to avoid repetitive API calls
 */
export async function fetchBlogMetadata(
  source: BlogSource
): Promise<Record<string, any>> {
  const url = getMetadataUrl(source);

  // Check cache first
  if (apiCache.has(url)) {
    const cached = await apiCache.get(url)!;
    return cached as Record<string, any>;
  }

  // Fetch and cache the result
  const fetchPromise = (async () => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch blog metadata: ${response.statusText}`
        );
      }

      const metadata = await response.json();
      return metadata;
    } catch (error) {
      // Remove from cache on error so it can be retried
      apiCache.delete(url);
      console.error(
        `Error fetching blog metadata for ${source.category}:`,
        error
      );
      throw error;
    }
  })();

  // Store the promise in cache (not the result) to handle concurrent requests
  apiCache.set(url, fetchPromise);

  return fetchPromise as Promise<Record<string, any>>;
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

  // Check cache first
  if (apiCache.has(url)) {
    const cached = await apiCache.get(url)!;
    return cached as string;
  }

  // Fetch and cache the result
  const fetchPromise = (async () => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch blog content: ${response.statusText}`);
      }

      return await response.text();
    } catch (error) {
      // Remove from cache on error so it can be retried
      apiCache.delete(url);
      console.error(
        `Error fetching blog content for ${filename} from ${source.category}:`,
        error
      );
      throw error;
    }
  })();

  // Store the promise in cache (not the result) to handle concurrent requests
  apiCache.set(url, fetchPromise);

  return fetchPromise;
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
