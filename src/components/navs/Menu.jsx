import { useState, useEffect } from "react";
import MagnifyingGlass from "./MagnifyingGlass";
import { useAppContext } from "../../context/appContext";

export const Header = () => {
  const [hovered, setIsHovered] = useState(false);

  const { menuOpened, setMenuOpened, setSelectedCategory, selectedCategory } =
    useAppContext();

  const toggleNav = () => {
    setMenuOpened(!menuOpened);
    setIsHovered(null);

    if (selectedCategory) {
      setTimeout(() => setSelectedCategory(null), 300);
    }
  };

  const topics = [
    { key: 1, title: "Industry" },
    { key: 2, title: "Medicine" },
    { key: 3, title: "Microsoft" },
    { key: 4, title: "Security" },
    { key: 7, title: "Customization" },
    { key: 6, title: "Military" },
    { key: 8, title: "" },
    { key: 5, title: "Artifical Intelligence" },
  ];

  const getbgImage = () => {
    if (!hovered)
      return {
        background: "url(/assets/images/backgrounds/medicine/medicine_bg.jpg)",
      }; //{ animation: "zoomInBack 0.6s ease-out forwards" };
    const baseStyles = {
      // animation: "zoomOut 0.6s ease-out forwards",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transition: "background-image 0.8s ease",
      background: "black",
    };
    let url;

    switch (hovered) {
      case "Customization":
        url =
          "/assets/images/backgrounds/customize/Costumize_Smoke_Background_V01.png";
        break;
      case "Artifical Intelligence":
        url = "/assets/images/backgrounds/ai/ai_bg.png";
        break;
      case "Microsoft":
        url = "/assets/images/backgrounds/microsoft/microsoft_bg.jpg";
        break;
      case "Military":
        url = "/assets/images/backgrounds/military/military_bg.jpg";
        break;
      case "Security":
        url = "/assets/images/backgrounds/security/security.jpg";
        break;
      case "Industry":
        url = "/assets/images/backgrounds/taasia/taasia_bg.jpg";
        break;
      case "Medicine":
        url = "/assets/images/backgrounds/medicine/medicine_bg.jpg";
        break;

      default:
        url = "/assets/images/backgrounds/medicine/medicine_bg.jpg";
        break;
    }

    return {
      ...baseStyles,
      backgroundImage: `url(${url}`,
    };
  };

  useEffect(() => {
    if (menuOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpened]);

  return (
    <header>
      {/* <div style={hovered ? getbgImage() : null}> */}
      <div className="hamburger-icon" id="icon" onClick={toggleNav}>
        <div className={menuOpened ? "icon-1 a" : "icon-1"}></div>
        <div className={menuOpened ? "icon-2 c" : "icon-2"}></div>
        <div className={menuOpened ? "icon-3 b" : "icon-3"}></div>
        <div className="clear"></div>
      </div>

      <nav id="nav" className={menuOpened ? "show" : ""} style={getbgImage()}>
        <div className="horizontal-nav-open-titles-container">
          {/* <ul> */}
          {topics.map((topic, idx) => (
            <MagnifyingGlass
              title={topic.title}
              key={`magnifying${idx}`}
              setIsHovered={setIsHovered}
              hovered={hovered}
              // delay={idx == 0 ? 1.3 : idx * 0.5}
            />
          ))}
          {/* </ul> */}
        </div>
      </nav>

      <div className="dark-blue" id="blue"></div>
      {/* </div> */}
    </header>
  );
};
