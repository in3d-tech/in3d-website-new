import { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../context/appContext";
import { ContactUsText } from "./textData";
import "../viewableContent/selectedCategories.css";

const INDUSTRY = 3;
const MEDICINE = 4;
const MICROSOFT = 5;
const SECURITY = 6;
const AI = 7;
const MILITARY = 8;
const CUSTOMIZATION = 9;
const ABOUT_US = 10;

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
  const { selectedCategory } = useAppContext();

  useEffect(() => {
    const videoElement = videoRef ? videoRef.current : vidRef.current;
    if (videoElement) {
      const handleLoadedMetadata = () => {
        videoElement.currentTime = startTime;
      };

      const handleCanPlay = () => {
        if (isMobile) {
          if (videoElement.muted) {
            videoElement.play();
          } else {
            // If not muted, attempt to play and handle autoplay restrictions
            const playPromise = videoElement.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                // Auto-play was prevented
                // Optionally, mute and try to play again
                videoElement.muted = true;
                videoElement.play();
              });
            }
          }
        } else {
          videoElement.play();
          videoElement.pause();
        }
        // Video can start playing, show initial frame here
      };

      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      videoElement.addEventListener("canplay", handleCanPlay);

      return () => {
        videoElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        videoElement.removeEventListener("canplay", handleCanPlay);
      };
    }
  }, [startTime, videoRef]);

  const IMAGE_URLS = {
    Customization:
      "https://in3dwebsite.blob.core.windows.net/photos/Customize_Togle_Finish-min.jpg",
    "Artifical Intelligence":
      "https://in3dwebsite.blob.core.windows.net/photos/Ai_Tugle_Finish-min.jpg",
    Microsoft:
      "https://in3dwebsite.blob.core.windows.net/photos/Microsoft_Tugle-min.jpg",
    Military:
      "https://in3dwebsite.blob.core.windows.net/photos/Militery_Togle_Finish2-min.jpg",
    Security:
      "https://in3dwebsite.blob.core.windows.net/photos/Security_Togle_Finish2-min.jpg",
    Industry:
      "https://in3dwebsite.blob.core.windows.net/photos/Industry_Togle-min.jpg",
    Medicine:
      "https://in3dwebsite.blob.core.windows.net/photos/Medical_Togle-min.jpg",
  };

  const IMAGE_URLS_MOBILE = {
    [CUSTOMIZATION]:
      "https://in3dwebsite.blob.core.windows.net/photos/Customize_Togle_Finish-min.jpg",
    [AI]: "https://in3dwebsite.blob.core.windows.net/photos/Ai_Tugle_Finish-min.jpg",
    [MICROSOFT]:
      "https://in3dwebsite.blob.core.windows.net/photos/Microsoft_Tugle-min.jpg",
    [MILITARY]:
      "https://in3dwebsite.blob.core.windows.net/photos/Militery_Togle_Finish2-min.jpg",
    [SECURITY]:
      "https://in3dwebsite.blob.core.windows.net/photos/Security_Togle_Finish2-min.jpg",
    [INDUSTRY]:
      "https://in3dwebsite.blob.core.windows.net/photos/Industry_Togle-min.jpg",
    [MEDICINE]:
      "https://in3dwebsite.blob.core.windows.net/photos/Medical_Togle-min.jpg",
  };

  return (
    <div
      className={isMobile ? "video-container-mobile" : "video-container"}
      style={isMobile ? { borderRadius: "12px" } : null}
    >
      <video
        controls
        className={isMobile ? "video-player-mobile" : "video-player"}
        ref={videoRef ? videoRef : vidRef}
        preload="metadata"
        // poster="/assets/images/backgrounds/medicine/Medical_Togle.jpg"
        // poster="/assets/images/plain-logo.png"
        // poster="/public/assets/images/backgrounds/Astro_1_Background.webp"
        // poster="/public/assets/images/backgrounds/taasia/Industry_Togle.jpg"
        poster={
          selectedCategory
            ? isMobile
              ? IMAGE_URLS_MOBILE[selectedCategory]
              : IMAGE_URLS[selectedCategory]
            : ""
        }
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
