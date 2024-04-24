import { useState, useEffect } from "react";
import MagnifyingGlass from "./MagnifyingGlass";
import { useAppContext } from "../../context/appContext";
import { getSparkleColour } from "../scene/ornaments/getSparkleColour";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export const Header = () => {
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
        url = "/assets/images/backgrounds/customize/Customize_Togle_Finish.jpg";
        break;
      case "Artifical Intelligence":
        url = "/assets/images/backgrounds/ai/Ai_Tugle_Finish.jpg";
        break;
      case "Microsoft":
        url = "/assets/images/backgrounds/microsoft/Microsoft_Tugle.jpg";
        break;
      case "Military":
        url = "/assets/images/backgrounds/military/Militery_Togle_Finish2.jpg";
        break;
      case "Security":
        url = "/assets/images/backgrounds/security/Security_Togle_Finish2.jpg";
        break;
      case "Industry":
        url = "/assets/images/backgrounds/taasia/Industry_Togle.jpg";
        break;
      case "Medicine":
        url = "/assets/images/backgrounds/medicine/Medical_Togle.jpg";
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

  return (
    <header>
      {/* <div style={hovered ? getbgImage() : null}> */}
      <div className="hamburger-icon" id="icon" onClick={toggleNav}>
        <div
          style={{
            backgroundColor: getSparkleColour(scrollArea.currentSection),
          }}
          className={menuOpened ? "icon-1 a" : "icon-1"}
        ></div>
        <div
          style={{
            backgroundColor: getSparkleColour(scrollArea.currentSection),
          }}
          className={menuOpened ? "icon-2 c" : "icon-2"}
        ></div>
        <div
          style={{
            backgroundColor: getSparkleColour(scrollArea.currentSection),
          }}
          className={menuOpened ? "icon-3 b" : "icon-3"}
        ></div>
        <div className="clear"></div>
      </div>

      {menuOpened ? (
        <nav
          id="nav"
          className={menuOpened ? "show" : { opacity: 0 }}
          // style={getbgImage()}
        >
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
            {topics.map((topic, idx, self) => (
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
              // borderBottom: "4px solid rgb(117, 4, 20, 0.6)",
              borderTop: "1px solid rgb(255,255,255,0.6)",
              position: "absolute",
              width: "90%",
              height: "5em",
              padding: "1em",
              bottom: "0em",
              display: "flex",
              alignItems: "center",
              // justifyContent: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <MagnifyingGlass
                title={"About Us"}
                setIsHovered={setIsHovered}
                toggleNav={toggleNav}
                hovered={hovered}
                setSelectedCategory={setSelectedCategory}
                fontSize
              />
            </div>
            <div className="linkdn-icon">
              {<LinkedInIcon fontSize="large" />}
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
