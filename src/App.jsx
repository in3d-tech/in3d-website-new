import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import "./App.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { extend } from "@react-three/fiber";
import { useGLTF, useProgress } from "@react-three/drei";
import * as THREE from "three";
import { Header } from "./components/navs/Menu";
import { LoadingScreen } from "./components/viewableContent/LoadingScreen";
import { useAppContext } from "./context/appContext";
import useCheckIsMobileScreen from "./components/common/useCheckIsMobile";
import { useTranslation } from "react-i18next";
import { ChangeLanguage } from "./components/navs/ChangeLanguage";

const LazySelectedContent = lazy(() =>
  import("./components/viewableContent/SelectedCategoryPage")
);
const LazyMobileView = lazy(() =>
  import("./components/viewableContent/mobile/HomeScreenMobile")
);
const LazyScene = lazy(() => import("./components/scene/Scene"));

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  immediateRender: false,
  ease: "power1.inOut",
});

extend({ PerspectiveCamera: THREE.PerspectiveCamera });

function App() {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [isMobileViewOnly, setIsMobileViewOnly] = useState(null);
  const [loadingScreen, setloadingScreen] = useState(true);
  const [textAnimation, setTextAnimation] = useState(
    "category-title-no-opacity"
  );
  const { selectedCategory, setIsInstantScroll } = useAppContext();

  const textRef = useRef();
  const isMobileDimensions = useCheckIsMobileScreen();

  const scrollToElementById = (idx) => {
    setIsInstantScroll(true);
    const sections = ["Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const element = document.getElementById(`section${sections[idx]}`);

    setTimeout(() => {
      if (element) {
        element.scrollIntoView(); // { behavior: "smooth" }
      }
      setIsInstantScroll(false);
    }, 200);
  };

  return (
    <>
      {loadingScreen ? (
        <LoadingScreen
          setloadingScreen={setloadingScreen}
          isMobileDimensions={isMobileDimensions}
        />
      ) : null}
      <ChangeLanguage
        setCurrentLanguage={setCurrentLanguage}
        changeLanguage={changeLanguage}
        currentLanguage={currentLanguage}
      />
      <div className="app-bg">
        <Header />
        <Suspense fallback={null}>
          {selectedCategory ? <LazySelectedContent /> : null}
        </Suspense>
      </div>
      <>
        {isMobileDimensions ? (
          <Suspense fallback={null}>
            <LazyMobileView />
          </Suspense>
        ) : (
          <>
            <ViewableContent />
            <Suspense fallback={null}>
              <LazyScene
                textRef={textRef}
                textAnimation={textAnimation}
                setTextAnimation={setTextAnimation}
                scrollToElementById={scrollToElementById}
              />
            </Suspense>
          </>
        )}
      </>
    </>
  );
}

export default App;

useGLTF.preload("/assets/models/astronaut_new23.glb");
// useGLTF.preload("/assets/models/engenir_model_new.glb");
// useGLTF.preload("/assets/models/medical_model.glb");
// useGLTF.preload("/assets/models/microsoft_model_new.glb");
// useGLTF.preload("/assets/models/security.glb");
// useGLTF.preload("/assets/models/ai_model.glb");
// useGLTF.preload("/assets/models/military.glb");
// useGLTF.preload("/assets/models/costimize_model_v02.glb");

function ViewableContent() {
  return <div className="viewable-content-wrapper"></div>;
}
