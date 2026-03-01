import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// import Weather Context 
import { WeatherProvider } from "./context/WeatherContext";

// import Router Components
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import WeatherForecast.jsx
import WeatherForecast from "./routes/WeatherForecast/WeatherForecast";

// import WeatherForecast-7-day-week.jsx
import WeatherForecast7DaysOnweek from './routes/WeatherForecast7DaysOnWeek/WeatherForecast7DaysOnweek';

// importando elemento para ser renderizado quando a rota for acessada
// e caso haja um erro na rota
import ErrorPage from "./routes/Error/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <WeatherForecast />
      },
      {
        path: "weatherForecast7DaysOnWeek",
        element: <WeatherForecast7DaysOnweek />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WeatherProvider>
      <RouterProvider router={router}/>
    </WeatherProvider>
  </StrictMode>,
);