// import useWeatherContext refatorando o uso do context com um hook auxiliar
import { useWeather } from "../../hook/useWeather.js";
import { useState } from "react";

// import CSS
import "./SearchForm.css";

const SearchForm = () => {
  const { currentWeather, units, changeCity, changeUnits, dispatch, loading, error } = useWeather();

  const [inputCity, setInputCity] = useState("");

  const [unit] = useState(() => {
    const unitSymbol = units === "metric" ? "°C" : "°F";
    return unitSymbol;
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!inputCity || inputCity === "") return alert("Preencha o campo para buscar pelo tempo na cidade!");

    e.preventDefault();
    if (inputCity.trim()) {
      changeCity(inputCity.trim());
      setInputCity("");
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!currentWeather) return <div>Sem dados</div>;

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search City" onChange={(e) => setInputCity(e.target.value)} value={inputCity}/>
        <button type="submit">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        <div className="search-today">
          <button type="button" onClick={() => dispatch({type: "WEATHER_LOCAL_CITY"})}>
            Today <i class="fa-solid fa-magnifying-glass"></i>
          </button>
          <button type="button" onClick={() => changeUnits()}>
            {unit} <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </form>
  );
};

export default SearchForm;