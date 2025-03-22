import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";
import "../blocks/Profile.css";
import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Profile({
  handleCardClick,
  handleAddClick,
  clothingItems,
  handleCloseModal,
  handleEditProfileClick,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar handleEditProfileClick={handleEditProfileClick} handleC />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
          clothingItems={clothingItems}
          handleCloseModal={handleCloseModal}
        />
      </section>
    </div>
  );
}

export default Profile;
