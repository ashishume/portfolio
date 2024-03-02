import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Home from "../Pages/Home";
import Projects from "../Pages/Projects";
import Skills from "../Pages/Skills";
import { SVGs } from "./icons";

type ComponentType = React.ComponentType<any>;

export interface INavbar {
  label: string;
  route: string;
  Component: ComponentType;
  active?: boolean;
}

export const NavItems: INavbar[] = [
  { label: "Home", route: "/", Component: Home },
  { label: "Projects", route: "/projects", Component: Projects },
  { label: "Contact", route: "/contact", Component: Contact },
  { label: "About", route: "/about", Component: About },
  { label: "Skills", route: "/skills", Component: Skills },
];

export const SocialIcons = [
  {
    label: "facebook",
    SvgElement: SVGs().Facebook,
  },
  {
    label: "github",
    SvgElement: SVGs().Github,
  },
  {
    label: "linkedin",
    SvgElement: SVGs().LinkedIn,
  },
  {
    label: "instagram",
    SvgElement: SVGs().Instagram,
  },
  {
    label: "twitter",
    SvgElement: SVGs().Twitter,
  },
];
