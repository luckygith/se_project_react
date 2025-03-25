import "../blocks/ItemCard.css";
import { useState } from "react";
import likedButton from "../assets/likeButton.svg";
import likesButton from "../assets/likesButton.svg";

function ItemCard({ item, handleCardClick, handleCardLike }) {
  const [isLiked, setIsLiked] = useState(item.isLiked || false);

  function handleLike(item) {
    setIsLiked(!isLiked);
    handleCardLike(item);
  }

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        <img
          onClick={() => handleLike(item)}
          src={isLiked ? likedButton : likesButton}
          alt="like button"
          className={isLiked ? "card__liked-button" : "card__like-button"}
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
