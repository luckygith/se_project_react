import { useState, useEffect } from "react";
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
import { setToken, getToken } from "../utils/token";

import { getWeather, filterWeatherData } from "../utils/weatherApi";
import { coordinates, APIkey } from "../utils/constants";
import { CurrentTempUnitContext } from "../contexts/CurrentTempUnitContext";
import AddItemModal from "./AddItemModal";
import Profile from "./Profile";
import { clothingItems } from "../utils/clothingItems";

import {
  getClothingItems,
  addClothingItem, //called Line 60?
  deleteClothingItem, //called Line 83?
} from "../utils/api";

import { api } from "../utils/api";
import RegisterUserModal from "./RegisterUserModal";
import LoginUserModal from "./LoginUserModal";

function App({ children }) {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
    isDay: true,
    condition: "",
  });

  // STATE VARIABLES
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // all logic depends onwhether or not use is logged in
  const [currentUser, setCurrentUser] = userState({});

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

  useEffect(() => {
    const jwt = getToken();

    if (jwt) {
      api
        .getUserInfo(jwt)
        .then(({ name, email }) => {
          setIsLoggedIn(true);
          setUserData({ name, email });
        })
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
    api
      .getClothingItems()
      .then((data) => {
        console.log("getClothing items fetched data:", data); // setClothingItems(data);
      })
      .catch((error) => {
        console.error("Error fetching items: ", error);
      });
  }, []);

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
        setClothingItems([item, ...clothingItems]);
        setIsLoading(false);
        console.log(item);
        handleCloseModal();
      })
      .catch(console.error);
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
        setIsLoading(false);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleRegisterClick = () => {
    setActiveModal("register-user");
  };

  const handleRegistration = ({ email, password, name, avatarUrl }) => {
    setIsLoading(true);
    const jwt = setToken();
    register(email, password, name, avatarUrl, jwt)
      .then((data) => {
        console.log("handle registration App.jsx activated", data);
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    const jwt = getToken();
    authorize(email, password)
      .then((data) => {
        if (data.jwt) {
          setToken(data.jwt); // save token to local storage!
          setUserData(data.user); // save user's data to state
          setIsLoggedIn(true); // log the user in
        }
      })
      .catch(console.error);
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    setActiveModal("add-clothes");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  // useEffect(
  //   (item) => {
  //     console.log(item);
  //   },
  //   [activeModal]
  // );

  const handleToggleSwitchChange = (e) => {
    currentTempUnit === "F" ? setCurrentTempUnit("C") : setCurrentTempUnit("F");
  };

  //   {
  //   if (currentTempUnit === "C") setCurrentTempUnit("F");
  //   if (currentTempUnit === "F") setCurrentTempUnit("C");
  //   console.log(currentTempUnit);
  // };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getClothingItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider>
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
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  // <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    userData={userData}
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    handleAddClick={handleAddClick}
                    clothingItems={clothingItems}
                    handleCloseModal={handleCloseModal}
                  />
                  // </ProtectedRoute>
                }
              />
              <Route path="*" element={<p>PAGE NOT FOUND</p>} />
              {/* 
            <Route
          path="*"
          element={
            isLoggedIn ? (
              <Navigate to="/ducks" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        /> */}
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
              handleDeleteItem={handleDeleteItem}
            />
          )}
        </CurrentTempUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
