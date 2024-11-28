import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  buttonText,
  activeModal,
  handleCloseClick,
}) {
  return (
    <div
      className={`modal ${activeModal === "add-garment" ? "modal_opened" : ""}`}
    >
      <div className="modal__content">
        <h3 className="modal__title">{title}</h3>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        ></button>
        <form action="" className="modal__form">
          {children}
          <button className="modal__form-submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
