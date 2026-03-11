// import * as React from "react";
// import { useAppContext } from "../../context/appContext";

// /**
//  * Space-themed custom cursor — chevron pointer + trailing reticle ring.
//  *
//  * The primary cursor element is a small SVG arrow/chevron so it still
//  * feels like a real pointer. Behind it a glowing ring trails smoothly,
//  * keeping the HUD / futuristic aesthetic.
//  *
//  * Features:
//  *  - SVG chevron pointer pinned to the mouse (top-left anchored like a real cursor)
//  *  - Smooth trailing outer ring (lerp-based)
//  *  - Soft radial glow that follows the ring
//  *  - Subtle particle trail
//  *  - Hover state: ring expands, chevron scales up slightly, glow intensifies
//  *  - Click state: ring + chevron contract for a pulse feel
//  *  - All refs-based — zero React re-renders during movement
//  */

// const LERP_SPEED = 0.12;
// const TRAIL_PARTICLE_COUNT = 5;

// /* ---- colour palettes ---- */
// const THEME_LIGHT = {
//   accent: "rgba(255, 255, 255, 1)",
//   accentHover: "rgba(255, 255, 255, 0.9)",
//   accentGlow: "rgba(255, 255, 255, 0.3)",
//   fill: "rgba(255, 255, 255, 0.12)",
//   highlight: "rgba(255, 255, 255, 0.25)",
//   ringBorder: "rgba(255, 255, 255, 0.45)",
//   ringHover: "rgba(255, 255, 255, 0.85)",
//   blendMode: "screen",
// };

// const THEME_DARK = {
//   accent: "rgba(20, 20, 20, 1)",
//   accentHover: "rgba(30, 30, 30, 0.9)",
//   accentGlow: "rgba(0, 0, 0, 0.25)",
//   fill: "rgba(0, 0, 0, 0.1)",
//   highlight: "rgba(60, 60, 60, 0.3)",
//   ringBorder: "rgba(40, 40, 40, 0.5)",
//   ringHover: "rgba(20, 20, 20, 0.85)",
//   blendMode: "normal",
// };

// function Cursor() {
//   const { isCursorHovering, selectedCategory } = useAppContext();

//   /* ---- derive theme from selectedCategory ---- */
//   const isDark = Boolean(selectedCategory);
//   const theme = isDark ? THEME_DARK : THEME_LIGHT;
//   const themeRef = React.useRef(theme);

//   React.useEffect(() => {
//     themeRef.current = theme;
//   }, [theme]);

//   /* ---- refs ---- */
//   const ringRef = React.useRef(null);
//   const pointerRef = React.useRef(null);
//   const glowRef = React.useRef(null);
//   const trailRefs = React.useRef([]);
//   const rafId = React.useRef(null);

//   const mouse = React.useRef({
//     x: window.innerWidth / 2,
//     y: window.innerHeight / 2,
//   });
//   const ring = React.useRef({
//     x: window.innerWidth / 2,
//     y: window.innerHeight / 2,
//   });
//   const trail = React.useRef(
//     Array.from({ length: TRAIL_PARTICLE_COUNT }, () => ({
//       x: window.innerWidth / 2,
//       y: window.innerHeight / 2,
//     })),
//   );
//   const visible = React.useRef(false);
//   const pressed = React.useRef(false);
//   const hovering = React.useRef(false);

//   /* ---- sync context hover ---- */
//   React.useEffect(() => {
//     hovering.current = isCursorHovering;
//   }, [isCursorHovering]);

//   /* ---- animation loop ---- */
//   const animate = React.useCallback(() => {
//     const mx = mouse.current.x;
//     const my = mouse.current.y;

//     // Lerp ring toward mouse
//     ring.current.x += (mx - ring.current.x) * LERP_SPEED;
//     ring.current.y += (my - ring.current.y) * LERP_SPEED;

//     // Trail particles chain
//     for (let i = 0; i < TRAIL_PARTICLE_COUNT; i++) {
//       const target = i === 0 ? ring.current : trail.current[i - 1];
//       const speed = 0.22 - i * 0.03;
//       trail.current[i].x += (target.x - trail.current[i].x) * speed;
//       trail.current[i].y += (target.y - trail.current[i].y) * speed;
//     }

//     const isHover = hovering.current;
//     const isPressed = pressed.current;
//     const t = themeRef.current;

//     /* ---- pointer (top-left anchored like a real cursor) ---- */
//     if (pointerRef.current) {
//       const pScale = isPressed ? 0.85 : isHover ? 1.15 : 1;
//       pointerRef.current.style.transform = `translate(${mx}px, ${my}px) scale(${pScale})`;
//     }

//     /* ---- ring ---- */
//     if (ringRef.current) {
//       const rScale = isPressed ? 0.7 : isHover ? 1.5 : 1;
//       ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%) scale(${rScale})`;
//       ringRef.current.style.borderColor = isHover ? t.ringHover : t.ringBorder;
//     }

//     /* ---- glow ---- */
//     if (glowRef.current) {
//       glowRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
//       glowRef.current.style.opacity = isHover ? "0.55" : "0.2";
//     }

//     /* ---- trail particles ---- */
//     trailRefs.current.forEach((el, i) => {
//       if (!el) return;
//       const t = trail.current[i];
//       const opacity = (1 - i / TRAIL_PARTICLE_COUNT) * 0.35;
//       const size = Math.max(2, 3.5 - i * 0.4);
//       el.style.transform = `translate(${t.x}px, ${t.y}px) translate(-50%, -50%)`;
//       el.style.opacity = visible.current ? String(opacity) : "0";
//       el.style.width = `${size}px`;
//       el.style.height = `${size}px`;
//     });

//     rafId.current = requestAnimationFrame(animate);
//   }, []);

//   /* ---- event listeners ---- */
//   React.useEffect(() => {
//     const onMove = (e) => {
//       mouse.current.x = e.clientX;
//       mouse.current.y = e.clientY;
//       if (!visible.current) {
//         visible.current = true;
//         setVisibility(true);
//       }
//     };
//     const onEnter = () => {
//       visible.current = true;
//       setVisibility(true);
//     };
//     const onLeave = () => {
//       visible.current = false;
//       setVisibility(false);
//     };
//     const onDown = () => {
//       pressed.current = true;
//     };
//     const onUp = () => {
//       pressed.current = false;
//     };

//     function setVisibility(show) {
//       const o = show ? "1" : "0";
//       if (pointerRef.current) pointerRef.current.style.opacity = o;
//       if (ringRef.current) ringRef.current.style.opacity = o;
//       if (glowRef.current) glowRef.current.style.opacity = show ? "0.2" : "0";
//     }

//     const onOverInteractive = () => {
//       hovering.current = true;
//     };
//     const onOutInteractive = () => {
//       hovering.current = false;
//     };

//     const attachHoverListeners = () => {
//       document
//         .querySelectorAll("a, button, [data-cursor-hover]")
//         .forEach((el) => {
//           el.addEventListener("mouseenter", onOverInteractive);
//           el.addEventListener("mouseleave", onOutInteractive);
//         });
//     };

//     document.addEventListener("mousemove", onMove);
//     document.addEventListener("mouseenter", onEnter);
//     document.addEventListener("mouseleave", onLeave);
//     document.addEventListener("mousedown", onDown);
//     document.addEventListener("mouseup", onUp);

//     const observer = new MutationObserver(attachHoverListeners);
//     observer.observe(document.body, { childList: true, subtree: true });
//     attachHoverListeners();

//     rafId.current = requestAnimationFrame(animate);

//     return () => {
//       document.removeEventListener("mousemove", onMove);
//       document.removeEventListener("mouseenter", onEnter);
//       document.removeEventListener("mouseleave", onLeave);
//       document.removeEventListener("mousedown", onDown);
//       document.removeEventListener("mouseup", onUp);
//       observer.disconnect();
//       cancelAnimationFrame(rafId.current);
//     };
//   }, [animate]);

//   /* ---- styles ---- */
//   const fixed = {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     pointerEvents: "none",
//     zIndex: 9999,
//   };

//   const transitionColor = "0.35s ease";

//   return (
//     <>
//       {/* Glow halo */}
//       <div
//         ref={glowRef}
//         style={{
//           ...fixed,
//           width: 60,
//           height: 60,
//           borderRadius: "50%",
//           background: `radial-gradient(circle, ${theme.accentGlow} 0%, transparent 70%)`,
//           opacity: 0,
//           transition: `opacity 0.3s ease, background ${transitionColor}`,
//           willChange: "transform, opacity",
//         }}
//       />

//       {/* Trailing ring / reticle */}
//       <div
//         ref={ringRef}
//         style={{
//           ...fixed,
//           width: 36,
//           height: 36,
//           borderRadius: "50%",
//           border: `1.5px solid ${theme.ringBorder}`,
//           opacity: 0,
//           transition: `transform 0.2s ease, opacity 0.2s ease, border-color ${transitionColor}`,
//           willChange: "transform, opacity",
//           mixBlendMode: theme.blendMode,
//         }}
//       />

//       {/* SVG chevron pointer — anchored at top-left tip like a real cursor */}
//       <div
//         ref={pointerRef}
//         style={{
//           ...fixed,
//           width: 20,
//           height: 24,
//           opacity: 0,
//           transition: `transform 0.08s ease-out, opacity 0.15s ease, filter ${transitionColor}`,
//           willChange: "transform, opacity",
//           filter: `drop-shadow(0 0 4px ${theme.accentGlow})`,
//         }}
//       >
//         <svg
//           width="20"
//           height="24"
//           viewBox="0 0 20 24"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           style={{ display: "block", transition: `all ${transitionColor}` }}
//         >
//           {/* Main arrow shape — tip at top-left (0,0) */}
//           <path
//             d="M1 1L1 18L5.5 14L10 22L13 20.5L8.5 12.5L14 11.5L1 1Z"
//             fill={theme.fill}
//             stroke={theme.accent}
//             strokeWidth="1.2"
//             strokeLinejoin="round"
//             strokeLinecap="round"
//             style={{
//               transition: `fill ${transitionColor}, stroke ${transitionColor}`,
//             }}
//           />
//           {/* Inner highlight line for depth */}
//           <path
//             d="M3 4L3 15L6.5 12L10.5 19"
//             fill="none"
//             stroke={theme.highlight}
//             strokeWidth="0.7"
//             strokeLinejoin="round"
//             strokeLinecap="round"
//             style={{ transition: `stroke ${transitionColor}` }}
//           />
//         </svg>
//       </div>

//       {/* Trail particles */}
//       {Array.from({ length: TRAIL_PARTICLE_COUNT }).map((_, i) => (
//         <div
//           key={i}
//           ref={(el) => (trailRefs.current[i] = el)}
//           style={{
//             ...fixed,
//             width: 3.5,
//             height: 3.5,
//             borderRadius: "50%",
//             backgroundColor: theme.accent,
//             opacity: 0,
//             transition: `background-color ${transitionColor}`,
//             willChange: "transform, opacity",
//           }}
//         />
//       ))}
//     </>
//   );
// }

// export default Cursor;

import * as React from "react";
import { useAppContext } from "../../context/appContext";

/**
 * Space-themed custom cursor — chevron pointer + trailing reticle ring.
 *
 * The primary cursor element is a small SVG arrow/chevron so it still
 * feels like a real pointer. Behind it a glowing ring trails smoothly,
 * keeping the HUD / futuristic aesthetic.
 *
 * Features:
 *  - SVG chevron pointer pinned to the mouse (top-left anchored like a real cursor)
 *  - Smooth trailing outer ring (lerp-based)
 *  - Soft radial glow that follows the ring
 *  - Subtle particle trail
 *  - Hover state: ring expands, chevron scales up slightly, glow intensifies
 *  - Click state: ring + chevron contract for a pulse feel
 *  - All refs-based — zero React re-renders during movement
 */

const LERP_SPEED = 0.12;
const TRAIL_PARTICLE_COUNT = 5;

function Cursor() {
  const { isCursorHovering } = useAppContext();

  /* ---- refs ---- */
  const ringRef = React.useRef(null);
  const pointerRef = React.useRef(null);
  const glowRef = React.useRef(null);
  const trailRefs = React.useRef([]);
  const rafId = React.useRef(null);

  const mouse = React.useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const ring = React.useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const trail = React.useRef(
    Array.from({ length: TRAIL_PARTICLE_COUNT }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    })),
  );
  const visible = React.useRef(false);
  const pressed = React.useRef(false);
  const hovering = React.useRef(false);

  /* ---- sync context hover ---- */
  React.useEffect(() => {
    hovering.current = isCursorHovering;
  }, [isCursorHovering]);

  /* ---- animation loop ---- */
  const animate = React.useCallback(() => {
    const mx = mouse.current.x;
    const my = mouse.current.y;

    // Lerp ring toward mouse
    ring.current.x += (mx - ring.current.x) * LERP_SPEED;
    ring.current.y += (my - ring.current.y) * LERP_SPEED;

    // Trail particles chain
    for (let i = 0; i < TRAIL_PARTICLE_COUNT; i++) {
      const target = i === 0 ? ring.current : trail.current[i - 1];
      const speed = 0.22 - i * 0.03;
      trail.current[i].x += (target.x - trail.current[i].x) * speed;
      trail.current[i].y += (target.y - trail.current[i].y) * speed;
    }

    const isHover = hovering.current;
    const isPressed = pressed.current;

    /* ---- pointer (top-left anchored like a real cursor) ---- */
    if (pointerRef.current) {
      const pScale = isPressed ? 0.85 : isHover ? 1.15 : 1;
      pointerRef.current.style.transform = `translate(${mx}px, ${my}px) scale(${pScale})`;
    }

    /* ---- ring ---- */
    if (ringRef.current) {
      const rScale = isPressed ? 0.7 : isHover ? 1.5 : 1;
      ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%) scale(${rScale})`;
      ringRef.current.style.borderColor = isHover
        ? "rgba(100, 220, 255, 0.9)"
        : "rgba(100, 200, 255, 0.5)";
    }

    /* ---- glow ---- */
    if (glowRef.current) {
      glowRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      glowRef.current.style.opacity = isHover ? "0.55" : "0.2";
    }

    /* ---- trail particles ---- */
    trailRefs.current.forEach((el, i) => {
      if (!el) return;
      const t = trail.current[i];
      const opacity = (1 - i / TRAIL_PARTICLE_COUNT) * 0.35;
      const size = Math.max(2, 3.5 - i * 0.4);
      el.style.transform = `translate(${t.x}px, ${t.y}px) translate(-50%, -50%)`;
      el.style.opacity = visible.current ? String(opacity) : "0";
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
    });

    rafId.current = requestAnimationFrame(animate);
  }, []);

  /* ---- event listeners ---- */
  React.useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!visible.current) {
        visible.current = true;
        setVisibility(true);
      }
    };
    const onEnter = () => {
      visible.current = true;
      setVisibility(true);
    };
    const onLeave = () => {
      visible.current = false;
      setVisibility(false);
    };
    const onDown = () => {
      pressed.current = true;
    };
    const onUp = () => {
      pressed.current = false;
    };

    function setVisibility(show) {
      const o = show ? "1" : "0";
      if (pointerRef.current) pointerRef.current.style.opacity = o;
      if (ringRef.current) ringRef.current.style.opacity = o;
      if (glowRef.current) glowRef.current.style.opacity = show ? "0.2" : "0";
    }

    const onOverInteractive = () => {
      hovering.current = true;
    };
    const onOutInteractive = () => {
      hovering.current = false;
    };

    const attachHoverListeners = () => {
      document
        .querySelectorAll("a, button, [data-cursor-hover]")
        .forEach((el) => {
          el.addEventListener("mouseenter", onOverInteractive);
          el.addEventListener("mouseleave", onOutInteractive);
        });
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    attachHoverListeners();

    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      observer.disconnect();
      cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  /* ---- styles ---- */
  const fixed = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 9999,
  };

  const accent = "rgba(100, 200, 255, 1)";
  const accentGlow = "rgba(100, 200, 255, 0.35)";

  return (
    <>
      {/* Glow halo */}
      <div
        ref={glowRef}
        style={{
          ...fixed,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentGlow} 0%, transparent 70%)`,
          opacity: 0,
          transition: "opacity 0.3s ease",
          willChange: "transform, opacity",
        }}
      />

      {/* Trailing ring / reticle */}
      <div
        ref={ringRef}
        style={{
          ...fixed,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: `1.5px solid rgba(100, 200, 255, 0.5)`,
          opacity: 0,
          transition:
            "transform 0.2s ease, opacity 0.2s ease, border-color 0.25s ease",
          willChange: "transform, opacity",
          mixBlendMode: "screen",
        }}
      />

      {/* SVG chevron pointer — anchored at top-left tip like a real cursor */}
      {/* <div
        ref={pointerRef}
        style={{
          ...fixed,
          width: 20,
          height: 24,
          opacity: 0,
          transition: "transform 0.08s ease-out, opacity 0.15s ease",
          willChange: "transform, opacity",
          filter: `drop-shadow(0 0 4px ${accentGlow})`,
        }}
      >
        <svg
          width="20"
          height="24"
          viewBox="0 0 20 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          <path
            d="M1 1L1 18L5.5 14L10 22L13 20.5L8.5 12.5L14 11.5L1 1Z"
            fill="rgba(100, 200, 255, 0.15)"
            stroke={accent}
            strokeWidth="1.2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d="M3 4L3 15L6.5 12L10.5 19"
            fill="none"
            stroke="rgba(180, 230, 255, 0.3)"
            strokeWidth="0.7"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div> */}

      {/* Trail particles */}
      {Array.from({ length: TRAIL_PARTICLE_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          style={{
            ...fixed,
            width: 3.5,
            height: 3.5,
            borderRadius: "50%",
            backgroundColor: accent,
            opacity: 0,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </>
  );
}

export default Cursor;
