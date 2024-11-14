import { useState, useEffect, useCallback } from "react";

export const DeviceTilt = ({
  setDebug,
  onTiltChange,
  position,
  setPosition,
}) => {
  const [hasUserTriggeredEvent, setHasUserTriggeredEvent] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const {
    orientation: { beta, gamma },
    permission,
    requestPermission,
  } = useDeviceOrientation(onTiltChange, setCustomMessage);

  const handleSwipe = useCallback(() => {
    if (!hasUserTriggeredEvent) {
      requestPermission();
      setHasUserTriggeredEvent(true);
      window.removeEventListener("touchstart", handleTouchStart, false);
      window.removeEventListener("touchmove", handleTouchMove, false);
    }
  }, [hasUserTriggeredEvent, requestPermission]);

  let xDown = null;
  let yDown = null;

  function handleTouchStart(evt) {
    const firstTouch = (evt.touches || evt.originalEvent.touches)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }
    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /* horizontal swipe */
      if (xDiff > 0) {
        /* left swipe */
        handleSwipe();
      } else {
        /* right swipe */
        handleSwipe();
      }
    } else {
      /* vertical swipe */
      if (yDiff > 0) {
        /* up swipe */
        handleSwipe();
      } else {
        /* down swipe */
        handleSwipe();
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }

  useEffect(() => {
    window.addEventListener("touchstart", handleTouchStart, false);
    window.addEventListener("touchmove", handleTouchMove, false);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart, false);
      window.removeEventListener("touchmove", handleTouchMove, false);
    };
  }, [handleSwipe]);

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
      {permission === "default" || permission === "denied" ? (
        <button
          onClick={requestPermission}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "gray",
            color: "white",
            padding: "1em",
            border: "none",
            borderRadius: "5px",
            zIndex: 999,
          }}
        >
          Enable Device Orientation
        </button>
      ) : (
        <div>{/* Main content when permission is granted */}</div>
      )}
    </div>
  );
};

// export const DeviceTilt = ({
//   setDebug,
//   onTiltChange,
//   position,
//   setPosition,
// }) => {
//   const [hasUserSeenPopup, setHasUserSeenPopup] = useState(false);
//   const [customMessage, setCustomMessage] = useState("");
//   const {
//     orientation: { beta, gamma },
//     permission,
//     requestPermission,
//   } = useDeviceOrientation(onTiltChange, setCustomMessage);

//   useEffect(() => {
//     const handleUserInteraction = () => {
//       if (!hasUserSeenPopup) {
//         requestPermission();
//         setHasUserSeenPopup(true);
//         // document.removeEventListener("scroll", handleUserInteraction);
//         document.removeEventListener("touchstart", handleUserInteraction);
//       }
//     };

//     // document.addEventListener("scroll", handleUserInteraction);
//     document.addEventListener("touchstart", handleUserInteraction);

//     return () => {
//       // document.removeEventListener("scroll", handleUserInteraction);
//       document.removeEventListener("touchstart", handleUserInteraction);
//     };
//   }, [hasUserSeenPopup, requestPermission]);

//   useEffect(() => {
//     if (beta !== null && gamma !== null && permission === "granted") {
//       const maxGamma = 45;
//       let normalizedGamma =
//         Math.min(maxGamma, Math.max(-maxGamma, gamma)) / maxGamma;
//       normalizedGamma = -normalizedGamma;

//       setPosition({ x: normalizedGamma * 50 });
//       setDebug(`x: ${normalizedGamma * 50}`);
//     }
//   }, [beta, gamma, permission, setDebug, setPosition]);

//   return (
//     <div>
//       {/* {customMessage && (
//         <div className="custom-message">
//           {customMessage}
//           <button onClick={() => setCustomMessage("")}>Close</button>
//         </div>
//       )} */}
//       {permission === "default" || permission === "denied" ? (
//         <>
//           <button
//             style={{
//               background: "red",
//               width: "100vw",
//               height: "100%",
//               position: "absolute",
//               opacity: 0.4,
//               zIndex: 3,
//             }}
//             onClick={requestPermission}
//           >
//             {/* Enable D.O. */}
//             {/* {permission === "default"
//               ? "is DEFAULT"
//               : permission === "denied"
//               ? "DENIED BABY"
//               : "new Option"} */}
//           </button>
//           <div
//           // style={{
//           //   color: "cyan",
//           //   fontSize: "2em",
//           //   position: "absolute",
//           //   top: 0,
//           //   left: 0,
//           //   bordeR: "1px solid yellow",
//           //   zIndex: 5000300,
//           //   width: "50vw",
//           //   height: "50vh",
//           // }}
//           >
//             {/* INITLIZAED BBY <button onClick={requestPermission}>click me</button> */}
//           </div>
//         </>
//       ) : (
//         <div
//         // style={{
//         //   color: "yellow",
//         //   fontSize: "2em",
//         //   position: "absolute",
//         //   top: 0,
//         //   left: 0,
//         //   bordeR: "1px solid red",
//         //   zIndex: 5000300,
//         //   width: "50vw",
//         //   height: "50vh",
//         // }}
//         >
//           {/* HELLO WORLD */}
//           <br />
//           {/* {permission} */}
//         </div>
//       )}
//     </div>
//   );
// };

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
