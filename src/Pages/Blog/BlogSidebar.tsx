import { useNavigate, useLocation } from "react-router-dom";
import { useBlogPosts } from "../../Shared/hooks/useBlogPosts";
import { getCategories } from "../../Shared/blogData";
import { useState, useEffect, useRef } from "react";

interface BlogSidebarProps {
  selectedCategory?: string;
  onCategoryChange?: (category: string | null) => void;
}

const BlogSidebar = ({
  selectedCategory,
  onCategoryChange,
}: BlogSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { blogPosts } = useBlogPosts();
  const [categories, setCategories] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(selectedCategory ? [selectedCategory] : [])
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const savedScrollPositionRef = useRef<number>(0);

  useEffect(() => {
    getCategories().then(setCategories);
  }, [blogPosts]);

  // Restore scroll position after DOM updates
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer && savedScrollPositionRef.current > 0) {
      // Use double requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (scrollContainer) {
            scrollContainer.scrollTop = savedScrollPositionRef.current;
            savedScrollPositionRef.current = 0; // Reset after restoring
          }
        });
      });
    }
  }, [expandedCategories]);

  const toggleCategory = (category: string) => {
    // Save current scroll position
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      savedScrollPositionRef.current = scrollContainer.scrollTop;
    }

    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const handleCategoryClick = (category: string) => {
    if (onCategoryChange) {
      // If clicking the same category, deselect it (show all)
      onCategoryChange(category === selectedCategory ? null : category);
    }
  };

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <aside className="w-full flex-shrink-0">
      <div
        ref={scrollContainerRef}
        className="lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto"
      >
        <div className="dark:bg-gray-800/80 bg-white rounded-lg p-4 dark:border-gray-700 border-gray-200">
          <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-6">
            Categories
          </h2>

          {/* All Posts */}
          <div className="mb-4">
            <button
              onClick={() => {
                if (onCategoryChange) {
                  onCategoryChange(null);
                }
              }}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                !selectedCategory
                  ? "dark:bg-blue-600/20 bg-blue-100 dark:text-blue-400 text-blue-700 font-medium"
                  : "dark:text-gray-300 text-gray-700 hover:dark:bg-gray-700/50 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-between gap-2 min-w-0">
                <span className="truncate min-w-0">All Posts</span>
                <span className="text-sm dark:text-gray-400 text-gray-500 flex-shrink-0">
                  ({blogPosts.length})
                </span>
              </div>
            </button>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            {categories.map((category) => {
              const categoryPosts = blogPosts.filter(
                (post) => post.category === category
              );
              const isExpanded = expandedCategories.has(category);
              const isSelected = selectedCategory === category;

              return (
                <div
                  key={category}
                  className="border-b dark:border-gray-700 border-gray-200 last:border-b-0 pb-2 last:pb-0"
                >
                  <button
                    onClick={() => {
                      toggleCategory(category);
                      handleCategoryClick(category);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      isSelected
                        ? "dark:bg-blue-600/20 bg-blue-100 dark:text-blue-400 text-blue-700 font-medium"
                        : "dark:text-gray-300 text-gray-700 hover:dark:bg-gray-700/50 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 min-w-0">
                      <span className="truncate min-w-0">
                        {capitalizeFirst(category)}
                      </span>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-sm dark:text-gray-400 text-gray-500">
                          ({categoryPosts.length})
                        </span>
                        <svg
                          className={`w-4 h-4 transition-transform ${
                            isExpanded ? "rotate-90" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Posts in category */}
                  {isExpanded && (
                    <div className="mt-2 ml-4 space-y-1">
                      {categoryPosts.map((post) => (
                        <button
                          key={post.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePostClick(post.slug);
                          }}
                          className={`w-full text-left px-4 py-1.5 rounded text-sm transition-colors truncate ${
                            location.pathname === `/blog/${post.slug}`
                              ? "dark:bg-blue-600/30 bg-blue-50 dark:text-blue-300 text-blue-600 font-medium"
                              : "dark:text-gray-400 text-gray-600 hover:dark:bg-gray-700/30 hover:bg-gray-50"
                          }`}
                          title={post.title}
                        >
                          {post.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
