import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

export const useWeather = () => {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error("useWeather deve ser usado dentro de um WeatherProvider");
  }

  const {
    weatherData,
    units,
    loading,
    error,
    changeCity,
    changeUnits,
    dispatch,
  } = context;

  // Função helper para processar dados da semana
  const getWeeklyForecast = () => {
    if (!weatherData.weeklyForecastData) return [];
    
    return weatherData.weeklyForecastData.map((day) => ({
      date: new Date(day.dt * 1000).toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "short",
      }),
      temp: day.temp?.day || day.main?.temp,
      description: day.weather?.[0]?.description,
      icon: day.weather?.[0]?.icon,
      min: day.temp?.min || day.main?.temp_min,
      max: day.temp?.max || day.main?.temp_max,
      feels_like: day.temp?.feels_like || day.main?.feels_like,
      rain: day.rain?.["3h"],
    }));
  };

  // Função helper para clima atual
  const getCurrentWeather = () => {
    if (!weatherData.simpleForecast) return null;
    
    return {
      temperature: weatherData.simpleForecast.main?.temp,
      temperatureMax: weatherData.simpleForecast.main?.temp_max,
      temperatureMin: weatherData.simpleForecast.main?.temp_min,
      feelsLike: weatherData.simpleForecast.main?.feels_like,
      humidity: weatherData.simpleForecast.main?.humidity,
      description: weatherData.simpleForecast.weather?.[0]?.description,
      visibility: weatherData.simpleForecast?.visibility,
      windSpeed: weatherData.simpleForecast?.speed,
      windDeg: weatherData.simpleForecast?.deg,
      windGust: weatherData.simpleForecast?.gust,
      clouds: weatherData.simpleForecast?.clouds?.all,
      rain: weatherData.simpleForecast?.rain?.["1h"],
      pression: weatherData.simpleForecast.main?.pressure,
      icon: weatherData.simpleForecast.weather?.[0]?.icon,
      city: weatherData.simpleForecast.name,
      country: weatherData.simpleForecast.sys?.country,
      sunset: weatherData.simpleForecast.sys?.sunset,
      sunrise: weatherData.simpleForecast.sys?.sunrise,
    };
  };

  return {
    // State
    weatherData,
    units,
    loading,
    error,
    
    // Data helpers
    currentWeather: getCurrentWeather(),
    weeklyForecast: getWeeklyForecast(),
    
    // Actions
    changeCity,
    changeUnits,
    dispatch,
  };
};