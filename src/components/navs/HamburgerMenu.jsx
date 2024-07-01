import { useState, useEffect } from "react";
import MagnifyingGlass from "./MagnifyingGlass";
import { useAppContext } from "../../context/appContext";
import { getSparkleColour } from "../scene/ornaments/getSparkleColour";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export const HamburgerMenu = ({ isMobileViewOnly }) => {
  const [hovered, setIsHovered] = useState(false);

  const {
    menuOpened,
    setMenuOpened,
    setSelectedCategory,
    selectedCategory,
    scrollArea,
  } = useAppContext();

  const toggleNav = () => {
    setMenuOpened(!menuOpened);
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

    // { key: 8, title: "" },
    // { key: 8, title: "About" },
  ];

  const getbgImage = () => {
    let url;

    switch (hovered) {
      case "Customization":
        // url = "/assets/images/backgrounds/customize/Customize_Togle_Finish.jpg";
        url =
          "https://in3dwebsite.blob.core.windows.net/photos/Customize_Togle_Finish-min.jpg";
        break;
      case "Artifical Intelligence":
        // url = "/assets/images/backgrounds/ai/Ai_Tugle_Finish.jpg";
        url =
          "https://in3dwebsite.blob.core.windows.net/photos/Ai_Tugle_Finish-min.jpg";
        break;
      case "Microsoft":
        // url = "/assets/images/backgrounds/microsoft/Microsoft_Tugle.jpg";
        url =
          "https://in3dwebsite.blob.core.windows.net/photos/Microsoft_Tugle-min.jpg";
        break;
      case "Military":
        // url = "/assets/images/backgrounds/military/Militery_Togle_Finish2.jpg";
        url =
          "https://in3dwebsite.blob.core.windows.net/photos/Militery_Togle_Finish2-min.jpg";
        break;
      case "Security":
        // url = "/assets/images/backgrounds/security/Security_Togle_Finish2.jpg";
        url =
          "https://in3dwebsite.blob.core.windows.net/photos/Security_Togle_Finish2-min.jpg";
        break;
      case "Industry":
        // url = "/assets/images/backgrounds/taasia/Industry_Togle.jpg";
        url =
          "https://in3dwebsite.blob.core.windows.net/photos/Industry_Togle-min.jpg";
        break;
      case "Medicine":
        // url = "/assets/images/backgrounds/medicine/Medical_Togle.jpg";
        url =
          "https://in3dwebsite.blob.core.windows.net/photos/Medical_Togle-min.jpg";
        break;

      default:
        url = "";
        break;
    }

    return {
      position: "absolute",
      backgroundImage: `url(${url}`,
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

          <div className="h-nav-in3d-icon for-menu">
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
              />
            ))}
          </div>
          <div
            style={{
              borderTop: "1px solid rgb(255,255,255,0.6)",
              position: "absolute",
              width: "90%",
              height: "5em",
              padding: "1em",
              bottom: "0em",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className="animate-reveal">
              <MagnifyingGlass
                title={"About Us"}
                setIsHovered={setIsHovered}
                toggleNav={toggleNav}
                hovered={hovered}
                setSelectedCategory={setSelectedCategory}
                fontSize
              />
            </div>
            <div className="linkdn-icon animate-reveal">
              {
                <a
                  href={"https://www.linkedin.com/company/in3d-tech.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ all: "unset" }}
                >
                  <LinkedInIcon fontSize="large" />
                </a>
              }
            </div>

            {/* <div></div>
            <div></div> */}
            {/* <div
            style={{
              color: "white",
              fontSize: "3em",
              fontFamily: "gotham-old",
            }}
          >
            Contact Us
          </div>
          <div style={{ color: "white", fontSize: "3em" }}>set 2</div>
          <div style={{ color: "white", fontSize: "3em" }}>set3</div> */}
          </div>
        </nav>
      ) : null}

      {/* <div className="dark-blue" id="blue"></div> */}
      {/* </div> */}
    </header>
  );
};
