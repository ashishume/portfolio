import "./style.scss";
import { useNavigate } from "react-router-dom";
import { INavbar, NavItems } from "../../Shared/contants";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { SVGs } from "../../Shared/icons";
import portfolioPic from "../../Assets/portfolio-logo.png";
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItemIndex, setActiveItemIndex] = useState(null as any);
  const [open, setOpen] = useState(window.innerWidth > 390);
  useEffect(() => {
    const { pathname } = location;

    NavItems.map(({ label }: INavbar, index) => {
      const newLabel = label.toLocaleLowerCase();
      if (pathname !== "/") {
        const cleanPathname = pathname.split("/")[1];
        if (newLabel.includes(cleanPathname)) {
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
  }, [location.pathname]);
  const handleNavItem = (route: string) => {
    navigate(route);
  };
  const toggleNavbar = () => {
    setOpen(!open);
  };

  return (
    <div className={"navbar-container"}>
      <img className="portfolio-pic" src={portfolioPic} />
      <ul className={"nav-items"}>
        <div className={"navbar-resp"}>
          {open ? (
            <div className={"close-icon"} onClick={toggleNavbar}>
              {SVGs().CloseIcon}
            </div>
          ) : (
            <div className={"menu-icon"} onClick={toggleNavbar}>
              {SVGs().MenuIcon}
            </div>
          )}
        </div>
        {open &&
          NavItems.map((item, index) => {
            return (
              <li
                key={item.label}
                className={
                  activeItemIndex !== null && index == activeItemIndex
                    ? "active"
                    : ""
                }
                onClick={() => handleNavItem(item?.route)}
              >
                {item.label}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Navbar;
