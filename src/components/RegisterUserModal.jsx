import React, { useState } from "react";
import ModalWithForm from "./ModalWithForm";
import useForm from "../hooks/useForm";

const RegisterUserModal = ({
  handleCloseModal,
  isOpen,
  isLoading,
  handleRegistration,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
    avatarUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText={isLoading ? "Registering Login Information" : "Sign Up"}
      handleCloseModal={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email{""}
        <input
          type="text"
          className="modal__input"
          id="email"
          name="email"
          placeholder="Email"
          value={values.email}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{""}
        <input
          type="text"
          className="modal__input"
          id="password"
          name="password"
          placeholder="Password"
          value={values.password}
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name{""}
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          value={values.name}
        />
      </label>
      <label htmlFor="avatarUrl" className="modal__label">
        Avatar URL{" "}
        <input
          type="text"
          className="modal__input"
          id="avatarUrl"
          name="avatarUrl"
          placeholder="Avatar URL"
          value={values.avatarUrl}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterUserModal;
