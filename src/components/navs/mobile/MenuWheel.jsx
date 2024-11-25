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
import { useAppContext } from "../../../context/appContext";
export function MenuWheel({
  selectedMenuActionMobile,
  setSelectedMenuActionMobile,
  handleMenuClick,
  isMenuCentered,
  setSelectedCategory,
  selectedCategory,
}) {
  const { menuOpenMobile, setMenuOpenMobile } = useAppContext();

  const handleCategorySelect = (category) => {
    if (!isMenuCentered) {
      setSelectedMenuActionMobile(null);
    }
    setMenuOpenMobile(false);
    handleMenuClick();
    setSelectedCategory(category);
  };

  return (
    <div className={isMenuCentered ? "fab-wrapper centered" : "fab-wrapper"}>
      <input
        id="fabCheckbox"
        type="checkbox"
        className={`fab-checkbox ${menuOpenMobile ? "checked" : ""}`}
        onClick={() => {
          if (!isMenuCentered) setSelectedMenuActionMobile(null);
          handleMenuClick();
          setMenuOpenMobile(!menuOpenMobile);
        }}
      />
      <label className="fab" htmlFor="fabCheckbox">
        <div
          className={isMenuCentered ? "icon-1 a" : "icon-1"}
          style={selectedCategory ? { background: "#750414" } : null}
        ></div>
        <div
          className={isMenuCentered ? "icon-2 c" : "icon-2"}
          style={selectedCategory ? { background: "#750414" } : null}
        ></div>
        <div
          className={isMenuCentered ? "icon-3 b" : "icon-3"}
          style={selectedCategory ? { background: "#750414" } : null}
        ></div>
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
                <span>I</span>
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
                <span>M</span>
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
                <span>M</span>
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
                <span>S</span>
                ecurity
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
                <span>A.</span>
                I.
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
                <span>M</span>
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
                <span>C</span>
                ustomize
              </>
            )}
          </button>
        </a>
      </div>
    </div>
  );
}

export const MenuAboutContact = ({
  isFromHomeScreen,
  isMenuCentered,
  handleMenuClick,
  isFromSelectedCategory,
}) => {
  const { setSelectedCategory, menuOpenMobile, setMenuOpenMobile } =
    useAppContext();
  const linkedInUrl = "https://www.linkedin.com/company/in3d-tech.com";

  const regularStyle = {
    width: "100%",
    borderTop: "1px solid rgb(255,255,255, 0.4)",
    position: isFromHomeScreen ? "" : "absolute",
    bottom: isFromHomeScreen ? "1em" : "5em",
    left: isFromHomeScreen ? "" : 0,
    height: "5em",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  };

  const selectedCategoryStyle = {
    // position: "absolute",
    // top: "200%",
    width: "100%",
    borderTop: "1px solid rgb(255,255,255, 0.4)",
    left: 0,
    height: "5em",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    // border: "5px solid blue",
  };

  // console.log({ isFromSelectedCategory });

  return (
    <div style={isFromSelectedCategory ? selectedCategoryStyle : regularStyle}>
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
            color: isFromSelectedCategory ? "white" : "white",
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
            color: isFromSelectedCategory ? "white" : "white",
            fontFamily: "gotham",
          }}
        >
          Contact
        </span>
      </div>
      <div className="linkdn-icon animate-reveal">
        {
          <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon
              fontSize="large"
              sx={{ color: isFromSelectedCategory ? "white" : "white" }}
            />
          </a>
        }
      </div>
    </div>
  );
};
