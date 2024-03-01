import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Home from "../Pages/Home";
import Projects from "../Pages/Projects";
import Skills from "../Pages/Skills";

type ComponentType = React.ComponentType<any>;

export interface INavbar {
  label: string;
  route: string;
  Component: ComponentType;
  active?: boolean;
}

export const navItems: INavbar[] = [
  { label: "Home", route: "/", Component: Home },
  { label: "Projects", route: "/projects", Component: Projects },
  { label: "Contact", route: "/contact", Component: Contact },
  { label: "About", route: "/about", Component: About },
  { label: "Skills", route: "/skills", Component: Skills },
];
