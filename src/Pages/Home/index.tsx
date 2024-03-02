import Layout from "../../Layout/layout";
import TypingEffect from "../../Shared/Services/TypingEffect";
import { SocialIcons } from "../../Shared/contants";
import "./style.scss";

const Home = () => {
 

  const handleRedirection = () => {
    console.log("called");
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
            {SocialIcons.map(({ label, SvgElement }) => {
              return (
                <div
                  onClick={handleRedirection}
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
