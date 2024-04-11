import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";

export function LoadingScreen({ setShowloadingScreen }) {
  const [fadeOut, setFadeOut] = useState("");
  const { active, progress, errors, total } = useProgress();
  const { isAstroModelDrawn, setRenderModels, customizeHasRendered } =
    useAppContext();
  const [animationActive, setAnimationActive] = useState(true);

  const height = window.innerHeight * 0.3;

  useEffect(() => {
    if (isAstroModelDrawn) {
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

  return (
    <div className={`flashing-div ${fadeOut}`}>
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
        }}
      >
        <img
          className="flashing-img"
          style={{
            height: height,
            // width: height + 300,
            borderRadius: "50%",
            // border: "1px solid yellow",
          }}
          src="/assets/images/in3dlogo.png"
        />

        <h1 className="loading-header">
          {["l", "o", "a", "d", "i", "n", "g"].map((letter, index) => (
            <span
              key={index}
              className={`loading-span let${animationActive ? index + 1 : ""}`}
              // className={
              //   fadeOut == "flashing-fade-out"
              //     ? "tester"
              //     : `loading-span let${index + 1}`
              // }
            >
              {letter}
            </span>
          ))}
        </h1>
      </div>

      {/* <span style={{ color: "black", fontSize: "3em" }}>
        {progress < 100 && !isAstroModelDrawn
          ? `${Math.trunc(progress)} % loaded`
          : null}
      </span> */}
    </div>
  );
}

export const LoaderComponent = () => {
  return (
    <span style={{ color: "black", fontSize: "1.5em", fontFamily: "gotham" }}>
      {progress < 100 && !isAstroModelDrawn
        ? `${Math.trunc(progress)} % loaded`
        : null}
    </span>
  );
};
