import { useState, useEffect } from "react";

export const TiltDiv = ({ setDebug, onTiltChange, position, setPosition }) => {
  const [hasUserSeenPopup, setHasUserSeenPopup] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const {
    orientation: { beta, gamma },
    permission,
    requestPermission,
  } = useDeviceOrientation(onTiltChange, setCustomMessage);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (!hasUserSeenPopup) {
        requestPermission();
        setHasUserSeenPopup(true);
        document.removeEventListener("scroll", handleUserInteraction);
        document.removeEventListener("touchstart", handleUserInteraction);
      }
    };

    document.addEventListener("scroll", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);

    return () => {
      document.removeEventListener("scroll", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [hasUserSeenPopup, requestPermission]);

  useEffect(() => {
    if (beta !== null && gamma !== null && permission === "granted") {
      const maxGamma = 45;
      let normalizedGamma =
        Math.min(maxGamma, Math.max(-maxGamma, gamma)) / maxGamma;
      normalizedGamma = -normalizedGamma;

      setPosition({ x: normalizedGamma * 50 });
      setDebug(`x: ${normalizedGamma * 50}`);
    }
  }, [beta, gamma, permission, setDebug, setPosition]);

  return (
    <div>
      {/* {customMessage && (
        <div className="custom-message">
          {customMessage}
          <button onClick={() => setCustomMessage("")}>Close</button>
        </div>
      )} */}
      {permission === "default" || permission === "denied" ? (
        <button
          style={{
            zIndex: 500,
            position: "absolute",
            left: "2em",
            top: "14em",
            opacity: 0,
          }}
          onClick={requestPermission}
        >
          Enable D.O.
        </button>
      ) : null}
    </div>
  );
};

const useDeviceOrientation = (onOrientationChange, setCustomMessage) => {
  const [orientation, setOrientation] = useState({
    alpha: null,
    beta: null,
    gamma: null,
  });
  const [initialOrientation, setInitialOrientation] = useState(null);
  const [permission, setPermission] = useState("default");

  const handleOrientation = (event) => {
    let { alpha, beta, gamma } = event;

    if (!initialOrientation) {
      setInitialOrientation({ alpha, beta, gamma });
    } else {
      beta -= initialOrientation.beta;
      gamma -= initialOrientation.gamma;
    }

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
          setCustomMessage(
            "in3D would like to request access to device orientation"
          );
        } else {
          setPermission("denied");
          setCustomMessage("Device Orientation Access Denied.");
        }
      } catch (error) {
        setPermission("denied");
        setCustomMessage("Device Orientation Access Denied.");
      }
    } else {
      setPermission("granted");
      window.addEventListener("deviceorientation", handleOrientation, true);
      setCustomMessage("in3D would like access to device orientation");
    }
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, []);

  return { orientation, permission, requestPermission };
};
