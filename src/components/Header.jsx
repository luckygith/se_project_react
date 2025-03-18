import "../blocks/Header.css";
import logo from "../assets/logo.svg";

import avatar from "../assets/avatar.svg";
import ToggleSwitch from "./ToggleSwitch";
import { Link } from "react-router-dom";

function Header({
  handleAddClick,
  handleLoginClick,
  handleRegisterClick,
  weatherData,
  userData = { name: "Username here" },
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { name } = userData;
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="WTWR logo" className="header__logo" />
      </Link>
      <p className="header__date-location">
        {currentDate}, {weatherData.city},
      </p>
      <div className="header__toggle">
        <ToggleSwitch />
      </div>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-button"
      >
        + Add clothes
      </button>
      <button
        onClick={handleLoginClick}
        type="button"
        className="header__login-button"
      >
        Login
      </button>
      <button
        onClick={handleRegisterClick}
        type="button"
        className="header__sign-up-button"
      >
        Sign Up
      </button>

      {/* <Link className="header__link">
        <div className="header__anonymous-user-container">
          <p className="header__login-button">Login</p>
        </div>
      </Link> */}
      {/* <Link className="header__link">
        <div className="header__anonymous-user-container">
          <p className="header__sign-up-button">Sign Up</p>
        </div>
      </Link> */}
      <Link className="header__link" to="/profile">
        <div className="header__user-container">
          <p className="header__username">{name}</p>
          <img
            src={avatar}
            alt="user avatar image"
            className="header__username-avatar"
          />
        </div>
      </Link>
    </header>
  );
}

export default Header;
