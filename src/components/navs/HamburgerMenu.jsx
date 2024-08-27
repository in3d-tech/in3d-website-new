import { useState, useEffect } from "react";
import MagnifyingGlass from "./MagnifyingGlass";
import { useAppContext } from "../../context/appContext";
import { getSparkleColour } from "../scene/ornaments/getSparkleColour";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

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

const preloadImages = (urls) => {
  const images = {};
  Object.keys(urls).forEach((category) => {
    images[category] = new Image();
    images[category].src = urls[category];
  });
  return images;
};

export const HamburgerMenu = ({ isMobileViewOnly }) => {
  const [hovered, setIsHovered] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [preloadedImages, setPreloadedImages] = useState({});

  const {
    menuOpened,
    setMenuOpened,
    setSelectedCategory,
    selectedCategory,
    scrollArea,
    setIsCursorHovering,
    videosPreloaded,
    setVideosPreloaded,
    industryContent,
    setIndustryContent,
  } = useAppContext();

  useEffect(() => {
    if (menuOpened && Object.keys(preloadedImages).length === 0) {
      setPreloadedImages(preloadImages(IMAGE_URLS));
    }
  }, [menuOpened, preloadedImages]);

  // const preloadVideos = () => {
  //   if (!videosPreloaded) {
  //     const video1 = document.createElement("video");
  //     video1.src =
  //       "https://in3dwebsite.blob.core.windows.net/video/Hololens 2 - Guides (2).mp4";

  //     const video2 = document.createElement("video");
  //     video2.src =
  //       "https://in3dwebsite.blob.core.windows.net/video/Hololens 1 - Remote Assist (2).mp4";

  //     video1.load();
  //     video2.load();

  //     // Set videosPreloaded to true once both videos are fully loaded
  //     Promise.all([video1.play(), video2.play()]).then(() => {
  //       video1.pause();
  //       video2.pause();
  //       setVideosPreloaded(true);
  //     });
  //   }
  // };

  const toggleNav = () => {
    setMenuOpened(!menuOpened);

    // setMenuOpened(!menuOpened);
    setIsHovered(false);

    if (selectedCategory) {
      setTimeout(() => setSelectedCategory(null), 300);
    }
  };

  const topics = [
    { key: 1, title: "Industry" },
    { key: 2, title: "Medicine" },
    { key: 3, title: "Microsoft" },
    { key: 4, title: "Security" },
    { key: 5, title: "Military" },
    { key: 7, title: "Customization" },
    { key: 8, title: "" },
    { key: 9, title: "Artifical Intelligence" },
    { key: 10, title: "" },
  ];

  const getBgImage = () => {
    if (preloadedImages[hovered]) {
      return {
        position: "absolute",
        backgroundImage: `url(${preloadedImages[hovered].src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
        animation: "zoomOutImg 1.8s ease-out forwards",
        zIndex: 0,
      };
    }
    return {};
  };

  useEffect(() => {
    if (menuOpened) {
      document.body.style.overflow = "hidden";
      // preloadVideos();
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [menuOpened]);

  const icons = [
    { className: "icon-1", altClassName: "a" },
    { className: "icon-2", altClassName: "c" },
    { className: "icon-3", altClassName: "b" },
  ];

  return (
    <header>
      <div
        style={isMobileViewOnly ? { background: "rgb(255,255,255, 0)" } : null}
        className="hamburger-icon"
        id="icon"
        onClick={toggleNav}
        onMouseOver={() => setIsCursorHovering(true)}
        onMouseOut={() => setIsCursorHovering(false)}
      >
        {icons.map((icon, index) => (
          <div
            key={index}
            style={{
              background: selectedCategory
                ? "#750414"
                : getSparkleColour(scrollArea.currentSection),
            }}
            className={
              menuOpened || selectedCategory
                ? `${icon.className} ${icon.altClassName}`
                : icon.className
            }
          ></div>
        ))}
        <div className="clear"></div>
      </div>

      {menuOpened ? (
        <nav id="nav" className={menuOpened ? "show" : { opacity: 0 }}>
          {hovered ? (
            <div className="scale-effect" style={getBgImage()}></div>
          ) : (
            <div className="scale-effect num2"></div>
          )}

          <div
            className="h-nav-in3d-icon for-menu"
            onMouseOver={() => setIsCursorHovering(true)}
            onMouseOut={() => setIsCursorHovering(false)}
          >
            <img
              className="in3d-fixed-logo"
              src="/assets/images/plain-logo.png"
            />
          </div>
          <div className="horizontal-nav-open-titles-container">
            {topics.map((topic, idx) => (
              <MagnifyingGlass
                title={topic.title}
                key={`magnifying${idx}`}
                setIsHovered={setIsHovered}
                toggleNav={toggleNav}
                hovered={hovered}
                setSelectedCategory={setSelectedCategory}
                timeoutId={timeoutId}
                setTimeoutId={setTimeoutId}
              />
            ))}
          </div>
          <div
            style={{
              borderTop: "4px solid rgb(255,255,255,0.6)",
              position: "absolute",
              width: "90%",
              height: "5em",
              padding: "1em",
              bottom: "0em",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
              }}
              className="desktop-menu-about-contact-wrapper"
            >
              <div className="animate-reveal" style={{ flex: 1 }}>
                <MagnifyingGlass
                  title={"Who we Are"}
                  setIsHovered={setIsHovered}
                  toggleNav={toggleNav}
                  hovered={hovered}
                  setSelectedCategory={setSelectedCategory}
                  timeoutId={timeoutId}
                  setTimeoutId={setTimeoutId}
                  fontSize
                />
              </div>
              <div
                style={{
                  position: "relative",
                  left: "13%",
                  height: "100%",
                  animation: "fadeIn 2s ease-in-out",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "10%",
                    height: "60%",
                    width: "1px",
                    backgroundColor: "white",
                    left: "0",
                  }}
                ></div>
              </div>
              <div
                className="animate-reveal"
                style={{
                  marginLeft: "6em",
                  flex: 1,
                }}
              >
                <MagnifyingGlass
                  title={"Contact"}
                  setIsHovered={setIsHovered}
                  toggleNav={toggleNav}
                  hovered={hovered}
                  setSelectedCategory={setSelectedCategory}
                  timeoutId={timeoutId}
                  setTimeoutId={setTimeoutId}
                  fontSize
                />
              </div>
            </div>

            <div className="linkdn-icon animate-reveal">
              <a
                href={"https://www.linkedin.com/company/in3d-tech.com"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ all: "unset" }}
                onMouseOver={() => setIsCursorHovering(true)}
                onMouseOut={() => setIsCursorHovering(false)}
              >
                <LinkedInIcon fontSize="large" style={{ color: "white" }} />
              </a>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
};
