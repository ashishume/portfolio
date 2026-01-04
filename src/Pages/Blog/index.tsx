import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import Layout from "../../Layout/layout";
import { blogPosts } from "../../Shared/blogData";

const Blog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) {
      return blogPosts;
    }

    const query = searchQuery.toLowerCase();
    return blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <Layout>
      <div className="min-h-screen dark:bg-gradient-to-br dark:from-slate-900 dark:via-gray-800 dark:to-slate-900 bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">
              Blog
            </h1>
            <div className="h-1 w-16 bg-blue-500 mx-auto"></div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 dark:bg-gray-800/80 bg-white dark:text-white text-gray-900 border dark:border-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 dark:text-gray-400 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {searchQuery && (
              <p className="mt-2 text-sm dark:text-gray-400 text-gray-600">
                Found {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
              </p>
            )}
          </div>

          {/* Blog Posts */}
          {filteredPosts.length > 0 ? (
            <div className="space-y-8">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className="dark:bg-gray-800/80 bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border dark:border-gray-700 border-gray-200"
                >
                  <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm dark:text-gray-400 text-gray-600 mb-4">
                    {post.date}
                  </p>
                  <p className="text-lg dark:text-gray-300 text-gray-700">
                    {post.excerpt}
                  </p>
                  <button className="mt-4 text-blue-600 dark:text-blue-400 hover:underline font-medium">
                    Read more →
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl dark:text-gray-400 text-gray-600">
                No blogs found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;

