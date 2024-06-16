import { useEffect, useState } from "react";
import SkillsCard from "../../Components/SkillsCard";
import Layout from "../../Layout/layout";
import { SKILLS } from "../../Shared/constant";
import "./style.scss";
import { ISkills } from "../../Shared/models";
import Spinner from "../../Components/Spinner";
const Skills = () => {
  const [skillData, setSkillData] = useState<ISkills | null>(null);
  useEffect(() => {
    setSkillData(SKILLS);
  }, []);

  const convertCamelToSentence = (label: string) => {
    return (
      label
        .replace(/([A-Z])/g, " $1")
        // Convert first character to uppercase
        .replace(/^./, function (str) {
          return str.toUpperCase();
        })
    );
  };
  return (
    <Layout>
      <div className="skills-container">
        <div className="text-center text-3xl">{"Skills".toUpperCase()}</div>
        <div className="skills-card-container">
          {skillData ? (
            Object.entries(skillData).map((value, index) => {
              return (
                <SkillsCard
                  key={index}
                  items={value[1]}
                  label={convertCamelToSentence(value[0])}
                />
              );
            })
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Skills;
