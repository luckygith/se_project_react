// import sunny from "../../../../assets/sunny.svg";
import "./WeatherCard.css";
import { weatherOptions } from "../../../../utils/constants";
import { filterWeatherData } from "../../../../utils/weatherApi";

function WeatherCard({ weatherData, weatherOptions }) {
  const weatherOption = weatherOptions.filter((option) => {});

  return (
    <div className="weather-card">
      <p className="weather-card__temp"> {weatherData.temp.F} &deg; F</p>
      <img src={sunny} alt="sunny" className="weather-card__image" />
    </div>
  );
}

export default WeatherCard;
