import { lazy } from "react";
import { SVGs } from "./icons";
import { INavbar, ISkills, ISocialIcons } from "./models";
import ContactMe from "../Pages/Contact";

const Home = lazy(() => import("../Pages/Home"));
const Projects = lazy(() => import("../Pages/Projects"));
const About = lazy(() => import("../Pages/About"));
const Skills = lazy(() => import("../Pages/Skills"));

export const NavItems: INavbar[] = [
  { label: "Home", route: "/", Element: Home },
  { label: "Skills", route: "/skills", Element: Skills },
  { label: "Projects", route: "/projects", Element: Projects },
  { label: "About", route: "/about", Element: About },
  { label: "Contact", route: "/contact", Element: ContactMe },
];

export const SocialIcons: ISocialIcons[] = [
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
    label: "twitter",
    SvgElement: SVGs().Twitter,
    uri: "https://twitter.com/ashishume",
  },
  {
    label: "Stackoverflow",
    SvgElement: SVGs().StackOverflow,
    uri: "https://stackoverflow.com/users/8175628/ashish-dev",
  },
  {
    label: "LeetCode",
    SvgElement: SVGs().LeetCode,
    uri: "https://leetcode.com/ashishume/",
  },
];

export const SKILLS: ISkills = {
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
      label: "NextJS",
    },
    {
      key: 5,
      label: "React Native",
    },
  ],
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
    {
      key: 4,
      label: "Zustand",
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
  BackendTech: [
    {
      key: 1,
      label: "Node.js",
    },
    {
      key: 2,
      label: "Express.js",
    },
    {
      key: 3,
      label: "NestJS",
    },
  ],
};

export const workExperience = [
  {
    id: 1,
    company: "Contentstack",
    position: "Senior Software Engineer - I",
    duration: "Oct 2024 - Present",
    location: "Bengaluru, Karnataka, India (Hybrid)",
    description:
      "Part of the Contentstack Labs team working on Compose. Focused on developing composable components and building collaborative microservices for the visual builder.",
    highlights: [
      "Developed composable components for the visual builder",
      "Built new APIs for threads and comments using NestJS",
      "Enhanced the visual builder with sidebar discussions and timeline view comments",
      "Integrated SDK with the host frontend app using postMessage events",
    ],
    skills: [
      "REST APIs",
      "Zustand",
      "NestJS",
      "Node.js",
      "MongoDB",
      "React.js",
    ],
    logo: "/company-logos/contentstack.png",
  },
  {
    id: 2,
    company: "Soroco",
    position: "Software Engineer - Product",
    duration: "Aug 2022 - Oct 2024",
    location: "Bengaluru, Karnataka, India (Remote)",
    description:
      "Worked on the Work Graph product, focusing on dashboards for data collection and insights, with a strong emphasis on UI/UX and scalable backend services.",
    highlights: [
      "Developed the dashboard for data collection in the Work Graph",
      "Involved in architectural decisions and feature development across the stack",
    ],
    skills: [
      "Debugging",
      "MERN Stack",
      "User Stories",
      "Docker",
      "TypeScript",
      "Angular CLI",
      "Software Design",
      "Problem Solving",
      "MVC",
    ],
    logo: "/company-logos/soroco.png",
  },
  {
    id: 3,
    company: "Soroco",
    position: "Software Engineer",
    duration: "Mar 2021 - Aug 2022",
    location: "Bengaluru, Karnataka, India",
    description:
      "Built scalable SaaS solutions and contributed to the backend and frontend of enterprise-level applications.",
    highlights: [
      "Worked on SaaS platforms and microservices",
      "Implemented robust debugging processes and backend improvements",
    ],
    skills: [
      "SaaS",
      "Debugging",
      "MERN Stack",
      "JavaScript",
      "TypeScript",
      "Docker",
      "MVC",
    ],
    logo: "/company-logos/soroco.png",
  },
  {
    id: 4,
    company: "Nineleaps",
    position: "Member of Technical Staff 3",
    duration: "Sep 2020 - Mar 2021",
    location: "Bengaluru, Karnataka, India",
    description:
      "Contributed to full-stack development projects and optimized application performance.",
    highlights: [
      "Led feature implementation in full-stack projects",
      "Collaborated with cross-functional teams to deliver high-impact features",
    ],
    logo: "/company-logos/nineleaps.png",
  },
  {
    id: 5,
    company: "Nineleaps",
    position: "Member of Technical Staff 2",
    duration: "Jul 2019 - Sep 2020",
    location: "Bengaluru, Karnataka, India",
    description:
      "Worked on scalable web applications and contributed to product improvements and bug fixes.",
    highlights: [
      "Developed new features and resolved critical bugs",
      "Enhanced app performance and code quality through refactoring",
    ],
    logo: "/company-logos/nineleaps.png",
  },
  {
    id: 6,
    company: "Nineleaps",
    position: "Engineering Intern",
    duration: "Jan 2019 - Jul 2019",
    location: "Bengaluru, Karnataka, India",
    description:
      "Mostly spent on learning Angular and Nodejs and other technologies. Followed the Agile methodology and participated in daily standups.",
    highlights: [
      "Developed new features and resolved critical bugs, took guidance from seniors",
      "Participated in hackathons and team events",
    ],
    logo: "/company-logos/nineleaps.png",
  },
];
