import "../blocks/ItemCard.css";
import likeButton from "../assets/likeButton.svg";

function ItemCard({ item, handleCardClick, handleCardLike }) {
  function handleLike(data) {
    handleCardLike(data);
  }

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        <img
          onClick={() => handleLike(item)}
          src={likeButton}
          alt="heart button"
          className="card__like"
        />
      </div>
      <img
        onClick={() => handleCardClick(item)}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
