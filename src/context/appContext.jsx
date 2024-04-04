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
  const [isAstroModelDrawn, setIsAstroModelDrawn] = useState(false);
  const [renderModels, setRenderModels] = useState(false);
  const [mobileBackground, setMobileBackground] = useState(1);
  const [titleOnMainPageHovered, setTitleOnMainPageHovered] = useState("");

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
        isAstroModelDrawn,
        setIsAstroModelDrawn,
        renderModels,
        setRenderModels,
        mobileBackground,
        setMobileBackground,
        titleOnMainPageHovered,
        setTitleOnMainPageHovered,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    console.log("Error with a Context");
    return {
      scrollArea: {},
      setScrollArea: () => {},
      selectedCategory: null,
      setSelectedCategory: () => {},
      menuOpened: false,
      setMenuOpened: () => {},
      isInstantScroll: false,
      setIsInstantScroll: () => {},
      isAstroModelDrawn: false,
      setIsAstroModelDrawn: () => {},
      renderModels: false,
      setRenderModels: () => {},
      mobileBackground: null,
      setMobileBackground: () => {},
      titleOnMainPageHovered: null,
      setTitleOnMainPageHovered: () => {},
    };
  }

  return context;
}
