import React, { useContext, useState } from "react";

import "../blocks/ToggleSwitch.css";

import { CurrentTempUnitContext } from "../contexts/CurrentTempUnitContext";
const ToggleSwitch = (e) => {
  const { currentTempUnit, handleToggleSwitchChange } = useContext(
    CurrentTempUnitContext
  );

  return (
    <label className="switch-label" htmlFor={`react-switch-new`}>
      <input
        className="switch__box"
        id={`switch-type`}
        type="checkbox"
        onChange={handleToggleSwitchChange}
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
