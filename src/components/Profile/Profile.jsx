import SideBar from "./SideBar";

function Profile() {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-section"></section>
    </div>
  );
}

export default Profile;
