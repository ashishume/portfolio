import { getBlogPosts, loadBlogContent } from "./blogData";
import type { IBlog } from "./blogData";
import type { SsrData, SeoData } from "./SsrDataContext";

const defaultSeo: SeoData = {
  title: "Ashish Debnath | Portfolio | Blog",
  description: "Ashish Debnath portfolio and technical blog",
  canonicalPath: "/",
  type: "website",
};

function trimDescription(value: string): string {
  return value.replace(/\s+/g, " ").trim().slice(0, 160);
}

export async function getSsrDataForUrl(url: string): Promise<SsrData> {
  const pathname = new URL(url, "https://ashishdebnath.in").pathname;

  if (pathname === "/blog") {
    try {
      const blogPosts = await getBlogPosts();

      return {
        blogPosts,
        statusCode: 200,
        seo: {
          title: "Blog | Ashish Debnath",
          description: "Technical articles by Ashish Debnath.",
          canonicalPath: "/blog",
          type: "website",
        },
      };
    } catch (error) {
      console.error("Failed to SSR blog metadata:", error);
      return {
        statusCode: 503,
        seo: {
          title: "Blog Temporarily Unavailable | Ashish Debnath",
          description: "Blog posts are temporarily unavailable.",
          canonicalPath: "/blog",
          type: "website",
        },
      };
    }
  }

  const blogMatch = pathname.match(/^\/blog\/([^/]+)\/?$/);

  if (blogMatch) {
    const slug = decodeURIComponent(blogMatch[1]);
    let blogPosts: IBlog[] = [];

    try {
      blogPosts = await getBlogPosts();
    } catch (error) {
      console.error("Failed to SSR blog metadata:", error);
      return {
        statusCode: 503,
        seo: {
          title: "Blog Temporarily Unavailable | Ashish Debnath",
          description: "The requested blog post is temporarily unavailable.",
          canonicalPath: pathname,
          type: "website",
        },
      };
    }

    const blog = blogPosts.find((post) => post.slug === slug);

    if (!blog) {
      return {
        blogPosts,
        statusCode: 404,
        seo: {
          title: "Blog Not Found | Ashish Debnath",
          description: "The requested blog post could not be found.",
          canonicalPath: pathname,
          type: "website",
        },
      };
    }

    const content = await loadBlogContent(slug);

    return {
      blogPosts,
      blogContentBySlug: {
        [slug]: content,
      },
      statusCode: content === null ? 503 : 200,
      seo: {
        title: `${blog.title} | Ashish Debnath`,
        description: trimDescription(blog.excerpt || blog.title),
        canonicalPath: `/blog/${blog.slug}`,
        type: "article",
      },
    };
  }

  return {
    statusCode: 200,
    seo: {
      ...defaultSeo,
      canonicalPath: pathname,
    },
  };
}
