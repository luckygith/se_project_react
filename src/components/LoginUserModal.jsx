import React, { useState } from "react";
import ModalWithForm from "./ModalWithForm";
import useForm from "../hooks/useForm";

const LoginUserModal = ({
  handleCloseModal,
  isOpen,
  handleLogin,
  isLoading,
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
    handleLogin(values);
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
          value={data.email}
          onChange={handleChange}
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
          value={data.password}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginUserModal;
