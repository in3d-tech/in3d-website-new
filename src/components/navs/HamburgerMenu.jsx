import { useState, useEffect } from "react";
import MagnifyingGlass from "./MagnifyingGlass";
import { useAppContext } from "../../context/appContext";
import { getSparkleColour } from "../scene/ornaments/getSparkleColour";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export const HamburgerMenu = ({ isMobileViewOnly }) => {
  const [hovered, setIsHovered] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const {
    menuOpened,
    setMenuOpened,
    setSelectedCategory,
    selectedCategory,
    scrollArea,
    setIsCursorHovering,
  } = useAppContext();

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

  const getbgImage = () => {
    let url;

    switch (hovered) {
      case "Customization":
        url =
          "https://in3dwebsite.blob.core.windows.net/photos/Customize_Togle_Finish-min.jpg";
        break;
      case "Artifical Intelligence":
        url =
          "https://in3dwebsite.blob.core.windows.net/photos/Ai_Tugle_Finish-min.jpg";
        break;
      case "Microsoft":
        url =
          "https://in3dwebsite.blob.core.windows.net/photos/Microsoft_Tugle-min.jpg";
        break;
      case "Military":
        url =
          "https://in3dwebsite.blob.core.windows.net/photos/Militery_Togle_Finish2-min.jpg";
        break;
      case "Security":
        url =
          "https://in3dwebsite.blob.core.windows.net/photos/Security_Togle_Finish2-min.jpg";
        break;
      case "Industry":
        url =
          "https://in3dwebsite.blob.core.windows.net/photos/Industry_Togle-min.jpg";
        break;
      case "Medicine":
        url =
          "https://in3dwebsite.blob.core.windows.net/photos/Medical_Togle-min.jpg";
        break;
      default:
        url = "";
        break;
    }

    return {
      position: "absolute",
      backgroundImage: `url(${url})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      width: "100%",
      height: "100%",
      animation: "zoomOutImg 1.8s ease-out forwards",
      zIndex: 0,
    };
  };

  useEffect(() => {
    if (menuOpened) {
      document.body.style.overflow = "hidden";
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
              backgroundColor: selectedCategory
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
            <div style={getbgImage()}></div>
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
              src="/assets/images/in3d-logo-white.png"
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
