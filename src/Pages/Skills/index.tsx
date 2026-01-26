import { useEffect, useState } from "react";
import SkillsCard from "../../Components/SkillsCard";
import Layout from "../../Layout/layout";
import { SKILLS } from "../../Shared/constant";
import { ISkills } from "../../Shared/models";
import Spinner from "../../Components/Spinner";
import { SVGs } from "../../Shared/icons";

const Skills = () => {
  const [skillData, setSkillData] = useState<ISkills | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fetch skills data
    setSkillData(SKILLS);

    // Animate in elements with a slight delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
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
      <div
        className={`max-w-7xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-500/20 px-4 py-1 rounded-full text-blue-400 text-sm font-medium mb-4">
              My Technical Expertise
            </div>
            <h1 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900">
              SKILLS
            </h1>
            <div className="h-1 w-20 bg-blue-500 mx-auto mt-6"></div>
            <p className="dark:text-gray-300 text-gray-700 mt-6 max-w-2xl mx-auto">
              Here's a comprehensive overview of my technical skills and areas
              of expertise that I've developed throughout my career.
            </p>
          </div>

          {/* Skills Cards Section */}
          {skillData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {Object.entries(skillData).map((value, index) => {
                const [category, skills] = value;
                const formattedCategory = convertCamelToSentence(category);

                return (
                  <div
                    key={index}
                    className={`backdrop-blur-md bg-white/10 dark:bg-white/5 rounded-xl overflow-hidden shadow-lg border border-white/20 dark:border-white/10 hover:border-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-blue-500/10`}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: "fadeIn 0.5s ease-out forwards",
                      opacity: 0,
                    }}
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-500/20 rounded-lg p-2 mr-4">
                          {SVGs().Shield}
                        </div>
                        <h3 className="text-xl font-semibold dark:text-white text-gray-900">
                          {formattedCategory}
                        </h3>
                      </div>

                      <div className="space-y-4">
                        {/* Render skills here with your SkillsCard component */}
                        <SkillsCard items={skills} label={formattedCategory} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex justify-center items-center py-20">
              <Spinner />
            </div>
          )}

          {/* Bottom section with call to action */}
          {skillData && (
            <div className="mt-20 text-center">
              <div className="backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-xl p-8 max-w-3xl mx-auto">
                <h3 className="text-2xl font-semibold dark:text-white text-gray-900 mb-4">
                  Want to see my skills in action?
                </h3>
                <p className="dark:text-gray-300 text-gray-700 mb-6">
                  Check out my projects to see how I've applied these
                  technologies to solve real-world problems.
                </p>
                <button
                  onClick={() => (window.location.href = "/projects")}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30"
                >
                  View Projects
                </button>
              </div>
            </div>
          )}
        </div>
    </Layout>
  );
};

export default Skills;
