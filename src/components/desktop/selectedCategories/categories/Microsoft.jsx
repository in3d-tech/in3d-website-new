import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { Logo, VideoPlayer } from "../../../common/Logo";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// HoverVideoCard — hides native controls, hover-to-play
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
      className={`ms-hover-video ${className || ""}`}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="ms-video-controls-mask" />
      <VideoPlayer videoRef={videoRef} src={src} startTime={startTime} />
      <div className="ms-hover-play-hint">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      </div>
      {children}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MICROSOFT PAGE
// ─────────────────────────────────────────────────────────────────────────────
export function Microsoft() {
  const [displayVideos, setDisplayVideos] = useState(false);

  const topVid1Ref = useRef(null);
  const topVid2Ref = useRef(null);
  const botVid1Ref = useRef(null);
  const botVid2Ref = useRef(null);
  const botVid3Ref = useRef(null);

  // GSAP refs
  const bottomRef = useRef(null);
  const buildingRef = useRef(null);
  const handshakeRef = useRef(null);
  const botTextRef = useRef(null);
  const botClusterRef = useRef(null);
  const botAccentRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setDisplayVideos(true), 1500);
  }, []);

  useEffect(() => {
    const scroller = ".selected-category-wrapper";

    const ctx = gsap.context(() => {
      // Building background fades + very subtle upward drift
      gsap.fromTo(
        buildingRef.current,
        { opacity: 0, y: 30, scale: 1.05 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: bottomRef.current,
            scroller,
            start: "top 90%",
            end: "top 40%",
            scrub: 2,
          },
        },
      );

      // Accent rule grows left→right
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

      // Partnership text clip-path wipe
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

      // Video cluster rises + degreyscales
      gsap.fromTo(
        botClusterRef.current,
        { y: 80, opacity: 0, filter: "grayscale(100%) brightness(0.55)" },
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
      <div className="ms-page">
        <Logo />
        <Top
          topVid1Ref={topVid1Ref}
          topVid2Ref={topVid2Ref}
          handshakeRef={handshakeRef}
        />
        <Bottom
          bottomRef={bottomRef}
          buildingRef={buildingRef}
          botTextRef={botTextRef}
          botClusterRef={botClusterRef}
          botAccentRef={botAccentRef}
          botVid1Ref={botVid1Ref}
          botVid2Ref={botVid2Ref}
          botVid3Ref={botVid3Ref}
          displayVideos={displayVideos}
        />
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOP
// ─────────────────────────────────────────────────────────────────────────────
const Top = ({ topVid1Ref, topVid2Ref, handshakeRef }) => (
  <div className="ms-top">
    {/* Full-bleed building background */}
    <div className="ms-top-bg">
      <img
        src="https://in3dwebsite.blob.core.windows.net/photos/microsoft-building-min.jpg"
        alt="Microsoft building"
      />
      <div className="ms-top-bg-vignette" />
    </div>

    {/* Handshake cutout — bleeds off right edge, z-indexed behind text */}
    {/* <div className="ms-handshake-wrap" ref={handshakeRef}>
      <img
        src="https://in3dwebsite.blob.core.windows.net/photos/handshake_newer.png"
        alt="Partnership handshake"
      />
    </div> */}

    {/* ── LEFT: text ── */}
    <div className="ms-top-left">
      <div className="ms-eyebrow">
        <span className="ms-eyebrow-line" />
        <span>Official Partner</span>
        <span className="ms-dot" />
        <span>Mixed Reality</span>
      </div>

      <h1 className="ms-headline">
        <span className="ms-headline-word" style={{ animationDelay: "0.05s" }}>
          Microsoft
        </span>
      </h1>

      <div className="ms-divider-animated" />

      <p className="ms-body-text">
        In3D is the official and inclusive Mixed Reality (MR) partner of
        Microsoft Israel — combining vision, technology, and a strong shared
        commitment to the future of XR.
      </p>

      <div className="ms-tags">
        {["HoloLens", "MR", "Mesh", "Azure"].map((t, i) => (
          <span
            key={t}
            className="ms-tag"
            style={{ animationDelay: `${0.8 + i * 0.1}s` }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Partner badge */}
      <div
        className="ms-partner-badge ms-glass"
        style={{ animationDelay: "1.1s" }}
      >
        <div className="ms-partner-badge-squares">
          <span style={{ background: "#f25022" }} />
          <span style={{ background: "#7fba00" }} />
          <span style={{ background: "#00a4ef" }} />
          <span style={{ background: "#ffb900" }} />
        </div>
        <span className="ms-partner-badge-text">Microsoft Partner</span>
      </div>
    </div>

    {/* ── RIGHT: stacked video cards ── */}
    <div className="ms-top-right">
      <div className="ms-top-cluster">
        <HoverVideoCard
          videoRef={topVid1Ref}
          src="https://in3dwebsite.blob.core.windows.net/video/Hololens 2 - Guides (2).mp4"
          startTime={5}
          className="ms-top-vid ms-top-vid--main ms-glass"
        >
          <span className="ms-vid-label">HoloLens 2 — Guides</span>
          {/* <div className="ms-img-corner ms-img-corner--tl" />
          <div className="ms-img-corner ms-img-corner--br" /> */}
        </HoverVideoCard>

        <HoverVideoCard
          videoRef={topVid2Ref}
          src="https://in3dwebsite.blob.core.windows.net/video/Hololens 1 - Remote Assist (2).mp4"
          startTime={3}
          className="ms-top-vid ms-top-vid--offset ms-glass"
        >
          <span className="ms-vid-label">Remote Assist</span>
        </HoverVideoCard>

        {/* Decorative ghost word */}
        <div className="ms-deco-word">MR</div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// BOTTOM
// ─────────────────────────────────────────────────────────────────────────────
const Bottom = ({
  bottomRef,
  buildingRef,
  botTextRef,
  botClusterRef,
  botAccentRef,
  botVid1Ref,
  botVid2Ref,
  botVid3Ref,
  displayVideos,
}) => (
  <div ref={bottomRef} className="ms-bottom">
    {/* Subtle background echo of building */}
    <div className="ms-bot-bg">
      <img
        ref={buildingRef}
        src="https://in3dwebsite.blob.core.windows.net/photos/microsoft-building-min.jpg"
        alt=""
        aria-hidden="true"
      />
      <div className="ms-bot-bg-vignette" />
    </div>

    <div className="ms-bot-content">
      {/* ── LEFT: partnership text ── */}
      <div className="ms-bot-text-col">
        <div ref={botAccentRef} className="ms-bot-accent-rule" />

        <p className="ms-bot-overline">Partnership</p>

        <div ref={botTextRef} className="ms-bot-quote-block">
          <p className="ms-bot-quote-mark">"</p>
          <p className="ms-bot-body">
            As partners, in3D is your perfect go-to for any Microsoft MR
            products. In3D and Microsoft's teams share a strong connection and a
            combined vision on the important roles of MR technology.
          </p>
          <div className="ms-bot-sig">
            <span className="ms-bot-sig-line" />
            <span>in3D × Microsoft Israel</span>
          </div>
        </div>

        <div className="ms-bot-metrics">
          {[
            // { n: "1st", d: "MR Partner IL" },
            { n: "5+", d: "Years together" },
            { n: "HoloLens", d: "Certified" },
          ].map(({ n, d }) => (
            <div key={d} className="ms-bot-metric">
              <span className="ms-bot-metric-n">{n}</span>
              <span className="ms-bot-metric-d">{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT: 3-video cluster ── */}
      <div ref={botClusterRef} className="ms-bot-cluster">
        {/* Large card */}
        <div className="ms-bot-vid-large ms-glass">
          {displayVideos && (
            <HoverVideoCard
              videoRef={botVid1Ref}
              src="https://in3dwebsite.blob.core.windows.net/video/Mesh Hololens - Remote Collaboration.mp4"
              className="ms-bot-vid-inner"
            >
              <span className="ms-bot-vid-badge">Mesh Collaboration</span>
            </HoverVideoCard>
          )}
          {/* <div className="ms-img-corner ms-img-corner--tl" />
          <div className="ms-img-corner ms-img-corner--br" /> */}
        </div>

        {/* Two smaller stacked cards */}
        <div className="ms-bot-vid-stack">
          <div className="ms-bot-vid-small ms-glass">
            {displayVideos && (
              <HoverVideoCard
                videoRef={botVid2Ref}
                src="https://in3dwebsite.blob.core.windows.net/video/What can HoloLens 2 do_.mp4"
                startTime={4}
                className="ms-bot-vid-inner"
              >
                <span className="ms-bot-vid-badge">HoloLens 2</span>
              </HoverVideoCard>
            )}
          </div>

          <div className="ms-bot-vid-small ms-glass">
            {displayVideos && (
              <HoverVideoCard
                videoRef={botVid3Ref}
                src="https://in3dwebsite.blob.core.windows.net/video/Medical Holoportation - Ichilov (1) (1).mp4"
                startTime={2}
                className="ms-bot-vid-inner"
              >
                <span className="ms-bot-vid-badge">Holoportation</span>
              </HoverVideoCard>
            )}
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
.ms-page {
  display: flex;
  flex-direction: column;
  height: 200vh;
  font-family: 'Gotham', 'gotham-bold', 'Swiss 721 Black', sans-serif;
  color: #0d0d0d;
}

.ms-glass {
  background: rgba(255,255,255,0.13);
  backdrop-filter: blur(14px) saturate(170%);
  -webkit-backdrop-filter: blur(14px) saturate(170%);
  border: 1px solid rgba(255,255,255,0.38);
  border-radius: 14px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.16);
}

/* ── HoverVideoCard ──────────────────────────────────────────────────────── */
.ms-hover-video {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  width: 100%;
  height: 100%;
}
.ms-video-controls-mask {
  position: absolute;
  inset: 0;
  z-index: 3;
  background: transparent;
  pointer-events: none;
}
.ms-hover-video video::-webkit-media-controls { display: none !important; }
.ms-hover-video video::-webkit-media-controls-enclosure { display: none !important; }
.ms-hover-video video { pointer-events: none; }
.ms-hover-play-hint {
  position: absolute;
  inset: 0;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: opacity 0.3s ease;
  background: rgba(0,0,0,0.18);
}
.ms-hover-video:hover .ms-hover-play-hint { opacity: 0; }
.ms-hover-play-hint svg { filter: drop-shadow(0 2px 6px rgba(0,0,0,0.5)); }

/* ── Keyframes ───────────────────────────────────────────────────────────── */
@keyframes msFadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes msSliceUp {
  to { opacity: 1; transform: translateY(0) skewX(0deg); }
}
@keyframes msGrowLine {
  to { width: 72px; }
}

/* ── TOP ─────────────────────────────────────────────────────────────────── */
.ms-top {
  display: flex;
  height: 100vh;
  padding: 0 5%;
  gap: 2%;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* dot-grid texture */
.ms-top::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px);
  background-size: 36px 36px;
  pointer-events: none;
  z-index: 0;
}

.ms-top-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.ms-top-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.ms-top-bg-vignette {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    rgba(255,255,255,0.96) 0%,
    rgba(255,255,255,0.65) 38%,
    rgba(255,255,255,0.08) 100%
  );
}

/* Handshake image — decorative, behind all content */
.ms-handshake-wrap {
  position: absolute;
  top: 5%;
  right: -8%;
  width: 58%;
  z-index: 0;
  opacity: 0;
  animation: msFadeUp 1.4s ease forwards;
  animation-delay: 0.6s;
  pointer-events: none;
}
.ms-handshake-wrap img {
  width: 100%;
  display: block;
  /* Slight desaturate so it reads as atmospheric not busy */
  filter: saturate(0.7) contrast(0.9);
}

/* ── TOP LEFT ── */
.ms-top-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.4rem;
  z-index: 1;
}

.ms-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.45);
  opacity: 0;
  animation: msFadeUp 0.7s ease forwards;
  animation-delay: 0.1s;
  font-family: 'swiss-medium', 'gotham-old', sans-serif;
}
.ms-eyebrow-line {
  display: inline-block;
  width: 32px;
  height: 1px;
  background: currentColor;
}
.ms-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: currentColor;
}

.ms-headline {
  font-size: clamp(3.8rem, 7vw, 7rem);
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  line-height: 0.92;
  margin: 0;
}
.ms-headline-word {
  display: inline-block;
  opacity: 0;
  transform: translateY(50px) skewX(-6deg);
  animation: msSliceUp 0.65s cubic-bezier(0.16,1,0.3,1) forwards;
}

.ms-divider-animated {
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #0d0d0d 0%, rgba(13,13,13,0.18) 100%);
  animation: msGrowLine 1s cubic-bezier(0.16,1,0.3,1) forwards;
  animation-delay: 0.45s;
}

.ms-body-text {
  font-size: clamp(0.9rem, 1.2vw, 1.05rem);
  line-height: 1.88;
  color: rgba(13,13,13,0.68);
  max-width: 400px;
  opacity: 0;
  animation: msFadeUp 0.8s ease forwards;
  animation-delay: 0.5s;
  font-family: 'gotham-old', 'swiss-medium', sans-serif;
  font-weight: 400;
}

.ms-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.ms-tag {
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 0.35em 0.9em;
  border: 1px solid rgba(0,0,0,0.22);
  border-radius: 100px;
  color: rgba(0,0,0,0.58);
  opacity: 0;
  animation: msFadeUp 0.5s ease forwards;
  font-family: 'swiss-medium', sans-serif;
}

/* Microsoft partner badge with the 4-square logo */
.ms-partner-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.55rem 1rem;
  opacity: 0;
  animation: msFadeUp 0.6s ease forwards;
  width: fit-content;
}
.ms-partner-badge-squares {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  width: 18px;
  height: 18px;
}
.ms-partner-badge-squares span {
  display: block;
  border-radius: 1px;
}
.ms-partner-badge-text {
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.6);
  font-family: 'swiss-medium', sans-serif;
}

/* ── TOP RIGHT: video cluster ── */
.ms-top-right {
  flex: 1;
  position: relative;
  height: 70%;
  z-index: 1;
}
.ms-top-cluster {
  position: relative;
  width: 100%;
  height: 100%;
}

.ms-top-vid {
  position: absolute;
  overflow: hidden;
  opacity: 0;
  animation: msFadeUp 0.9s ease forwards;
}
.ms-top-vid--main {
  top: 5%;
  left: 5%;
  width: 72%;
  height: 55%;
  animation-delay: 0.35s;
}
.ms-top-vid--offset {
  bottom: 5%;
  right: 0%;
  width: 60%;
  height: 42%;
  animation-delay: 0.55s;
}

/* Video label pill inside card */
.ms-vid-label {
  position: absolute;
  bottom: 10px;
  left: 12px;
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.88);
  background: rgba(0,0,0,0.3);
  backdrop-filter: blur(6px);
  padding: 3px 10px;
  border-radius: 100px;
  font-family: 'swiss-medium', sans-serif;
  z-index: 5;
}

/* Corner accents */
.ms-img-corner {
  position: absolute;
  width: 18px;
  height: 18px;
  border-color: rgba(255,255,255,0.85);
  border-style: solid;
  z-index: 5;
}
.ms-img-corner--tl { top: 8px; left: 8px; border-width: 2px 0 0 2px; }
.ms-img-corner--br { bottom: 8px; right: 8px; border-width: 0 2px 2px 0; }

/* Ghost decorative word */
.ms-deco-word {
  position: absolute;
  bottom: 2%;
  left: 0%;
  font-size: clamp(4rem, 7vw, 7.5rem);
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  color: transparent;
  -webkit-text-stroke: 1px rgba(0,0,0,0.07);
  pointer-events: none;
  user-select: none;
  line-height: 1;
  opacity: 0;
  animation: msFadeUp 1.2s ease forwards;
  animation-delay: 0.9s;
}

/* ── BOTTOM ──────────────────────────────────────────────────────────────── */
.ms-bottom {
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.ms-bot-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.ms-bot-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.ms-bot-bg-vignette {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    115deg,
    rgba(255,255,255,0.96) 0%,
    rgba(255,255,255,0.62) 42%,
    rgba(240,248,255,0.15) 100%
  );
}

.ms-bot-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center; 
  width: 100%;
  height: 100%;
  padding: 0 5%;
  gap: 5%;
}

/* ── BOTTOM LEFT: text ── */
.ms-bot-text-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  max-width: 400px;
}

.ms-bot-accent-rule {
  width: 64px;
  height: 3px;
  background: linear-gradient(90deg, #00a4ef 0%, rgba(0,164,239,0.18) 100%);
  transform-origin: left center;
}

.ms-bot-overline {
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
.ms-bot-overline::before {
  content: '';
  display: inline-block;
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ms-bot-quote-block {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.ms-bot-quote-mark {
  font-size: 5rem;
  line-height: 0.6;
  color: rgba(0,164,239,0.1);
  font-family: 'Gotham', serif;
  margin: 0;
}
.ms-bot-body {
  font-size: clamp(0.9rem, 1.2vw, 1.05rem);
  line-height: 1.9;
  color: rgba(0,0,0,0.7);
  margin: 0;
  font-family: 'gotham-old', 'swiss-medium', sans-serif;
  font-weight: 400;
}
.ms-bot-sig {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.38);
  font-family: 'swiss-medium', sans-serif;
}
.ms-bot-sig-line {
  display: inline-block;
  width: 28px;
  height: 1px;
  background: currentColor;
}

.ms-bot-metrics {
  display: flex;
  gap: 1.8rem;
  padding-top: 0.6rem;
  border-top: 1px solid rgba(0,0,0,0.08);
}
.ms-bot-metric {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
.ms-bot-metric-n {
  font-size: 1.5rem;
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  line-height: 1;
  color: #0d0d0d;
}
.ms-bot-metric-d {
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.4);
  font-family: 'swiss-medium', sans-serif;
}

/* ── BOTTOM RIGHT: 3-video cluster ── */
.ms-bot-cluster {
  flex: 1.2;
  display: flex;
  gap: 1rem;
  height: 60%;
  align-items: stretch;
}

.ms-bot-vid-large {
  flex: 1.4;
  position: relative;
  overflow: hidden;
}

.ms-bot-vid-stack {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ms-bot-vid-small {
  flex: 1;
  position: relative;
  overflow: hidden;
}

/* Inner fills the card entirely */
.ms-bot-vid-inner {
  position: absolute !important;
  inset: 0;
}

.ms-bot-vid-badge {
  position: absolute;
  bottom: 8px;
  left: 10px;
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.88);
  background: rgba(0,0,0,0.3);
  backdrop-filter: blur(6px);
  padding: 2px 9px;
  border-radius: 100px;
  font-family: 'swiss-medium', sans-serif;
  z-index: 5;
  white-space: nowrap;
}
`;
