import React, { useEffect, useState } from "react";
import Layout from "../../Layout/layout";
import { IRepository } from "../../Shared/contants";
import RepoCard from "../../Components/RepoCard";
import "./style.scss";
const Projects = () => {
  const [projects, setProjects] = useState([] as IRepository[]);
  useEffect(() => {
    try {
      fetch(
        "https://api.github.com/users/ashishume/repos?sort=updated&direction=desc"
      )
        .then((d) => d.json())
        .then((data) => {
          setProjects(data);
        });
    } catch (e: any) {
      console.error(e.message);
    }
  }, []);
  return (
    <Layout>
      <div className="projects-container">
        <h2>Projects</h2>
        <div className="card-container">
          {projects.map((repo) => {
            return <RepoCard key={repo.id} repository={repo} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
