import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Layout from "../../Layout/layout";
import { IBlog, loadBlogContent, getBlogPosts } from "../../Shared/blogData";
// import { getRelatedPosts } from "../../Shared/blogUtils";
import BlogSidebar from "./BlogSidebar";
import Spinner from "../../Components/Spinner";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  // const [relatedPosts, setRelatedPosts] = useState<IBlog[]>([]);

  useEffect(() => {
    async function loadBlog() {
      setLoading(true);
      try {
        const posts = await getBlogPosts();
        const foundBlog = posts.find((post) => post.slug === slug);

        if (foundBlog) {
          setBlog(foundBlog);
          // setRelatedPosts(getRelatedPosts(foundBlog, posts, 3));

          // Load content on demand
          const loadedContent = await loadBlogContent(slug!);
          if (loadedContent) {
            setContent(loadedContent);
          }
        }
      } catch (error) {
        console.error("Failed to load blog:", error);
      } finally {
        setLoading(false);
      }
    }

    loadBlog();
  }, [slug]);

  if (!blog) {
    return (
      <Layout>
        <div className="min-h-screen dark:bg-gradient-to-br dark:from-slate-900 dark:via-gray-800 dark:to-slate-900 bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-20 sm:pt-24 lg:pt-28 pb-16 px-6 md:px-16 lg:px-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-4">
              Blog Not Found
            </h1>
            <button
              onClick={() => navigate("/blog")}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300"
            >
              Back to Blog
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen dark:bg-gradient-to-br dark:from-slate-900 dark:via-gray-800 dark:to-slate-900 bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-20 sm:pt-24 lg:pt-28 pb-16 px-6 md:px-16 lg:px-24">
          <div className="max-w-4xl mx-auto flex justify-center items-center min-h-[60vh]">
            <Spinner />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen dark:bg-gradient-to-br dark:from-slate-900 dark:via-gray-800 dark:to-slate-900 to-gray-100 pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Header with Back Button and Categories Toggle */}
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <button
              onClick={() => navigate("/blog")}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm sm:text-base"
            >
              ← Back to Blog
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg dark:bg-gray-800/80 bg-white dark:text-gray-300 text-gray-700 border dark:border-gray-700 border-gray-200 text-sm font-medium"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              Categories
            </button>
          </div>

          {/* Mobile Sidebar Drawer */}
          {sidebarOpen && (
            <div className="lg:hidden mb-4">
              <div className="dark:bg-gray-800/95 bg-white/95 backdrop-blur-sm rounded-lg border dark:border-gray-700 border-gray-200 overflow-hidden">
                <BlogSidebar selectedCategory={blog.category} />
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            {/* Left Sidebar - Categories (Hidden on mobile, shown on desktop) */}
            <div className="hidden lg:block lg:order-1 w-full lg:w-80 lg:sticky lg:top-24 lg:self-start">
              <BlogSidebar selectedCategory={blog.category} />
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:max-w-3xl lg:order-2 w-full">
              {/* Desktop Back Button */}
              <button
                onClick={() => navigate("/blog")}
                className="hidden lg:block mb-6 text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                ← Back to Blog
              </button>

              <article className="dark:bg-gray-800/80 bg-white rounded-lg p-4 sm:p-6 lg:p-8 dark:border-gray-700 border-gray-200">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded dark:bg-blue-600/20 bg-blue-100 dark:text-blue-400 text-blue-700 capitalize">
                    {blog.category}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold dark:text-white text-gray-900 mb-3 sm:mb-4 leading-tight">
                  {blog.title}
                </h1>
                <p className="text-xs sm:text-sm dark:text-gray-400 text-gray-600 mb-6 sm:mb-8">
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>

                <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1
                          className="text-xl sm:text-2xl lg:text-3xl font-bold dark:text-white text-gray-900 mt-6 sm:mt-8 mb-3 sm:mb-4"
                          {...props}
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2
                          className="text-lg sm:text-xl lg:text-2xl font-bold dark:text-white text-gray-900 mt-5 sm:mt-6 mb-2 sm:mb-3"
                          {...props}
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3
                          className="text-base sm:text-lg lg:text-xl font-bold dark:text-white text-gray-900 mt-3 sm:mt-4 mb-2"
                          {...props}
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p
                          className="dark:text-gray-300 text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base"
                          {...props}
                        />
                      ),
                      code: ({ node, inline, ...props }: any) => {
                        if (inline) {
                          return (
                            <code
                              className="dark:bg-gray-700 bg-gray-100 dark:text-blue-400 text-blue-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm break-words"
                              {...props}
                            />
                          );
                        }
                        return (
                          <code
                            className="block dark:bg-gray-900 bg-gray-100 dark:text-gray-300 text-gray-800 p-3 sm:p-4 rounded-lg overflow-x-auto mb-3 sm:mb-4 text-xs sm:text-sm whitespace-pre-wrap break-words sm:whitespace-pre"
                            {...props}
                          />
                        );
                      },
                      pre: ({ node, ...props }) => (
                        <pre
                          className="dark:bg-gray-900 bg-gray-100 p-3 sm:p-4 rounded-lg overflow-x-auto mb-3 sm:mb-4 text-xs sm:text-sm max-w-full"
                          {...props}
                        />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          className="list-disc list-outside ml-4 sm:ml-5 dark:text-gray-300 text-gray-700 mb-3 sm:mb-4 space-y-1.5 sm:space-y-2 text-sm sm:text-base"
                          {...props}
                        />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol
                          className="list-decimal list-outside ml-4 sm:ml-5 dark:text-gray-300 text-gray-700 mb-3 sm:mb-4 space-y-1.5 sm:space-y-2 text-sm sm:text-base"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li
                          className="dark:text-gray-300 text-gray-700 text-sm sm:text-base"
                          {...props}
                        />
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote
                          className="border-l-4 border-blue-500 dark:bg-gray-700/50 bg-gray-100 pl-3 sm:pl-4 py-2 my-3 sm:my-4 italic dark:text-gray-300 text-gray-700 text-sm sm:text-base"
                          {...props}
                        />
                      ),
                      a: ({ node, ...props }) => (
                        <a
                          className="text-blue-600 dark:text-blue-400 hover:underline break-words"
                          {...props}
                        />
                      ),
                      img: ({ node, ...props }) => (
                        <img
                          className="max-w-full h-auto rounded-lg my-3 sm:my-4"
                          {...props}
                        />
                      ),
                      table: ({ node, ...props }) => (
                        <div className="overflow-x-auto mb-3 sm:mb-4 -mx-4 sm:mx-0">
                          <table
                            className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-xs sm:text-sm"
                            {...props}
                          />
                        </div>
                      ),
                      th: ({ node, ...props }) => (
                        <th
                          className="px-3 sm:px-4 py-2 text-left font-semibold dark:bg-gray-800 bg-gray-100 dark:text-white text-gray-900"
                          {...props}
                        />
                      ),
                      td: ({ node, ...props }) => (
                        <td
                          className="px-3 sm:px-4 py-2 dark:text-gray-300 text-gray-700 border-b dark:border-gray-700 border-gray-200"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                </div>
              </article>
            </div>

            {/* Right Sidebar - Related Posts */}
            {/* {relatedPosts.length > 0 && (
              <aside className="lg:w-80 flex-shrink-0 lg:order-3">
                <div className="sticky top-24">
                  <div className="dark:bg-gray-800/80 bg-white rounded-lg p-6 dark:border-gray-700 border-gray-200">
                    <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-6">
                      Related Posts
                    </h2>
                    <div className="space-y-4">
                      {relatedPosts.map((post) => (
                        <div
                          key={post.id}
                          onClick={() => navigate(`/blog/${post.slug}`)}
                          className="cursor-pointer group"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 text-xs font-medium rounded dark:bg-blue-600/20 bg-blue-100 dark:text-blue-400 text-blue-700 capitalize">
                              {post.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-sm dark:text-gray-400 text-gray-600 mb-2">
                            {post.date}
                          </p>
                          <p className="text-sm dark:text-gray-300 text-gray-700 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="mt-2 text-blue-600 dark:text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            Read more →
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            )} */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogDetail;
