import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { memo, useCallback } from "react";
import {
  INDUSTRY,
  MEDICINE,
  MICROSOFT,
  SECURITY,
  AI,
  MILITARY,
  CUSTOMIZATION,
} from "../../common/modelData";
import { useAppContext } from "../../../context/appContext";
import "./MenuWheel.css";

const MENU_CATEGORIES = [
  { key: INDUSTRY, label: "Industry", accent: "#1D9E75", idx: "01" },
  { key: MEDICINE, label: "Medicine", accent: "#D4537E", idx: "02" },
  { key: MICROSOFT, label: "Microsoft", accent: "#378ADD", idx: "03" },
  { key: SECURITY, label: "Security", accent: "#E24B4A", idx: "04" },
  { key: AI, label: "A.I.", accent: "#16e3d2", idx: "05" },
  { key: MILITARY, label: "Military", accent: "#888780", idx: "06" },
  { key: CUSTOMIZATION, label: "Customize", accent: "#BA7517", idx: "07" },
];

export function MenuWheel({
  selectedMenuActionMobile,
  setSelectedMenuActionMobile,
  handleMenuClick,
  isMenuCentered,
  setSelectedCategory,
  selectedCategory,
}) {
  const { menuOpenMobile, setMenuOpenMobile } = useAppContext();

  const handleToggle = useCallback(() => {
    if (!isMenuCentered) setSelectedMenuActionMobile(null);
    handleMenuClick();
    setMenuOpenMobile(!menuOpenMobile);
  }, [
    isMenuCentered,
    menuOpenMobile,
    handleMenuClick,
    setMenuOpenMobile,
    setSelectedMenuActionMobile,
  ]);

  const handleCategorySelect = useCallback(
    (category) => {
      if (!isMenuCentered) setSelectedMenuActionMobile(null);
      setMenuOpenMobile(false);
      handleMenuClick();
      setSelectedCategory(category);
    },
    [
      isMenuCentered,
      handleMenuClick,
      setMenuOpenMobile,
      setSelectedCategory,
      setSelectedMenuActionMobile,
    ],
  );

  return (
    <>
      {/* Hamburger */}
      <button
        className={`mw-toggle ${isMenuCentered ? "mw-toggle--open" : ""} ${
          selectedCategory ? "mw-toggle--category" : ""
        }`}
        onClick={handleToggle}
        aria-label={isMenuCentered ? "Close menu" : "Open menu"}
      >
        <span className="mw-toggle__bar mw-toggle__bar--1" />
        <span className="mw-toggle__bar mw-toggle__bar--2" />
        <span className="mw-toggle__bar mw-toggle__bar--3" />
      </button>

      {isMenuCentered ? (
        <div
          className="h-nav-in3d-icon"
          style={{
            animationDelay: "0.3s",
            left: "5%",
            zIndex: 40,
            // opacity: 0.6,
          }}
        >
          <img
            className="in3d-fixed-logo"
            style={{ width: "3em", opacity: 0.7 }}
            src="/assets/images/in3d-logo-white.png"
            alt="in3d-logo"
          />
        </div>
      ) : null}

      {/* Full-screen overlay */}
      <div className={`mw-overlay ${isMenuCentered ? "mw-overlay--open" : ""}`}>
        <div className="mw-inner">
          {/* Category list */}
          <nav className="mw-nav">
            {MENU_CATEGORIES.map((cat, i) => (
              <button
                key={cat.key}
                className={`mw-nav__item ${isMenuCentered ? "mw-nav__item--visible" : ""}`}
                style={{
                  "--item-accent": cat.accent,
                  "--item-delay": `${0.06 + i * 0.04}s`,
                }}
                onClick={() => handleCategorySelect(cat.key)}
              >
                <span className="mw-nav__idx">{cat.idx}</span>
                <span className="mw-nav__line" />
                <span className="mw-nav__label">{cat.label}</span>
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div
            className={`mw-footer ${isMenuCentered ? "mw-footer--visible" : ""}`}
          >
            <FooterLinks
              isMenuCentered={isMenuCentered}
              handleMenuClick={handleMenuClick}
            />
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Footer links ─── */
const FooterLinks = memo(({ isMenuCentered, handleMenuClick }) => {
  const { setSelectedCategory, menuOpenMobile, setMenuOpenMobile } =
    useAppContext();

  const handleLink = useCallback(
    (value) => {
      setSelectedCategory(value);
      if (isMenuCentered) {
        handleMenuClick();
        setMenuOpenMobile(!menuOpenMobile);
      }
    },
    [
      isMenuCentered,
      handleMenuClick,
      menuOpenMobile,
      setMenuOpenMobile,
      setSelectedCategory,
    ],
  );

  return (
    <>
      <button className="mw-footer__link" onClick={() => handleLink("10")}>
        About
      </button>
      <span className="mw-footer__sep">/</span>
      <button className="mw-footer__link" onClick={() => handleLink("contact")}>
        Contact
      </button>
      <span className="mw-footer__sep">/</span>
      <a
        className="mw-footer__link mw-footer__link--icon"
        href="https://www.linkedin.com/company/in3d-tech.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <LinkedInIcon sx={{ fontSize: 20, color: "inherit" }} />
      </a>
    </>
  );
});

/* ─── Backward-compatible MenuAboutContact export ─── */
export const MenuAboutContact = ({
  isFromHomeScreen,
  isMenuCentered,
  handleMenuClick,
  isFromSelectedCategory,
}) => {
  const { setSelectedCategory, menuOpenMobile, setMenuOpenMobile } =
    useAppContext();
  const linkedInUrl = "https://www.linkedin.com/company/in3d-tech.com";

  const style = {
    width: "100%",
    borderTop: isFromSelectedCategory
      ? "1px solid rgba(0,0,0,0.15)"
      : "1px solid rgba(255,255,255,0.15)",
    position: isFromHomeScreen ? "" : "absolute",
    bottom: isFromHomeScreen ? "1em" : "5em",
    left: isFromHomeScreen ? "" : 0,
    height: "5em",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  };

  return (
    <div style={style}>
      <div className="animate-reveal">
        <span
          onClick={() => {
            setSelectedCategory("10");
            if (isMenuCentered) {
              handleMenuClick();
              setMenuOpenMobile(!menuOpenMobile);
            }
          }}
          style={{
            color: isFromSelectedCategory ? "black" : "white",
            fontFamily: "gotham",
          }}
        >
          About
        </span>
      </div>
      <div className="animate-reveal">
        <span
          onClick={() => {
            setSelectedCategory("contact");
            if (isMenuCentered) {
              handleMenuClick();
              setMenuOpenMobile(!menuOpenMobile);
            }
          }}
          style={{
            color: isFromSelectedCategory ? "black" : "white",
            fontFamily: "gotham",
          }}
        >
          Contact
        </span>
      </div>
      <div className="linkdn-icon animate-reveal">
        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
          <LinkedInIcon
            fontSize="large"
            sx={{ color: isFromSelectedCategory ? "black" : "white" }}
          />
        </a>
      </div>
    </div>
  );
};
