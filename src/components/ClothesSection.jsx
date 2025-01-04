import ItemCard from "./ItemCard";
import React from "react";
import "../blocks/ClothesSection.css";

function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  selectedCard,
}) {
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
        {clothingItems.map((item) => {
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
