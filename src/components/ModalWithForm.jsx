import "../blocks/ModalWithForm.css";
import "../hooks/useForm";

function ModalWithForm({
  children,
  title,
  isOpen,
  handleCloseModal,
  onSubmit,
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalWithForm;
