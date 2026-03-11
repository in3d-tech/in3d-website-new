// import { Sparkles } from "@react-three/drei";
// import { Suspense, useEffect, useState } from "react";
// import { useAppContext } from "../../context/appContext";
// import { Canvas } from "@react-three/fiber";
// import { TextScrambleComponent } from "../common/shuffleTexts";
// import Cursor from "../common/cursor";
// // import { useGLTFAnimations } from "../scene/ModelComponent";
// // import * as THREE from "three";

// export function LoadingScreen({
//   setShowloadingScreen,
//   isMobileViewOnly,
//   showLoadingScreen,
// }) {
//   const [fadeOut, setFadeOut] = useState("");
//   const { isAstroModelDrawn, setRenderModels, customizeHasRendered } =
//     useAppContext();
//   const [has4SecondsPassed, setHas4SecondsPassed] = useState(false);
//   const [showDelayedMessage, setShowDelayedMessage] = useState(false);
//   const [showLoading, setShowLoading] = useState(true);
//   const [sparklesColorIndex, setSparklesColorIndex] = useState(0);

//   const height = window.innerHeight * 0.3;

//   if (!has4SecondsPassed) {
//     setTimeout(() => setHas4SecondsPassed(true), 3600);
//   }

//   useEffect(() => {
//     const delayedtimeout = setTimeout(() => {
//       setShowDelayedMessage(true);
//     }, 5000);
//     // return;
//     if (!has4SecondsPassed) {
//       return;
//     }
//     // if (isMobileViewOnly && showLoading) {
//     if (isAstroModelDrawn && isMobileViewOnly) {
//       const fadeOutTimer = setTimeout(() =>
//         setFadeOut("flashing-fade-out", 1000),
//       );
//       const loadingScreen = setTimeout(() => setShowloadingScreen(false), 1500);
//       const showLoad = setTimeout(() => setShowLoading(false), 1500);
//       document.body.style.overflowY = "auto";
//       return () => {
//         clearTimeout(loadingScreen);
//         clearTimeout(showLoad);
//         clearTimeout(fadeOutTimer);
//       };
//     }

//     if (isAstroModelDrawn && !isMobileViewOnly) {
//       // const renderModels = setTimeout(() => setRenderModels(true), 500);

//       if (customizeHasRendered) {
//         const fadeOut = setTimeout(() => {
//           setFadeOut("flashing-fade-out");
//           document.body.style.overflowY = "auto";
//         }, 100);
//         const closeLoadingScreen = setTimeout(
//           () => setShowloadingScreen(false),
//           1200,
//         );
//         return () => {
//           // clearTimeout(loadingText);
//           clearTimeout(fadeOut);
//           clearTimeout(closeLoadingScreen);
//         };
//       }

//       return () => {
//         // clearTimeout(renderModels);
//         clearTimeout(delayedtimeout);
//       };
//     }
//   }, [isAstroModelDrawn, customizeHasRendered, has4SecondsPassed]);

//   const sparklesColours = [
//     "#0DA888", //"#CF9FFF",
//     "#3DE9D9",
//     "#CF9FFF",
//     "#995812",
//     "#3DE7E9",
//     "#467B3F",
//     "#F0CF5E",
//   ];

//   useEffect(() => {
//     // Color switching interval
//     const colorSwitchInterval = setInterval(() => {
//       setSparklesColorIndex(
//         (prevIndex) => (prevIndex + 1) % sparklesColours.length,
//       );
//     }, 4000);

//     // Clear interval on component unmount
//     return () => clearInterval(colorSwitchInterval);
//   }, []);

//   return (
//     <div className={`flashing-div ${fadeOut}`}>
//       {showLoadingScreen ? <Cursor /> : null}
//       <div className="scale-effect"></div>
//       {showDelayedMessage ? (
//         <div
//           style={{
//             position: "absolute",
//             fontFamily: "gotham",
//             bottom: "2em",
//             textAlign: "center",
//             // left: "25%",
//             width: "100%",
//             color: "white",
//             animation: "fadeIn 2s ease-in-out",
//           }}
//         >
//           Welcome to our 3D experience! The initial load might take a bit longer
//           as <br /> we're preparing all the interactive elements for you. Please
//           be patient—it'll be worth the wait!
//         </div>
//       ) : null}
//       <div
//         style={{
//           // border: "1px solid cyan",
//           borderRadius: "50%",
//           height: "400px",
//           width: "400px",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//           // border: "1px solid red",
//         }}
//       >
//         <Canvas
//           style={{
//             width: "100vw",
//             height: "100vh",
//             position: "absolute",
//           }}
//         >
//           <ambientLight intensity={2} />
//           <Suspense fallback={null}>
//             <Sparkles
//               count={400}
//               scale={10}
//               size={2.5}
//               color={sparklesColours[sparklesColorIndex]}
//             />
//           </Suspense>
//         </Canvas>
//         <div
//           style={{
//             width: "100vw",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           {/* UPDATED LOGO CONTAINER START */}
//           <div>
//             <img
//               className="flashing-img"
//               style={{
//                 height: height,
//                 // THE DYNAMIC GLOW EFFECT
//                 filter: `drop-shadow(0 0 15px)
//                         drop-shadow(0 0 30px rgba(255, 255, 255, 0.1))`,
//                 transition: "filter 1s ease-in-out", // Smooth transition when color switches
//                 opacity: 0.5,
//               }}
//               src="/assets/images/plain-logo.png"
//               alt="logo-plain"
//             />
//           </div>
//           {/* UPDATED LOGO CONTAINER END */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               width: "100vw",
//               justifyContent: "center",
//             }}
//           >
//             <div
//               style={{
//                 flex: 1,
//                 height: "100%",
//                 display: "flex",
//                 justifyContent: "flex-end",
//                 alignItems: "flex-end",
//               }}
//             >
//               <span className="abla" style={{ margin: 0 }}>
//                 Simply{" "}
//               </span>
//             </div>

//             <div style={{ flex: 1 }}>
//               <TextScrambleComponent
//                 colour={sparklesColours[sparklesColorIndex]}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";

// ─── Orbital Ring ────────────────────────────────────────────────
// A single SVG ring that rotates in 3D space
const OrbitalRing = ({
  size,
  duration,
  delay,
  color,
  opacity,
  tilt,
  reverse,
}) => (
  <div
    style={{
      position: "absolute",
      width: size,
      height: size,
      animation: `${reverse ? "spinReverse" : "spin"} ${duration}s linear infinite`,
      animationDelay: `${delay}s`,
      transform: `rotateX(${tilt}deg) rotateY(20deg)`,
      opacity,
    }}
  >
    <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient
          id={`ring-grad-${size}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="50%" stopColor={color} stopOpacity="0.1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <circle
        cx="100"
        cy="100"
        r="95"
        fill="none"
        stroke={`url(#ring-grad-${size})`}
        strokeWidth="0.5"
        strokeDasharray="8 12"
      />
    </svg>
  </div>
);

// ─── Particle Field (pure CSS, no Three.js needed) ──────────────
const ParticleField = ({ count, accentColor }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * -20,
      opacity: Math.random() * 0.6 + 0.1,
      drift: (Math.random() - 0.5) * 40,
      isAccent: Math.random() < 0.15,
    }));
  }, [count]);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: p.isAccent ? accentColor : "rgba(255,255,255,0.7)",
            boxShadow: p.isAccent ? `0 0 6px ${accentColor}` : "none",
            opacity: p.opacity,
            animation: `floatParticle ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            "--drift": `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
};

// ─── Scan Line Effect ────────────────────────────────────────────
const ScanLines = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
      pointerEvents: "none",
      zIndex: 5,
    }}
  />
);

// ─── Hex Grid Background ────────────────────────────────────────
const HexGrid = () => (
  <svg
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      opacity: 0.03,
    }}
  >
    <defs>
      <pattern
        id="hexagons"
        width="56"
        height="100"
        patternUnits="userSpaceOnUse"
        patternTransform="scale(2)"
      >
        <path
          d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
        />
        <path
          d="M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hexagons)" />
  </svg>
);

// ─── Progress Indicator ──────────────────────────────────────────
const ProgressArc = ({ progress, color }) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      viewBox="0 0 100 100"
      style={{
        position: "absolute",
        width: 160,
        height: 160,
        transform: "rotate(-90deg)",
      }}
    >
      {/* Track */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="0.5"
      />
      {/* Progress */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.6s ease, stroke 1s ease" }}
      />
    </svg>
  );
};

// ─── Text Scramble (loading-screen-only version) ─────────────────
const CHARS = "!<>-_/[]{}—=+*^?#________";
const VOWELS = "aeiouAEIOU";

function useTextScramble(phrases, speed = 1) {
  const elRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    let counter = 0;
    let queue = [];
    let frame = 0;
    let resolve;

    function randomChar() {
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    function update() {
      let output = "";
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        let { from, to, start, end, char } = queue[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = randomChar();
            queue[i].char = char;
          }
          output += `<span style="opacity:0.4">${char}</span>`;
        } else {
          output += from;
        }
      }
      el.innerHTML = output;
      if (complete === queue.length) {
        resolve?.();
      } else {
        frameRef.current = requestAnimationFrame(update);
        frame++;
      }
    }

    function setText(newText) {
      const oldText = el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((r) => (resolve = r));
      queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || "";
        const to = newText[i] || "";
        if (!VOWELS.includes(to)) {
          queue.push({ from, to, start: 0, end: 0 });
          continue;
        }
        const start = Math.random() * 40 * speed;
        const end = start + Math.random() * 40 * speed;
        queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(frameRef.current);
      frame = 0;
      update();
      return promise;
    }

    function next() {
      setText(phrases[counter]).then(() => {
        setTimeout(next, 120);
      });
      counter = (counter + 1) % phrases.length;
    }
    next();

    return () => cancelAnimationFrame(frameRef.current);
  }, [phrases, speed]);

  return elRef;
}

// ─── Accent Color Palette ────────────────────────────────────────
const ACCENT_COLORS = [
  "#0DA888",
  "#3DE9D9",
  "#CF9FFF",
  "#3DE7E9",
  "#F0CF5E",
  "#0DA888",
];

const PHRASES = [
  "Pioneer",
  "Develop",
  "Advance",
  "Expand",
  "Craft",
  "Build",
  "Design",
];

// ─── Main Loading Screen ─────────────────────────────────────────
export function LoadingScreen({
  setShowloadingScreen,
  isMobileViewOnly,
  showLoadingScreen,
}) {
  const [fadeOut, setFadeOut] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING SYSTEMS");

  const accentColor = ACCENT_COLORS[colorIndex];
  const scrambleRef = useTextScramble(PHRASES);

  // Cycle accent colors
  useEffect(() => {
    const iv = setInterval(() => {
      setColorIndex((i) => (i + 1) % ACCENT_COLORS.length);
    }, 3500);
    return () => clearInterval(iv);
  }, []);

  // Simulated progress (replace with real loading logic)
  useEffect(() => {
    const stages = [
      { at: 15, text: "LOADING ASSETS" },
      { at: 40, text: "BUILDING 3D SCENE" },
      { at: 65, text: "PREPARING ENVIRONMENT" },
      { at: 85, text: "ALMOST READY" },
      { at: 100, text: "LAUNCHING" },
    ];

    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(iv);
          return 100;
        }
        const next = Math.min(p + Math.random() * 3 + 0.5, 100);
        const stage = stages.find((s) => next >= s.at && p < s.at);
        if (stage) setStatusText(stage.text);
        return next;
      });
    }, 120);

    return () => clearInterval(iv);
  }, []);

  // TODO: Hook into your real model-loaded state instead of this timer
  // Replace this block with your existing isAstroModelDrawn / customizeHasRendered logic
  useEffect(() => {
    if (progress >= 100) {
      const t1 = setTimeout(() => setFadeOut(true), 600);
      const t2 = setTimeout(() => {
        setShowloadingScreen(false);
        document.body.style.overflowY = "auto";
      }, 1800);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [progress, setShowloadingScreen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');

        .ls-root {
          position: fixed;
          inset: 0;
          z-index: 40;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          overflow: hidden;
          /* Deep space gradient */
          background:
            radial-gradient(ellipse at 20% 50%, rgba(13, 168, 136, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(61, 233, 217, 0.06) 0%, transparent 40%),
            radial-gradient(ellipse at 50% 80%, rgba(207, 159, 255, 0.05) 0%, transparent 50%),
            linear-gradient(180deg, #050d1a 0%, #0a1628 40%, #0d1f3c 70%, #081225 100%);
          font-family: 'Rajdhani', sans-serif;
          transition: opacity 1.2s ease;
        }

        .ls-root.fade-out {
          opacity: 0;
          pointer-events: none;
        }

        /* ── Particle float ─────────────────────── */
        @keyframes floatParticle {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(var(--drift)); opacity: 0; }
        }

        /* ── Orbital spin ───────────────────────── */
        @keyframes spin {
          from { transform: rotateX(70deg) rotateY(0deg); }
          to   { transform: rotateX(70deg) rotateY(360deg); }
        }
        @keyframes spinReverse {
          from { transform: rotateX(60deg) rotateY(360deg); }
          to   { transform: rotateX(60deg) rotateY(0deg); }
        }

        /* ── Logo pulse ─────────────────────────── */
        @keyframes logoPulse {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(13,168,136,0.4)) drop-shadow(0 0 60px rgba(61,233,217,0.15)); }
          50% { filter: drop-shadow(0 0 30px rgba(13,168,136,0.6)) drop-shadow(0 0 80px rgba(61,233,217,0.25)); }
        }

        /* ── Status blink ───────────────────────── */
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* ── Entrance ───────────────────────────── */
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.85); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }

        /* ── Glow line ──────────────────────────── */
        @keyframes glowSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        .ls-center {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          animation: scaleIn 1.2s ease-out both;
        }

        .ls-logo {
          height: clamp(80px, 20vh, 200px);
          animation: logoPulse 4s ease-in-out infinite;
          opacity: 0.8;
          margin-bottom: 4px;
        }

        .ls-title-row {
          display: flex;
          align-items: baseline;
          justify-content: center;
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(1.4rem, 4vw, 2.6rem);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          position: relative;
          white-space: nowrap;
        }

        .ls-title-static {
          color: rgba(255,255,255,0.85);
          position: relative;
          z-index: 1;
        }

        .ls-title-dynamic {
          transition: color 1s ease;
          width: 5em;
          display: inline-block;
          text-align: left;
          margin-left: 0.35em;
        }

        /* ── Progress bar ───────────────────────── */
        .ls-progress-track {
          position: relative;
          width: clamp(200px, 40vw, 360px);
          height: 2px;
          background: rgba(255,255,255,0.06);
          border-radius: 2px;
          margin-top: 24px;
          overflow: hidden;
        }

        .ls-progress-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.5s ease, background 1s ease;
          position: relative;
        }

        .ls-progress-fill::after {
          content: '';
          position: absolute;
          right: 0;
          top: -3px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: inherit;
          box-shadow: 0 0 12px currentColor;
        }

        .ls-progress-glow {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 40%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          animation: glowSweep 2s ease-in-out infinite;
        }

        /* ── Status text ────────────────────────── */
        .ls-status {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(0.6rem, 1.5vw, 0.75rem);
          font-weight: 500;
          letter-spacing: 0.3em;
          color: rgba(255,255,255,0.35);
          margin-top: 14px;
          text-transform: uppercase;
          animation: slideUp 0.6s ease both;
        }

        .ls-status-dot {
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          margin-right: 8px;
          vertical-align: middle;
          animation: blink 1.4s ease-in-out infinite;
          transition: background 1s ease;
        }

        .ls-percent {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(0.55rem, 1.2vw, 0.7rem);
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.15em;
          margin-top: 6px;
          font-weight: 400;
        }

        /* ── Corner decor ───────────────────────── */
        .ls-corner {
          position: absolute;
          width: 60px;
          height: 60px;
          opacity: 0.15;
        }
      

        /* ── Delayed welcome message ────────────── */
        .ls-delayed-msg {
          position: absolute;
          bottom: 2.5em;
          width: 100%;
          text-align: center;
          color: rgba(255,255,255,0.4);
          font-size: clamp(0.7rem, 1.4vw, 0.85rem);
          letter-spacing: 0.05em;
          line-height: 1.7;
          animation: slideUp 1.5s ease both;
        }
      `}</style>

      <div className={`ls-root ${fadeOut ? "fade-out" : ""}`}>
        {/* Background layers */}
        <HexGrid />
        <ParticleField
          count={isMobileViewOnly ? 50 : 120}
          accentColor={accentColor}
        />
        <ScanLines />

        {/* Orbital rings behind center content */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            inset: 0,
            perspective: 800,
          }}
        >
          <OrbitalRing
            size="320px"
            duration={25}
            delay={0}
            color={accentColor}
            opacity={0.12}
            tilt={70}
          />
          <OrbitalRing
            size="440px"
            duration={35}
            delay={-5}
            color="#CF9FFF"
            opacity={0.07}
            tilt={65}
            reverse
          />
          <OrbitalRing
            size="560px"
            duration={50}
            delay={-10}
            color="#3DE9D9"
            opacity={0.05}
            tilt={75}
          />
        </div>

        {/* Center content */}
        <div className="ls-center" style={{ zIndex: 3 }}>
          {/* Progress arc behind logo */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ProgressArc progress={progress} color={accentColor} />
            <img
              className="ls-logo"
              src="/assets/images/plain-logo.png"
              alt="logo"
            />
          </div>

          {/* Title */}
          <div className="ls-title-row">
            <span className="ls-title-static">Simply</span>
            <span
              className="ls-title-dynamic"
              style={{ color: accentColor }}
              ref={scrambleRef}
            />
          </div>

          {/* Progress bar */}
          <div className="ls-progress-track">
            <div
              className="ls-progress-fill"
              style={{
                width: `${progress}%`,
                background: accentColor,
                color: accentColor,
              }}
            />
            {progress < 100 && <div className="ls-progress-glow" />}
          </div>

          {/* Status */}
          <div className="ls-status" key={statusText}>
            <span
              className="ls-status-dot"
              style={{ background: accentColor }}
            />
            {statusText}
          </div>

          <div className="ls-percent">{Math.round(progress)}%</div>
        </div>

        {/* Delayed message for slow loads */}
        {progress < 60 && progress > 20 && (
          <div className="ls-delayed-msg">
            Preparing your 3D experience — this may take a moment on first
            visit.
          </div>
        )}
      </div>
    </>
  );
}

export default LoadingScreen;
