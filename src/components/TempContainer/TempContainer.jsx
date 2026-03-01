// import CSS
import "./TempContainer.css";

// import Custom Hook para usufruir do API Context do react, o 'WeatherContext.jsx'.
import { useWeather } from "../../hook/useWeather.js";

// import Custom Hook para usufruir do API Context do react, o 'useDataWeather.jsx'
// import { useDataWeather } from "../../hook/useDataWeather.jsx";

// import função auxiliar para date - formatar a data para os dias da semana
import { formatWeekDate } from "../../util/utils.js";

const TempContainer = () => {

  const { currentWeather, units, loading, error } = useWeather();
  const unitSymbol = units === "metric" ? "°C" : "°F";

  const temp = Math.round(currentWeather.temperature) || 0;
  const sensacaoTermica = Math.round(currentWeather.feelsLike) || 0;
  const tempMax = Math.round(currentWeather.temperatureMax) || 0;
  const tempMin = Math.round(currentWeather.temperatureMin) ||  0;

  let tempClass = "warm";
  if (unitSymbol === "metric") {
    if (temp < 18) tempClass = "cold";
    else if (temp > 28) tempClass = "hot";
  } else {
    if (temp < 64) tempClass = "cold";
    else if (temp > 82) tempClass = "hot";
  }

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!currentWeather) return <div>Sem dados</div>;

  return (
    <div className="temp-container"> 
      <div className={`description-weatherCity ${tempClass ? tempClass : ""}`}>
        <h4>
          Temperatura <span className="celcios">{unitSymbol}</span> para {formatWeekDate(new Date())}
        </h4>
        <h2>
          {temp}<span className="celcios">{unitSymbol}</span>
        </h2>
      </div>
      <div className={`description-weatherCity ${tempClass ? tempClass : ""}`}>
        <h4>
          Temperatura <span className="celcios">{unitSymbol}</span> para {formatWeekDate(new Date())}
        </h4>
        <h2>
          {sensacaoTermica}<span className="celcios">{unitSymbol}</span>
        </h2>
      </div>
      <div className={`description-weatherCity ${tempClass ? tempClass : ""}`}>
        <h4>
          Temperatura Máxima<span className="celcios">{unitSymbol}</span> para {formatWeekDate(new Date())}
        </h4>
        <h2>
          {tempMax}<span className="celcios">°C</span>
        </h2>
      </div>
      <div className={`description-weatherCity ${tempClass ? tempClass : ""}`}>
        <h4>
          Temperatura Mínima<span className="celcios">{unitSymbol}</span> para {formatWeekDate(new Date())}
        </h4>
        <h2>
          {tempMin}<span className="celcios">{unitSymbol}</span>
        </h2>
      </div>
    </div>
  );
};

export default TempContainer;