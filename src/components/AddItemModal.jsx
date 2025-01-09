import React, { useState } from "react";
import ModalWithForm from "../components/ModalWithForm";
import useForm from "../hooks/useForm";

const AddItemModal = ({
  handleCloseModal,
  isOpen,
  handleAddItem,
  isLoading,
}) => {
  const { values, handleChange, setValues } = useForm({
    //current state empty input values, handleChange updates when input changes
    name: "",
    imageUrl: "",
    weather: "",
  });

  // const AddItemModal = ({
  //   handleCloseModal,
  //   isOpen,
  //   handleAddItem,
  //   isLoading,
  // }) => {
  //   const [name, setName] = useState("");
  //   const handleNameChange = (e) => {
  //     setName(e.target.value);
  //   };

  //   const [image, setImage] = useState("");
  //   const handleImageChange = (e) => {
  //     setImage(e.target.value);
  //   };

  //   const [weatherType, setWeatherType] = useState("");
  //   const handleWeatherTypeChange = (e) => {
  //     setWeatherType(e.target.value);
  //   };

  // const {values, handleChange, inputValues}

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItem(values);
  };

  return (
    <ModalWithForm
      title="New Clothes"
      buttonText={isLoading ? "Adding item..." : "Add item"}
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
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="text"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="weather"
            className="modal__radio-input"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="weather"
            className="modal__radio-input"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="weather"
            className="modal__radio-input"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
