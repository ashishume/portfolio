import React from "react";
import Layout from "../../Layout/layout";
import "./style.scss";
const About = () => {
  return (
    <Layout>
      <div className="about-container">
        <div className="content">
        <h2>About Me</h2>
          Hello! I'm Ashish Debnath, a 26-year-old software engineer
          specializing in frontend development. With around 5 years of
          experience in the field, I've honed my skills in React, Angular,
          JavaScript, Node.js, TypeScript, and various databases. Originally
          from the vibrant state of West Bengal, India, I bring a blend of
          cultural diversity and technical expertise to my work. Passionate
          about creating seamless user experiences and leveraging technology to
          solve real-world problems, I'm always eager to embark on new
          challenges and contribute to innovative projects. Let's connect and
          build something great together!
        </div>
      </div>
    </Layout>
  );
};

export default About;
