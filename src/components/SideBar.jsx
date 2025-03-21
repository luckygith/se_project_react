import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import avatar from "../assets/avatar.svg";
import "../blocks/SideBar.css";

function SideBar({ handleEditProfile, handleLogOut }) {
  const currentUser = useContext(CurrentUserContext); // Use context here
  console.log(currentUser);
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser.avatar}
        alt="Default avatar"
      />
      <p className="sidebar__username">{currentUser.name}</p>
      <div className="sidebar__buttons">
        <button
          onClick={handleEditProfile}
          type="button"
          className="sidebar__edit-profile"
        >
          Change Profile Data
        </button>
        <button
          onClick={handleLogOut}
          type="button"
          className="sidebar__log-out"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
