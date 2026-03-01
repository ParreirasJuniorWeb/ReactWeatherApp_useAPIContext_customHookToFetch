// WeeklyForecast.jsx
import { useWeather } from "../../hook/useWeather.js";

const WeeklyForecast = () => {
  const { weeklyForecast, loading } = useWeather();

  if (loading) return <div>Carregando previsão...</div>;
  if (!weeklyForecast.length) return <div>Sem dados da semana</div>;

  return (
    <div className="weekly-forecast">
      <h3>Previsão para 7 dias</h3>
      <div className="forecast-grid">
        {weeklyForecast.map((day, index) => (
          <div key={index} className="forecast-day">
            <p>{day.date}</p>
            <img
              src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.description}
            />
            <p>{day.temp}°C</p>
            <p>{day.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;