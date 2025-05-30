import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";
import "../blocks/Profile.css";

function Profile({
  handleCardClick,
  handleAddClick,
  clothingItems,
  handleCloseModal,
  handleEditProfileClick,
  handleLogOut,
  handleCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleEditProfileClick={handleEditProfileClick}
          handleLogOut={handleLogOut}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
          clothingItems={clothingItems}
          handleCloseModal={handleCloseModal}
          onCardLike={handleCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
