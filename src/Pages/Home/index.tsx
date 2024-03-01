import Layout from "../../Layout/layout";
import TypingEffect from "../../Shared/Services/TypingEffect";
import { SVGs } from "../../Shared/icons";
import "./style.scss";

const Home = () => {
  const socialIcons = [
    {
      label: "facebook",
      SvgElement: SVGs().Facebook,
    },
    {
      label: "github",
      SvgElement: SVGs().Github,
    },
    {
      label: "linkedin",
      SvgElement: SVGs().LinkedIn,
    },
    {
      label: "instagram",
      SvgElement: SVGs().Instagram,
    },
    {
      label: "twitter",
      SvgElement: SVGs().Twitter,
    },
  ];
  return (
    <Layout>
      <div className="home-container">
        <div className="header">
          <div className="title">
            <TypingEffect text="Hi There, I'm Ashish Debnath" />
          </div>
          <div className="subtitle">I build web apps</div>
          <div className="social-icons">
            {socialIcons.map(({ label, SvgElement }) => {
              return (
                <div
                  style={{
                    height: "50px",
                    width: "50px",
                    display: "flex",
                    flexDirection: "row",
                  }}
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
