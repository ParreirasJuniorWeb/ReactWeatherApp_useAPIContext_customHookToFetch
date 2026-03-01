// import Custom Hook para usufruir do API Context do react, o 'WeatherContext.jsx'.
import { useWeatherContext } from "../hook/useWeatherContext";

export const useDataWeather = () => {
    const { weatherData } = useWeatherContext();
      const isWeatherCityData = (weatherData) => {
        if (
          weatherData.simpleForecast.name &&
          weatherData.simpleForecast.sys &&
          weatherData.simpleForecast.main &&
          weatherData.simpleForecast.weather
        ) {
          const { main, name, sys, weather, wind } = weatherData.simpleForecast;
          return { main, name, sys, weather, wind };
        } else {
            console.log(
                "Dados não carregados da API OpenWeather! Verifique no React APIContext a possível causa e o motivo para não ter sido carregado os dados para os demais components.",
            );
            return null;
        }
      };
      const simpleForecast = isWeatherCityData(weatherData);
      return simpleForecast;
};