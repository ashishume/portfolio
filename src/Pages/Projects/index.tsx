import Layout from "../../Layout/layout";
import "./style.scss";
import { IProjectCard } from "../../Shared/models";
import ProjectCard from "../../Components/ProjectCard";
import { ProjectData } from "../../Shared/projectData";
const Projects = () => {
  return (
    <Layout>
      <div className="projects-container">
        <div className="text-center text-3xl">{"Projects".toUpperCase()}</div>
        <div className="card-container">
          {ProjectData.map(
            ({
              title,
              description,
              uri,
              image,
              key,
              techStack,
            }: IProjectCard) => {
              return (
                <ProjectCard
                  key={key}
                  techStack={techStack}
                  title={title}
                  description={description}
                  uri={uri}
                  image={image}
                />
              );
            }
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
