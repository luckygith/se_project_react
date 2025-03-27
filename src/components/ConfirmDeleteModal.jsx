import React from "react";
import ModalWithForm from "./ModalWithForm";
import useForm from "../hooks/useForm";
import "../blocks/ConfirmDeleteModal.css";

const ConfirmDeleteModal = ({
  handleCloseModal,
  isOpen,
  handleDeleteItem,
  isLoading,
  card,
}) => {
  return (
    <div className={` modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content delete__modal-content">
        <div className="delete__modal-content-textbox">
          <p className="delete__modal-content-text">
            Are you sure you want to delete this item?
          </p>
          <p className="delete__modal-content-text">
            This action is irreversible.
          </p>
        </div>
        <button
          onClick={handleCloseModal}
          type="button"
          className="delete__modal-close"
        ></button>
        <div className=" delete__modal-footer">
          <button
            onClick={() => handleDeleteItem(card._id)}
            type="button"
            className="delete__modal-confirm-delete"
          >
            {isLoading ? "Deleting item..." : "Yes, delete item"}
          </button>
          <button
            className="delete__modal-cancel-button"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
