import Layout from "../../Layout/layout";
const About = () => {
  return (
    <Layout>
      <div className="container mx-auto">
        <div className="text-2xl leading-loose">
          <div className="text-center text-3xl">
            {"About Me and my skills".toUpperCase()}
          </div>
          Hello! I'm Ashish Debnath, a {new Date().getFullYear() - 1997 - 1}{" "}
          year old software engineer specializing in frontend development.{" "}
          <br />
          With around {new Date().getFullYear() - 2019} years of experience in
          the field, I've honed my skills in{" "}
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
          technology to solve real-world problems, I'm always eager to embark on
          new challenges and contribute to innovative projects. <br />
          Let's connect and build something great together!
        </div>
      </div>
    </Layout>
  );
};

export default About;
