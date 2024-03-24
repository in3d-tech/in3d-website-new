import { useProgress } from "@react-three/drei";
import { useEffect } from "react";

export function LoadingScreen({ setloadingScreen }) {
  const { active, progress, errors, total } = useProgress();
  const height = window.innerHeight * 0.3;
  useEffect(() => {
    console.log("from loading screen: ", progress);
    if (progress < 100) {
      return;
    }
    if (progress >= 100) {
      setTimeout(() => setloadingScreen(false), 3000);
    }
  }, [progress]);

  return (
    <div
      className="flashing-div"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
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
