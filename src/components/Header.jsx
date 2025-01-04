import "../blocks/Header.css";
import logo from "../assets/logo.svg";

import avatar from "../assets/avatar.svg";
import ToggleSwitch from "./ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

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

      <Link className="header__link" to="/profile">
        <div className="header__user-container">
          <p className="header__username">Name</p>
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
