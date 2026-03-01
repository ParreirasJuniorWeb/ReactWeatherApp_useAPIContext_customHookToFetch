// import createContext e useReducer para a criação do contexto da aplicação
import { createContext, useReducer } from "react";

// import useFetchWeatherForecast
// import { useFetchWeather } from "../hook/useFetchWeather";

const initialState = {
  city: "Belo Horizonte",
  isLocatedCity: false,
  units: "metric",
  simpleForecast: null,
  weeklyForecastData: null,
  historic: [],
};

// useReducer for Weather App
const weatherReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_CITY": {
      return {
        ...state,
        city: action.city,
      };
    }
    case "WEATHER_LOCAL_CITY":
      return {
        ...state,
        isLocatedCity: true,
      };
    case "CHANGE_UNITS":
      return {
        ...state,
        units: state.units === "metric" ? "imperial" : "metric",
      };
    case "ADD_WEATHER_FORECAST":
      return {
        ...state,
        simpleForecast: action.payload,
      };
    case "ADD_WEEKLY_FORECAST":
      return {
        ...state,
        weeklyForecastData: action.payload,
      };
    case "ADD_HISTORIC":
      return {
        ...state,
        historic: action.payload,
      };
    default:
      return state;
  }
};

export const WeatherContext = createContext({});

export const WeatherProvider = ({ children }) => {
  const [weatherData, dispatch] = useReducer(weatherReducer, initialState);

  // const { simpleForecast, weeklyForecast, historic } = useFetchWeather(
  //   weatherData.city,
  //   weatherData.units,
  //   weatherData.isLocatedCity,
  // );
  //  // Processar weeklyForecast se necessário
  // const weeklyForecastProcessed = useMemo(() => {
  //   weeklyForecast?.list
  //   ?.reduce((acc, item) => {
  //     const date = new Date(item.dt * 1000).toLocaleDateString();
  //     const exists = acc.find(
  //       (d) => new Date(d.dt * 1000).toLocaleDateString() === date,
  //     );
  //     if (!exists) acc.push(item);
  //     return acc;
  //   }, [])
  //   ?.slice(0, 7);
  // }, [weeklyForecast]);
  
  // console.log(simpleForecast);
  // console.log(weeklyForecast);
  // console.log(weeklyForecastProcessed);
  // console.log(historic);

  // ✅ CORRETO
  // useEffect(() => {
  //   // ✅ CORRETO
  //   if (simpleForecast && typeof simpleForecast === "object" && !Array.isArray(simpleForecast)) {
  //     dispatch({ type: "ADD_WEATHER_FORECAST", payload: simpleForecast });
  //   }
  // }, [simpleForecast]);

  // useEffect(() => {
  //   if (weeklyForecastProcessed && weeklyForecastProcessed.length > 0) {
  //     dispatch({ type: "ADD_WEEKLY_FORECAST", payload: weeklyForecastProcessed });
  //   }
  // }, [weeklyForecastProcessed]);

  // useEffect(() => {
  //   // ✅ CORRETO
  //   if (historic && Array.isArray(historic) && historic.length > 0) {
  //     dispatch({ type: "ADD_HISTORIC", payload: historic });
  //   }
  // }, [historic]);

  // console.log({weatherForecast: weatherData.simpleForecast});

  return (
    <WeatherContext.Provider value={{ weatherData, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
};


/*
Resumo das Correções
                      Problema

                      Severidade

                      Status

                      1

                      Loop infinito (dispatch sem useEffect)

                      🔴 Crítico

                      ✅ Corrigido

                      2

                      Lógica incorreta no CHANGE_UNITS

                      🔴 Crítico

                      ✅ Corrigido

                      3

                      Nome de variável inconsistente

                      🟡 Moderado

                      ✅ Corrigido

                      4

                      Verificação de objeto incorreta

                      🟡 Moderado

                      ✅ Corrigido

                      5

                      Nome da cidade com letra minúscula

                      🟢 Leve

                      ✅ Corrigido

                      6

                      Verificação de array incorreta

                      🟡 Moderado

                      ✅ Corrigido

                      7

                      Ternário redundante

                      🟢 Leve

                      ✅ Corrigido
*/