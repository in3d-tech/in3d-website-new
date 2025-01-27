import React, { useRef, useState } from "react";
import { useAppContext } from "../../../context/appContext";

const MagnifyingGlass = (props) => {
  const { setIsCursorHovering } = useAppContext();
  const [isTitleHovered, setIsTitleHovered] = useState(false);

  const containerRef = useRef(null);
  const magnifierRef = useRef(null);
  const enlargedImageRef = useRef(null);

  return (
    <>
      <div
        className="magnifying-glass"
        ref={containerRef}
        onMouseOver={() => {
          setIsCursorHovering(true);
          setIsTitleHovered(true);
          if (props.timeoutId) {
            clearTimeout(props.timeoutId);
          }

          const id = setTimeout(() => {
            if (!props.fontSize) props.setIsHovered(props.title);
          }, 300); // delay

          props.setTimeoutId(id);
        }}
        onMouseOut={() => {
          setIsCursorHovering(false);
          setIsTitleHovered(false);
          if (props.timeoutId) {
            clearTimeout(props.timeoutId);
          }
          props.setIsHovered(false);
        }}
        style={{
          opacity:
            props.hovered === props.title || props.hovered === false ? 1 : 0.6,
        }}
      >
        <div
          className={`magnifying-glass__text`}
          style={{
            color: "rgba(255, 255, 255, 0.85)",
            animation: isTitleHovered
              ? "zoomOut 0.6s ease-out forwards"
              : "zoomInBack 0.6s ease-out forwards",
          }}
          onClick={() => {
            props.setSelectedCategory(props.title);
            setTimeout(() => props.toggleNav(), 700);
          }}
        >
          <span
            style={
              props.fontSize ? { fontSize: "0.5em" } : { fontWeight: "bold" }
            }
          >
            {props.title}
          </span>
        </div>
      </div>

      <div className="magnifying-glass__magnifier" ref={magnifierRef}>
        <div className="magnifying-glass__enlarged-text" ref={enlargedImageRef}>
          {/* {props.title} */}
        </div>
      </div>
    </>
  );
};

export default MagnifyingGlass;
