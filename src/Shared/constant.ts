import { lazy } from "react";
import { SVGs } from "./icons";
import { INavbar, ISkills, ISocialIcons } from "./models";
import ContactMe from "../Pages/Contact";
import { IProjectCard } from "./models";
import ecommerce from "../../public/ecommerce.webp";
import interview from "../../public/interview.webp";
import ielts from "../../public/ielts.webp";
import ninemiles from "../../public/ninemiles.webp";
import conference from "../../public/conference.webp";
import chatApp from "../../public/chat-app-logo.png";
import trello from "../../public/trello.png";
import auction from "../../public/auctions.png";
import pairlyCode from "../../public/pairly-code.png";
import fastAPI from "../../public/fast_api.avif";

const Home = lazy(() => import("../Pages/Home"));
const Projects = lazy(() => import("../Pages/Projects"));
const About = lazy(() => import("../Pages/About"));
const Skills = lazy(() => import("../Pages/Skills"));
const Blog = lazy(() => import("../Pages/Blog"));

export const NavItems: INavbar[] = [
  { label: "Home", route: "/", Element: Home },
  { label: "Blog", route: "/blog", Element: Blog },
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
    label: "LeetCode",
    SvgElement: SVGs().LeetCode,
    uri: "https://leetcode.com/ashishume/",
  },
];

export const SKILLS: ISkills = {
  FrontendTech: [
    {
      key: 3,
      label: "ReactJS",
    },
    {
      key: 1,
      label: "VanillaJS",
    },
    {
      key: 2,
      label: "Angular2+",
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
  BackendTech: [
    {
      key: 1,
      label: "Python",
    },
    {
      key: 2,
      label: "FastAPI",
    },
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

export const workExperience = [
  {
    id: 1,
    company: "Contentstack",
    position: "Senior Software Engineer – I",
    duration: "Oct 2024 - Present",
    location: "Bengaluru, Karnataka, India",
    description:
      "Part of Contentstack Labs, contributing to Compose AI, an AI-powered editor inspired by Notion. Working on modular system design, agentic AI workflows, and component libraries for next-gen content platforms.",
    highlights: [
      "Implemented LLM-powered content generation workflows using ChatGPT, Gemini, and Claude",
      "Built reusable composable components for the Visual Builder",
      "Developed NestJS-based microservice for real-time collaboration (threads, comments, and discussions)",
      "Enhanced Visual Builder with discussion sidebar and comment timeline features",
      "Designed robust postMessage-based communication between SDK and host app",
    ],
    skills: [
      "React.js",
      "NestJS",
      "Node.js",
      "MongoDB",
      "LLMs",
      "AI Integration",
      "TypeScript",
      "Zustand",
      "REST APIs",
    ],
    logo: "/company-logos/contentstack.png",
  },
  {
    id: 2,
    company: "Soroco",
    position: "Software Engineer – Product",
    duration: "Aug 2022 - Oct 2024",
    location: "Bengaluru, Karnataka, India",
    description:
      "Worked on Work Graph, an intelligent data collection and process discovery platform. Focused on building visual dashboard frameworks and optimizing performance.",
    highlights: [
      "Designed and developed dashboards for Work Graph data collection and insights",
      "Improved table rendering performance and optimized API calls, reducing data latency from 2s to 300ms",
      "Built reusable UI components for SDS (Soroco Design System)",
      "Contributed to Studio, a BPMN-based process modeling application",
      "Worked on Exports, generating BPMN-compliant code from process models",
    ],
    skills: [
      "Angular",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "BPMN",
      "UI/UX",
      "Performance Optimization",
      "Design Systems",
      "Docker",
    ],
    logo: "/company-logos/soroco.png",
  },
  {
    id: 3,
    company: "Nineleaps",
    position: "Member of Technical Staff 3",
    duration: "Sep 2020 - Mar 2021",
    location: "Bengaluru, Karnataka, India",
    description:
      "Contributed to full-stack development projects and optimized application performance. Mentored interns through structured technical learning paths.",
    highlights: [
      "Led feature implementation in full-stack projects",
      "Mentored interns via structured technical learning paths",
      "Collaborated with cross-functional teams to deliver high-impact features",
    ],
    skills: [
      "Full Stack Development",
      "Mentoring",
      "Agile Methodology",
      "Problem Solving",
    ],
    logo: "/company-logos/nineleaps.png",
  },
  {
    id: 4,
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
    skills: [
      "Web Development",
      "Bug Fixing",
      "Code Refactoring",
      "Performance Optimization",
    ],
    logo: "/company-logos/nineleaps.png",
  },
  {
    id: 5,
    company: "Nineleaps",
    position: "Engineering Intern",
    duration: "Jan 2019 - Jul 2019",
    location: "Bengaluru, Karnataka, India",
    description:
      "Focused on learning Angular, Node.js, and other technologies. Followed Agile methodology and participated in daily standups.",
    highlights: [
      "Learned Angular and Node.js technologies",
      "Developed new features and resolved critical bugs with guidance from seniors",
      "Participated in hackathons and team events",
    ],
    skills: [
      "Angular",
      "Node.js",
      "Agile Methodology",
      "Learning & Development",
    ],
    logo: "/company-logos/nineleaps.png",
  },
  {
    id: 6,
    company: "Netmax Technologies Pvt. Ltd.",
    position: "Web Application Developer",
    duration: "May 2017 - Jul 2017",
    location: "Chandigarh Area, India",
    description:
      "Developed web applications and contributed to various client projects.",
    highlights: [
      "Developed web applications for clients",
      "Worked on frontend and backend development tasks",
    ],
    skills: ["Web Development", "Frontend Development", "Backend Development"],
    logo: "/company-logos/netmax.png",
  },
];

export const ProjectData: IProjectCard[] = [
  {
    key: 13,
    title: "Fast API backend system design",
    techStack: "FastAPI, Python",
    description: "This is a backend system design for a fast API application.",
    image: fastAPI,
    uri: "https://github.com/ashishume/fastapi-learning",
  },
  {
    key: 12,
    title: "Pairly Code",
    techStack: "React, YJs, Websocket, NestJs, MongoDB",
    description:
      "This is a realtime collaborative coding platform for pair programming. It is a web app that allows users to code together in realtime.",
    image: pairlyCode,
    uri: "https://github.com/ashishume/PairlyCode/",
  },
  {
    key: 11,
    title: "Axpo expense splitter",
    techStack: "React, Firebase, Typescript",
    description: "This is a react app to split the expenses between friends",
    image:
      "https://github.com/ashishume/expense-splitter/blob/main/public/logo.jpg?raw=true",
    uri: "https://axpo.ashishdebnath.com",
  },
  {
    key: 10,
    title: "Axpo Auctions",
    techStack:
      "Nextjs, Redux + Redux saga, Nodejs express, PostgresSQL (supabase)",
    description:
      "This is a nextjs app to where user can login and bid of various listed projects",
    image: auction,
    uri: "https://github.com/ashishume/Axpo-Auction",
  },
  {
    key: 9,
    title: "Axpo board (trello board clone)",
    techStack: "React, Localstorage as db",
    description: "This is a react app to create tasks similar to trello board.",
    image: trello,
    uri: "https://front-end-javascript-interview-topics.vercel.app/trello-board",
  },
  {
    key: 1,
    title: "Axpo chat (Realtime chat application)",
    techStack:
      "React, Nodejs, PostgresSQL, Socket.io (web socket), Tailwind CSS",
    description:
      "This is a react app for realtime chat using express server and socket for hooks",
    image: chatApp,
    uri: "https://github.com/ashishume/axpo-chat-app",
  },
  {
    key: 2,
    title: "Axpo shop ecommerce",
    techStack: "ReactJs, Nodejs, MongoDB",
    description:
      "This project is an e-commerce website that aims to provide a seamless online shopping experience. Users can browse products, view product details, add items to their cart, and make purchases securely.",
    image: ecommerce,
    uri: "https://github.com/ashishume/Axpo-shop-ecommerce",
  },
  {
    key: 3,
    title: "Interview Questions (VanillaJS + React)",
    techStack: "VanillaJS",
    description:
      "This repo contains the questions related to all frontend questions required for interview, from basic to advanced",
    image: interview,
    uri: "https://front-end-javascript-interview-topics.vercel.app",
  },
  {
    key: 4,
    title: "Reality check",
    techStack: "Angular, Nodejs, Firebase",
    description:
      "This project is an online mock exam portal for IELTS students thos who are pursuing for international colleges.",
    image: ielts,
    uri: "https://github.com/ashishume/reality-check-frontend",
  },
  {
    key: 5,
    title: "Ninemiles",
    techStack: "Angular, Nodejs, Firebase",
    description:
      "This project is an landing page for exam portal contains MCQ based questions with fill in the blanks",
    image: ninemiles,
    uri: "https://github.com/ashishume/Ninemiles-Angular-app",
  },
  {
    key: 8,
    title: "Conference room booking app",
    techStack: "Angular, Nodejs, MongoDB",
    description:
      "This is a react native app for students who are preparing for govt exams",
    image: conference,
    uri: "https://github.com/ashishume/conference-room-app",
  },
];
