// CurrentWeather.jsx
import { useWeather } from "../../hook/useWeather.js";

const CurrentWeather = () => {
  const { currentWeather, loading, error } = useWeather();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!currentWeather) return <div>Sem dados</div>;

  return (
    <div className="weather-card">
      <h2>{currentWeather.city}, {currentWeather.country}</h2>
      <p>Temperatura: {currentWeather.temperature}°C</p>
      <p>Sensação: {currentWeather.feelsLike}°C</p>
      <p>Umidade: {currentWeather.humidity}%</p>
      <p>Clima: {currentWeather.description}</p>
    </div>
  );
};

export default CurrentWeather;