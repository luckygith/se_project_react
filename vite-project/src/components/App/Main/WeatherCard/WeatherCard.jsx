import clear from "../../../../assets/day/clear.svg";
import "./WeatherCard.css";
import {
  weatherOptions,
  defaultWeatherOptions,
} from "../../../../utils/constants";
import { filterWeatherData } from "../../../../utils/weatherApi";

function WeatherCard({ weatherData }) {
  //filter creates array
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  console.log(filteredOptions);

  let weatherOption;

  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <div className="weather-card">
      <p className="weather-card__temp"> {weatherData.temp.F} &deg; F</p>
      <img
        src={weatherOption.url}
        alt={`${weatherOption?.condition || "default"} ${
          weatherOption.day ? "day" : "night"
        }`}
        className="weather-card__image"
      />
      {/* {weatherOption?.condition && (
        <p className="weather-card__condition">{weatherOption.condition}</p>
      )} */}
    </div>
  );
}

export default WeatherCard;
