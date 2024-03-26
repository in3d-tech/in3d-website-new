import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";

export function LoadingScreen({ setloadingScreen }) {
  const [fadeOut, setFadeOut] = useState("");
  const { active, progress, errors, total } = useProgress();
  const { isAstroModelDrawn } = useAppContext();
  const height = window.innerHeight * 0.3;
  useEffect(() => {
    if (progress < 100) {
      return;
    }
    if (progress >= 100) {
      // setTimeout(() => setloadingScreen(false), 3000);
    }
  }, [progress]);

  useEffect(() => {
    if (isAstroModelDrawn) {
      setFadeOut("flashing-fade-out");
      setTimeout(() => setloadingScreen(false), 3000);
    }
  }, [isAstroModelDrawn]);

  return (
    <div className={`flashing-div ${fadeOut}`} style={{}}>
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
        {progress < 100 ? `${Math.trunc(progress)} % loaded` : null}
      </span>
    </div>
  );
}

export const LoaderComponent = () => {
  return (
    <span style={{ color: "black", fontSize: "1.5em", fontFamily: "gotham" }}>
      {progress < 100 ? `${Math.trunc(progress)} % loaded` : null}
    </span>
  );
};
