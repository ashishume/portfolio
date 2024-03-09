import { SVGs } from "./icons";
import { INavbar, ISocialIcons } from "./models";

export const NavItems: INavbar[] = [
  { label: "Home", route: "/" },
  { label: "Projects", route: "/projects" },
  // { label: "Contact", route: "/contact" },
  { label: "About", route: "/about" },
  // { label: "Skills", route: "/skills" },
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
