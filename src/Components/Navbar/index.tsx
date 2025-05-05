import React, { useEffect, useState } from "react";
import { SVGs } from "../../Shared/icons";
import { NavItems } from "../../Shared/constant";
import { INavbar } from "../../Shared/models";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { pathname } = location;

  // Handle scroll effect for transparent to solid navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Determine active nav item based on current route
  useEffect(() => {
    NavItems.forEach(({ label }: INavbar, index: number) => {
      const newLabel = label.toLowerCase();
      if (pathname !== "/") {
        const cleanPathname = pathname.split("/")[1];
        if (newLabel.includes(cleanPathname)) {
          setActiveItemIndex(index);
          return;
        }
      } else if (pathname === "/" && newLabel === "home") {
        setActiveItemIndex(0);
        return;
      }
    });
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavItem = (route: string) => {
    navigate(route);
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div
              onClick={() => navigate("/")}
              className="group cursor-pointer flex items-center"
            >
              <div className="flex items-center justify-center h-10 w-10 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-lg shadow-lg transform transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                <span className="text-white text-2xl font-bold">A</span>
              </div>
              {/* <span className="ml-3 text-white font-semibold text-lg hidden sm:block">
                Ashish<span className="text-blue-400">.dev</span>
              </span> */}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="flex space-x-1">
              {NavItems.map(({ label, route }, index) => (
                <li key={label}>
                  <a
                    onClick={() => handleNavItem(route)}
                    className={`relative px-4 py-2 rounded-md font-medium cursor-pointer transition-all duration-300 inline-block text-sm ${
                      activeItemIndex === index
                        ? "text-white"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    {label.toUpperCase()}
                    {activeItemIndex === index && (
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-blue-500 rounded-full" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg bg-gray-800/70 hover:bg-gray-700/70 transition-colors duration-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                SVGs().Menu
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-gray-900/95 backdrop-blur-md border-t border-gray-800 px-4 py-2 shadow-lg">
          <ul className="space-y-2 pb-3 pt-2">
            {NavItems.map(({ label, route }, index) => (
              <li key={label}>
                <a
                  onClick={() => handleNavItem(route)}
                  className={`block px-3 py-2 rounded-md transition-all duration-200 ${
                    activeItemIndex === index
                      ? "bg-gray-800 text-white font-medium"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/40"
                  }`}
                >
                  <div className="flex items-center">
                    {/* You can add icons here for each nav item */}
                    <span className="ml-3">{label.toUpperCase()}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
