import { Navigate } from "react-router-dom";
import Layout from "../../Layout/layout";
import TypingEffect from "../../Shared/Services/TypingEffect";
import { ISocialIcons, SocialIcons } from "../../Shared/contants";
import "./style.scss";

const Home = () => {
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
          <div className="subtitle">I build web apps</div>
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
        </div>
        <div className="profile-pic-container">
          <img
            src={require("../../Assets/profile.png")}
            className="profile-pic"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
