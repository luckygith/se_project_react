import "../Profile/ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../App/Main/ItemCard/ItemCard";

function ClothesSection({ handleCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__container">
        <p className="clothes-section__title">Your Items</p>
        <button type="button" className="clothes-section__add-clothes-button">
          + Add New
        </button>
      </div>

      <ul className="cards__list">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              handleCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
