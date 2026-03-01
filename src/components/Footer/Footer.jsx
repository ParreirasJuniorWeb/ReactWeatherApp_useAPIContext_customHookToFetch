import { NavLink } from "react-router-dom";
import "./Footer.css";

// import image logo

import imageLogo from "../../images/cloudy.png";

const Footer = () => {
  return (
    <footer>
        <div className="intro-footer">
            <h2>Weather Forecast App</h2>
            <img src={imageLogo} alt="logo do Weather Forecast App" />
        </div>
        <div className="container-links">
            <h2>Links Rápidos</h2>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" className={({isActive}) => (isActive ? "active" : "")}>Início{" "}</NavLink>
                    </li>
                    <li>
                         <NavLink to="weatherForecast7DaysOnWeek" className={({isActive}) => (isActive ? "active" : "")}>WeatherForecast for 7 days on week</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
        <div className="cpyright">
            <p>All rights reserved for John Victor Parreiras &copy; 2026.</p>
        </div>
    </footer>
  );
};

export default Footer;