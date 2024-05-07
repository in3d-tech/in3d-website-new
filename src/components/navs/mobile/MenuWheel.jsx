import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  INDUSTRY,
  MEDICINE,
  MICROSOFT,
  SECURITY,
  AI,
  MILITARY,
  CUSTOMIZATION,
} from "../../common/modelData";
import { useState } from "react";
export function MenuWheel({
  selectedMenuActionMobile,
  setSelectedMenuActionMobile,
  handleMenuClick,
  isMenuCentered,
  setSelectedCategory,
  selectedCategory,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCategorySelect = (category) => {
    // console.log("in handle Cateogry");
    if (!isMenuCentered) {
      setSelectedMenuActionMobile(null);
    }
    setMenuOpen(false);
    handleMenuClick();
    setSelectedCategory(category);
  };

  return (
    <div className={isMenuCentered ? "fab-wrapper centered" : "fab-wrapper"}>
      <input
        id="fabCheckbox"
        type="checkbox"
        className={`fab-checkbox ${menuOpen ? "checked" : ""}`}
        onClick={() => {
          if (!isMenuCentered) setSelectedMenuActionMobile(null);
          handleMenuClick();
          setMenuOpen(!menuOpen);
        }}
      />
      <label className="fab" htmlFor="fabCheckbox">
        <div className={isMenuCentered ? "icon-1 a" : "icon-1"}></div>
        <div className={isMenuCentered ? "icon-2 c" : "icon-2"}></div>
        <div className={isMenuCentered ? "icon-3 b" : "icon-3"}></div>
        <div className="clear"></div>
      </label>
      <div className="fab-wheel">
        <a
          className={`fab-action fab-action-1  ${
            selectedMenuActionMobile &&
            selectedMenuActionMobile !== "fab-action-1"
              ? "fade-out"
              : ""
          } ${selectedMenuActionMobile == "fab-action-1" ? "grow" : ""}`}
        >
          <button
            onClick={() => {
              setSelectedMenuActionMobile(`fab-action-1`);
              handleCategorySelect(INDUSTRY);
            }}
            className="fas"
          >
            {selectedMenuActionMobile == "fab-action-1" ? (
              ""
            ) : (
              <>
                <span style={{ color: "#750414" }}>I</span>
                ndustry
              </>
            )}
          </button>
        </a>
        <a
          className={`fab-action fab-action-2  ${
            selectedMenuActionMobile &&
            selectedMenuActionMobile !== "fab-action-2"
              ? "fade-out"
              : ""
          } ${selectedMenuActionMobile == "fab-action-2" ? "grow" : ""}`}
        >
          <button
            onClick={() => {
              setSelectedMenuActionMobile(`fab-action-2`);
              handleCategorySelect(MEDICINE);
            }}
            className="fas"
          >
            {selectedMenuActionMobile == "fab-action-2" ? (
              ""
            ) : (
              <>
                <span style={{ color: "#750414" }}>M</span>
                edicine
              </>
            )}
          </button>
        </a>
        <a
          className={`fab-action fab-action-3  ${
            selectedMenuActionMobile &&
            selectedMenuActionMobile !== "fab-action-3"
              ? "fade-out"
              : ""
          } ${selectedMenuActionMobile == "fab-action-3" ? "grow" : ""}`}
        >
          <button
            onClick={() => {
              setSelectedMenuActionMobile(`fab-action-3`);
              handleCategorySelect(MICROSOFT);
            }}
            className="fas"
          >
            {selectedMenuActionMobile == "fab-action-3" ? (
              ""
            ) : (
              <>
                <span style={{ color: "#750414" }}>M</span>
                icrosoft
              </>
            )}
          </button>
        </a>
        <a
          className={`fab-action fab-action-4  ${
            selectedMenuActionMobile &&
            selectedMenuActionMobile !== "fab-action-4"
              ? "fade-out"
              : ""
          } ${selectedMenuActionMobile == "fab-action-4" ? "grow" : ""}`}
        >
          <button
            onClick={() => {
              setSelectedMenuActionMobile(`fab-action-4`);
              handleCategorySelect(SECURITY);
            }}
            className="fas"
          >
            {selectedMenuActionMobile == "fab-action-4" ? (
              ""
            ) : (
              <>
                <span style={{ color: "#750414" }}>A.</span>
                I.
              </>
            )}
          </button>
        </a>
        <a
          className={`fab-action fab-action-5  ${
            selectedMenuActionMobile &&
            selectedMenuActionMobile !== "fab-action-5"
              ? "fade-out"
              : ""
          } ${selectedMenuActionMobile == "fab-action-5" ? "grow" : ""}`}
        >
          <button
            onClick={() => {
              setSelectedMenuActionMobile(`fab-action-5`);
              handleCategorySelect(AI);
            }}
            className="fas"
          >
            {selectedMenuActionMobile == "fab-action-5" ? (
              ""
            ) : (
              <>
                <span style={{ color: "#750414" }}>C</span>
                ustomize
              </>
            )}
          </button>
        </a>
        <a
          className={`fab-action fab-action-6  ${
            selectedMenuActionMobile &&
            selectedMenuActionMobile !== "fab-action-6"
              ? "fade-out"
              : ""
          } ${selectedMenuActionMobile == "fab-action-6" ? "grow" : ""}`}
        >
          <button
            onClick={() => {
              setSelectedMenuActionMobile(`fab-action-6`);
              handleCategorySelect(MILITARY);
            }}
            className="fas"
          >
            {selectedMenuActionMobile == "fab-action-6" ? (
              ""
            ) : (
              <>
                <span style={{ color: "#750414" }}>M</span>
                ilitary
              </>
            )}
          </button>
        </a>
        <a
          className={`fab-action fab-action-7  ${
            selectedMenuActionMobile &&
            selectedMenuActionMobile !== "fab-action-7"
              ? "fade-out"
              : ""
          } ${selectedMenuActionMobile == "fab-action-7" ? "grow" : ""}`}
        >
          <button
            onClick={() => {
              setSelectedMenuActionMobile(`fab-action-7`);
              handleCategorySelect(CUSTOMIZATION);
            }}
            className="fas"
          >
            {selectedMenuActionMobile == "fab-action-7" ? (
              ""
            ) : (
              <>
                <span style={{ color: "#750414" }}>S</span>
                ecurity
              </>
            )}
          </button>
        </a>
      </div>
    </div>
  );
}

export const MenuAboutContact = () => {
  const linkedInUrl = "https://www.linkedin.com/company/in3d-tech.com";
  return (
    <div
      style={{
        width: "100%",
        borderTop: "1px solid rgb(255,255,255, 0.4)",
        position: "absolute",
        bottom: "5em",
        left: 0,
        height: "5em",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <div className="animate-reveal">
        <span style={{ color: "white", fontFamily: "gotham" }}>About</span>
      </div>
      <div className="animate-reveal">
        <span style={{ color: "white", fontFamily: "gotham" }}>Contact</span>
      </div>
      <div className="linkdn-icon animate-reveal">
        {
          <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon fontSize="large" sx={{ color: "white" }} />
          </a>
        }
      </div>
    </div>
  );
};
