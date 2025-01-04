import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import "../blocks/Main.css";
import { useContext } from "react";
import { CurrentTempUnitContext } from "../contexts/CurrentTempUnitContext";
// import { clothingItems } from "../../../utils/clothingItems";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);

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
