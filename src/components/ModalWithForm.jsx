import "../blocks/ModalWithForm.css";
import "../hooks/useForm";

function ModalWithForm({
  children,
  title,
  buttonText = "Add Clothes",
  isOpen,
  handleCloseModal,
  onSubmit,
  isDisabled,
  isLoading,
}) {
  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}   
      `}
    >
      <div className="modal__content">
        <button
          onClick={handleCloseModal}
          type="button"
          className="modal__close"
        ></button>
        <div className="modal__form-container">
          <h3 className="modal__title">{title}</h3>
          <form className="modal__form" onSubmit={onSubmit}>
            {children}
            <div className="modal__buttons-container">
              <button
                type="submit"
                className="modal__form-submit"
                disabled={isLoading || isDisabled}
              >
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalWithForm;
