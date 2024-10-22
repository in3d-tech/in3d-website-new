import React, { Suspense, lazy, useEffect, useState } from "react";
import "./App.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { extend } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { HamburgerMenu } from "./components/navs/HamburgerMenu";
import { LoadingScreen } from "./components/viewableContent/LoadingScreen";
import { useAppContext } from "./context/appContext";
import useCheckIsMobileScreen from "./components/common/useCheckIsMobile";
import { getSparkleColour } from "./components/scene/ornaments/getSparkleColour";
import Cursor from "./components/common/cursor";
// import { useTranslation } from "react-i18next";
// import { ChangeLanguage } from "./components/navs/ChangeLanguage";
// import Tilt from "react-parallax-tilt";

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
  // const {
  //   i18n: { changeLanguage, language },
  // } = useTranslation();
  // const [currentLanguage, setCurrentLanguage] = useState(language);
  const [isMobileViewOnly, setIsMobileViewOnly] = useState(null);
  const [showLoadingScreen, setShowloadingScreen] = useState(true);

  const { selectedCategory, setIsInstantScroll } = useAppContext();
  const isMobileDimensions = useCheckIsMobileScreen();

  // document.body.style.cursor = "none";

  useEffect(() => {
    if (isMobileDimensions) {
      setIsMobileViewOnly(true);
    }
  }, []);

  const scrollToElementById = (idx) => {
    setIsInstantScroll(true);
    const sections = ["Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const element = document.getElementById(`section${sections[idx]}`);

    setTimeout(() => {
      if (element) {
        element.scrollIntoView(); // { behavior: "smooth" }
      }
      setIsInstantScroll(false);
    }, 220);
  };

  if (isMobileDimensions) {
    // console.log(blobLoader);
  }

  return (
    <>
      {isMobileViewOnly ? null : <Cursor />}
      {showLoadingScreen ? (
        <LoadingScreen
          setShowloadingScreen={setShowloadingScreen}
          isMobileViewOnly={isMobileViewOnly}
          showLoadingScreen={showLoadingScreen}
        />
      ) : null}
      {/* <ChangeLanguage
        setCurrentLanguage={setCurrentLanguage}
        changeLanguage={changeLanguage}
        currentLanguage={currentLanguage}
      /> */}
      <div className="app-bg">
        {isMobileViewOnly ? null : (
          <HamburgerMenu isMobileViewOnly={isMobileViewOnly} />
        )}
        <Suspense fallback={null}>
          {selectedCategory && !isMobileViewOnly ? (
            <LazySelectedContent />
          ) : null}
        </Suspense>
      </div>
      <>
        <Suspense fallback={null}>
          {isMobileViewOnly ? (
            <LazyMobileView />
          ) : (
            <>
              <ScrollProgressBar />
              <LazyScene scrollToElementById={scrollToElementById} />
            </>
          )}
        </Suspense>
      </>
    </>
  );
}

export default App;

useGLTF.preload("/assets/models/astronaut_new5 (3).glb");
useGLTF.preload("/assets/models/engenir_model.glb");
// useGLTF.preload("/assets/models/medical_model1 (1).glb");
// useGLTF.preload("/assets/models/costimize_model_v02.glb");

function ScrollProgressBar() {
  const { scrollArea } = useAppContext();

  const sections = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-one",
        start: "top top",
        endTrigger: ".section-ten",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    // Assume ".innerLine" is the class of your inner line
    tl.to(".inner-line", {
      y: () => {
        return (
          window.innerHeight -
          document.querySelector(".inner-line").offsetHeight
        );
      },
      duration: 1,
    });
  }, []);

  return (
    <div className="viewable-content-wrapper">
      <div className="homepage-scroll-bar">
        <div
          style={{
            backgroundColor: getSparkleColour(scrollArea.currentSection),
          }}
          className="inner-line"
        ></div>
      </div>
      <div className="bg-scale-effect"></div>
    </div>
  );
}
