import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import "../blocks/Main.css";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CurrentTempUnitContext } from "../contexts/CurrentTempUnitContext";
import { clothingItems } from "../utils/clothingItems";
function Main({ weatherData, handleCardClick, clothingItems }) {
  const currentUser = useContext(CurrentUserContext);

  const { currentTempUnit } = useContext(CurrentTempUnitContext);

  const isOwnClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTempUnit]} &deg; {currentTempUnit}.
          You may want to wear:
        </p>
        <ul className="cards__list">
          {isOwnClothingItems.map((item) => {
            if (item.weather === weatherData.type)
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  handleCardClick={handleCardClick}
                />
              );
          })}
        </ul>
      </section>
    </main>
  );
}

// (item.name, item.imageUrl, item.weather)

export default Main;
