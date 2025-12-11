import { useState, useEffect } from "react";
import Layout from "../../Layout/layout";
import { IProjectCard } from "../../Shared/models";
import ProjectCard from "../../Components/ProjectCard";
import { ProjectData } from "../../Shared/constant";
import { SVGs } from "../../Shared/icons";

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Animate in elements with a slight delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // This would need to be implemented if you want filtering functionality
  const filteredProjects =
    filter === "all"
      ? ProjectData
      : ProjectData.filter(
          (project) =>
            project.techStack &&
            project.techStack
              .split(",")
              .some((tech) => tech.toLowerCase().includes(filter.toLowerCase()))
        );

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
              My Portfolio
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              PROJECTS
            </h1>
            <div className="h-1 w-20 bg-blue-500 mx-auto mt-6"></div>
            <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
              A showcase of my work, personal projects, and contributions that
              demonstrate my skills and passion for development.
            </p>
          </div>

          {/* Optional Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800/70 text-gray-300 hover:bg-gray-700/70"
              }`}
            >
              All Projects
            </button>
            {/* Add more filter buttons based on your common tech stack */}
            {["React", "Node", "Web", "Python"].map((tech) => (
              <button
                key={tech}
                onClick={() => setFilter(tech)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  filter === tech
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800/70 text-gray-300 hover:bg-gray-700/70"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
            {filteredProjects.map(
              (
                {
                  title,
                  description,
                  uri,
                  image,
                  key,
                  techStack,
                }: IProjectCard,
                index
              ) => (
                <div
                  key={key}
                  className="transform transition-all duration-500"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: "fadeIn 0.6s ease-out forwards",
                    opacity: 0,
                  }}
                >
                  <ProjectCard
                    key={key}
                    techStack={techStack}
                    title={title}
                    description={description}
                    uri={uri}
                    image={image}
                  />
                </div>
              )
            )}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-block p-4 rounded-full bg-blue-500/10 mb-4">
                {SVGs().Lightbulb}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                No projects found
              </h3>
              <p className="text-gray-400">
                Try changing your filter or check back later for new projects.
              </p>
            </div>
          )}

          {/* Contact CTA Section */}
          <div className="mt-24 text-center">
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-blue-500/20 rounded-xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Interested in working together?
              </h3>
              <p className="text-gray-300 mb-6">
                I'm always open to discussing product design work or partnership
                opportunities.
              </p>
              <button
                onClick={() => (window.location.href = "/contact")}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
