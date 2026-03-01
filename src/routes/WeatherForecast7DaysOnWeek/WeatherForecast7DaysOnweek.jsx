// import CSS
import "./WeatherForecast7DaysOnWeek.css";

// import Components
import SearchForm from "../../components/SearchForm/SearchForm";
import Cards7DaysOnWeek from "../../components/Cards7DaysOnWeek/Cards7DaysOnWeek";

const WeatherForecast7DaysOnweek = () => {
  return (
    <div className="weatherForecast-7-days-on-week">
      <SearchForm />
      <div className="weatherForecast7DaysOnWeek">
        <h2 className="subtitle">Previsão do Tempo para os sete dias na semana</h2>
        <Cards7DaysOnWeek />
      </div>  
    </div>
  );
};

export default WeatherForecast7DaysOnweek;