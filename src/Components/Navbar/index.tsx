import React, { useEffect, useState } from "react";
import { SVGs } from "../../Shared/icons";
import { NavItems } from "../../Shared/constant";
import { INavbar } from "../../Shared/models";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(null as any);
  const navigate = useNavigate();
  const { pathname } = location;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    NavItems.map(({ label }: INavbar, index) => {
      const newLabel = label.toLocaleLowerCase();
      if (pathname !== "/") {
        const cleanPathname = pathname.split("/")[1];

        if (newLabel.includes(cleanPathname)) {
          console.log(index);

          setActiveItemIndex(index);
          return;
        }
      } else if (pathname === "/") {
        if (newLabel === "home") {
          setActiveItemIndex(0);
          return;
        }
      }
    });
  }, []);

  const handleNavItem = (route: string) => {
    navigate(route);
  };

  const createNavListItem = () => {
    return NavItems.map(({ label, route }, index) => {
      return (
        <li key={label}>
          <a
            onClick={() => handleNavItem(route)}
            className={`${
              activeItemIndex !== null && index == activeItemIndex
                ? "py-1 text-white font-bold"
                : "text-gray-400"
            } hover:text-gray-400 mx-2 cursor-pointer`}
          >
            {label.toUpperCase()}
          </a>
        </li>
      );
    });
  };

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Logo</div>
        <ul className="hidden md:flex space-x-4">{createNavListItem()}</ul>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {SVGs().Menu}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col space-y-4 mt-4">
            {createNavListItem()}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
