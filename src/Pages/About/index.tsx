import { useEffect, useState } from "react";
import Layout from "../../Layout/layout";
import TimelineView from "./TimelineView";
import { workExperience } from "../../Shared/constant";

const AboutMe = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 py-16 px-6 md:px-16 lg:px-24">
        <div
          className={`max-w-7xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-500/20 px-4 py-1 rounded-full text-blue-400 text-sm font-medium mb-4">
              Know me
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              ABOUT ME
            </h1>
            <div className="h-1 w-20 bg-blue-500 mx-auto mt-6"></div>
            <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-justify">
              Hello! I'm Ashish Debnath, a {new Date().getFullYear() - 1997 - 1}{" "}
              year old software engineer specializing in frontend development.{" "}
              <br />
              With around {new Date().getFullYear() - 2019} years of experience
              in the field, I've honed my skills in{" "}
              <u>
                React, Angular, JavaScript, Node.js, TypeScript, and various
                databases.
              </u>
              <br />I have also worked extensively with{" "}
              <u>Docker containers, CI/CD pipelines, and Azure DevOps.</u>
              <br />
              Originally from the vibrant state of West Bengal, India, I bring a
              blend of cultural diversity and technical expertise to my work.
              Passionate about creating seamless user experiences and leveraging
              technology to solve real-world problems, I'm always eager to
              embark on new challenges and contribute to innovative projects.{" "}
              <br />
              Let's connect and build something great together!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutMe;
