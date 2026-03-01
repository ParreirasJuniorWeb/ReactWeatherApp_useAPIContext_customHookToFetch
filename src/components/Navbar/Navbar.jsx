import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header>
      <h1>Weather App in React</h1>
      <nav>
        <NavLink to="/" className={({isActive}) => (isActive ? "active" : "")}>WeatherForecast one day{" "}</NavLink>
        <NavLink to="weatherForecast7DaysOnWeek" className={({isActive}) => (isActive ? "active" : "")}>WeatherForecast for 7 days</NavLink>
      </nav>
    </header>
  )
}

export default Navbar;