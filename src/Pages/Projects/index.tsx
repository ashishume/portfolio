import Layout from "../../Layout/layout";
import { IProjectCard } from "../../Shared/models";
import ProjectCard from "../../Components/ProjectCard";
import { ProjectData } from "../../Shared/projectData";

const Projects = () => {
  return (
    <Layout>
      <div className="p-4">
        <div className="text-center text-3xl uppercase">Projects</div>
        <div className="flex flex-wrap justify-start gap-x-10 gap-y-8 mt-5 md:flex-row sm:flex-col sm:items-center">
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
