import "./style.scss";
import { IProjectCard } from "../../Shared/models";
const ProjectCard = ({
  title,
  description,
  uri,
  image,
  techStack,
}: IProjectCard) => {
  function handleClick() {
    window.open(uri);
  }
  return (
    <div className="project-card-container" onClick={handleClick}>
      <div className="thumbnail">
        <img src={image} className="image" />
      </div>
      <div className="content">
        <div className="title">{title}</div>

        {techStack
          .replace(" ", "")
          .split(",")
          .map((value) => {
            return (
              <div key={value} className="tech-stack">
                {value}
              </div>
            );
          })}
        <div className="description">{description}</div>
      </div>
    </div>
  );
};

export default ProjectCard;
