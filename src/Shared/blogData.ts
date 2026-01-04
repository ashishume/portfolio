import { titleToSlug } from "./utils";
import { parseFrontmatter } from "./frontmatter";

export interface IBlog {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
}

// Import all markdown files from the blogs folder
const blogModules = import.meta.glob("../blogs/*.md", { query: "?raw", import: "default", eager: true });

// Parse markdown files and convert to blog posts
export const blogPosts: IBlog[] = Object.entries(blogModules)
  .map(([path, content], index) => {
    const rawContent = content as string;
    const { data, content: markdownContent } = parseFrontmatter(rawContent);
    
    // Extract filename for slug if title is not provided
    const filename = path.split("/").pop()?.replace(".md", "") || "";
    const slug = data.slug || titleToSlug(data.title || filename);
    
    return {
      id: data.id || String(index + 1),
      title: data.title || filename,
      slug: slug,
      date: data.date || new Date().toISOString().split("T")[0],
      excerpt: data.excerpt || "",
      content: markdownContent.trim(),
    } as IBlog;
  })
  // Sort by date (newest first)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

