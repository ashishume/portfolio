/**
 * GitHub Blog Service
 * Fetches markdown blog files from GitHub repository
 */

const GITHUB_OWNER = "ashishume";
const GITHUB_REPO = "Front-end-Javascript-Interview-Topics";
const GITHUB_BRANCH = "master";
const BLOG_PATH = "frontend-blog-content/frontend";

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
export function getRawContentUrl(filename: string): string {
  return `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${BLOG_PATH}/${filename}`;
}

/**
 * Get the raw content URL for metadata.json
 */
export function getMetadataUrl(): string {
  return `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${BLOG_PATH}/metadata.json`;
}

/**
 * Fetch blog metadata from metadata.json file
 * This is much more efficient than fetching all markdown files
 * Results are cached to avoid repetitive API calls
 */
export async function fetchBlogMetadata(): Promise<Record<string, any>> {
  const url = getMetadataUrl();

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
      console.error("Error fetching blog metadata:", error);
      throw error;
    }
  })();

  // Store the promise in cache (not the result) to handle concurrent requests
  apiCache.set(url, fetchPromise);

  return fetchPromise as Promise<Record<string, any>>;
}

/**
 * Fetch list of markdown files from GitHub
 */
export async function fetchBlogFileList(): Promise<GitHubFile[]> {
  try {
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${BLOG_PATH}`;
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
    console.error("Error fetching blog file list:", error);
    throw error;
  }
}

/**
 * Fetch raw markdown content from GitHub
 * Results are cached to avoid repetitive API calls for the same file
 */
export async function fetchBlogContent(filename: string): Promise<string> {
  const url = getRawContentUrl(filename);

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
      console.error(`Error fetching blog content for ${filename}:`, error);
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
