import { Sparkles } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { Canvas } from "@react-three/fiber";
import { TextScrambleComponent } from "../common/shuffleTexts";
// import { useGLTFAnimations } from "../scene/ModelComponent";
// import * as THREE from "three";

export function LoadingScreen({ setShowloadingScreen, isMobileViewOnly }) {
  const [fadeOut, setFadeOut] = useState("");
  const { isAstroModelDrawn, setRenderModels, customizeHasRendered } =
    useAppContext();
  const [has4SecondsPassed, setHas4SecondsPassed] = useState(false);
  const [animationActive, setAnimationActive] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const [sparklesColorIndex, setSparklesColorIndex] = useState(0);

  const height = window.innerHeight * 0.3;

  if (!has4SecondsPassed) {
    setTimeout(() => setHas4SecondsPassed(true), 4000);
  }

  useEffect(() => {
    // return;
    if (!has4SecondsPassed) {
      return;
    }
    // if (isMobileViewOnly && showLoading) {
    if (isAstroModelDrawn && isMobileViewOnly) {
      const loadingScreen = setTimeout(() => setShowloadingScreen(false), 2000);
      const showLoad = setTimeout(() => setShowLoading(false), 2000);
      document.body.style.overflowY = "auto";
      return () => {
        clearTimeout(loadingScreen);
        clearTimeout(showLoad);
      };
    }

    if (isAstroModelDrawn && !isMobileViewOnly) {
      const renderModels = setTimeout(() => setRenderModels(true), 1000);

      if (customizeHasRendered) {
        const fadeOut = setTimeout(() => {
          setFadeOut("flashing-fade-out");
          document.body.style.overflowY = "auto";
        }, 100);
        const closeLoadingScreen = setTimeout(
          () => setShowloadingScreen(false),
          2200
        );
        return () => {
          // clearTimeout(loadingText);
          clearTimeout(fadeOut);
          clearTimeout(closeLoadingScreen);
        };
      }

      return () => {
        clearTimeout(renderModels);
      };
    }
  }, [isAstroModelDrawn, customizeHasRendered, has4SecondsPassed]);

  const sparklesColours = [
    "#0DA888", //"#CF9FFF",
    "#3DE9D9",
    "#CF9FFF",
    "#995812",
    "#3DE7E9",
    "#467B3F",
    "#F0CF5E",
  ];

  useEffect(() => {
    // Color switching interval
    const colorSwitchInterval = setInterval(() => {
      setSparklesColorIndex(
        (prevIndex) => (prevIndex + 1) % sparklesColours.length
      );
    }, 4000);

    // Clear interval on component unmount
    return () => clearInterval(colorSwitchInterval);
  }, []);

  return (
    <div className={`flashing-div ${fadeOut}`}>
      <div className="scale-effect"></div>
      <div
        style={{
          // border: "1px solid cyan",
          borderRadius: "50%",
          height: "400px",
          width: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          // border: "1px solid red",
        }}
      >
        <Canvas
          style={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
          }}
        >
          <ambientLight intensity={2} />
          <Suspense fallback={null}>
            <Sparkles
              count={400}
              scale={10}
              size={2.5}
              color={sparklesColours[sparklesColorIndex]}
            />
          </Suspense>
        </Canvas>
        <div
          style={{
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <img
              className="flashing-img"
              style={{
                height: height,
              }}
              src="/assets/images/plain-logo.png"
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100vw",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <span className="abla" style={{ margin: 0 }}>
                Simply{" "}
              </span>
            </div>

            <div style={{ flex: 1 }}>
              <TextScrambleComponent
                colour={sparklesColours[sparklesColorIndex]}
              />
            </div>
          </div>
        </div>

        {/* {!showLoading ? (
          <div
            style={{
              color: "rgb(255,255,255,0.9)",
              width: "70%",
              marginLeft: "2em",
              fontFamily: "swiss-medium",
              marginTop: "18em",
              position: "absolute",
              animation: "text-reveal 2s ease-in-out forwards",
            }}
          >
            Our mobile view is currently under maintenance, but you can access
            our website via desktop or tablet!
          </div>
        ) : (
          <TextScrambleComponent colour={sparklesColours[sparklesColorIndex]} />
        )} */}
      </div>
    </div>
  );
}

// <h1
//   className="loading-header"
//   style={{ color: `${sparklesColours[sparklesColorIndex]}` }}
// >
//   {["l", "o", "a", "d", "i", "n", "g"].map((letter, index) => (
//     <span
//       key={index}
//       className={`loading-span let${
//         animationActive ? index + 1 : ""
//       }`}
//     >
//       {letter}
//     </span>
//   ))}
// </h1>

// export const LoaderComponent = () => {
//   return (
//     <span style={{ color: "black", fontSize: "1.5em", fontFamily: "gotham" }}>
//       {progress < 100 && !isAstroModelDrawn
//         ? `${Math.trunc(progress)} % loaded`
//         : null}
//     </span>
//   );
// };
