import "../blocks/ItemCard.css";
import { useState, useContext, useEffect } from "react";
import likedButton from "../assets/likeButton.svg";
import likesButton from "../assets/likesButton.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function ItemCard({ item, handleCardClick, handleCardLike }) {
  // if currentUser._id is in item.likes, then isLiked = True
  const currentUser = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(item.likes.includes(currentUser._id));

  function handleLike(item) {
    setIsLiked(!isLiked);
    handleCardLike(item);
  }

  // useEffect(() => {
  //   setIsLiked(item.likes.includes(currentUser._id));
  // }, [clothingItems, item, currentUser._id]);

  // function toggleLike(item) {
  //   if (isLiked === true) {
  //     setIsLiked(false);
  //   } else {
  //     setIsLiked(true);
  //   }
  // }

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
