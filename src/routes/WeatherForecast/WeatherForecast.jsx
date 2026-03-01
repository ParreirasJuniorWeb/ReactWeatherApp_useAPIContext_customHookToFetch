import "./WeatherForecast.css";

// import components 
import SearchForm from "../../components/SearchForm/SearchForm";
import ImageTemp from "../../components/ImageTempComponent/ImageTemp";
import TempContainer from "../../components/TempContainer/TempContainer";
import AddicionalInfo from "../../components/Additional_Info_container/AddicionalInfo";

const WeatherForecast = () => {
  return (
    <div className="WeatherSearch-container">
      <SearchForm />
      <div className="weatherForecastForCity">
        <ImageTemp />
        <TempContainer />
        <AddicionalInfo />
      </div>
    </div>
  );
};

export default WeatherForecast;