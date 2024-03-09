import { useEffect, useState } from "react";
import Layout from "../../Layout/layout";
import RepoCard from "../../Components/RepoCard";
import "./style.scss";
import Spinner from "../../Components/Spinner";
import { IRepository } from "../../Shared/models";
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
          {!projects?.length ? <Spinner /> : null}
          {projects.map((repo) => {
            return <RepoCard key={repo.id} repository={repo} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
