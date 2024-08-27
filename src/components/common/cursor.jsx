import * as React from "react";
import { useAppContext } from "../../context/appContext";

function Cursor() {
  const { isCursorHovering } = useAppContext();
  const cursorDotOutline = React.useRef(null);
  const cursorDot = React.useRef(null);
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();

  let [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);
  let cursorVisible = React.useState(false);
  let cursorEnlarged = React.useState(false);

  const onMouseMove = (event) => {
    const { pageX: x, pageY: y } = event;
    setMousePosition({ x, y });
    positionDot(event);
  };

  const onMouseEnter = () => {
    cursorVisible.current = true;
    toggleCursorVisibility();
  };

  const onMouseLeave = () => {
    cursorVisible.current = false;
    toggleCursorVisibility();
  };

  const onMouseDown = () => {
    cursorEnlarged.current = true;
    toggleCursorSize();
  };

  const onMouseUp = () => {
    cursorEnlarged.current = false;
    toggleCursorSize();
  };

  const onResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  React.useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    window.addEventListener("resize", onResize);
    requestRef.current = requestAnimationFrame(animateDotOutline);

    handleLinkHovers();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  let { x, y } = mousePosition;
  const winDimensions = { width, height };
  // console.log("WINDOW DIMENSIONS: 00", { width, height });
  let endX = winDimensions.width / 2;
  let endY = winDimensions.height / 2;

  function positionDot(e) {
    cursorVisible.current = true;
    toggleCursorVisibility();
    endX = e.pageX;
    endY = e.pageY;
    cursorDot.current.style.top = endY - 7 + "px";
    cursorDot.current.style.left = endX - 7 + "px";
  }

  function toggleCursorVisibility() {
    if (cursorVisible.current) {
      cursorDot.current.style.opacity = 1;
      cursorDotOutline.current.style.opacity = 1;
    } else {
      cursorDot.current.style.opacity = 0;
      cursorDotOutline.current.style.opacity = 0;
    }
  }

  function toggleCursorSize() {
    if (cursorEnlarged.current) {
      cursorDotOutline.current.style.transform =
        "translate(-50%, -50%) rotate(45deg) scale(1.2)";
    } else {
      cursorDotOutline.current.style.transform =
        "translate(-50%, -50%) rotate(45deg) scale(1)";
    }
  }

  function handleLinkHovers() {
    document.querySelectorAll("a").forEach((el) => {
      el.addEventListener("mouseover", () => {
        cursorEnlarged.current = true;
        toggleCursorSize();
      });
      el.addEventListener("mouseout", () => {
        cursorEnlarged.current = false;
        toggleCursorSize();
      });
    });
  }

  const animateDotOutline = (time) => {
    if (previousTimeRef.current !== undefined) {
      x += (endX - x) / 8;
      y += (endY - y) / 8;
      cursorDotOutline.current.style.top = y + "px";
      cursorDotOutline.current.style.left = x + "px";
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateDotOutline);
  };

  return (
    <>
      <div ref={cursorDotOutline} id="cursor-dot-outline" />
      <div ref={cursorDot} id="cursor-dot">
        <div
          className={`cube ${isCursorHovering ? "custom-cursor-hover" : ""}`}
        >
          <div className="face top"></div>
          <div className="face bottom"></div>
          <div className="face left"></div>
          <div className="face right"></div>
          <div className="face front"></div>
          <div className="face back"></div>
        </div>
      </div>
    </>
  );
}

export default Cursor;
