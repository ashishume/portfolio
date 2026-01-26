import Navbar from "../Components/Navbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <Navbar />
      <div className="py-16 px-6 md:px-16 lg:px-24">
        {children}
      </div>
    </div>
  );
};

export default Layout;
