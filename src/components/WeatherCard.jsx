// import clear from "../../../../assets/day/clear.svg";
import "../blocks/WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../utils/constants";
import { CurrentTempUnitContext } from "../contexts/CurrentTempUnitContext";
import { useContext } from "react";

function WeatherCard({ weatherData }) {
  //filter creates array
  const { currentTempUnit } = useContext(CurrentTempUnitContext);

  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });
  let weatherOption;

  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <div className="weather-card">
      <p className="weather-card__temp">
        {" "}
        {weatherData.temp[currentTempUnit]} &deg;
        {currentTempUnit}
      </p>
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
