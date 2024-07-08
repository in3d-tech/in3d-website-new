import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
import { useState, useEffect } from "react";

export function Swipe({
  setSlide,
  setMobileBackground,
  setDebug,
  position,
  setPosition,
}) {
  return (
    <div
      // className="swiper"
      style={{
        position: "fixed",
        // border: "1px solid yellow",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        zIndex: 1,
      }}
    >
      {/* <div style={{ color: "yellow", position: "absolute" }}>{debug} </div> */}
      {/* <TiltDiv
        setDebug={setDebug}
        position={position}
        setPosition={setPosition}
      /> */}
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={(e) => {
          console.log("slide change", e.realIndex);
          setSlide(e.realIndex);
          if (e.realIndex > 1) setMobileBackground(e.realIndex - 1);
        }}
        onSwiper={(swiper) => console.log(swiper)}
        style={{ height: "100%" }}
      >
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
      </Swiper>
    </div>
  );
}

export const TiltDiv = ({ setDebug, onTiltChange, position, setPosition }) => {
  const [hasUserSeenPopup, setHasUserSeenPopup] = useState(false);
  const {
    orientation: { beta, gamma },
    permission,
    requestPermission,
  } = useDeviceOrientation(onTiltChange);

  useEffect(() => {
    if (!hasUserSeenPopup) {
      requestPermission();
      setHasUserSeenPopup(true);
    }
  }, []);

  useEffect(() => {
    if (beta !== null && gamma !== null && permission === "granted") {
      const maxGamma = 45;
      let normalizedGamma =
        Math.min(maxGamma, Math.max(-maxGamma, gamma)) / maxGamma;
      normalizedGamma = -normalizedGamma;

      // Set position state based on gamma value
      setPosition({
        x: normalizedGamma * 50,
      });

      setDebug(`x: ${normalizedGamma * 50}`);
    }
  }, [beta, gamma, permission, setDebug, setPosition]);

  const handleRetry = () => {
    window.location.reload(); // Simple retry by reloading the page
  };

  return (
    <div>
      {permission === "default" && (
        <button
          style={{
            zIndex: 500,
            position: "absolute",
            left: "2em",
            top: "14em",
            opacity: 0.4,
          }}
          onClick={requestPermission}
        >
          Enable D.O.
        </button>
      )}
      {permission === "denied" && (
        <button
          style={{
            zIndex: 500,
            position: "absolute",
            left: "2em",
            top: "14em",
            opacity: 0.4,
          }}
          onClick={requestPermission}
        >
          Enable D.O.
        </button>
      )}
    </div>
  );
};
const useDeviceOrientation = (onOrientationChange) => {
  const [orientation, setOrientation] = useState({
    alpha: null,
    beta: null,
    gamma: null,
  });
  const [initialOrientation, setInitialOrientation] = useState(null);
  const [permission, setPermission] = useState("default");

  const handleOrientation = (event) => {
    let { alpha, beta, gamma } = event;

    // Set initial orientation if not already set
    if (!initialOrientation) {
      setInitialOrientation({ alpha, beta, gamma });
      return;
    }

    // Normalize values relative to the initial orientation
    beta -= initialOrientation.beta;
    gamma -= initialOrientation.gamma;

    setOrientation({ alpha, beta, gamma });
    if (onOrientationChange) {
      onOrientationChange({ alpha, beta, gamma });
    }
  };

  const requestPermission = async () => {
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      try {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === "granted") {
          setPermission("granted");
          window.addEventListener("deviceorientation", handleOrientation, true);
        } else {
          setPermission("denied");
        }
      } catch (error) {
        setPermission("denied");
      }
    } else {
      setPermission("granted");
      window.addEventListener("deviceorientation", handleOrientation, true);
    }
  };

  useEffect(() => {
    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, []);

  return { orientation, permission, requestPermission };
};
