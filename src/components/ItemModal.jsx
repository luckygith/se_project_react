import "../blocks/ItemModal.css";

function ItemModal({
  isOpen,
  card,
  handleCloseModal,
  handleDeleteItem,
  isLoading,
}) {
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
          <button
            onClick={() => handleDeleteItem(card._id)}
            type="button"
            className="modal__delete-button"
          >
            {isLoading ? "Deleting item..." : "Delete item"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
