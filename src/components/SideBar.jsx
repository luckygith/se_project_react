import avatar from "../assets/avatar.svg";
import "../blocks/SideBar.css";
import { useContext } from "react";

function SideBar(
  userData = { name: "Username here", email: "Email here", avatarUrl: "" }
) {
  const { name, email } = userData;

  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
      <p className="sidebar__username">{name}</p>
    </div>
  );
}

export default SideBar;
