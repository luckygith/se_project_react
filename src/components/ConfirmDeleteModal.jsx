import React from "react";
import ModalWithForm from "./ModalWithForm";
import useForm from "../hooks/useForm";

const ConfirmDeleteModal = ({
  handleCloseModal,
  isOpen,
  handleDeleteItem,
  isLoading,
}) => {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button
          onClick={handleCloseModal}
          type="button"
          className="modal__close"
        ></button>
        <div className="modal__footer">
          <button
            onClick={() => handleDeleteItem(card._id)}
            type="button"
            className="modal__delete-button"
          >
            Yes, delete item {isLoading ? "Deleting item..." : "Delete item"}
          </button>
          <button onClick={handleCloseModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
