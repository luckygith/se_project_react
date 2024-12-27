import React, { useState } from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = () => {
  const [currentTempUnit, handleToggleSwitchChange] = useState("C");

  const handleChange = (e) => {
    if (currentTempUnit === "C") handleToggleSwitchChange("F");
    if (currentTempUnit === "F") handleToggleSwitchChange("C");
    console.log(currentTempUnit);
    console.log("Toggle switch button working ");
  };

  return (
    <label className="switch-label" htmlFor={`react-switch-new`}>
      <input
        className="switch__box"
        id={`switch-type`}
        type="checkbox"
        onChange={handleChange}
      />
      <span
        className={
          currentTempUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      />
      <p
        className={`switch__temp-F ${
          currentTempUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTempUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
};
export default ToggleSwitch;
