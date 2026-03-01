// import Custom Hook para usufruir do API Context do react, o 'WeatherContext.jsx'.
import { useWeatherContext } from "../hook/useWeatherContext";

export const useWeeklyForecastData = () => {
  const { weatherData } = useWeatherContext();
  const isWeatherCityData = (weatherData) => {
    if (weatherData?.weeklyForecastData) {
      const { list } = weatherData.weeklyForecastData;
      return list;
    } else {
      console.log(
        "Dados não carregados da API OpenWeather! Verifique no React APIContext a possível causa e o motivo para não ter sido carregado os dados para os demais components.",
      );
      return null;
    }
  };
  const weeklyForecastData = isWeatherCityData(weatherData);
  return weeklyForecastData;
};
