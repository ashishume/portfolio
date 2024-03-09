import { IRepository } from "../../Shared/models";
import "./style.scss";
const RepoCard = ({ repository }: { repository: IRepository }) => {
  const { name, full_name, html_url, description, owner } = repository;
  return (
    <div className="repository-card">
      <div className="repository-avatar">
        <img src={owner.avatar_url} alt={owner.login} />
      </div>
      <div className="repository-details">
        <h2 className="repository-name">{name}</h2>
        <p className="repository-description">{description}</p>
        <p>
          Owner:{" "}
          <a href={owner.html_url} target="_blank">
            {owner.login}
          </a>
        </p>
        <p>
          Repository URL:{" "}
          <a href={html_url} target="_blank">
            {full_name}
          </a>
        </p>
      </div>
    </div>
  );
};

export default RepoCard;
