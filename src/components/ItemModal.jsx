import { useContext } from "react";
import "../blocks/ItemModal.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function ItemModal({
  isOpen,
  card,
  handleCloseModal,
  handleConfirmDeleteClick,

  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  console.log(card);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseModal}
          type="button"
          className="modal__close"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-detail">
            <h2 className="modal__caption">{card.name}</h2>

            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {isOwn && (
            <button
              onClick={() => handleConfirmDeleteClick(card._id)}
              type="button"
              className="modal__confirm-delete-button"
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
