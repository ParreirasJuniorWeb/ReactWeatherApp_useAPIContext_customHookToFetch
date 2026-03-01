// import hooks of react
import { useEffect, useMemo } from "react";

// import useFetchWeatherForecast
import { useFetchWeather } from "../useFetchWeather";

// import useWeatherContext refatorando o uso do context com um hook auxiliar
import { useWeatherContext } from "../hook/useWeatherContext";

export const useDataWeatherContext = () => {
  const { weatherData, dispatch } = useWeatherContext();
  const { simpleForecast, weeklyForecast, historic } = useFetchWeather(
    weatherData.city,
    weatherData.units,
    weatherData.isLocatedCity,
  );
  // Cria uma função que retorne os 7 dias da semana com base na variável 'data' que contém os dados da API OpenWeather,
  // contando com o dia de hoje e mais a previsão do tempo para mais 6 dias a contar com o dia atual e
  // retorne o filtro ou resultado desta função em uma variável.
  // Processar weeklyForecast se necessário
  const weeklyForecastProcessed = useMemo(() => {
    weeklyForecast?.list
      ?.reduce((acc, item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        const exists = acc.find(
          (d) => new Date(d.dt * 1000).toLocaleDateString() === date,
        );
        if (!exists) acc.push(item);
        return acc;
      }, [])
      ?.slice(0, 7);
  }, [weeklyForecast]);
  console.log(simpleForecast);
  console.log(weeklyForecast);
  console.log(weeklyForecastProcessed);
  console.log(historic);
  // ✅ Correção: usar useEffect para evitar loop infinito
  // ✅ CORRETO
  useEffect(() => {
    // ✅ CORRETO
    if (
      simpleForecast &&
      typeof simpleForecast === "object" &&
      !Array.isArray(simpleForecast)
    ) {
      dispatch({ type: "ADD_WEATHER_FORECAST", payload: simpleForecast });
    }
  }, [simpleForecast, dispatch]);

  useEffect(() => {
    if (weeklyForecastProcessed && weeklyForecastProcessed.length > 0) {
      dispatch({
        type: "ADD_WEEKLY_FORECAST",
        payload: weeklyForecastProcessed,
      });
    }
  }, [weeklyForecastProcessed, dispatch]);

  useEffect(() => {
    // ✅ CORRETO
    if (historic && Array.isArray(historic) && historic.length > 0) {
      dispatch({ type: "ADD_HISTORIC", payload: historic });
    }
  }, [historic, dispatch]);

  console.log({weatherForecast: weatherData.simpleForecast});
  
  const { weatherForecastSimpleData } = weatherData.simpleForecast;
  const [weatherForecast7DaysOnWeek] = weatherData.weeklyForecastData;

  if (
    weatherForecastSimpleData &&
    weatherForecast7DaysOnWeek &&
    weatherForecastSimpleData !== null &&
    weatherForecast7DaysOnWeek.length > 0
  ) {
    return { weatherForecastSimpleData, weatherForecast7DaysOnWeek };
  } else {
    return null;
  }
};
