import React, { useState } from "react";
import ModalWithForm from "../components/App/ModalWithForm/ModalWithForm";

const AddItemModal = ({
  handleCloseModal,
  handleAddClick,
  isOpen,
  handleAddItem,
}) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
  };

  const [image, setImage] = useState("");
  const handleImageChange = (e) => {
    setImage(e.target.value);
    console.log(e.target.value);
  };

  const [weatherType, setWeatherType] = useState("");
  const handleWeatherTypeChange = (e) => {
    setWeatherType(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    debugger;
    e.preventDefault();

    console.log({ name, image, weatherType });
    handleAddItem({ name, imageUrl: image, weather: weatherType });
    handleCloseModal();
  };

  return (
    <ModalWithForm
      title="New Clothes"
      buttonText="Add Clothes"
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
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="text"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={image}
          onChange={handleImageChange}
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
            onChange={handleWeatherTypeChange}
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
            onChange={handleWeatherTypeChange}
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
            onChange={handleWeatherTypeChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
