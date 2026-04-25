import { useState, useEffect } from "react";
import { IBlog, getBlogPosts } from "../blogData";
import { useSsrData } from "../SsrDataContext";

/**
 * Hook to fetch and use blog posts
 * Handles loading state and provides blog posts data
 */
export function useBlogPosts() {
  const ssrData = useSsrData();
  const [blogPosts, setBlogPosts] = useState<IBlog[]>(
    () => ssrData.blogPosts || []
  );
  const [loading, setLoading] = useState<boolean>(() => !ssrData.blogPosts);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (ssrData.blogPosts) {
      setBlogPosts(ssrData.blogPosts);
      setLoading(false);
      setError(null);
      return () => {
        isMounted = false;
      };
    }

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
  }, [ssrData.blogPosts]);

  return { blogPosts, loading, error };
}
