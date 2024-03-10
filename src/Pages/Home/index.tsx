import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/layout";
import TypingEffect from "../../Shared/Services/TypingEffect";
import { SocialIcons } from "../../Shared/constant";
import "./style.scss";
const Home = () => {
  const navigate = useNavigate();
  const handleRedirection = (uri: string) => {
    window.open(uri, "_blank");
  };
  return (
    <Layout>
      <div className="home-container">
        <div className="header">
          <div className="title">
            <TypingEffect text="Hi There, I'm Ashish Debnath" />
          </div>
          <div className="subtitle">I build web and mobile apps</div>
          <div className="social-icons">
            {SocialIcons.map(({ label, SvgElement, uri }) => {
              return (
                <div
                  onClick={() => handleRedirection(uri)}
                  key={label}
                  className="icon"
                >
                  {SvgElement}
                </div>
              );
            })}
          </div>
          <button className="explore-btn" onClick={() => navigate("/projects")}>
            Explore Projects
          </button>
        </div>
        <div className="profile-pic-container">
          <img src="/public/profile.webp" className="profile-pic" />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
