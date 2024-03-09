import { SVGs } from "./icons";
import { INavbar, ISocialIcons } from "./models";

export const NavItems: INavbar[] = [
  { label: "Home", route: "/" },
  { label: "Projects", route: "/projects" },
  // { label: "Contact", route: "/contact" },
  { label: "About", route: "/about" },
  { label: "Skills", route: "/skills" },
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

export const LANGUAGES = [
  {
    key: 1,
    label: "Javascript",
  },
  {
    key: 2,
    label: "Typescript",
  },
  {
    key: 3,
    label: "C++",
  },
];
export const DATABASES = [
  {
    key: 1,
    label: "MongoDB (NoSQL)",
  },
];
export const FRONTEND_TECH = [
  {
    key: 1,
    label: "VanillaJS",
  },
  {
    key: 2,
    label: "Angular2+",
  },
  {
    key: 3,
    label: "ReactJS",
  },
  {
    key: 4,
    label: "React Native",
  },
];
export const STATE_MANAGEMENT = [
  {
    key: 1,
    label: "Redux",
  },
  {
    key: 2,
    label: "ContextAPI",
  },
  {
    key: 3,
    label: "RxJS",
  },
];
export const TOOLS = [
  {
    key: 1,
    label: "Figma",
  },
  {
    key: 2,
    label: "Git",
  },
  {
    key: 3,
    label: "Azure",
  },
  {
    key: 4,
    label: "Postman",
  },
];
