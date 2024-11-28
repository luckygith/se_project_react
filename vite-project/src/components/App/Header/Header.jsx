import "./Header.css";
import logo from "../../../assets/avatar.svg";
import avatar from "../../../assets/logo.svg";

function Header({ handleAddClick }) {
  return (
    <header className="header">
      <img src={logo} alt="" className="header__logo" />
      <p className="header__date-location">DATE, LOCATION</p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-button"
      >
        + Add clothes
      </button>

      <div className="header__user-container">
        <p className="header__username">Name</p>
        <img src={avatar} alt="" className="header__username-avatar" />
      </div>
    </header>
  );
}

export default Header;
