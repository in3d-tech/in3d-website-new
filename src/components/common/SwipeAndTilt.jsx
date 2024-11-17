import { useState, useEffect, useCallback } from "react";

export const DeviceTilt = ({
  setDebug,
  onTiltChange,
  position,
  setPosition,
}) => {
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
        // document.removeEventListener("scroll", handleUserInteraction);
        document.removeEventListener("touchstart", handleUserInteraction);
      }
    };

    // document.addEventListener("scroll", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);

    return () => {
      // document.removeEventListener("scroll", handleUserInteraction);
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

  console.log({ position });

  return (
    <div>
      {/* {customMessage && (
        <div className="custom-message">
          {customMessage}
          <button onClick={() => setCustomMessage("")}>Close</button>
        </div>
      )} */}
      {permission === "default" || permission === "denied" ? (
        <>
          <button
            style={{
              // background: "red",
              width: "100vw",
              height: "100%",
              position: "absolute",
              opacity: 0,
              zIndex: 3,
            }}
            onClick={requestPermission}
          >
            {/* Enable D.O. */}
            {/* {permission === "default"
              ? "is DEFAULT"
              : permission === "denied"
              ? "DENIED BABY"
              : "new Option"} */}
          </button>
          <div
          // style={{
          //   color: "cyan",
          //   fontSize: "2em",
          //   position: "absolute",
          //   top: 0,
          //   left: 0,
          //   bordeR: "1px solid yellow",
          //   zIndex: 5000300,
          //   width: "50vw",
          //   height: "50vh",
          // }}
          >
            {/* INITLIZAED BBY <button onClick={requestPermission}>click me</button> */}
          </div>
        </>
      ) : (
        <div
        // style={{
        //   color: "yellow",
        //   fontSize: "2em",
        //   position: "absolute",
        //   top: 0,
        //   left: 0,
        //   bordeR: "1px solid red",
        //   zIndex: 5000300,
        //   width: "50vw",
        //   height: "50vh",
        // }}
        >
          {/* HELLO WORLD */}
          <br />
          {/* {permission} */}
        </div>
      )}
    </div>
  );
};

function useDeviceOrientation(onOrientationChange, setCustomMessage) {
  const [orientation, setOrientation] = useState({
    alpha: null,
    beta: null,
    gamma: null,
  });

  // Add a state to store the calibrated orientation
  const [verticalCalibration, setVerticalCalibration] = useState({
    beta: 49,
    gamma: 0,
  });
  const [permission, setPermission] = useState("default");

  const handleOrientation = (event) => {
    let { alpha, beta, gamma } = event;

    // Subtract calibration values to set "upright" as base orientation
    beta -= verticalCalibration.beta;
    gamma -= verticalCalibration.gamma;

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
          setCustomMessage(null);
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
      setCustomMessage(null);
    }
  };

  useEffect(() => {
    // Optionally, set up a touch or other event to trigger calibration
    const calibrateOrientation = () => {
      // Captures the current orientation when the event fires, e.g., user holds phone upright
      setVerticalCalibration({
        beta: orientation.beta,
        gamma: orientation.gamma,
      });

      // You may want to remove the event listener after the first calibration
      window.removeEventListener("touchstart", calibrateOrientation);
    };

    window.addEventListener("touchstart", calibrateOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
      window.removeEventListener("touchstart", calibrateOrientation);
    };
  }, [orientation]);

  return { orientation, permission, requestPermission };
}

// function useDeviceOrientation(onOrientationChange, setCustomMessage) {
//   const [orientation, setOrientation] = useState({
//     alpha: null,
//     beta: null,
//     gamma: null,
//   });
//   const [initialOrientation, setInitialOrientation] = useState(null);
//   const [permission, setPermission] = useState("default");

//   const handleOrientation = (event) => {
//     let { alpha, beta, gamma } = event;

//     if (!initialOrientation) {
//       setInitialOrientation({ alpha, beta, gamma });
//     } else {
//       beta = beta - initialOrientation.beta;
//       gamma = gamma - initialOrientation.gamma;
//     }

//     setOrientation({ alpha, beta, gamma });
//     if (onOrientationChange) {
//       onOrientationChange({ alpha, beta, gamma });
//     }
//   };

//   const requestPermission = async () => {
//     if (typeof DeviceOrientationEvent.requestPermission === "function") {
//       try {
//         const response = await DeviceOrientationEvent.requestPermission();
//         if (response === "granted") {
//           setPermission("granted");
//           window.addEventListener("deviceorientation", handleOrientation, true);
//           setCustomMessage(null);
//         } else {
//           setPermission("denied");
//           setCustomMessage("Device Orientation Access Denied.");
//         }
//       } catch (error) {
//         setPermission("denied");
//         setCustomMessage("Device Orientation Access Denied.");
//       }
//     } else {
//       setPermission("granted");
//       window.addEventListener("deviceorientation", handleOrientation, true);
//       setCustomMessage(null);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       window.removeEventListener("deviceorientation", handleOrientation, true);
//     };
//   }, []);

//   return { orientation, permission, requestPermission };
// }
