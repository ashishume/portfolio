/**
 * GitHub Blog Service
 * Fetches markdown blog files from GitHub repository
 */

const GITHUB_OWNER = "ashishume";
const GITHUB_REPO = "Front-end-Javascript-Interview-Topics";
const GITHUB_BRANCH = "master";
const BLOG_PATH = "frontend-blog-content/frontend";

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
 */
export async function fetchBlogContent(filename: string): Promise<string> {
  try {
    const url = getRawContentUrl(filename);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch blog content: ${response.statusText}`);
    }

    return await response.text();
  } catch (error) {
    console.error(`Error fetching blog content for ${filename}:`, error);
    throw error;
  }
}
