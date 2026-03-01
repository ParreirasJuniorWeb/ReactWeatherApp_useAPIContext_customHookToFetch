import { useState, useEffect } from "react";

// 4 - custom Hook to OpenWeather API

export const useFetchWeather = (
  city = "",
  units = "metric",
  isLocatedCity = false,
) => {
  if (!city || city === "" || city === null)
    throw new Error("Cidade não encontrada");

  const [simpleForecast, setSimpleForecast] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState(null);
  const [historic, setHistoric] = useState([]);

  const[loading, setLoading] = useState(true);
  const[error, setError] = useState(null);

  useEffect(() => {
    const APIKey = "af8c58c9e90be8487a19b917722da820";

    const URL = {
      urlOneCityForecast: `https://api.openweathermap.org/data/2.5/weather?`,
      urlWeeklyForecast: `https://api.openweathermap.org/data/2.5/forecast?`,
      urlLocatedCity: `https://api.openweathermap.org/geo/1.0/reverse?`,
    };
    
    const isCityInHistoric = historic.some((historicItem) => historicItem.city === city);
    
    if (isCityInHistoric) {
      alert("Cidade já pesquisada!");
      setError({
        ErrorMessage: "Cidade já pesquisada!",
        error: "Cidade já pesquisada!",
      });
      return;
    }
    
    let simpleForecastData = null;
    let weeklyForecastData = null;

    const weatherForecastOneCity = async (city, units) => {
      try {
        const response = await fetch(
          URL.urlOneCityForecast +
            `q=${encodeURIComponent(city)}&appid=${APIKey}&units=${units}&lang=pt_br`,
        );
        if (!response.ok) throw new Error("Cidade não encontrada");
        const json = await response.json();

        simpleForecastData = json;
        setSimpleForecast(json);
        checkAndAddToHistoric(city);
        setLoading(false);
      } catch (error) {
         setError({
          ErrorMessage: "ERRO: Encontramos problemas na execução de sua requisição ao servidor OpenWeather. Aguarde um pouco para fazer uma nova solicitação.",
          error: error,
          errorCod: error.cod,
        });
        console.error({
          message:
            "ERRO: Encontramos problemas na execução de sua requisição ao servidor OpenWeather. Aguarde um pouco para fazer uma nova solicitação.",
          error: error,
        });
        //alert("ERRO: Encontramos problemas na execução de sua requisição ao servidor OpenWeather. Aguarde um pouco para fazer uma nova solicitação.");
        throw new Error(
          "ERRO: Encontramos problemas na execução de sua requisição ao servidor OpenWeather. Aguarde um pouco para fazer uma nova solicitação.",
        );
      }
    };

    weatherForecastOneCity(city, units);

    const weatherForecast7DaysOnWeek = async (city, units) => {
      try {
        const response = await fetch(
          URL.urlWeeklyForecast +
            `q=${encodeURIComponent(city)}&appid=${APIKey}&units=${units}&lang=pt_br`,
        );
        if (!response.ok) throw new Error("Cidade não encontrada");
        const json = await response.json();

        weeklyForecastData = json;
        setWeeklyForecast(json);
        checkAndAddToHistoric(city);
        setLoading(false);
      } catch (error) {
        setError({
          ErrorMessage: "ERRO: Encontramos problemas na execução de sua requisição ao servidor OpenWeather. Aguarde um pouco para fazer uma nova solicitação.",
          error: error,
          errorCod: error.cod,
        });
        console.error({
          message:
            "ERRO: Encontramos problemas na execução de sua requisição ao servidor OpenWeather. Aguarde um pouco para fazer uma nova solicitação.",
          error: error,
        });
        //alert("ERRO: Encontramos problemas na execução de sua requisição ao servidor OpenWeather. Aguarde um pouco para fazer uma nova solicitação.");
        throw new Error(
          "ERRO: Encontramos problemas na execução de sua requisição ao servidor OpenWeather. Aguarde um pouco para fazer uma nova solicitação.",
        );
      }
    };

    const checkAndAddToHistoric = (city) => {
      if (simpleForecastData && weeklyForecastData) {
        setHistoric(prev => [...prev, {
          city: city,
          simpleForecast: simpleForecastData,
          weeklyForecast: weeklyForecastData
        }]);
      }
    };

    weatherForecastOneCity(city, units);
    weatherForecast7DaysOnWeek(city, units);

    if (isLocatedCity) {
      const getWeatherLocalCity = async (lat, lon) => {
        const response = await fetch(
          URL.urlLocatedCity +
            `lat=${lat}&lon=${lon}&limit=1&appid=${APIKey}&units=${units}&lang=pt_br`,
        );
        if (!response.ok) {
          setError({
            ErrorMessage: "localização passada por parâmetros na função não encontrada ou incorretas!",
            error: response.message,
            errorCod: response.cod,
          });
          throw new Error(
            "localização passada por parâmetros na função não encontrada ou incorretas!",
          );
        }
        const json = await response.json();

        weatherForecastOneCity(json[0].name, units);
        weatherForecast7DaysOnWeek(json[0].name, units);
        setLoading(false);
      };

      const weatherForecastLocalCity = () => {
        if ("geolocation" in navigator) {
          /* geolocation is available */
          navigator.geolocation.getCurrentPosition(function (position) {
            getWeatherLocalCity(
              position.coords.latitude,
              position.coords.longitude,
            );
          });
        } else {
          alert(
            "I'm sorry, but geolocation services are not supported by your browser.",
          );
        }
      };

      weatherForecastLocalCity();
    }
  }, [city, units, isLocatedCity]);
  const data = {
    simpleForecast: simpleForecast,
    weeklyForecast: weeklyForecast,
    historic: historic,
  }
  return { data, loading, error };
};