import { IProjectCard } from "./models";
import ecommerce from "../../public/ecommerce.webp";
import interview from "../../public/interview.webp";
import ielts from "../../public/ielts.webp";
import ninemiles from "../../public/ninemiles.webp";
import conference from "../../public/conference.webp";
import chatApp from "../../public/chat-app-logo.png";
import trello from "../../public/trello.png";
import auction from "../../public/auctions.png";

export const ProjectData: IProjectCard[] = [
  {
    key: 10,
    title: "Axpo Auctions",
    techStack: "Nextjs, Redux + Redux saga, Nodejs express, PostgresSQL (supabase)",
    description:
      "This is a nextjs app to where user can login and bid of various listed projects",
    image: auction,
    uri: "https://github.com/ashishume/Axpo-Auction",
  },
  {
    key: 9,
    title: "Axpo board (trello board clone)",
    techStack: "React, Localstorage as db",
    description:
      "This is a react app to create tasks similar to trello board.",
    image: trello,
    uri: "https://front-end-javascript-interview-topics.vercel.app/trello-board",
  },
  {
    key: 1,
    title: "Axpo chat (Realtime chat application)",
    techStack: "React, Nodejs, PostgresSQL, Socket.io (web hooks)",
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
    key: 6,
    title: "Wally",
    techStack: "React Native, Nodejs, MongoDB",
    description:
      "This is a react native app for wallpapers, this app uses web crawler to fetch wallpapers from the web",
    image:
      "https://play-lh.googleusercontent.com/UNuQo_pCWP58nwmctxVqQxaMNhQ690643EKXdh-QhXFvorLUCJbXcx9H73H4qdnJj3Uq=w240-h480-rw",
    uri: "https://play.google.com/store/apps/details?id=com.wallypix",
  },
  {
    key: 7,
    title: "MCG Education",
    techStack: "React Native, Nodejs, MongoDB",
    description:
      "This is a react native app for students who are preparing for govt exams",
    image:
      "https://yt3.googleusercontent.com/rLk_cTXcLuS8aoJlE-W5Dmequj8vP6C1h2cNl_rZoI4LZP0J9aDACwN1qoX-5Pl1IRbrcKeRPg=s176-c-k-c0x00ffffff-no-rj",
    uri: "https://play.google.com/store/apps/details?id=com.mcgeducation",
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
