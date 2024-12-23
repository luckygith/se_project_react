import React from "react";

function Switch() {
  return (
    <>
      <input
        className="react-switch-checkbox"
        id={`react-switch-type`}
        type="checkbox"
      />
      <label className="react-switch-label" htmlFor={`react-switch-new`}>
        <span className={`react-switch-button`} />
      </label>
    </>
  );
}

export default Switch;
