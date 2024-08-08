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
  const [modelAnimationIsHalfWay, setModelAnimationIsHalfWay] = useState(null);
  const [customizeHasRendered, setCustomizeHasRendered] = useState(false);
  const [menuOpenMobile, setMenuOpenMobile] = useState(false);
  const [selectedMenuActionMobile, setSelectedMenuActionMobile] =
    useState(null);
  const [isCursorHovering, setIsCursorHovering] = useState(false);
  // const [isSectionTwo, setIsSectionTwo] = useState(fal)

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
        modelAnimationIsHalfWay,
        setModelAnimationIsHalfWay,
        customizeHasRendered,
        setCustomizeHasRendered,
        selectedMenuActionMobile,
        setSelectedMenuActionMobile,
        menuOpenMobile,
        setMenuOpenMobile,
        isCursorHovering,
        setIsCursorHovering,
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
      modelAnimationIsHalfWay: null,
      setModelAnimationIsHalfWay: () => {},
      customizeHasRendered: null,
      setCustomizeHasRendered: () => {},
      selectedMenuActionMobile: null,
      setSelectedMenuActionMobile: () => {},
      menuOpenMobile: false,
      setMenuOpenMobile: () => {},
      isCursorHovering: false,
      setIsCursorHovering: () => {},
    };
  }

  return context;
}
