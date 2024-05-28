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
// import { useTranslation } from "react-i18next";

// import { ChangeLanguage } from "./components/navs/ChangeLanguage";

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

// in3D works according to international quality policies in development and production, information security and privacy security – ISO9001, ISO27001, ISO27701. The company undertakes and complies with legal and privacy requirements, engraves on its banner a high standard of service assembly,  while maintaining accuracy, confidentiality and information security.

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

  return (
    <>
      {/* <Cursor /> */}
      {showLoadingScreen ? (
        <LoadingScreen
          setShowloadingScreen={setShowloadingScreen}
          isMobileViewOnly={isMobileViewOnly}
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
              <ViewableContent />
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

function ViewableContent() {
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
      <div
        style={{
          // borderRight: "1px solid rgb(255,255,255,0.4)",
          backgroundColor: "rgb(0,0,0,0.2)",
          height: "100%",
          width: "0.6em",
          marginLeft: "1em",
          display: "flex",
          position: "absolute",
          flexDirection: "column",
          // justifyContent: "space-evenly",
          zIndex: 1,
        }}
      >
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

// function Cursor() {
//   const cursorDotOutline = React.useRef();
//   const cursorDot = React.useRef();
//   const requestRef = React.useRef();
//   const previousTimeRef = React.useRef();
//   let [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
//   const [width, setWidth] = React.useState(window.innerWidth);
//   const [height, setHeight] = React.useState(window.innerHeight);
//   let cursorVisible = React.useState(false);
//   let cursorEnlarged = React.useState(false);

//   /**
//    * Mouse Moves
//    */
//   const onMouseMove = (event) => {
//     const { pageX: x, pageY: y } = event;
//     setMousePosition({ x, y });
//     positionDot(event);
//   };
//   const onMouseEnter = () => {
//     cursorVisible.current = true;
//     toggleCursorVisibility();
//   };
//   const onMouseLeave = () => {
//     cursorVisible.current = false;
//     toggleCursorVisibility();
//   };
//   const onMouseDown = () => {
//     cursorEnlarged.current = true;
//     toggleCursorSize();
//   };
//   const onMouseUp = () => {
//     cursorEnlarged.current = false;
//     toggleCursorSize();
//   };
//   const onResize = (event) => {
//     setWidth(window.innerWidth);
//     setHeight(window.innerHeight);
//   };

//   /**
//    * Hooks
//    */
//   React.useEffect(() => {
//     document.addEventListener("mousemove", onMouseMove);
//     document.addEventListener("mouseenter", onMouseEnter);
//     document.addEventListener("mouseleave", onMouseLeave);
//     document.addEventListener("mousedown", onMouseDown);
//     document.addEventListener("mouseup", onMouseUp);
//     window.addEventListener("resize", onResize);
//     requestRef.current = requestAnimationFrame(animateDotOutline);

//     // Handle Link Hovers
//     handleLinkHovers();

//     return () => {
//       document.removeEventListener("mousemove", onMouseMove);
//       document.removeEventListener("mouseenter", onMouseEnter);
//       document.removeEventListener("mouseleave", onMouseLeave);
//       document.removeEventListener("mousedown", onMouseDown);
//       document.removeEventListener("mouseup", onMouseUp);
//       window.removeEventListener("resize", onResize);
//       cancelAnimationFrame(requestRef.current);
//     };
//   }, []);

//   let { x, y } = mousePosition;
//   const winDimensions = { width, height };
//   let endX = winDimensions.width / 2;
//   let endY = winDimensions.height / 2;

//   /**
//    * Position Dot (cursor)
//    * @param {event}
//    */
//   function positionDot(e) {
//     cursorVisible.current = true;
//     toggleCursorVisibility();
//     // Position the dot
//     endX = e.pageX;
//     endY = e.pageY;
//     cursorDot.current.style.top = endY + "px";
//     cursorDot.current.style.left = endX + "px";
//   }

//   /**
//    * Toggle Cursor Visiblity
//    */
//   function toggleCursorVisibility() {
//     if (cursorVisible.current) {
//       cursorDot.current.style.opacity = 1;
//       cursorDotOutline.current.style.opacity = 1;
//     } else {
//       cursorDot.current.style.opacity = 0;
//       cursorDotOutline.current.style.opacity = 0;
//     }
//   }

//   /**
//    * Toggle Cursor Size
//    */
//   function toggleCursorSize() {
//     if (cursorEnlarged.current) {
//       cursorDot.current.style.transform = "translate(-50%, -50%) scale(0.7)";
//       cursorDotOutline.current.style.transform =
//         "translate(-50%, -50%) scale(5)";
//     } else {
//       cursorDot.current.style.transform = "translate(-50%, -50%) scale(1)";
//       cursorDotOutline.current.style.transform =
//         "translate(-50%, -50%) scale(1)";
//     }
//   }

//   /**
//    * Handle LInks
//    * Applies mouseover/out hooks on all links
//    * to trigger cursor animation
//    */
//   function handleLinkHovers() {
//     document.querySelectorAll("a").forEach((el) => {
//       el.addEventListener("mouseover", () => {
//         cursorEnlarged.current = true;
//         toggleCursorSize();
//       });
//       el.addEventListener("mouseout", () => {
//         cursorEnlarged.current = false;
//         toggleCursorSize();
//       });
//     });
//   }

//   /**
//    * Animate Dot Outline
//    * Aniamtes cursor outline with trailing effect.
//    * @param {number} time
//    */
//   const animateDotOutline = (time) => {
//     if (previousTimeRef.current !== undefined) {
//       x += (endX - x) / 8;
//       y += (endY - y) / 8;
//       cursorDotOutline.current.style.top = y + "px";
//       cursorDotOutline.current.style.left = x + "px";
//     }
//     previousTimeRef.current = time;
//     requestRef.current = requestAnimationFrame(animateDotOutline);
//   };

//   return (
//     <>
//       <div ref={cursorDotOutline} id="cursor-dot-outline" />
//       <div ref={cursorDot} id="cursor-dot" />
//     </>
//   );
// }
