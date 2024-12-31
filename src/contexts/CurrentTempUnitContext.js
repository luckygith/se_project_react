import React from "react";

const CurrentTempUnitContext = React.createContext({
  currentTempUnit: "",
  handleToggleSwitchChange: () => {
    console.log("lsalal");
  },
});

export { CurrentTempUnitContext };
