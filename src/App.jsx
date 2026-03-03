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
import LenisProvider from "./LenisProvider";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  immediateRender: false,
  ease: "power1.inOut",
});

extend({ PerspectiveCamera: THREE.PerspectiveCamera });

function App() {
  const [isMobileViewOnly, setIsMobileViewOnly] = useState(null);
  const [showLoadingScreen, setShowloadingScreen] = useState(true);

  const isMobileDimensions = useCheckIsMobileScreen();

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
      {isMobileViewOnly ? (
        <MobileView />
      ) : (
        <LenisProvider>
          <DesktopView />
        </LenisProvider>
      )}
    </>
  );
}

export default App;

useGLTF.preload("/assets/models/astronaut_new5 (3).glb");
useGLTF.preload("/assets/models/engenir_model.glb");
