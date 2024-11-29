import sunny from "../../../../assets/sunny.svg";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  return (
    <div className="weather-card">
      <p className="weather-card__temp"> {weatherData.temp} &deg; F</p>
      <img src={sunny} alt="sunny" className="weather-card__image" />
    </div>
  );
}

export default WeatherCard;
