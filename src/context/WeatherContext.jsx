import { createContext, useReducer, useEffect, useCallback } from "react";
import { useFetchWeather } from "../hook/useFetchWeather";

const initialState = {
  city: "Belo Horizonte",
  isLocatedCity: false,
  units: "metric",
  simpleForecast: null,
  weeklyForecastData: null,
  historic: [],
  loading: false,
  error: null,
};

const weatherReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };

    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        simpleForecast: action.payload.simpleForecast,
        weeklyForecastData: action.payload.weeklyForecastData,
        historic: action.payload.historic,
      };

    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "CHANGE_CITY":
      return { ...state, city: action.payload, simpleForecast: null };

    case "CHANGE_UNITS":
      return {
        ...state,
        units: state.units === "metric" ? "imperial" : "metric",
      };

    case "WEATHER_LOCAL_CITY":
      return { ...state, isLocatedCity: true };

    default:
      return state;
  }
};

export const WeatherContext = createContext({});

export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  // ✅ useFetchWeather fora do fluxo de renderização
  const { data, loading, error } = useFetchWeather(
    state.city,
    state.units,
    state.isLocatedCity,
  );

  // ✅ useEffect para sincronizar dados com o reducer (EVITA LOOP INFINITO!)
  useEffect(() => {
    if (data && !loading && !error) {
      const weeklyForecastData = data.weeklyForecast?.list
        ?.reduce((acc, item) => {
          const date = new Date(item.dt * 1000).toLocaleDateString();
          const exists = acc.find(
            (d) => new Date(d.dt * 1000).toLocaleDateString() === date,
          );
          if (!exists) acc.push(item);
          return acc;
        }, [])
        ?.slice(0, 7);

      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          simpleForecast: data.simpleForecast,
          weeklyForecastData: weeklyForecastData,
          historic: data.historic || [],
        },
      });
    }
  }, [data, loading, error]);

  // ✅ Função para mudar cidade (com callback stable)
  const changeCity = useCallback((city) => {
    dispatch({ type: "CHANGE_CITY", payload: city });
  }, []);

  // ✅ Função para mudar unidades
  const changeUnits = useCallback(() => {
    dispatch({ type: "CHANGE_UNITS" });
  }, []);

  const value = {
    weatherData: state,
    units: state.units,
    loading,
    error,
    changeCity,
    changeUnits,
    dispatch,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};
