import SkillsCard from "../../Components/SkillsCard";
import Layout from "../../Layout/layout";
import { DATABASES, FRONTEND_TECH, LANGUAGES, STATE_MANAGEMENT, TOOLS } from "../../Shared/constant";
import "./style.scss";
const Skills = () => {

  return (
    <Layout>
      <div className="skills-container">
        <h2>Skills</h2>
        <div className="skills-card-container">
          <SkillsCard items={FRONTEND_TECH} label="Frontend" />
          <SkillsCard items={LANGUAGES} label="Languages" />
          <SkillsCard items={DATABASES} label="Databases" />
          <SkillsCard items={STATE_MANAGEMENT} label="State management" />
          <SkillsCard items={TOOLS} label="Tools" />
        </div>
      </div>
    </Layout>
  );
};

export default Skills;
