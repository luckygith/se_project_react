import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import "./Main.css";
import { useContext } from "react";
import { CurrentTempUnitContext } from "../../../contexts/CurrentTempUnitContext";
// import { clothingItems } from "../../../utils/clothingItems";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);
  console.log(currentTempUnit);
  console.log(clothingItems);

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

{
  /* <ul className="main__cards-list">
{clothingItems
  .filter((item) => {
    return item.weather === weatherData.type;
  })
  .map((item) => {
    return (
      <ItemCard
        key={item._id}
        item={item}
        handleCardClick={handleCardClick}
      />
    );
  })}
</ul>

<ul className="cards__list">
  {clothingItems
    .filter((item) => item.weather === weatherData.type)
    .map((item) => (
      <ItemCard key={item._id} item={item} handleCardClick={handleCardClick} />
    ))}
</ul>; */
}
