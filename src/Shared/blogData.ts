import { titleToSlug } from "./utils";
import { parseFrontmatter } from "./frontmatter";

export interface IBlog {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
}

// Import all markdown files from the blogs folder and subfolders
const blogModules = import.meta.glob("../blogs/**/*.md", { query: "?raw", import: "default", eager: true });

// Parse markdown files and convert to blog posts
export const blogPosts: IBlog[] = Object.entries(blogModules)
  .map(([path, content], index) => {
    const rawContent = content as string;
    const { data, content: markdownContent } = parseFrontmatter(rawContent);
    
    // Extract category from path (e.g., ../blogs/frontend/file.md -> frontend)
    const pathParts = path.split("/");
    const blogsIndex = pathParts.findIndex(part => part === "blogs");
    const category = blogsIndex !== -1 && pathParts[blogsIndex + 1] 
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
      content: markdownContent.trim(),
      category: data.category || category,
    } as IBlog;
  })
  // Sort by date (newest first)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// Get all unique categories
export const categories = Array.from(new Set(blogPosts.map(post => post.category))).sort();

// Get posts by category
export const getPostsByCategory = (category: string): IBlog[] => {
  return blogPosts.filter(post => post.category === category);
};

