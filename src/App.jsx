import React, { useEffect, useState } from "react";
import "./App.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { extend } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { LoadingScreen } from "./components/loadingScreen/LoadingScreen";
import useCheckIsMobileScreen from "./components/common/useCheckIsMobile";
import Cursor from "./components/common/cursor";
import { DesktopView } from "./components/desktop/DesktopView";
import { MobileView } from "./components/mobile/MobileView";
// import { useTranslation } from "react-i18next";
// import { ChangeLanguage } from "./components/navs/ChangeLanguage";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  immediateRender: false,
  ease: "power1.inOut",
});

extend({ PerspectiveCamera: THREE.PerspectiveCamera });

function App() {
  // const {
  //   i18n: { changeLanguage, language },
  // } = useTranslation();
  // const [currentLanguage, setCurrentLanguage] = useState(language);
  const [isMobileViewOnly, setIsMobileViewOnly] = useState(null);
  const [showLoadingScreen, setShowloadingScreen] = useState(true);

  const isMobileDimensions = useCheckIsMobileScreen();

  // document.body.style.cursor = "none";

  useEffect(() => {
    if (isMobileDimensions) {
      setIsMobileViewOnly(true);
    }
  }, []);

  return (
    <>
      {showLoadingScreen ? (
        <LoadingScreen
          setShowloadingScreen={setShowloadingScreen}
          isMobileViewOnly={isMobileViewOnly}
          showLoadingScreen={showLoadingScreen}
        />
      ) : null}

      {isMobileViewOnly ? null : <Cursor />}
      {isMobileViewOnly ? <MobileView /> : <DesktopView />}
      {/* <ChangeLanguage
        setCurrentLanguage={setCurrentLanguage}
        changeLanguage={changeLanguage}
        currentLanguage={currentLanguage}
      /> */}
    </>
  );
}

export default App;

useGLTF.preload("/assets/models/astronaut_new5 (3).glb");
useGLTF.preload("/assets/models/engenir_model.glb");
