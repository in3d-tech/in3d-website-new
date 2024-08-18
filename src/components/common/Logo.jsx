import { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../context/appContext";
import { ContactUsText } from "./textData";
import "../viewableContent/selectedCategories.css";

export const Logo = () => {
  const { setSelectedCategory, setMenuOpened } = useAppContext();

  return (
    <div className="h-nav-in3d-icon for-menu">
      <img
        className="in3d-fixed-logo"
        src="/assets/images/in3d-logo-white.png"
        alt="logo"
        onClick={() => {
          setSelectedCategory(false);
          setMenuOpened(false);
          document.body.style.overflowY = "auto";
        }}
      />
    </div>
  );
};

export const ContactBtn = ({ isFromSelectedCategory }) => {
  const [open, setOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleClick = () => {
    setOpen(true);
    setTimeout(() => {
      setShowContent(true);
    }, 1000);
  };

  return (
    <>
      {open ? (
        <div
          className="border-grow contact-us-shadow"
          style={{
            height: "20em",
            width: "30em",
            // border: "1px solid rgba(0,0,0,0.4)",
            borderRadius: "5px",
          }}
        >
          {showContent && (
            <>
              <button
                onClick={() => {
                  setOpen(false);
                  setShowContent(false);
                }}
                style={{
                  borderRadius: "50%",
                  border: "1px solid rgb(0,0,0,0.3)",
                  textAlign: "center",
                  position: "relative",
                  top: "0.2em",
                  left: "0.2em",
                }}
              >
                x
              </button>
              <ContactUsText isFromSelectedCategory={isFromSelectedCategory} />
            </>
          )}
        </div>
      ) : (
        <button
          style={{
            color: "black",
            fontFamily: "gotham",
            width: "8em",
            height: "2em",
            textAlign: "center",
            fontSize: "1.2em",
          }}
          // className="categories-contact-btn"
          className="selected-contact-button"
          onClick={handleClick}
        >
          Contact Us
        </button>
      )}
    </>
  );
};

export const VideoPlayer = ({ src, startTime = 0, videoRef, isMobile }) => {
  const vidRef = useRef(null);
  useEffect(() => {
    const videoElement = videoRef?.current;
    if (videoElement) {
      const handleLoadedMetadata = () => {
        videoElement.currentTime = startTime;
      };

      const handleCanPlay = () => {
        // Video can start playing, show initial frame here if needed
        videoElement.play(); // Optionally, start playback automatically
        videoElement.pause(); // Pause immediately if you want user interaction to start playback
      };

      // Set the start time when the video metadata is loaded
      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      videoElement.addEventListener("canplay", handleCanPlay);

      // Cleanup event listeners
      return () => {
        videoElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        videoElement.removeEventListener("canplay", handleCanPlay);
      };
    }
  }, [startTime, videoRef]);

  return (
    <div
      className="video-container"
      style={isMobile ? { borderRadius: "12px" } : null}
    >
      <video
        controls
        className="video-player"
        ref={videoRef ? videoRef : vidRef}
        preload="metadata"
        // poster="/assets/images/backgrounds/medicine/Medical_Togle.jpg"
        poster="/assets/images/in3d-logo-white.png"
        // poster="/public/assets/images/backgrounds/Astro_1_Background.webp"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

// export const VideoPlayer = ({ src, startTime = 0, videoRef, isMobile }) => {
//   // const videoRef = useRef(null);

//   useEffect(() => {
//     const videoElement = videoRef?.current;
//     if (videoElement) {
//       // Set the start time when the video metadata is loaded
//       const handleLoadedMetadata = () => {
//         videoElement.currentTime = startTime;
//       };

//       // Add event listener
//       videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);

//       // Cleanup event listener
//       return () => {
//         videoElement.removeEventListener(
//           "loadedmetadata",
//           handleLoadedMetadata
//         );
//       };
//     }
//   }, [startTime]);

//   return (
//     <div
//       className="video-container"
//       style={isMobile ? { borderRadius: "12px" } : null}
//     >
//       <video controls className="video-player" ref={videoRef} preload="auto">
//         <source
//           // src={process.env.PUBLIC_URL + "/path-to-your-video.mp4"}
//           src={src ? src : "/assets/images/backgrounds/taasia/Kornit Guide.mp4"}
//           type="video/mp4"
//         />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   );
// };
