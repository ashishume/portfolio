import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/layout";
import TypingEffect from "../../Shared/Services/TypingEffect";
import { SocialIcons } from "../../Shared/constant";
import profile from "../../../public/profile.webp";

const Home = () => {
  const navigate = useNavigate();
  const handleRedirection = (uri: string) => {
    window.open(uri, "_blank");
  };

  return (
    <Layout>
      <div className="my-20 mx-20 flex justify-between items-center flex-wrap text-primary-text">
        <div className="header">
          <div className="text-6xl font-semibold">
            <TypingEffect text="Hi There, I'm Ashish Debnath" />
          </div>
          <div className="text-xl">I build web and mobile apps</div>
          <div className="flex flex-wrap mt-5 gap-8">
            {SocialIcons.map(({ label, SvgElement, uri }) => {
              return (
                <div
                  onClick={() => handleRedirection(uri)}
                  key={label}
                  className="h-12 w-12 flex flex-row cursor-pointer transition duration-500 hover:scale-150 relative group"
                  data-tooltip={label}
                >
                  {SvgElement}
                  <span className="hidden group-hover:block absolute bg-white/30 rounded px-1 py-0.5 top-14 left-1/2 transform -translate-x-1/2">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
          <button
            className="mt-12 bg-white hover:bg-white text-black font-semibold py-2 px-4 rounded"
            onClick={() => navigate("/projects")}
          >
            Explore Projects
          </button>
        </div>
        <div className="profile-pic-container">
          <img
            src={profile}
            className="h-72 w-72 rounded-full select-none"
            alt="Profile picture"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
