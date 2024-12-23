import "./Header.css";
import logo from "../../../assets/avatar.svg";
import avatar from "../../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={logo} alt="WTWR logo" className="header__logo" />
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

      <div className="header__user-container">
        <p className="header__username">Name</p>
        <img
          src={avatar}
          alt="user avatar image"
          className="header__username-avatar"
        />
      </div>
    </header>
  );
}

export default Header;
