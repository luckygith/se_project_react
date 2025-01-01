import "../Profile/ClothesSection.css";
import { clothingItems } from "../../utils/clothingItems";
import ItemCard from "../App/Main/ItemCard/ItemCard";

function ClothesSection({ handleCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__container">
        <p className="clothes-section__title">Your Items</p>
        <button
          type="button"
          onSubmit={handleAddItem}
          className="clothes-section__add-clothes-button"
        >
          + Add New
        </button>
      </div>

      <ul className="cards__list">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
