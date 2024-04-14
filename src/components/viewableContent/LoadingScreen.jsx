import { Sparkles, useGLTF, useProgress } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { Canvas } from "@react-three/fiber";
// import { useGLTFAnimations } from "../scene/ModelComponent";
// import * as THREE from "three";

export function LoadingScreen({ setShowloadingScreen, isMobileViewOnly }) {
  const [fadeOut, setFadeOut] = useState("");
  const { isAstroModelDrawn, setRenderModels, customizeHasRendered } =
    useAppContext();
  const [animationActive, setAnimationActive] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const [sparklesColorIndex, setSparklesColorIndex] = useState(0);

  const height = window.innerHeight * 0.3;

  useEffect(() => {
    // return;
    if (isMobileViewOnly && showLoading) {
      console.log("wassssup");
      setTimeout(() => setShowLoading(false), 2000);
    }

    if (isAstroModelDrawn && !isMobileViewOnly) {
      const renderModels = setTimeout(() => setRenderModels(true), 800);

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
  }, [isAstroModelDrawn, customizeHasRendered]);

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
    }, 3000);

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
              count={500}
              scale={10}
              size={2.5}
              color={sparklesColours[sparklesColorIndex]}
            />
          </Suspense>
        </Canvas>
        <img
          className="flashing-img"
          style={{
            height: height,
          }}
          src="/assets/images/in3d-logo-white.png"
        />

        {!showLoading ? (
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
          <h1 className="loading-header">
            {["l", "o", "a", "d", "i", "n", "g"].map((letter, index) => (
              <span
                key={index}
                className={`loading-span let${
                  animationActive ? index + 1 : ""
                }`}
              >
                {letter}
              </span>
            ))}
          </h1>
        )}
      </div>
    </div>
  );
}

// export const LoaderComponent = () => {
//   return (
//     <span style={{ color: "black", fontSize: "1.5em", fontFamily: "gotham" }}>
//       {progress < 100 && !isAstroModelDrawn
//         ? `${Math.trunc(progress)} % loaded`
//         : null}
//     </span>
//   );
// };
