import React, { useContext } from "react";
import ModalWithForm from "./ModalWithForm";
import useForm from "../hooks/useForm";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfileModal = ({
  handleCloseModal,
  isOpen,
  handleEditProfile,
  isLoading,
}) => {
  const [data, setData] = useState({
    name: "",
    avatar: "",
  });

  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (isOpen && currentUser) {
      setData({
        name: currentUser.name,
        avatar: currentUser.avatar,
      });
    }
  }, [isOpen, currentUser]);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile(data);
    console.log({ name, avatar });
    console.log(data.name, data.avatar);
    console.log(name, avatar);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
          placeholder="Name"
          value={data.name}
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
          placeholder="Avatar URL"
          value={data.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
