import styles from "./Home.module.css";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div styleName="home">
      <div styleName="home__container">
        <div styleName="home__text">
          <h1>AAHARAVEDA</h1>
          <p styleName="home__description">
            A DIGITAL COOKBOOK TO ORGANIZE, SAVE, AND EXPLORE RECIPES. CUSTOMIZABLE 
            CATEGORIES HELP USERS CURATE THEIR PERSONAL KITCHEN LIBRARY..
          </p>
        </div>
        <Link to="/recipes">
          <button styleName="home__button" className="btn btn-primary">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CSSModules(Home, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
