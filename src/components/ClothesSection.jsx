import ItemCard from "./ItemCard";
import React from "react";
import "../blocks/ClothesSection.css";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  selectedCard,
}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwnClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );
  // filtering out Owner's clothing items from general clothing items

  return (
    <div className="clothes-section">
      <div className="clothes-section__container">
        <p className="clothes-section__title">Your Items</p>
        <button
          type="button"
          onClick={handleAddClick}
          className="clothes-section__add-clothes-button"
        >
          + Add New
        </button>
      </div>

      <ul className="cards__list">
        {isOwnClothingItems.map((item) => {
          // takes each item from ownclothes array and returns as itemcard
          return (
            <ItemCard
              item={item}
              key={item._id}
              handleCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;

// {clothingItems.map((item) => (
//   <ItemCard
//     key={item._id} // Add a unique key for each item
//     item={item}
//     handleCardClick={handleCardClick}
//   />
// ))}
