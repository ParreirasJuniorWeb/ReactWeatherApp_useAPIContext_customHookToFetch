import { Outlet } from "react-router-dom";
import "./App.css";

// import 'useDataWeatherContext' para pegar os dados da API OpenWeather e juntar com o state do useReducer.
// import { useDataWeatherContext } from "./hook/useDataWeatherContext";

// import Header - Navbar component
import Navbar from "./components/Navbar/Navbar";

// import Footer component
import Footer from "./components/Footer/Footer";

import { useWeather } from "./hook/useWeather.js";

function App() {
  const { currentWeather, loading, error } = useWeather();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!currentWeather) return <div>Sem dados</div>;

  return (
    <div className="App">
      <Navbar currentWeather={currentWeather} />
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
