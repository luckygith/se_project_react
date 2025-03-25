import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import avatar from "../assets/avatar.svg";
import "../blocks/SideBar.css";

function SideBar({ handleEditProfileClick, handleLogOut }) {
  const currentUser = useContext(CurrentUserContext); // Use context here
  const isLoggedIn = currentUser && currentUser.name;

  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        <img
          className="sidebar__avatar"
          src={isLoggedIn && currentUser.avatar ? currentUser.avatar : avatar}
          alt="Default avatar"
        />
        {isLoggedIn && <p className="sidebar__username">{currentUser.name}</p>}
      </div>
      <div className="sidebar__buttons">
        {isLoggedIn && (
          <>
            <button
              onClick={handleEditProfileClick}
              type="button"
              className="sidebar__edit-profile sidebar__button"
            >
              Change Profile Data
            </button>
            <button
              onClick={handleLogOut}
              type="button"
              className="sidebar__log-out sidebar__button"
            >
              Log out
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SideBar;
