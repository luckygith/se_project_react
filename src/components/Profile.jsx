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
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
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
