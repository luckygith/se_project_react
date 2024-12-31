import avatar from "../../assets/avatar.svg";
import "../Profile/SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
      <p className="sidebar__username">User Name</p>
    </div>
  );
}

export default SideBar;
