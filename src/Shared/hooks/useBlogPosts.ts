import { useState, useEffect } from "react";
import { IBlog, getBlogPosts } from "../blogData";

/**
 * Hook to fetch and use blog posts
 * Handles loading state and provides blog posts data
 */
export function useBlogPosts() {
  const [blogPosts, setBlogPosts] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPosts() {
      try {
        setLoading(true);
        const posts = await getBlogPosts();
        if (isMounted) {
          setBlogPosts(posts);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Failed to load blog posts"));
          setBlogPosts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  return { blogPosts, loading, error };
}

