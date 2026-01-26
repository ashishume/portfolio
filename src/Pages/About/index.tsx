import { useEffect, useState } from "react";
import Layout from "../../Layout/layout";

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
            <h1 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900">
              ABOUT ME
            </h1>
            <div className="h-1 w-20 bg-blue-500 mx-auto mt-6"></div>
            <p className="dark:text-gray-300 text-gray-700 mt-6 max-w-2xl mx-auto text-justify">
              Hello! I'm Ashish Debnath, a{" "}
              {
                Math.floor(
                  (new Date().getTime() - new Date("1997-10-11").getTime()) /
                  (365.25 * 24 * 60 * 60 * 1000)
                ) as number
              }{" "}
              year old senior software engineer specializing in full stack
              development. <br />
              With around {new Date().getFullYear() - 2019 + 1}+ years of
              experience in the field, I've honed my skills in{" "}
              <u>
                React, Angular, JavaScript, Node.js, TypeScript, FastAPI,
                Python, and various databases.
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
    </Layout>
  );
};

export default AboutMe;
