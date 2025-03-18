import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { AppContext } from "../contexts/AppContext";
import "../blocks/App.css";

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
  const [userData, setUserData] = useState({ username: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // all logic depends onwhether or not use is logged in

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

    if (!jwt) {
      return;
    }
    api
      .getUserInfo(jwt)
      .then(({ username, email }) => {
        setIsLoggedIn(true);
        setUserData({ username, email });
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    api
      .getClothingItems()
      .then((data) => {
        console.log("Fetched data:", JSON.stringify(data)); // setClothingItems(data);
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
    api
      .addClothingItem(item.name, item.imageUrl, item.weather)
      .then((item) => {
        setNewItem(item.name, item.imageUrl, item.weather, token); // Spread... creates a shallow copy of array for addedItem to be appended to
        setClothingItems([item, ...clothingItems]);
        setIsLoading(false);
        console.log(item);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (_id) => {
    setIsLoading(true);
    api
      .deleteClothingItem(_id)
      .then(() => {
        setClothingItems((clothingItems) =>
          clothingItems.filter((item) => item._id !== _id)
        );
        setIsLoading(false);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setActiveModal("register-user");
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    auth
      .register(name, avatar, email, password)
      .then(console.log("handle reigstration from App.jsx"))
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.jwt) {
          setToken(data.jwt); // save token to local storage!
          setUserData(data.user); // save user's data to state
          setIsLoggedIn(true); // log the user in
        }
      })
      .catch(console.error);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
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
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
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
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      userData={userData}
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      handleCloseModal={handleCloseModal}
                    />
                  </ProtectedRoute>
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
            />
          )}

          {activeModal === "login" && (
            <LoginUserModal
              isOpen={activeModal === "login"}
              handleCloseModal={handleCloseModal}
              handleLogin={handleLogin}
              isLoading={isLoading}
            />
          )}

          {activeModal === "add-clothes" && (
            <ProtectedRoute>
              <AddItemModal
                isOpen={activeModal === "add-clothes"}
                handleAddItem={handleAddItem}
                handleCloseModal={handleCloseModal}
                newItem={newItem}
                setNewItem={setNewItem}
                isLoading={isLoading}
              />
            </ProtectedRoute>
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
    </AppContext.Provider>
  );
}

export default App;
