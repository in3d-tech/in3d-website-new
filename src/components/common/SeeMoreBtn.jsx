import { useAppContext } from "../../context/appContext";
import { getSparkleColour } from "../scene/ornaments/getSparkleColour";
// import { Industry } from "../viewableContent/categories/Industry";
import {
  INDUSTRY,
  MEDICINE,
  MICROSOFT,
  SECURITY,
  AI,
  MILITARY,
  CUSTOMIZATION,
} from "./modelData";

export const SeeMoreBtn = () => {
  const { scrollArea, modelAnimationIsHalfWay, setSelectedCategory } =
    useAppContext();

  let styles;
  let text;

  // if (scrollArea.currentSection != modelAnimationIsHalfWay) return null;
  switch (scrollArea.currentSection) {
    case INDUSTRY:
      styles = {
        right: "7em",
        bottom: "2em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      };
      text = (
        <>
          Industry
          <span style={{ color: getSparkleColour(scrollArea.currentSection) }}>
            {" "}
            4.0
          </span>
        </>
      );
      break;
    case MEDICINE:
      styles = {
        width: "100vw",

        bottom: "2em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      };
      text = (
        <>
          <span style={{ color: getSparkleColour(scrollArea.currentSection) }}>
            M
          </span>
          edicine
        </>
      );
      break;

    case MICROSOFT:
      styles = {
        right: "7em",
        bottom: "1em",
      };

      text = (
        <>
          <span style={{ color: getSparkleColour(scrollArea.currentSection) }}>
            M
          </span>
          icrosoft
        </>
      );
      break;

    case SECURITY:
      styles = {
        left: "7em",
        bottom: "3em",
      };
      text = (
        <>
          <span style={{ color: getSparkleColour(scrollArea.currentSection) }}>
            S
          </span>
          ecurity
        </>
      );
      break;
    case AI:
      styles = {
        right: "10em",
        bottom: "2em",
      };
      text = (
        <>
          <span style={{ color: getSparkleColour(scrollArea.currentSection) }}>
            A
          </span>
          I
          {/* <span style={{ color: getSparkleColour(scrollArea.currentSection) }}>.</span> */}
        </>
      );
      break;
    case MILITARY:
      styles = {
        left: "7em",
        bottom: "1em",
      };
      text = (
        <>
          <span style={{ color: getSparkleColour(scrollArea.currentSection) }}>
            M
          </span>
          ilitary
          {/* <span style={{ color: getSparkleColour(scrollArea.currentSection) }}>.</span> */}
        </>
      );
      break;

    case CUSTOMIZATION:
      styles = {
        right: "7em",
        bottom: "3em",
      };
      text = (
        <>
          <span style={{ color: getSparkleColour(scrollArea.currentSection) }}>
            C
          </span>
          ustomization
        </>
      );
      break;

    default:
      styles = {};
      break;
  }

  const categorySelect = {
    3: "Industry",
    4: "Medicine",
    5: "Microsoft",
    6: "Security",
    7: "Artifical Intelligence",
    8: "Military",
    9: "Customization",
    10: "Contact",
  };

  return (
    <div
      // style={{
      //   width: "100vw",
      //   position: "fixed",
      //   zIndex: 3,
      //   bottom: "2em",
      //   display: "flex",
      //   flexDirection: "column",
      //   alignItems: "center",
      // }}
      className="learn-more-btn-wrapper"
      style={{
        ...styles,
        position: "fixed",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <span style={{ fontSize: "2em", color: "white" }}>
        {/* <span style={{ color: "#750414" }}>M</span>edicine */}
        {text ? (
          text
        ) : (
          <>
            <span style={{ color: "#750414" }}>M</span>edicine
          </>
        )}
      </span>
      <button
        onClick={() =>
          setSelectedCategory(categorySelect[scrollArea.currentSection])
        }
        className="see-more-btn"
      >
        Learn More
      </button>
    </div>
  );
};
