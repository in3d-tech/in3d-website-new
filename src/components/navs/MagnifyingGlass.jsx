import React, { useRef, useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";

const MagnifyingGlass = (props) => {
  const { setIsCursorHovering } = useAppContext();
  const [isTitleHovered, setIsTitleHovered] = useState(false);

  const containerRef = useRef(null);
  const magnifierRef = useRef(null);
  const enlargedImageRef = useRef(null);

  // const deviceHasPointer = window.matchMedia("(pointer: fine)").matches;
  // const speed = 0.2;

  // useEffect(() => {
  //   const container = containerRef.current;
  //   const magnifier = magnifierRef.current;
  //   const enlargedImage = enlargedImageRef.current;

  //   let glass = { x: 0, y: 0 };
  //   let enlargedImagePos = { x: 0, y: 0 };
  //   let containerRect = {};

  //   const getMousePos = (e) => {
  //     const x = e.clientX;
  //     const y = e.clientY;

  //     glass = {
  //       x: lerp(glass.x, x, speed),
  //       y: lerp(glass.y, y, speed),
  //     };

  //     enlargedImagePos = {
  //       x: ((glass.x - containerRect.left) / containerRect.width) * -40,
  //       y: ((glass.y - containerRect.top) / containerRect.height) * 40,
  //     };

  //     magnifier.style.transform = `translate(calc(${glass.x}px - 50%), calc(${glass.y}px  - 50%))`;
  //     enlargedImage.style.transform = `translate(${enlargedImagePos.x}%, ${enlargedImagePos.y}%)`;
  //   };

  //   const showGlass = () => {
  //     containerRect = container.getBoundingClientRect();
  //     magnifier.style.opacity = "1";
  //   };

  //   const hideGlass = () => {
  //     magnifier.style.opacity = "0";
  //   };

  //   const lerp = (a, b, n) => {
  //     return (1 - n) * a + n * b;
  //   };

  //   if (deviceHasPointer) {
  //     window.addEventListener("mousemove", getMousePos, { passive: true });
  //     container.addEventListener("mouseenter", showGlass);
  //     container.addEventListener("mouseleave", hideGlass);
  //   }

  //   return () => {
  //     window.removeEventListener("mousemove", getMousePos);
  //     container.removeEventListener("mouseenter", showGlass);
  //     container.removeEventListener("mouseleave", hideGlass);
  //   };
  // }, [deviceHasPointer, speed]);

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
          }, 300); // 1-second delay

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
