import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../../Layout/layout";
import TypingEffect from "../../Shared/Services/TypingEffect";
import { SocialIcons, workExperience } from "../../Shared/constant";
import profile from "../../../public/profile.png";
import TimelineView from "../About/TimelineView";

const Home = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add animation delay for elements to fade in
    setIsVisible(true);
  }, []);

  const handleRedirection = (uri: string) => {
    window.open(uri, "_blank");
  };

  return (
    <Layout>
      <div className="min-h-screen dark:bg-gradient-to-br dark:from-slate-900 dark:via-gray-800 dark:to-slate-900 bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 px-6 md:px-16 lg:px-24">
        <div
          className={`max-w-7xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Hero Section */}
          <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-12">
            {/* Left Content */}
            <div className="w-full lg:w-3/5 space-y-6">
              <div className="relative">
                <div className="inline-block bg-blue-500/20 px-4 py-1 rounded-full text-blue-400 text-sm font-medium mb-4">
                  Full Stack Developer
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold dark:text-white text-gray-900 leading-tight">
                  <TypingEffect text="Hi, I'm Ashish Debnath" />
                </h1>
                <div className="h-1 w-20 bg-blue-500 mt-6"></div>
              </div>

              <p className="text-xl dark:text-gray-300 text-gray-700 mt-6 max-w-xl">
                I build full stack apps.
              </p>

              {/* Social Icons with hover effects */}
              <div className="flex flex-wrap mt-8 gap-6">
                {SocialIcons.map(({ label, SvgElement, uri }) => (
                  <div
                    onClick={() => handleRedirection(uri)}
                    key={label}
                    className="group relative p-3 dark:bg-gray-800/80 dark:hover:bg-blue-600 bg-gray-200/80 hover:bg-blue-600 rounded-lg transition-all duration-300 cursor-pointer"
                    aria-label={label}
                  >
                    <div className="h-6 w-6 dark:text-gray-300 text-gray-700 group-hover:text-white transition-colors duration-300">
                      {SvgElement}
                    </div>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap dark:bg-gray-800 dark:text-white bg-gray-200 text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => navigate("/projects")}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30"
                >
                  Explore Projects
                </button>
                <button
                  onClick={() => navigate("/blog")}
                  className="px-6 py-3 bg-transparent dark:hover:bg-gray-800 hover:bg-gray-200 dark:text-gray-300 text-gray-700 border dark:border-gray-700 border-gray-300 dark:hover:border-gray-600 hover:border-gray-400 font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  Read Blogs
                </button>
              </div>
            </div>

            {/* Right Content - Profile Picture */}
            <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Main profile image with animation */}
                <div className="relative z-10 rounded-full w-64 h-64 md:w-80 md:h-80 overflow-hidden border-4 border-blue-600 shadow-2xl shadow-blue-500/20">
                  <img
                    src={profile}
                    alt="Ashish Debnath"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-gray-900">
                Professional Journey
              </h2>
              <div className="h-1 w-16 bg-blue-500 mx-auto mt-4"></div>
            </div>

            <div className="relative">
              {/* Timeline Vertical Line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-500/30"></div>

              {/* Timeline Items */}
              {workExperience.map((job, index) => (
                <TimelineView key={job.id} job={job} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Add this to your tailwind.config.js:
// extend: {
//   animation: {
//     'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
//   },
// },

export default Home;
