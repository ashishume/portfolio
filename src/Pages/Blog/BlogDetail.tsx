import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Layout from "../../Layout/layout";
import { blogPosts, IBlog } from "../../Shared/blogData";
// import { getRelatedPosts } from "../../Shared/blogUtils";
import BlogSidebar from "./BlogSidebar";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<IBlog | null>(null);
  // const [relatedPosts, setRelatedPosts] = useState<IBlog[]>([]);

  useEffect(() => {
    const foundBlog = blogPosts.find((post) => post.slug === slug);
    if (foundBlog) {
      setBlog(foundBlog);
      // setRelatedPosts(getRelatedPosts(foundBlog, blogPosts, 3));
    }
  }, [slug]);

  if (!blog) {
    return (
      <Layout>
        <div className="min-h-screen dark:bg-gradient-to-br dark:from-slate-900 dark:via-gray-800 dark:to-slate-900 bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 px-6 md:px-16 lg:px-24">
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

  return (
    <Layout>
      <div className="min-h-screen dark:bg-gradient-to-br dark:from-slate-900 dark:via-gray-800 dark:to-slate-900  to-gray-100 py-16 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Categories */}
            <div className="lg:order-1">
              <BlogSidebar selectedCategory={blog.category} />
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:max-w-3xl lg:order-2">
              <button
                onClick={() => navigate("/blog")}
                className="mb-6 text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                ← Back to Blog
              </button>

              <article className="dark:bg-gray-800/80 bg-white rounded-lg p-8 dark:border-gray-700 border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 text-sm font-medium rounded dark:bg-blue-600/20 bg-blue-100 dark:text-blue-400 text-blue-700 capitalize">
                    {blog.category}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">
                  {blog.title}
                </h1>
                <p className="text-sm dark:text-gray-400 text-gray-600 mb-8">
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1
                          className="text-3xl font-bold dark:text-white text-gray-900 mt-8 mb-4"
                          {...props}
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2
                          className="text-2xl font-bold dark:text-white text-gray-900 mt-6 mb-3"
                          {...props}
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3
                          className="text-xl font-bold dark:text-white text-gray-900 mt-4 mb-2"
                          {...props}
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p
                          className="dark:text-gray-300 text-gray-700 mb-4 leading-relaxed"
                          {...props}
                        />
                      ),
                      code: ({ node, inline, ...props }: any) => {
                        if (inline) {
                          return (
                            <code
                              className="dark:bg-gray-700 bg-gray-100 dark:text-blue-400 text-blue-600 px-2 py-1 rounded text-sm"
                              {...props}
                            />
                          );
                        }
                        return (
                          <code
                            className="block dark:bg-gray-900 bg-gray-100 dark:text-gray-300 text-gray-800 p-4 rounded-lg overflow-x-auto mb-4"
                            {...props}
                          />
                        );
                      },
                      pre: ({ node, ...props }) => (
                        <pre
                          className="dark:bg-gray-900 bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4"
                          {...props}
                        />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          className="list-disc list-inside dark:text-gray-300 text-gray-700 mb-4 space-y-2"
                          {...props}
                        />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol
                          className="list-decimal list-inside dark:text-gray-300 text-gray-700 mb-4 space-y-2"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li
                          className="dark:text-gray-300 text-gray-700"
                          {...props}
                        />
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote
                          className="border-l-4 border-blue-500 dark:bg-gray-700/50 bg-gray-100 pl-4 py-2 my-4 italic dark:text-gray-300 text-gray-700"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {blog.content}
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
