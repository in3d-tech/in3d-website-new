import React, { createContext, useContext, useState } from "react";

export const AppContext = createContext(null);

export default function AppContextProvider({ children }) {
  const [scrollArea, setScrollArea] = useState({
    currentSection: 1,
    prevSection: 0,
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menuOpened, setMenuOpened] = useState(false);
  const [isInstantScroll, setIsInstantScroll] = useState(false);

  return (
    <AppContext.Provider
      value={{
        scrollArea,
        setScrollArea,
        selectedCategory,
        setSelectedCategory,
        menuOpened,
        setMenuOpened,
        isInstantScroll,
        setIsInstantScroll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    console.log(
      "Error with a Context - likely that must be used within AppContextProvider"
    );
    return {
      scrollArea: {},
      setScrollArea: () => {},
      selectedCategory: null,
      setSelectedCategory: () => {},
      menuOpened: false,
      setMenuOpened: () => {},
      isInstantScroll: false,
      setIsInstantScroll: () => {},
    };
  }

  return context;
}
