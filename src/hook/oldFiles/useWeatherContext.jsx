// import useContext e outros hooks do React
import { useContext } from "react";

// import Weather Context
import { WeatherContext } from "../../context/WeatherContext";

export const useWeatherContext = () => {
    const context = useContext(WeatherContext);

    // validação se existe um contexto a ser utilizado
    if(!context) {
        console.log("Contexto não encontrado!");
        return;
    }

    return context;
};