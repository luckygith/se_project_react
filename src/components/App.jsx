import { useState, useEffect, useContext } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { AppContext } from "../contexts/AppContext";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import "../blocks/App.css";

import { authorize, register } from "../utils/auth";
import Header from "./Header";
import Main from "./Main";
import ItemModal from "./ItemModal";
import Footer from "./Footer";

import ProtectedRoute from "./ProtectedRoute";
import { setToken, getToken, removeToken } from "../utils/token";

import { getWeather, filterWeatherData } from "../utils/weatherApi";
import { coordinates, APIkey } from "../utils/constants";
import { CurrentTempUnitContext } from "../contexts/CurrentTempUnitContext";
import AddItemModal from "./AddItemModal";
import Profile from "./Profile";
import { clothingItems } from "../utils/clothingItems";

import {
  getClothingItems,
  addClothingItem, //called Line 60?
  deleteClothingItem,
  editUserInfo,
  addCardLike,
  removeCardLike, //called Line 83?
} from "../utils/api";

import { api } from "../utils/api";
import RegisterUserModal from "./RegisterUserModal";
import LoginUserModal from "./LoginUserModal";
import EditProfileModal from "./EditProfileModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

function App({ children }) {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
    isDay: true,
    condition: "",
  });

  // STATE VARIABLES
  const [isLoggedIn, setIsLoggedIn] = useState(false); // all logic depends onwhether or not use is logged in
  const [currentUser, setCurrentUser] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("C");
  const [clothingItems, setClothingItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    imageUrl: "",
    weather: "",
    id: "",
  });

  // useEffects

  useEffect(() => {
    const jwt = getToken();

    if (jwt) {
      api
        .getUserInfo(jwt)
        .then(({ name, email, avatar, _id }) => {
          setIsLoggedIn(true);

          setCurrentUser({ name, email, avatar, _id });
          console.log(jwt, name, email, avatar, _id);
        })
        // .then((items) => {
        //   console.log("Fetched items with likes:", items);
        //   setClothingItems(items); // Update clothing items state
        // })
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
    api
      .getClothingItems()
      .then((data) => {
        console.log("getClothing items fetched data:", data); // setClothingItems(data);
        setClothingItems(data); // Update state with the fetched items
      })
      .catch((error) => {
        console.error("Error fetching items: ", error);
      });
  }, []);

  useEffect(() => {
    console.log("Updated clothingItems:", clothingItems);
  }, [clothingItems]);

  useEffect(() => {
    if (!activeModal) return; // !activemodal=!effect

    const handleEscapeClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    // HANDLERS
    const handleModalBackgroundClick = (e) => {
      if (e.target.classList.contains("modal_opened")) {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscapeClose);
    document.addEventListener("click", handleModalBackgroundClick);

    //cleanup function after code listener poop
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
      document.removeEventListener("click", handleModalBackgroundClick);
    };
  }, [activeModal]);

  // Handlers

  const handleLogOut = (token) => {
    setIsLoggedIn(false);
    setCurrentUser({});
    removeToken(token);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleToggleSwitchChange = (e) => {
    currentTempUnit === "F" ? setCurrentTempUnit("C") : setCurrentTempUnit("F");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  // Handlers with Corresponding Functions

  const handleAddClick = (e) => {
    e.preventDefault();
    setActiveModal("add-clothes");
  };

  const handleAddItem = (item) => {
    setIsLoading(true);
    const jwt = getToken();
    api
      .addClothingItem(item.name, item.imageUrl, item.weather, jwt)
      .then((item) => {
        setNewItem({
          name: item.name,
          imageUrl: item.imageUrl,
          weather: item.weather,
        });
        // setNewItem(item.name, item.imageUrl, item.weather, jwt); // Spread... creates a shallow copy of array for addedItem to be appended to
        setClothingItems([item, ...clothingItems]); // updating state with new item
        setIsLoading(false);
        console.log(item);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleConfirmDeleteClick = () => {
    setActiveModal("confirm-delete");
  };

  const handleDeleteItem = (_id) => {
    setIsLoading(true);
    const jwt = getToken();
    api
      .deleteClothingItem(_id, jwt)
      .then(() => {
        setClothingItems((clothingItems) =>
          clothingItems.filter((item) => item._id !== _id)
        );
        console.log("DELETED ITEM");

        setIsLoading(false);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleRegisterClick = () => {
    setActiveModal("register-user");
  };

  const handleRegistration = ({ email, password, name, avatar }) => {
    setIsLoading(true);
    if (!email || !password || !name || !avatar) {
      return;
    }
    const jwt = setToken();
    register(email, password, name, avatar, jwt)
      .then((data) => {
        if (data) {
          console.log("handle registration App.jsx activated", data);
          console.log("REGISTERING WORKING");

          setCurrentUser(data);

          setIsLoggedIn(true);
          handleCloseModal();
        }
      })

      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      console.log("missing info");
      return;
    }
    const token = getToken();
    authorize(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token); // Save token to local storage
          console.log(data);
          // Fetch the user information using the token
          return api.getUserInfo(data.token);
        }
        throw new Error("JWT not received");
      })
      .then(({ name, email, avatar, _id }) => {
        // Set the current user with the fetched data
        setCurrentUser({ name, email, avatar, _id });
        setIsLoggedIn(true);
        console.log("User data fetched:", { name, email, avatar, _id });
        console.log("LOGGED IN WORKING");

        handleCloseModal();
      })

      .catch(console.error);
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleEditProfile = ({ name, avatar }) => {
    const token = getToken();
    editUserInfo(name, avatar, token).then((data) => {
      if (data.token) {
        console.log(name, avatar);
        console.log("EDIT PROFILE WORKING");
        setCurrentUser(data);
        setIsLoggedIn(true);
      }
      handleCloseModal();
    });
  };

  const handleCardLike = ({ _id, isLiked }) => {
    // const token = localStorage.getItem("jwt");
    const jwt = getToken();
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        api
          // the first argument is the card's id
          .addCardLike(_id, jwt)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item))
            );
            // setIsLiked(true);
          })
          .catch((err) =>
            console.log("Unsuccessful request to like item:", err)
          )
      : // if not, send a request to remove the user's id from the card's likes array
        api
          // the first argument is the card's id
          .removeCardLike(_id, jwt)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item))
            );
            // setIsLiked(false);
          })
          .catch((err) =>
            console.log("Unsuccessful request to unlike item:", err)
          );
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTempUnitContext.Provider
          value={{ currentTempUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
              handleAddClick={handleAddClick}
              handleAddItem={handleAddItem}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  // <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    handleAddClick={handleAddClick}
                    clothingItems={clothingItems}
                    handleCloseModal={handleCloseModal}
                    handleEditProfileClick={handleEditProfileClick}
                    handleLogOut={handleLogOut}
                    onCardLike={handleCardLike}
                  />
                  // </ProtectedRoute>
                }
              />

              <Route
                path="*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/" replace />
                  ) : (
                    <p>PAGE NOT FOUND</p>
                  )
                }
              />
            </Routes>
            <Footer />
          </div>

          {activeModal === "register-user" && (
            <RegisterUserModal
              isOpen={activeModal === "register-user"}
              handleCloseModal={handleCloseModal}
              handleRegistration={handleRegistration}
              isLoading={isLoading}
              handleLoginClick={handleLoginClick}
            />
          )}

          {activeModal === "login" && (
            <LoginUserModal
              isOpen={activeModal === "login"}
              handleCloseModal={handleCloseModal}
              handleLogin={handleLogin}
              isLoading={isLoading}
              handleRegisterClick={handleRegisterClick}
            />
          )}

          {activeModal === "add-clothes" && (
            <AddItemModal
              isOpen={activeModal === "add-clothes"}
              handleAddItem={handleAddItem}
              handleCloseModal={handleCloseModal}
              newItem={newItem}
              setNewItem={setNewItem}
              isLoading={isLoading}
            />
          )}

          {activeModal === "preview" && (
            <ItemModal
              isOpen={activeModal === "preview"}
              card={selectedCard}
              handleCloseModal={handleCloseModal}
              handleCardClick={handleCardClick}
              handleConfirmDeleteClick={handleConfirmDeleteClick}
            />
          )}

          {activeModal === "edit-profile" && (
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              handleCloseModal={handleCloseModal}
              handleCardClick={handleCardClick}
              handleEditProfile={handleEditProfile}
            />
          )}

          {activeModal === "confirm-delete" && (
            <ConfirmDeleteModal
              isOpen={activeModal === "confirm-delete"}
              handleCloseModal={handleCloseModal}
              handleCardClick={handleCardClick}
              handleDeleteItem={handleDeleteItem}
              handleConfirmDeleteModal={handleConfirmDeleteClick}
              card={selectedCard}
            />
          )}
        </CurrentTempUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
