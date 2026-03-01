// import Custom Hook para usufruir do API Context do react, o 'WeatherContext.jsx'.
// import { useWeatherContext } from "../../hook/useWeatherContext";

import { useWeather } from "../../hook/useWeather.js";

// import 'useWeeklyForecastData'
// import { useWeeklyForecastData } from "../../hook/useWeeklyForecastData";

// import função auxiliar para date - formatar a data para os dias da semana
import { formatWeekDate } from "../../util/utils.js";

// import CSS
import "./Cards7DaysOnWeek.css";

//import images
import imageTempCity from "../../images/cloudy.png";

const Cards7DaysOnWeek = () => {
  // const { weatherData } = useWeatherContext();
  const { units, weeklyForecast, loading } = useWeather()
  const unitSymbol = units === "metric" ? "°C" : "°F";
  // const [ weeklyForecastData ] = useWeeklyForecastData();

  // const date = currentWeather.weeklyForecast?.dt_txt
  //   ? weeklyForecastData.dt_txt
  //   : "date";
  // const temp = weeklyForecastData?.main
  //   ? Math.round(weeklyForecastData.main.temp)
  //   : 0;
  // const sensacaoTermica = weeklyForecastData?.main // Sensação Térmica em °C
  //   ? Math.round(weeklyForecastData.main.feels_like)
  //   : 0;  
  // const tempMax = weeklyForecastData?.main
  //   ? Math.round(weeklyForecastData.main.temp_max)
  //   : 0;
  // const tempMin = weeklyForecastData?.main
  //   ? Math.round(weeklyForecastData.main.temp_min)
  //   : 0;
  // const rain = weeklyForecastData?.rain
  //   ? Math.round(weeklyForecastData.rain?.["3h"])
  //   : 0;  
  // const icon = weeklyForecastData?.weather[0]["icon"];
  // const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  // let tempClass = "warm";
  // if (unitSymbol === "metric") {
  //   if (temp < 18) tempClass = "cold";
  //   else if (temp > 28) tempClass = "hot";
  // } else {
  //   if (temp < 64) tempClass = "cold";
  //   else if (temp > 82) tempClass = "hot";
  // }

  if (loading) return <div>Carregando previsão...</div>;
  if (!weeklyForecast.length) return <div>Sem dados da semana</div>;

  return (
    <div className="cards-7-days-container">
      {weeklyForecast.map((day, index) => (
      <div className={`cards ${(unitSymbol === "metric" && day.temp < 18) ? "cold" : "hot"}`} key={index}>
        <h2>{formatWeekDate(day.date)}</h2>
        <div className="image-container-cards">
          <img
            src={day.icon ? `http://openweathermap.org/img/wn/${day.icon}@2x.png`: imageTempCity}
            alt={`imagem do tempo para ${formatWeekDate(day.date)} na cidade de Belo Horizonte`}
          />
        </div>
        <p>{day.description}</p>
        <div className="temp-container-card">
          <h4>
            Temperatura<span>{unitSymbol}</span>
          </h4>
          <h2>
            {day.temp}
            <span>{unitSymbol}</span>
          </h2>
          <h4>
            Sensação Térmica em<span>{unitSymbol}</span>
          </h4>
          <h2>
            {day.feels_like}
            <span>{unitSymbol}</span>
          </h2>
          <h4>
            Temperatura Máxima<span>{unitSymbol}</span>
          </h4>
          <h2>
            {day.max}
            <span>{unitSymbol}</span>
          </h2>
          <h4>
            Temperatura Mínima<span>{unitSymbol}</span>
          </h4>
          <h2>
            {day.min}
            <span>{unitSymbol}</span>
          </h2>
        </div>
        <div className="previsaoChuva">
          <h4>Previsão de Chuva</h4>
          <h2>
            {day.rain}
            <span>%</span>
          </h2>
        </div>
      </div>  ))};
      {/* <div className={`cards ${tempClass ? tempClass : ""}`}>
        <h2>Terça-feira</h2>
        <div className="image-container-cards">
          <img
            src={iconURL ? iconURL : imageTempCity}
            alt="imagem do tempo para terça-feira na cidade de Belo Horizonte"
          />
        </div>
        <div className="temp-container-card">
          <h4>
            Temperatura<span>{unitSymbol}</span>
          </h4>
          <h2>
            {temp}
            <span>{unitSymbol}</span>
          </h2>
           <h4>
            Sensação Térmica em<span>{unitSymbol}</span>
          </h4>
          <h2>
            {sensacaoTermica}
            <span>{unitSymbol}</span>
          </h2>
          <h4>
            Temperatura Máxima<span>{unitSymbol}</span>
          </h4>
          <h2>
            {tempMax}
            <span>{unitSymbol}</span>
          </h2>
          <h4>
            Temperatura Mínima<span>{unitSymbol}</span>
          </h4>
          <h2>
            {tempMin}
            <span>{unitSymbol}</span>
          </h2>
        </div>
        <div className="previsaoChuva">
          <h4>Previsão de Chuva</h4>
          <h2>
            {rain}<span>%</span>
          </h2>
        </div>
      </div>
      <div className={`cards ${tempClass ? tempClass : ""}`}>
        <h2>Quarta-feira</h2>
        <div className="image-container-cards">
          <img
            src={iconURL ? iconURL : imageTempCity}
            alt="imagem do tempo para quarta-feira na cidade de Belo Horizonte"
          />
        </div>
        <div className="temp-container-card">
          <h4>
            Temperatura<span>{unitSymbol}</span>
          </h4>
          <h2>
            {temp}
            <span>{unitSymbol}</span>
          </h2>
           <h4>
            Sensação Térmica em<span>{unitSymbol}</span>
          </h4>
          <h2>
            {sensacaoTermica}
            <span>{unitSymbol}</span>
          </h2>
          <h4>
            Temperatura Máxima<span>{unitSymbol}</span>
          </h4>
          <h2>
            {tempMax}
            <span>{unitSymbol}</span>
          </h2>
          <h4>
            Temperatura Mínima<span>{unitSymbol}</span>
          </h4>
          <h2>
            {tempMin}
            <span>{unitSymbol}</span>
          </h2>
        </div>
        <div className="previsaoChuva">
          <h4>Previsão de Chuva</h4>
          <h2>
            {rain}<span>%</span>
          </h2>
        </div>
      </div>
      <div className={`cards ${tempClass ? tempClass : ""}`}>
        <h2>Quinta-feira</h2>
        <div className="image-container-cards">
          <img
            src={iconURL ? iconURL : imageTempCity}
            alt="imagem do tempo para quinta-feira na cidade de Belo Horizonte"
          />
        </div>
        <div className="temp-container-card">
          <h4>
            Temperatura<span>{unitSymbol}</span>
          </h4>
          <h2>
            {temp}
            <span>{unitSymbol}</span>
          </h2>
          <h4>
           <h4>
            Sensação Térmica em<span>{unitSymbol}</span>
          </h4>
          <h2>
            {sensacaoTermica}
            <span>{unitSymbol}</span>
          </h2>
            Temperatura Máxima<span>{unitSymbol}</span>
          </h4>
          <h2>
            {tempMax}
            <span>{unitSymbol}</span>
          </h2>
          <h4>
            Temperatura Mínima<span>{unitSymbol}</span>
          </h4>
          <h2>
            {tempMin}
            <span>{unitSymbol}</span>
          </h2>
        </div>
        <div className="previsaoChuva">
          <h4>Previsão de Chuva</h4>
          <h2>
            {rain}<span>%</span>
          </h2>
        </div>
      </div>
      <div className={`cards ${tempClass ? tempClass : ""}`}>
        <h2>Sexta-feira</h2>
        <div className="image-container-cards">
          <img
            src={iconURL ? iconURL : imageTempCity}
            alt="imagem do tempo para sexta-feira na cidade de Belo Horizonte"
          />
        </div>
        <div className="temp-container-card">
          <h4>
            Temperatura<span>{unitSymbol}</span>
          </h4>
          <h2>
            {temp}
            <span>{unitSymbol}</span>
          </h2>
          <h4>
           <h4>
            Sensação Térmica em<span>{unitSymbol}</span>
          </h4>
          <h2>
            {sensacaoTermica}
            <span>{unitSymbol}</span>
          </h2>
            Temperatura Máxima<span>{unitSymbol}</span>
          </h4>
          <h2>
            {tempMax}
            <span>{unitSymbol}</span>
          </h2>
          <h4>
            Temperatura Mínima<span>{unitSymbol}</span>
          </h4>
          <h2>
            {tempMin}
            <span>{unitSymbol}</span>
          </h2>
        </div>
        <div className="previsaoChuva">
          <h4>Previsão de Chuva</h4>
          <h2>
            {rain}<span>%</span>
          </h2>
        </div>
      </div>
      <div className={`cards ${tempClass ? tempClass : ""}`}>
        <h2>Sábado-feira</h2>
        <div className="image-container-cards">
          <img
            src={iconURL ? iconURL : imageTempCity}
            alt="imagem do tempo para sábado-feira na cidade de Belo Horizonte"
          />
        </div>
        <div className="temp-container-card">
          <h4>
            Temperatura<span>{unitSymbol}</span>
          </h4>
          <h2>
            {temp}
            <span>{unitSymbol}</span>
          </h2>
           <h4>
            Sensação Térmica em<span>{unitSymbol}</span>
          </h4>
          <h2>
            {sensacaoTermica}
            <span>{unitSymbol}</span>
          </h2>
          <h4>
            Temperatura Máxima<span>{unitSymbol}</span>
          </h4>
          <h2>
            {tempMax}
            <span>{unitSymbol}</span>
          </h2>
          <h4>
            Temperatura Mínima<span>{unitSymbol}</span>
          </h4>
          <h2>
            {tempMin}
            <span>{unitSymbol}</span>
          </h2>
        </div>
        <div className="previsaoChuva">
          <h4>Previsão de Chuva</h4>
          <h2>
            {rain}<span>%</span>
          </h2>
        </div>
      </div>
      <div className={`cards ${tempClass ? tempClass : ""}`}>
        <h2>Domingo-feira</h2>
        <div className="image-container-cards">
          <img
            src={iconURL ? iconURL : imageTempCity}
            alt="imagem do tempo para domingo-feira na cidade de Belo Horizonte"
          />
        </div>
        <div className="temp-container-card">
          <h4>
            Temperatura<span>{unitSymbol}</span>
          </h4>
          <h2>
            {temp}
            <span>{unitSymbol}</span>
          </h2>
           <h4>
            Sensação Térmica em<span>{unitSymbol}</span>
          </h4>
          <h2>
            {sensacaoTermica}
            <span>{unitSymbol}</span>
          </h2>
          <h4>
            Temperatura Máxima<span>{unitSymbol}</span>
          </h4>
          <h2>
            {tempMax}
            <span>{unitSymbol}</span>
          </h2>
          <h4>
            Temperatura Mínima<span>{unitSymbol}</span>
          </h4>
          <h2>
            {tempMin}
            <span>{unitSymbol}</span>
          </h2>
        </div>
        <div className="previsaoChuva">
          <h4>Previsão de Chuva</h4>
          <h2>
            {rain}<span>%</span>
          </h2>
        </div>
      </div> */}
    </div>
  );
};

export default Cards7DaysOnWeek;
