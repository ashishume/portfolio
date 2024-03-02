import style from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { INavbar, NavItems } from "../../Shared/contants";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { SVGs } from "../../Shared/icons";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItemIndex, setActiveItemIndex] = useState(null as any);
  const [open, setOpen] = useState(false);
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
    <div className={style["container"]}>
      <ul className={style["nav-items"]}>
        <div className={style["navbar-resp"]}>
          {open ? (
            <div className={style["close-icon"]} onClick={toggleNavbar}>
              {SVGs().CloseIcon}
            </div>
          ):
            <div className={style["menu-icon"]} onClick={toggleNavbar}>
              {SVGs().MenuIcon}
            </div>
          
          }
        </div>

        {open &&
          NavItems.map((item, index) => {
            return (
              <li
                key={item.label}
                className={
                  activeItemIndex !== null && index == activeItemIndex
                    ? style["active"]
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
