import React, { useState } from "react";
import ModalWithForm from "./ModalWithForm";
import useForm from "../hooks/useForm";

const RegisterUserModal = ({
  handleCloseModal,
  isOpen,
  isLoading,
  handleRegistration,
  handleLoginClick,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
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

  const handleOrLoginClick = () => {
    handleCloseModal();
    handleLoginClick();
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText={isLoading ? "Signing Up" : "Sign Up"}
      handleCloseModal={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email{""}
        <input
          type="email"
          className="modal__input"
          id="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{""}
        <input
          type="password"
          className="modal__input"
          id="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
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
          value={data.name}
          onChange={handleChange}
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
          value={data.avatarUrl}
          onChange={handleChange}
        />
      </label>
      <div className="modal__button-container">
        <button
          type="button"
          className="modal__to-login"
          onClick={handleOrLoginClick}
        >
          or Login
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterUserModal;
