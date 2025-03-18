import avatar from "../assets/avatar.svg";
import "../blocks/SideBar.css";
import { useContext } from "react";

function SideBar(
  userData = { username: "Username here", email: "Email here" }
) {
  const { username, email } = userData;

  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatarUrl} alt="Default avatar" />
      <p className="sidebar__username">{username}</p>
    </div>
  );
}

export default SideBar;
