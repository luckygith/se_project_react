import React, { useState } from "react";
import ModalWithForm from "./ModalWithForm";
import useForm from "../hooks/useForm";

const LoginUserModal = ({
  handleCloseModal,
  isOpen,
  handleLogin,
  isLoading,
  handleRegisterClick,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
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
    handleLogin(data);
  };

  const handleOrRegisterClick = () => {
    handleCloseModal();
    handleRegisterClick();
  };

  return (
    <ModalWithForm
      title="Login"
      buttonText={isLoading ? "Registering Login Information" : "Sign Up"}
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
      <div className="modal__button-container">
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
