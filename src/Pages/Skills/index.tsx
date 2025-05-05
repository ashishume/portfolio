import { useEffect, useState } from "react";
import SkillsCard from "../../Components/SkillsCard";
import Layout from "../../Layout/layout";
import { SKILLS } from "../../Shared/constant";
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
      <div className="m-4">
        <div className="text-center text-3xl uppercase">Skills</div>
        <div className="flex flex-wrap justify-start gap-8 md:justify-start sm:justify-center sm:items-center">
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
