// import useWeatherContext
// import { useWeatherContext } from "../../hook/useWeatherContext";

// import Custom Hook para usufruir do API Context do react, o 'useDataWeather.jsx'
// import { useDataWeather } from "../../hook/useDataWeather.jsx";

import { useWeather } from "../../hook/useWeather.js";;

// import CSS
import "./ImageTeamp.css";

//import images
import imageTempCity from "../../images/cloudy.png";

const ImageTemp = () => {
  // const simpleForecast = useDataWeather();
  const { currentWeather, loading, error } = useWeather();
  
  const nameCity = currentWeather?.city;
  const countryCity = currentWeather?.country;
  const icon = currentWeather?.icon;
  const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  const description = currentWeather?.description;
  
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!currentWeather) return <div>Sem dados</div>;

  return (
    <div className="intro-city-temp">
      <div>
        {currentWeather !== null ? (
          <h2 className="subtitle">
            {nameCity}, <span>{countryCity}</span>
          </h2>
        ) : (
          <h2 className="subtitle">
            {"Belo Horizonte"}, <span>{"BR"}</span>
          </h2>
        )}
      </div>
      <div className="image-container">
        <img
          src={iconURL ? iconURL : imageTempCity}
          alt="Tempo na cidade escolhida"
        />
      </div>
      <p>{description}</p>
    </div>
  );
};

export default ImageTemp;