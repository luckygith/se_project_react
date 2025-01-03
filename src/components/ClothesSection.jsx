import "../blocks/CLothesSection.css";
import ItemCard from "./ItemCard";

import React from "react";

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
              // onClick={() => handleCardClick(item)}
              key={item._id}
              handleCardClick={handleCardClick}
              // card={selectedCard}
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
