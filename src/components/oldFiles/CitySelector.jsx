// CitySelector.jsx
import { useState } from "react";
import { useWeather } from "../../hook/useWeather.js";

const CitySelector = () => {
  const [inputCity, setInputCity] = useState("");
  const { changeCity } = useWeather();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      changeCity(inputCity.trim());
      setInputCity("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputCity}
        onChange={(e) => setInputCity(e.target.value)}
        placeholder="Digite uma cidade"
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default CitySelector;