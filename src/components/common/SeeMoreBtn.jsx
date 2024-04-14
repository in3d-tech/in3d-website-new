import { useAppContext } from "../../context/appContext";
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
  const { scrollArea, modelAnimationIsHalfWay } = useAppContext();

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
          Industry <span style={{ color: "#750414" }}>4.0</span>
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
          <span style={{ color: "#750414" }}>M</span>edicine
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
          <span style={{ color: "#750414" }}>M</span>icrosoft
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
          <span style={{ color: "#750414" }}>S</span>ecurity
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
          <span style={{ color: "#750414" }}>A</span>I
          {/* <span style={{ color: "#750414" }}>.</span> */}
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
          <span style={{ color: "#750414" }}>M</span>ilitary
          {/* <span style={{ color: "#750414" }}>.</span> */}
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
          <span style={{ color: "#750414" }}>C</span>ustomization
        </>
      );
      break;

    default:
      styles = {};
      break;
  }

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
      <button className="see-more-btn">Learn More</button>
    </div>
  );
};

// industry

{
  /* <div
      style={{
        position: "fixed",
        zIndex: 2234234234,
        right: "7em",
        bottom: "1em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="testy"
    >
      <span style={{ fontSize: "2em" }}>
        Industry <span style={{ color: "#750414" }}>4.0</span>
      </span>
      <button className="see-more-btn">See More</button>
    </div> */
}

// security

//   <div
//   style={{
//     position: "fixed",
//     zIndex: 13423,
//     left: "7em",
//     bottom: "1em",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   }}
// >
//   <span style={{ fontSize: "2em" }}>
//     <span style={{ color: "#750414" }}>S</span>ecurity
//   </span>
//   <button className="see-more-btn">See More</button>
// </div>
