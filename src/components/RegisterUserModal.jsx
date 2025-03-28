import React, { useState } from "react";
import ModalWithForm from "./ModalWithForm";
import useForm from "../hooks/useForm";
import "../blocks/RegisterUserModal.css";

const RegisterUserModal = ({
  handleCloseModal,
  isOpen,
  isLoading,
  handleRegistration,
  handleLoginClick,
  buttonText,
}) => {
  const { values, handleChange, isDisabled } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(values);
  };

  const handleOrLoginClick = () => {
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
          value={values.email}
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
          value={values.password}
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
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
      <div className="modal__buttons-container">
        <button
          type="submit"
          className="modal__form-submit"
          disabled={isLoading || isDisabled}
        >
          {isLoading ? "Signing Up" : "Sign Up"}
        </button>
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
