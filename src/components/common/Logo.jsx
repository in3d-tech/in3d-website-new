import { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../context/appContext";
import { ContactUsText } from "./textData";
import "../desktop/selectedCategories/selectedCategories.css";

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
        src="/assets/images/plain-logo.png"
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

export const VideoPlayer = ({
  src,
  startTime = 0,
  videoRef,
  isMobile,
  isHaveBorderRadius,
  itemIndex,
}) => {
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
            if (itemIndex != 0) {
              videoElement.pause();
            }
          } else {
            // If not muted, attempt to play and handle autoplay restrictions
            // if (itemIndex == 0) {
            const playPromise = videoElement.play();
            // }
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                // Auto-play was prevented
                // Optionally, mute and try to play again
                videoElement.muted = true;
                videoElement.play();
                if (itemIndex != 0) {
                  videoElement.pause();
                }
              });
            }
          }
        } else {
          videoElement.muted = true;
          videoElement.play();
          videoElement.pause();
        }
        // Video can start playing, show initial frame here
      };

      // const handleCanPlay = () => {
      //   if (itemIndex === 0) {
      //     console.log("ZHIP SZCBOOP");
      //     // Ensure only the first video attempts to autoplay
      //     videoElement.muted = true; // Ensure muted
      //     const playPromise = videoElement.play();
      //     if (playPromise !== undefined) {
      //       playPromise
      //         .then(() => {
      //           // Autoplay started successfully
      //           console.log("SHOUDL Be AUTOPLAYING");
      //           console.log({ videoRef });
      //           // videoElement.play();
      //         })
      //         .catch(() => {
      //           // Autoplay failed, possibly due to restrictions
      //           console.log("big CATCJ BREAk");
      //           videoElement.muted = true;
      //           videoElement.play();
      //         });
      //     } else {
      //       console.log("we found outselves in the else condition!");
      //     }
      //   } else {
      //     videoElement.pause();
      //   }
      // };

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
      style={isMobile || isHaveBorderRadius ? { borderRadius: "12px" } : null}
    >
      <video
        playsInline
        controls
        className={isMobile ? "video-player-mobile" : "video-player"}
        style={{ height: "300px" }}
        ref={videoRef ? videoRef : vidRef}
        preload="metadata"
        muted
        // poster="/assets/images/backgrounds/medicine/Medical_Togle.jpg"
        poster={
          selectedCategory
            ? isMobile
              ? null // IMAGE_URLS_MOBILE[selectedCategory]
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
