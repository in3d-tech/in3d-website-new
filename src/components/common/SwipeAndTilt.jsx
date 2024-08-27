import { useState, useEffect } from "react";

export const TiltDiv = ({ setDebug, onTiltChange, position, setPosition }) => {
  const [hasUserSeenPopup, setHasUserSeenPopup] = useState(false);
  const {
    orientation: { beta, gamma },
    permission,
    requestPermission,
  } = useDeviceOrientation(onTiltChange);

  // Setup event listeners for user interactions to request permission
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!hasUserSeenPopup) {
        requestPermission();
        setHasUserSeenPopup(true);
        // Clean up interaction listeners after first interaction
        document.removeEventListener("scroll", handleUserInteraction);
        document.removeEventListener("touchstart", handleUserInteraction);
      }
    };

    document.addEventListener("scroll", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);

    // Clean up interaction listeners on unmount
    return () => {
      document.removeEventListener("scroll", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [hasUserSeenPopup]);

  // Handle device orientation change
  useEffect(() => {
    if (beta !== null && gamma !== null && permission === "granted") {
      const maxGamma = 45;
      let normalizedGamma =
        Math.min(maxGamma, Math.max(-maxGamma, gamma)) / maxGamma;
      normalizedGamma = -normalizedGamma;

      // Set position state based on gamma value
      setPosition({ x: normalizedGamma * 50 });

      setDebug(`x: ${normalizedGamma * 50}`);
    }
  }, [beta, gamma, permission, setDebug, setPosition]);

  return (
    <div>
      {permission === "default" || permission === "denied" ? (
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
      ) : null}
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
    } else {
      // Normalize values relative to the initial orientation
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
        confirm(`${response}`); // Optional: for debugging
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
