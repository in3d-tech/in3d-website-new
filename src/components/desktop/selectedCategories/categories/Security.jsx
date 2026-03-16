import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Logo, VideoPlayer } from "../../../common/Logo";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// HoverVideoCard
// ─────────────────────────────────────────────────────────────────────────────
const HoverVideoCard = ({
  videoRef,
  src,
  startTime,
  children,
  className,
  style,
}) => {
  const handleMouseEnter = () => {
    const v = videoRef?.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  };
  const handleMouseLeave = () => {
    videoRef?.current?.pause();
  };
  return (
    <div
      className={`sec-hover-video ${className || ""}`}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sec-video-controls-mask" />
      <VideoPlayer videoRef={videoRef} src={src} startTime={startTime} />
      <div className="sec-hover-play-hint">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      </div>
      {children}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SECURITY PAGE
// ─────────────────────────────────────────────────────────────────────────────
export function Security() {
  const topVid1Ref = useRef(null);
  const topVid2Ref = useRef(null);
  const topVid3Ref = useRef(null);
  const botVid1Ref = useRef(null);
  const botVid2Ref = useRef(null);
  const botVid3Ref = useRef(null);
  const botVid4Ref = useRef(null);

  // GSAP refs
  const bottomRef = useRef(null);
  const botTextRef = useRef(null);
  const botClusterRef = useRef(null);
  const botAccentRef = useRef(null);

  useEffect(() => {
    const scroller = ".selected-category-wrapper";

    const ctx = gsap.context(() => {
      // Accent rule grows
      gsap.fromTo(
        botAccentRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: bottomRef.current,
            scroller,
            start: "top 65%",
            end: "top 40%",
            scrub: 1,
          },
        },
      );

      // Text wipe
      gsap.fromTo(
        botTextRef.current,
        { clipPath: "inset(0 0 100% 0)", y: 20, opacity: 0 },
        {
          clipPath: "inset(0 0 0% 0)",
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: bottomRef.current,
            scroller,
            start: "top 60%",
            end: "top 15%",
            scrub: 1.2,
          },
        },
      );

      // Cluster rises + degreyscales
      gsap.fromTo(
        botClusterRef.current,
        { y: 80, opacity: 0, filter: "grayscale(100%) brightness(0.5)" },
        {
          y: 0,
          opacity: 1,
          filter: "grayscale(0%) brightness(1)",
          ease: "none",
          scrollTrigger: {
            trigger: bottomRef.current,
            scroller,
            start: "top 65%",
            end: "top 5%",
            scrub: 1.5,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="sec-page">
        <Logo />
        <Top
          topVid1Ref={topVid1Ref}
          topVid2Ref={topVid2Ref}
          topVid3Ref={topVid3Ref}
        />
        <Bottom
          bottomRef={bottomRef}
          botTextRef={botTextRef}
          botClusterRef={botClusterRef}
          botAccentRef={botAccentRef}
          botVid1Ref={botVid1Ref}
          botVid2Ref={botVid2Ref}
          botVid3Ref={botVid3Ref}
          botVid4Ref={botVid4Ref}
        />
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOP  — text LEFT, video cluster RIGHT
// Security's original layout had text on the left (unusual vs Industry/Medicine
// which put text left too, but with the headline BELOW the body copy).
// Here we restore that inverted order as a deliberate design choice.
// ─────────────────────────────────────────────────────────────────────────────
const Top = ({ topVid1Ref, topVid2Ref, topVid3Ref }) => (
  <div className="sec-top">
    {/* Subtle cross-hatch texture */}
    <div className="sec-top-grid" />

    {/* ── LEFT: inverted copy — body first, headline second ── */}
    <div className="sec-top-left">
      <div className="sec-eyebrow">
        <span className="sec-eyebrow-line" />
        <span>Defense & MOD</span>
        <span className="sec-dot" />
        <span>Official Provider</span>
      </div>

      <p className="sec-body-text-top">
        In3D has strong relations with the security and defense sector and is an
        MOD (Ministry of Defense) official provider — working directly with the
        fire and rescue department, Israel Police, IDF, and more.
      </p>

      <h1 className="sec-headline">
        <span className="sec-headline-word" style={{ animationDelay: "0.35s" }}>
          Security
        </span>
      </h1>

      <div className="sec-divider-animated" />

      <div className="sec-tags">
        {["MOD", "IDF", "XR Simulation", "AR"].map((t, i) => (
          <span
            key={t}
            className="sec-tag"
            style={{ animationDelay: `${1 + i * 0.1}s` }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Clearance-style badge */}
      <div
        className="sec-clearance-badge sec-glass"
        style={{ animationDelay: "1.3s" }}
      >
        <span className="sec-clearance-dot" />
        <span className="sec-clearance-text">Certified MOD Supplier</span>
      </div>
    </div>

    {/* ── RIGHT: 3-video cluster ── */}
    <div className="sec-top-right">
      <div className="sec-top-cluster">
        {/* Large main card */}
        <HoverVideoCard
          videoRef={topVid1Ref}
          src="https://in3dwebsite.blob.core.windows.net/video/Hololens-Abach-Treatment-Simulator.mp4"
          className="sec-top-vid sec-top-vid--main sec-glass"
        >
          <span className="sec-vid-label">AR Treatment Simulator</span>
          {/* <div className="sec-img-corner sec-img-corner--tl" />
          <div className="sec-img-corner sec-img-corner--br" /> */}
        </HoverVideoCard>

        {/* Top-left float */}
        <HoverVideoCard
          videoRef={topVid2Ref}
          src="https://in3dwebsite.blob.core.windows.net/video/AR Factory Real Time Control Panel Data - 2 level (3).mp4"
          className="sec-top-vid sec-top-vid--tl sec-glass"
        >
          <span className="sec-vid-label">Control Panel AR</span>
        </HoverVideoCard>

        {/* Bottom-left float */}
        <HoverVideoCard
          videoRef={topVid3Ref}
          src="https://in3dwebsite.blob.core.windows.net/video/ICL - Smart 3D Warehouse.mp4"
          className="sec-top-vid sec-top-vid--bl sec-glass"
        >
          <span className="sec-vid-label">Smart Warehouse</span>
        </HoverVideoCard>

        <div className="sec-deco-word">DEF</div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// BOTTOM
// ─────────────────────────────────────────────────────────────────────────────
const Bottom = ({
  bottomRef,
  botTextRef,
  botClusterRef,
  botAccentRef,
  botVid1Ref,
  botVid2Ref,
  botVid3Ref,
  botVid4Ref,
}) => (
  <div ref={bottomRef} className="sec-bottom">
    <div className="sec-bot-content">
      {/* ── LEFT: editorial text ── */}
      <div className="sec-bot-text-col">
        <div ref={botAccentRef} className="sec-bot-accent-rule" />

        <p className="sec-bot-overline">Vision & Impact</p>

        <div ref={botTextRef} className="sec-bot-quote-block">
          <p className="sec-bot-quote-mark">"</p>
          <p className="sec-bot-body">
            Part of our vision is to promote innovation — a big part of what
            Israel stands for. We've delivered top-of-the-line technology
            through complex simulators, XR platforms, and tailored applications
            now in service of this significant sector.
          </p>
          <div className="sec-bot-sig">
            <span className="sec-bot-sig-line" />
            <span>in3D Security Division</span>
          </div>
        </div>

        <div className="sec-bot-metrics">
          {[
            // { n: "MOD", d: "Certified" },
            // { n: "4+", d: "Security bodies" },
            { n: "XR", d: "Simulators" },
          ].map(({ n, d }) => (
            <div key={d} className="sec-bot-metric">
              <span className="sec-bot-metric-n">{n}</span>
              <span className="sec-bot-metric-d">{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT: 4-video cluster ── */}
      <div ref={botClusterRef} className="sec-bot-cluster">
        {/* Large card */}
        <div className="sec-bot-vid-large sec-glass">
          <HoverVideoCard
            videoRef={botVid1Ref}
            src="https://in3dwebsite.blob.core.windows.net/video/VR - Fire Department - Elevator Simulator (1).mp4"
            className="sec-bot-vid-inner"
          >
            <span className="sec-bot-vid-badge">Fire Dept. Simulator</span>
          </HoverVideoCard>
          {/* <div className="sec-img-corner sec-img-corner--tl" />
          <div className="sec-img-corner sec-img-corner--br" /> */}
        </div>

        {/* Three smaller stacked / grid cards */}
        <div className="sec-bot-vid-grid">
          <div className="sec-bot-vid-small sec-glass">
            <HoverVideoCard
              videoRef={botVid2Ref}
              src="https://in3dwebsite.blob.core.windows.net/video/AR Factory Real Time Control Panel Data - 2 level (3).mp4"
              className="sec-bot-vid-inner"
            >
              <span className="sec-bot-vid-badge">AR Control Panel</span>
            </HoverVideoCard>
          </div>

          <div className="sec-bot-vid-small sec-glass">
            <HoverVideoCard
              videoRef={botVid3Ref}
              src="https://in3dwebsite.blob.core.windows.net/video/Hololens 2 - Guides (2).mp4"
              startTime={7}
              className="sec-bot-vid-inner"
            >
              <span className="sec-bot-vid-badge">HoloLens Guides</span>
            </HoverVideoCard>
          </div>

          <div className="sec-bot-vid-small sec-glass">
            <HoverVideoCard
              videoRef={botVid4Ref}
              src="https://in3dwebsite.blob.core.windows.net/video/Hololens 1 - Remote Assist (2).mp4"
              startTime={2}
              className="sec-bot-vid-inner"
            >
              <span className="sec-bot-vid-badge">Remote Assist</span>
            </HoverVideoCard>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SCOPED CSS
// ─────────────────────────────────────────────────────────────────────────────
const css = `
/* ── Base ────────────────────────────────────────────────────────────────── */
.sec-page {
  display: flex;
  flex-direction: column;
  height: 200vh;
  font-family: 'Gotham', 'gotham-bold', 'Swiss 721 Black', sans-serif;
  color: #0d0d0d;
}

.sec-glass {
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(14px) saturate(170%);
  -webkit-backdrop-filter: blur(14px) saturate(170%);
  border: 1px solid rgba(255,255,255,0.36);
  border-radius: 14px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.16);
}

/* ── HoverVideoCard ──────────────────────────────────────────────────────── */
.sec-hover-video {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  width: 100%;
  height: 100%;
}
.sec-video-controls-mask {
  position: absolute;
  inset: 0;
  z-index: 3;
  background: transparent;
  pointer-events: none;
}
.sec-hover-video video::-webkit-media-controls { display: none !important; }
.sec-hover-video video::-webkit-media-controls-enclosure { display: none !important; }
.sec-hover-video video { pointer-events: none; }
.sec-hover-play-hint {
  position: absolute;
  inset: 0;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: opacity 0.3s ease;
  background: rgba(0,0,0,0.2);
}
.sec-hover-video:hover .sec-hover-play-hint { opacity: 0; }
.sec-hover-play-hint svg { filter: drop-shadow(0 2px 6px rgba(0,0,0,0.6)); }

/* ── Keyframes ───────────────────────────────────────────────────────────── */
@keyframes secFadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes secSliceUp {
  to { opacity: 1; transform: translateY(0) skewX(0deg); }
}
@keyframes secGrowLine {
  to { width: 72px; }
}
@keyframes secBlink {
  0%,100% { opacity: 1; }
  50%      { opacity: 0; }
}

/* ── TOP ─────────────────────────────────────────────────────────────────── */
.sec-top {
  display: flex;
  height: 100vh;
  padding: 0 5%;
  gap: 4%;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* Subtle angled rule texture — gives a tactical/military feel */
.sec-top-grid {
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(
      -55deg,
      rgba(0,0,0,0.025) 0px,
      rgba(0,0,0,0.025) 1px,
      transparent 1px,
      transparent 48px
    );
  pointer-events: none;
  z-index: 0;
}

/* ── TOP LEFT ── */
.sec-top-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.2rem;
  z-index: 1;
}

.sec-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.45);
  opacity: 0;
  animation: secFadeUp 0.7s ease forwards;
  animation-delay: 0.1s;
  font-family: 'swiss-medium', 'gotham-old', sans-serif;
}
.sec-eyebrow-line {
  display: inline-block;
  width: 32px;
  height: 1px;
  background: currentColor;
}
.sec-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: currentColor;
}

/* Body text comes BEFORE the headline — intentional inversion */
.sec-body-text-top {
  font-size: clamp(0.88rem, 1.15vw, 1rem);
  line-height: 1.88;
  color: rgba(13,13,13,0.65);
  max-width: 420px;
  opacity: 0;
  animation: secFadeUp 0.8s ease forwards;
  animation-delay: 0.22s;
  font-family: 'gotham-old', 'swiss-medium', sans-serif;
  font-weight: 400;
}

.sec-headline {
  font-size: clamp(3.8rem, 7vw, 7rem);
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  line-height: 0.92;
  margin: 0;
}
.sec-headline-word {
  display: inline-block;
  opacity: 0;
  transform: translateY(50px) skewX(-6deg);
  animation: secSliceUp 0.65s cubic-bezier(0.16,1,0.3,1) forwards;
}

.sec-divider-animated {
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #0d0d0d 0%, rgba(13,13,13,0.18) 100%);
  animation: secGrowLine 1s cubic-bezier(0.16,1,0.3,1) forwards;
  animation-delay: 0.6s;
}

.sec-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.sec-tag {
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 0.35em 0.9em;
  border: 1px solid rgba(0,0,0,0.22);
  border-radius: 100px;
  color: rgba(0,0,0,0.58);
  opacity: 0;
  animation: secFadeUp 0.5s ease forwards;
  font-family: 'swiss-medium', sans-serif;
}

/* MOD clearance badge */
.sec-clearance-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 1rem;
  width: fit-content;
  opacity: 0;
  animation: secFadeUp 0.6s ease forwards;
}
.sec-clearance-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #2d6a2d;
  box-shadow: 0 0 6px rgba(45,106,45,0.7);
  animation: secBlink 2s infinite;
  flex-shrink: 0;
}
.sec-clearance-text {
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.55);
  font-family: 'swiss-medium', sans-serif;
}

/* ── TOP RIGHT: cluster ── */
.sec-top-right {
  flex: 1.1;
  position: relative;
  height: 76%;
  z-index: 1;
}
.sec-top-cluster {
  position: relative;
  width: 100%;
  height: 100%;
}

.sec-top-vid {
  position: absolute;
  overflow: hidden;
  opacity: 0;
  animation: secFadeUp 0.9s ease forwards;
}
/* Large main — centre-right */
.sec-top-vid--main {
  top: 8%;
  left: 14%;
  width: 72%;
  height: 56%;
  animation-delay: 0.3s;
}
/* Top-left float */
.sec-top-vid--tl {
  top: 0%;
  left: -2%;
  width: 34%;
  height: 36%;
  animation-delay: 0.5s;
}
/* Bottom-left float */
.sec-top-vid--bl {
  bottom: 0%;
  left: -2%;
  width: 34%;
  height: 34%;
  animation-delay: 0.65s;
}

.sec-vid-label {
  position: absolute;
  bottom: 9px;
  left: 11px;
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.88);
  background: rgba(0,0,0,0.32);
  backdrop-filter: blur(6px);
  padding: 2px 9px;
  border-radius: 100px;
  font-family: 'swiss-medium', sans-serif;
  z-index: 5;
  white-space: nowrap;
}

.sec-img-corner {
  position: absolute;
  width: 18px;
  height: 18px;
  border-color: rgba(255,255,255,0.85);
  border-style: solid;
  z-index: 5;
}
.sec-img-corner--tl { top: 8px; left: 8px; border-width: 2px 0 0 2px; }
.sec-img-corner--br { bottom: 8px; right: 8px; border-width: 0 2px 2px 0; }

.sec-deco-word {
  position: absolute;
  bottom: 2%;
  right: -2%;
  font-size: clamp(4rem, 7vw, 7.5rem);
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  color: transparent;
  -webkit-text-stroke: 1px rgba(0,0,0,0.07);
  pointer-events: none;
  user-select: none;
  line-height: 1;
  opacity: 0;
  animation: secFadeUp 1.2s ease forwards;
  animation-delay: 0.9s;
}

/* ── BOTTOM ──────────────────────────────────────────────────────────────── */
.sec-bottom {
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
}

/* Faint diagonal lines echo the top texture */
.sec-bottom::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(
      -55deg,
      rgba(0,0,0,0.018) 0px,
      rgba(0,0,0,0.018) 1px,
      transparent 1px,
      transparent 48px
    );
  pointer-events: none;
  z-index: 0;
}

.sec-bot-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 5%;
  gap: 5%;
}

/* ── BOTTOM LEFT ── */
.sec-bot-text-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  max-width: 400px;
}

.sec-bot-accent-rule {
  width: 64px;
  height: 3px;
  background: linear-gradient(90deg, #2d6a2d 0%, rgba(45,106,45,0.18) 100%);
  transform-origin: left center;
}

.sec-bot-overline {
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.38);
  font-family: 'swiss-medium', sans-serif;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.sec-bot-overline::before {
  content: '';
  display: inline-block;
  width: 24px;
  height: 1px;
  background: currentColor;
}

.sec-bot-quote-block {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.sec-bot-quote-mark {
  font-size: 5rem;
  line-height: 0.6;
  color: rgba(45,106,45,0.1);
  font-family: 'Gotham', serif;
  margin: 0;
}
.sec-bot-body {
  font-size: clamp(0.9rem, 1.2vw, 1.05rem);
  line-height: 1.9;
  color: rgba(0,0,0,0.7);
  margin: 0;
  font-family: 'gotham-old', 'swiss-medium', sans-serif;
  font-weight: 400;
}
.sec-bot-sig {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.38);
  font-family: 'swiss-medium', sans-serif;
}
.sec-bot-sig-line {
  display: inline-block;
  width: 28px;
  height: 1px;
  background: currentColor;
}

.sec-bot-metrics {
  display: flex;
  gap: 1.8rem;
  padding-top: 0.6rem;
  border-top: 1px solid rgba(0,0,0,0.08);
}
.sec-bot-metric {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
.sec-bot-metric-n {
  font-size: 1.5rem;
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  line-height: 1;
  color: #0d0d0d;
}
.sec-bot-metric-d {
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.4);
  font-family: 'swiss-medium', sans-serif;
}

/* ── BOTTOM RIGHT: 4-video cluster ── */
.sec-bot-cluster {
  flex: 1.2;
  display: flex;
  gap: 1rem;
  height: 62%;
}

.sec-bot-vid-large {
  flex: 1.3;
  position: relative;
  overflow: hidden;
}

.sec-bot-vid-grid {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sec-bot-vid-small {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.sec-bot-vid-inner {
  position: absolute !important;
  inset: 0;
}

.sec-bot-vid-badge {
  position: absolute;
  bottom: 8px;
  left: 10px;
  font-size: 0.58rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.88);
  background: rgba(0,0,0,0.32);
  backdrop-filter: blur(6px);
  padding: 2px 8px;
  border-radius: 100px;
  font-family: 'swiss-medium', sans-serif;
  z-index: 5;
  white-space: nowrap;
}
`;
