import { lazy } from "react";
import { SVGs } from "./icons";
import { INavbar, ISkills, ISocialIcons } from "./models";

const Home = lazy(() => import("../Pages/Home"));
const Projects = lazy(() => import("../Pages/Projects"));
const About = lazy(() => import("../Pages/About"));
const Skills = lazy(() => import("../Pages/Skills"));

export const NavItems: INavbar[] = [
  { label: "Home", route: "/", Element: Home },
  { label: "Skills", route: "/skills", Element: Skills },
  { label: "Projects", route: "/projects", Element: Projects },
  { label: "About", route: "/about", Element: About },
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

export const SKILLS: ISkills = {
  Databases: [
    {
      key: 1,
      label: "MongoDB (NoSQL)",
    },
    {
      key: 2,
      label: "PostgreSQL",
    },
  ],
  FrontendTech: [
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
  ],
  StateManagement: [
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
  ],
  Languages: [
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
  ],
  Cloud: [
    {
      key: 1,
      label: "Firebase",
    },
    {
      key: 2,
      label: "AWS",
    },
  ],
  ToolsUsed: [
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
    {
      key: 5,
      label: "Vs Code",
    },
  ],
};
