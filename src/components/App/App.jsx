import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import ItemModal from "./ItemModal/ItemModal";
import Footer from "./Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";
import AddItemModal from "../../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";

function App({ children }) {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
    isDay: true,
    condition: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("C");

  const handleAddClick = (e) => {
    e.preventDefault();
    setActiveModal("add-garment");
    console.log(e.target);
    console.log("HANDLEADDCLICK CONST");
  };

  const handleCloseModal = () => {
    setActiveModal("");
    console.log("HANDLE COSE MODAL BUTTON ON");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
    console.log("HandleCardClick");
    console.log(card);
  };

  useEffect(() => {
    console.log("Active Modal:", activeModal);
  }, [activeModal]);

  const handleToggleSwitchChange = (e) => {
    currentTempUnit === "F" ? setCurrentTempUnit("C") : setCurrentTempUnit("F");
  };

  const onAddItem = (e, values) => {
    e.preventDefault();
    console.log("ONADD ITEM ON");
    console.log(values);
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
        // console.log(filteredData.temp);
        console.log("useEFFECTWORKING");
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/main"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={<Profile handleCardClick={handleCardClick} />}
            />
            <Route path="*" element={<p>PAGE NOT FOUND</p>} />
          </Routes>
          <Footer />
        </div>

        {activeModal === "add-garment" && (
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
            handleCloseModal={handleCloseModal}
          />
        )}

        {activeModal === "preview" && (
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            handleCloseModal={handleCloseModal}
            onClick={handleCardClick}
          />
        )}
      </CurrentTempUnitContext.Provider>
    </div>
  );
}

export default App;
