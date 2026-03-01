// import useWeatherContext
// import { useWeatherContext } from "../../hook/useWeatherContext";

// import Custom Hook para usufruir do API Context do react, o 'useDataWeather.jsx'
// import { useDataWeather } from "../../hook/useDataWeather.jsx";

import { useWeather } from "../../hook/useWeather.js";

// import CSS
import "./AddicionalInfo.css";

// import images
import HumidityImage from "../../images/three-drops_icon-icons.com_54232.png";
import PressionImage from "../../images/weather_heavy_rain_cloud_icon_131618.png";
import WindSpeedImage from "../../images/cloudy.png";
import SunSetImage from "../../images/moon-and-stars.png";
import SunRaise from "../../images/sun.png";

const AddicionalInfo = () => {
  // const simpleForecast = useDataWeather();
  const { currentWeather, loading, error } = useWeather();

  const humidity = currentWeather ? currentWeather?.humidity || 30 : 30;
  const rain = currentWeather ? currentWeather?.rain || 30 : 30;
  const clouds = currentWeather ? currentWeather?.clouds || 30 : 30;
  const pression = currentWeather ? currentWeather?.pressure || 2 : 2;
  const windSpeed = currentWeather ? currentWeather?.windSpeed || 70 : 90;
  const visibility = currentWeather ? currentWeather?.visibility || 90 : 90;
  const windDeg = currentWeather ? currentWeather.windDeg || 90 : 90;
  const windGust = currentWeather ? currentWeather.windGust || 90 : 90;
  const sunset = currentWeather ? currentWeather?.sunset || 5 : 5;
  const sunrise = currentWeather ? currentWeather?.sunrise || 18 : 18;

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!currentWeather) return <div>Sem dados</div>;

  return (
    <div className="additionalInfo">
      <h2 className="subtitle">Additional Information</h2>
      <div className="cards-container">
        <div className="cards">
          <h4>Humidity</h4>
          <img src={HumidityImage} alt="humidity" />
          <h2>{humidity}%</h2>
          <p>Previsão para chuva: {rain}%</p>
          <p>Quant. Nuvens: {clouds}</p>
        </div>
        <div className="cards">
          <h4>Pression</h4>
          <img src={PressionImage} alt="humidity" />
          <h2>{pression} ph</h2>
        </div>
        <div className="cards">
          <h4>Wind Speed</h4>
          <img src={WindSpeedImage} alt="humidity" />
          <h2>{windSpeed} km/h</h2>
          <p>Visibilidade: {visibility}%</p>
          <p>Grau: {windDeg}°</p>
          <p>Gust: {windGust}</p>
        </div>
        <div className="cards">
          <h4>SunSet</h4>
          <img src={SunSetImage} alt="humidity" />
          <h2>{sunset} PM</h2>
        </div>
        <div className="cards">
          <h4>SunRaise</h4>
          <img src={SunRaise} alt="humidity" />
          <h2>{sunrise} AM</h2>
        </div>
      </div>
    </div>
  );
};

export default AddicionalInfo;
