import { IBlog } from "./blogData";

/**
 * Finds related blog posts based on common words in title and content
 */
export const getRelatedPosts = (
  currentBlog: IBlog,
  allPosts: IBlog[],
  limit: number = 3
): IBlog[] => {
  // Exclude the current blog
  const otherPosts = allPosts.filter((post) => post.id !== currentBlog.id);

  if (otherPosts.length === 0) {
    return [];
  }

  // Extract words from current blog title and content
  const currentWords = new Set(
    (currentBlog.title + " " + currentBlog.content)
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 3) // Filter out short words
  );

  // Score each post based on common words
  const scoredPosts = otherPosts.map((post) => {
    const postWords = new Set(
      (post.title + " " + post.excerpt)
        .toLowerCase()
        .split(/\s+/)
        .filter((word) => word.length > 3)
    );

    // Count common words
    let score = 0;
    currentWords.forEach((word) => {
      if (postWords.has(word)) {
        score++;
      }
    });

    return { post, score };
  });

  // Sort by score and return top posts
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
};

