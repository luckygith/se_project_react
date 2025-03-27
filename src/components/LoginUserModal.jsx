import React, { useState } from "react";
import ModalWithForm from "./ModalWithForm";
import useForm from "../hooks/useForm";
import "../blocks/LoginUserModal.css";

const LoginUserModal = ({
  handleCloseModal,
  isOpen,
  handleLogin,
  isLoading,
  handleRegisterClick,
}) => {
  const { values, handleChange, isDisabled } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
  };

  const handleOrRegisterClick = () => {
    handleRegisterClick();
  };

  // const isDisabled = !data.email || !data.password; // Disable when empty

  // <button
  //   type="submit"
  //   className={`modal__submit-button ${
  //     isDisabled ? "modal__submit-button--disabled" : ""
  //   }`}
  //   disabled={isDisabled}
  // >
  //   {isLoading ? "Logging in..." : "Log In"}
  // </button>;

  return (
    <ModalWithForm
      title="Login"
      buttonText={isLoading ? "Logging in..." : "Log In"}
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
      <div className="modal__button-container">
        {/* <button
          type="submit"
          className="modal__form-submit"
          disabled={isLoading || isDisabled}
        >
          {isLoading ? "Logging in" : "Log in"}
        </button> */}
        <button
          type="button"
          className="modal__to-register"
          onClick={handleOrRegisterClick}
        >
          or Register
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginUserModal;
