import WeatherCard from "./WeatherCard/WeatherCard";
import { clothingItems } from "../../../utils/clothingItems";
import ItemCard from "./ItemCard/ItemCard";
import "./Main.css";
import { useContext } from "react";
import { CurrentTempUnitContext } from "../../../contexts/CurrentTempUnitContext";

function Main({ weatherData, handleCardClick }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);
  console.log(currentTempUnit);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTempUnit]} &deg; F. You may want to
          wear:
        </p>
        {/* {weatherData.temp.F} &deg; */}
        <ul className="cards__list">
          {clothingItems.map((item) => {
            if (item.weather === weatherData.type)
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
