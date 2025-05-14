import { useContext } from "react";
import ModalWithForm from "./ModalWithForm";
import useForm from "../hooks/useForm";
import {  useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfileModal = ({
  handleCloseModal,
  isOpen,
  handleEditProfile,
  isLoading,
}) => {
  const { values, setValues, handleChange, isDisabled } = useForm({
    name: "",
    avatar: "",
  });

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile(values);
  };

  return (
    <ModalWithForm
      title="Change Profile Data"
      buttonText={isLoading ? "Saving changes..." : "Save changes"}
      handleCloseModal={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          // placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL{" "}
        <input
          type="text"
          className="modal__input"
          id="avatar"
          name="avatar"
          // placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
      <button
        type="submit"
        className="modal__form-submit"
        disabled={isLoading || isDisabled}
      >
        {isLoading ? "Saving changes" : "Save changes"}
      </button>
    </ModalWithForm>
  );
};

export default EditProfileModal;
