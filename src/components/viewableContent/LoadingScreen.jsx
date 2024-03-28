import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";

export function LoadingScreen({ setloadingScreen, isMobileDimensions }) {
  const [fadeOut, setFadeOut] = useState("");
  const { active, progress, errors, total } = useProgress();
  const { isAstroModelDrawn, setRenderModels } = useAppContext();

  const height = window.innerHeight * 0.3;

  useEffect(() => {
    if (isAstroModelDrawn) {
      setTimeout(() => setFadeOut("flashing-fade-out"), 1100);
      setTimeout(() => setloadingScreen(false), 3200);
      setTimeout(() => setRenderModels(true), 800);
    }
  }, [isAstroModelDrawn]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // document.body.style.overflow = "auto";
  }, []);

  return (
    <div className={`flashing-div ${fadeOut}`}>
      <img
        className="flashing-img"
        style={{
          // border: "1px solid black",
          height: height,
          width: height + 300,
          borderRadius: "50%",
        }}
        src="/assets/images/in3dlogo.png"
      />
      <span style={{ color: "black", fontSize: "3em" }}>
        {progress < 100 && !isAstroModelDrawn
          ? `${Math.trunc(progress)} % loaded`
          : null}
      </span>
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
