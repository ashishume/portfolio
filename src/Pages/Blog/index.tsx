import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import Layout from "../../Layout/layout";
import { blogPosts } from "../../Shared/blogData";
import BlogSidebar from "./BlogSidebar";

const Blog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    let posts = blogPosts;

    // Filter by category
    if (selectedCategory && selectedCategory !== "all") {
      posts = posts.filter((post) => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query)
      );
    }

    return posts;
  }, [searchQuery, selectedCategory]);

  return (
    <Layout>
      <div className="min-h-screen dark:bg-gradient-to-br dark:from-slate-900 dark:via-gray-800 dark:to-slate-900 bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar */}
            <div className="lg:order-1">
              <BlogSidebar
                selectedCategory={selectedCategory || undefined}
                onCategoryChange={setSelectedCategory}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:order-2">
              {/* <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">
                  Blog
                </h1>
                <div className="h-1 w-16 bg-blue-500 mx-auto"></div>
              </div> */}

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
                    Found {filteredPosts.length}{" "}
                    {filteredPosts.length === 1 ? "post" : "posts"}
                  </p>
                )}
                {selectedCategory && (
                  <p className="mt-2 text-sm dark:text-gray-400 text-gray-600">
                    Category:{" "}
                    <span className="font-medium capitalize">
                      {selectedCategory}
                    </span>
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
                      className="dark:bg-gray-800/80 bg-white rounded-lg p-6 hover:shadow-md transition-all duration-300 cursor-pointer transform border dark:border-gray-700 border-gray-200"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 text-xs font-medium rounded dark:bg-blue-600/20 bg-blue-100 dark:text-blue-400 text-blue-700 capitalize">
                          {post.category}
                        </span>
                        <p className="text-sm dark:text-gray-400 text-gray-600">
                          {new Date(post.date).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-2">
                        {post.title}
                      </h2>
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
                    {searchQuery
                      ? `No blogs found matching "${searchQuery}"`
                      : "No blogs found in this category"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
