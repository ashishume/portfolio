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
export interface ISocialIcons {
  label: string;
  SvgElement: JSX.Element;
  uri: string;
}
export const NavItems: INavbar[] = [
  { label: "Home", route: "/", Component: Home },
  { label: "Projects", route: "/projects", Component: Projects },
  { label: "Contact", route: "/contact", Component: Contact },
  { label: "About", route: "/about", Component: About },
  { label: "Skills", route: "/skills", Component: Skills },
];

export const SocialIcons: ISocialIcons[] = [
  {
    label: "facebook",
    SvgElement: SVGs().Facebook,
    uri: "https://www.facebook.com/ashishdevume",
  },
  {
    label: "github",
    SvgElement: SVGs().Github,
    uri: "https://github.com/ashishume",
  },
  {
    label: "linkedin",
    SvgElement: SVGs().LinkedIn,
    uri: "https://www.linkedin.com/in/ashishume",
  },
  {
    label: "instagram",
    SvgElement: SVGs().Instagram,
    uri: "https://www.instagram.com/aaashishdev",
  },
  {
    label: "twitter",
    SvgElement: SVGs().Twitter,
    uri: "https://twitter.com/ashishume",
  },
  {
    label: "Stackoverflow",
    SvgElement: SVGs().StackOverflow,
    uri: "https://stackoverflow.com/users/8175628/ashish-dev",
  },
];
