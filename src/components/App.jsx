import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "../blocks/App.css";
import Header from "./Header";
import Main from "./Main";
import ItemModal from "./ItemModal";
import Footer from "./Footer";
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

function App({ children }) {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
    isDay: true,
    condition: "",
  });

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
    api
      .getClothingItems()
      .then((data) => {
        setClothingItems(data);
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
      .addClothingItem(item.name, item.imageUrl, item.weatherType)
      .then((item) => {
        setNewItem(item.name, item.imageUrl, item.weatherType); // Spread... creates a shallow copy of array for addedItem to be appended to
        setClothingItems([item, ...clothingItems]);
        setIsLoading(false);
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

  const handleAddClick = (e) => {
    e.preventDefault();
    setActiveModal("add-garment");
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
    <div className="page">
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
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
                <Profile
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                  clothingItems={clothingItems}
                  handleCloseModal={handleCloseModal}
                />
              }
            />
            <Route path="*" element={<p>PAGE NOT FOUND</p>} />
          </Routes>
          <Footer />
        </div>

        {activeModal === "add-garment" && (
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            handleAddItem={handleAddItem}
            handleCloseModal={handleCloseModal}
            newItem={newItem}
            setNewItem={setNewItem}
            handleAddItem={handleAddItem}
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
  );
}

export default App;
