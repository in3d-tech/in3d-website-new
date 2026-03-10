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
      className={`mil-hover-video ${className || ""}`}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mil-video-controls-mask" />
      <VideoPlayer videoRef={videoRef} src={src} startTime={startTime} />
      <div className="mil-hover-play-hint">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      </div>
      {children}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MILITARY PAGE
// ─────────────────────────────────────────────────────────────────────────────
export function Military() {
  const topVid1Ref = useRef(null);
  const topVid2Ref = useRef(null);
  const midVidRef = useRef(null);
  const botVid1Ref = useRef(null);
  const botVid2Ref = useRef(null);

  // GSAP scroll refs
  const middleRef = useRef(null);
  const midTextRef = useRef(null);
  const midVideoRef = useRef(null);
  const midAccentRef = useRef(null);
  const midRuleRef = useRef(null);

  const bottomRef = useRef(null);
  const botTextRef = useRef(null);
  const botClusterRef = useRef(null);
  const botAccentRef = useRef(null);

  useEffect(() => {
    const scroller = ".selected-category-wrapper";

    const ctx = gsap.context(() => {
      // ── MIDDLE ──────────────────────────────────────────────────────────
      gsap.fromTo(
        midAccentRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: middleRef.current,
            scroller,
            start: "top 65%",
            end: "top 40%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        midTextRef.current,
        { clipPath: "inset(0 0 100% 0)", y: 22, opacity: 0 },
        {
          clipPath: "inset(0 0 0% 0)",
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: middleRef.current,
            scroller,
            start: "top 60%",
            end: "top 12%",
            scrub: 1.2,
          },
        },
      );

      gsap.fromTo(
        midVideoRef.current,
        { y: 70, opacity: 0, filter: "grayscale(100%) brightness(0.5)" },
        {
          y: 0,
          opacity: 1,
          filter: "grayscale(0%) brightness(1)",
          ease: "none",
          scrollTrigger: {
            trigger: middleRef.current,
            scroller,
            start: "top 65%",
            end: "top 8%",
            scrub: 1.4,
          },
        },
      );

      // Bottom rule slides in from right
      gsap.fromTo(
        midRuleRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          ease: "none",
          transformOrigin: "right center",
          scrollTrigger: {
            trigger: middleRef.current,
            scroller,
            start: "top 30%",
            end: "top 5%",
            scrub: 1,
          },
        },
      );

      // ── BOTTOM ──────────────────────────────────────────────────────────
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
            end: "top 42%",
            scrub: 1,
          },
        },
      );

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
      <div className="mil-page">
        <Logo />
        <Top topVid1Ref={topVid1Ref} topVid2Ref={topVid2Ref} />
        <Middle
          middleRef={middleRef}
          midTextRef={midTextRef}
          midVideoRef={midVideoRef}
          midAccentRef={midAccentRef}
          midRuleRef={midRuleRef}
          midVidRef={midVidRef}
        />
        <Bottom
          bottomRef={bottomRef}
          botTextRef={botTextRef}
          botClusterRef={botClusterRef}
          botAccentRef={botAccentRef}
          botVid1Ref={botVid1Ref}
          botVid2Ref={botVid2Ref}
        />
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOP — layout is intentionally flipped (videos LEFT, text RIGHT)
// matching the original file's flex-direction: row-reverse
// ─────────────────────────────────────────────────────────────────────────────
const Top = ({ topVid1Ref, topVid2Ref }) => (
  <div className="mil-top">
    <div className="mil-top-grid" />

    {/* ── LEFT: video cluster ── */}
    <div className="mil-top-left">
      <div className="mil-top-cluster">
        {/* Large main card */}
        <HoverVideoCard
          videoRef={topVid2Ref}
          src="https://in3dwebsite.blob.core.windows.net/video/Boat 3D Scan.mp4"
          className="mil-top-vid mil-top-vid--main mil-glass"
        >
          <span className="mil-vid-label">Naval 3D Scan</span>
          <div className="mil-img-corner mil-img-corner--tl" />
          <div className="mil-img-corner mil-img-corner--br" />
        </HoverVideoCard>

        {/* Offset float — upper-left */}
        <HoverVideoCard
          videoRef={topVid1Ref}
          src="https://in3dwebsite.blob.core.windows.net/video/Rafael - Family - Truck (1).mp4"
          startTime={1}
          className="mil-top-vid mil-top-vid--tl mil-glass"
        >
          <span className="mil-vid-label">Rafael — Truck</span>
        </HoverVideoCard>

        <div className="mil-deco-word">DEF</div>
      </div>
    </div>

    {/* ── RIGHT: text ── */}
    <div className="mil-top-right">
      <div className="mil-eyebrow">
        <span className="mil-eyebrow-line" />
        <span>Defense Industries</span>
        <span className="mil-dot" />
        <span>ISO Certified</span>
      </div>

      <h1 className="mil-headline">
        <span className="mil-headline-word" style={{ animationDelay: "0.05s" }}>
          Military
        </span>
      </h1>

      <div className="mil-divider-animated" />

      <p className="mil-body-text">
        Thanks to years of collaboration with defense industries, we gained the
        experience, knowledge, and tools to provide quick, out-of-the-box
        solutions tailored to the industry's unique requirements.
      </p>

      <div className="mil-tags">
        {["ISO", "Rafael", "IDF", "Simulation"].map((t, i) => (
          <span
            key={t}
            className="mil-tag"
            style={{ animationDelay: `${0.8 + i * 0.1}s` }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* ISO clearance badge */}
      <div
        className="mil-iso-badge mil-glass"
        style={{ animationDelay: "1.1s" }}
      >
        <svg
          className="mil-iso-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <span className="mil-iso-text">ISO Compliant · Cleared Personnel</span>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MIDDLE — full-width cinematic: text LEFT, video RIGHT
// ─────────────────────────────────────────────────────────────────────────────
const Middle = ({
  middleRef,
  midTextRef,
  midVideoRef,
  midAccentRef,
  midRuleRef,
  midVidRef,
}) => (
  <div ref={middleRef} className="mil-middle">
    {/* Diagonal stripe background */}
    <div className="mil-mid-stripe" />

    <div className="mil-mid-content">
      {/* ── LEFT: quote block ── */}
      <div className="mil-mid-text-col">
        <div ref={midAccentRef} className="mil-mid-accent-rule" />
        <p className="mil-mid-overline">Security Standards</p>

        <div ref={midTextRef} className="mil-mid-quote-block">
          <p className="mil-mid-quote-mark">"</p>
          <p className="mil-mid-quote-body">
            In3D is committed to ISO standards and all other required security
            measures — including secure development facilities, information
            security protocols, and personal security clearance for all
            employees.
          </p>
          <div className="mil-mid-sig">
            <span className="mil-mid-sig-line" />
            <span>in3D Military Division</span>
          </div>
        </div>

        <ul className="mil-mid-list">
          {[
            "ISO-certified development",
            "Secure information protocols",
            // "Cleared personnel",
          ].map((item, i) => (
            <li
              key={item}
              className="mil-mid-list-item"
              style={{ animationDelay: `${i * 0.12 + 0.4}s` }}
            >
              <span className="mil-mid-list-dot" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* ── RIGHT: single video ── */}
      <div ref={midVideoRef} className="mil-mid-video-col">
        <HoverVideoCard
          videoRef={midVidRef}
          src="https://in3dwebsite.blob.core.windows.net/video/Rafael - Family - Missile (1).mp4"
          className="mil-mid-video-card mil-glass"
        >
          <span className="mil-vid-label">Rafael — Missile System</span>
          <div className="mil-img-corner mil-img-corner--tl" />
          <div className="mil-img-corner mil-img-corner--br" />
        </HoverVideoCard>
      </div>
    </div>

    {/* Bottom rule — slides in from right as you scroll through */}
    <div ref={midRuleRef} className="mil-mid-bottom-rule" />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// BOTTOM — editorial text LEFT, two-video cluster RIGHT
// ─────────────────────────────────────────────────────────────────────────────
const Bottom = ({
  bottomRef,
  botTextRef,
  botClusterRef,
  botAccentRef,
  botVid1Ref,
  botVid2Ref,
}) => (
  <div ref={bottomRef} className="mil-bottom">
    <div className="mil-bot-content">
      {/* ── LEFT: text + metrics ── */}
      <div className="mil-bot-text-col">
        <div ref={botAccentRef} className="mil-bot-accent-rule" />
        <p className="mil-bot-overline">The Challenge</p>

        <div ref={botTextRef} className="mil-bot-quote-block">
          <p className="mil-bot-quote-mark">"</p>
          <p className="mil-bot-body">
            Defense industries face unique challenges — High-Mix-Low-Volume
            manufacture, strict information security protocols, and a wide and
            complex scope of work. We deliver solutions built for exactly that.
          </p>
          <div className="mil-bot-sig">
            <span className="mil-bot-sig-line" />
            <span>in3D × Defense Sector</span>
          </div>
        </div>

        <div className="mil-bot-metrics">
          {[
            { n: "HMLV", d: "Manufacturing" },
            { n: "ISO", d: "Standards" },
            // { n: "100%", d: "Cleared team" },
          ].map(({ n, d }) => (
            <div key={d} className="mil-bot-metric">
              <span className="mil-bot-metric-n">{n}</span>
              <span className="mil-bot-metric-d">{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT: 2-video side-by-side cluster ── */}
      <div ref={botClusterRef} className="mil-bot-cluster">
        <div className="mil-bot-vid-card mil-glass">
          <HoverVideoCard
            videoRef={botVid1Ref}
            src="https://in3dwebsite.blob.core.windows.net/video/Hololens 2 - Guides (2).mp4"
            startTime={5}
            className="mil-bot-vid-inner"
          >
            <span className="mil-bot-vid-badge">HoloLens 2 Guides</span>
          </HoverVideoCard>
          <div className="mil-img-corner mil-img-corner--tl" />
        </div>

        <div className="mil-bot-vid-card mil-glass">
          <HoverVideoCard
            videoRef={botVid2Ref}
            src="https://in3dwebsite.blob.core.windows.net/video/Hololens 1 - Remote Assist (2).mp4"
            startTime={3}
            className="mil-bot-vid-inner"
          >
            <span className="mil-bot-vid-badge">Remote Assist</span>
          </HoverVideoCard>
          <div className="mil-img-corner mil-img-corner--br" />
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
.mil-page {
  display: flex;
  flex-direction: column;
  height: 300vh;
  font-family: 'Gotham', 'gotham-bold', 'Swiss 721 Black', sans-serif;
  color: #0d0d0d;
}

.mil-glass {
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(14px) saturate(170%);
  -webkit-backdrop-filter: blur(14px) saturate(170%);
  border: 1px solid rgba(255,255,255,0.36);
  border-radius: 14px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.16);
}

/* ── HoverVideoCard ──────────────────────────────────────────────────────── */
.mil-hover-video {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  width: 100%;
  height: 100%;
}
.mil-video-controls-mask {
  position: absolute;
  inset: 0;
  z-index: 3;
  background: transparent;
  pointer-events: none;
}
.mil-hover-video video::-webkit-media-controls { display: none !important; }
.mil-hover-video video::-webkit-media-controls-enclosure { display: none !important; }
.mil-hover-video video { pointer-events: none; }
.mil-hover-play-hint {
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
.mil-hover-video:hover .mil-hover-play-hint { opacity: 0; }
.mil-hover-play-hint svg { filter: drop-shadow(0 2px 6px rgba(0,0,0,0.6)); }

/* ── Keyframes ───────────────────────────────────────────────────────────── */
@keyframes milFadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes milSliceUp {
  to { opacity: 1; transform: translateY(0) skewX(0deg); }
}
@keyframes milGrowLine {
  to { width: 72px; }
}

/* ── TOP ─────────────────────────────────────────────────────────────────── */
.mil-top {
  display: flex;
  flex-direction: row; /* videos LEFT, text RIGHT — mirrors original row-reverse */
  height: 100vh;
  padding: 0 5%;
  gap: 4%;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* Angled diagonal lines — same tactical texture as Security */
.mil-top-grid {
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(
      -55deg,
      rgba(0,0,0,0.022) 0px,
      rgba(0,0,0,0.022) 1px,
      transparent 1px,
      transparent 52px
    );
  pointer-events: none;
  z-index: 0;
}

/* ── TOP LEFT: cluster ── */
.mil-top-left {
  flex: 1.1;
  position: relative;
  height: 74%;
  z-index: 1;
}
.mil-top-cluster {
  position: relative;
  width: 100%;
  height: 100%;
}
.mil-top-vid {
  position: absolute;
  overflow: hidden;
  opacity: 0;
  animation: milFadeUp 0.9s ease forwards;
}
/* Main card — centre */
.mil-top-vid--main {
  top: 14%;
  left: 12%;
  width: 74%;
  height: 60%;
  animation-delay: 0.3s;
}
/* Upper-left float */
.mil-top-vid--tl {
  top: -2%;
  left: -3%;
  width: 44%;
  height: 36%;
  animation-delay: 0.5s;
}

.mil-vid-label {
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
.mil-img-corner {
  position: absolute;
  width: 18px;
  height: 18px;
  border-color: rgba(255,255,255,0.85);
  border-style: solid;
  z-index: 5;
}
.mil-img-corner--tl { top: 8px; left: 8px; border-width: 2px 0 0 2px; }
.mil-img-corner--br { bottom: 8px; right: 8px; border-width: 0 2px 2px 0; }

.mil-deco-word {
  position: absolute;
  bottom: 0%;
  right: -2%;
  font-size: clamp(4rem, 7vw, 7.5rem);
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  color: transparent;
  -webkit-text-stroke: 1px rgba(0,0,0,0.07);
  pointer-events: none;
  user-select: none;
  line-height: 1;
  opacity: 0;
  animation: milFadeUp 1.2s ease forwards;
  animation-delay: 0.9s;
}

/* ── TOP RIGHT: text ── */
.mil-top-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.4rem;
  z-index: 1;
}
.mil-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.45);
  opacity: 0;
  animation: milFadeUp 0.7s ease forwards;
  animation-delay: 0.1s;
  font-family: 'swiss-medium', 'gotham-old', sans-serif;
}
.mil-eyebrow-line {
  display: inline-block;
  width: 32px;
  height: 1px;
  background: currentColor;
}
.mil-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: currentColor;
}
.mil-headline {
  font-size: clamp(3.8rem, 7vw, 7rem);
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  line-height: 0.92;
  margin: 0;
}
.mil-headline-word {
  display: inline-block;
  opacity: 0;
  transform: translateY(50px) skewX(-6deg);
  animation: milSliceUp 0.65s cubic-bezier(0.16,1,0.3,1) forwards;
}
.mil-divider-animated {
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #0d0d0d 0%, rgba(13,13,13,0.18) 100%);
  animation: milGrowLine 1s cubic-bezier(0.16,1,0.3,1) forwards;
  animation-delay: 0.45s;
}
.mil-body-text {
  font-size: clamp(0.9rem, 1.2vw, 1.05rem);
  line-height: 1.88;
  color: rgba(13,13,13,0.68);
  max-width: 420px;
  opacity: 0;
  animation: milFadeUp 0.8s ease forwards;
  animation-delay: 0.5s;
  font-family: 'gotham-old', 'swiss-medium', sans-serif;
  font-weight: 400;
}
.mil-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.mil-tag {
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 0.35em 0.9em;
  border: 1px solid rgba(0,0,0,0.22);
  border-radius: 100px;
  color: rgba(0,0,0,0.58);
  opacity: 0;
  animation: milFadeUp 0.5s ease forwards;
  font-family: 'swiss-medium', sans-serif;
}
.mil-iso-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 1rem;
  width: fit-content;
  opacity: 0;
  animation: milFadeUp 0.6s ease forwards;
}
.mil-iso-icon {
  width: 16px;
  height: 16px;
  color: #7a6000;
  flex-shrink: 0;
}
.mil-iso-text {
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.52);
  font-family: 'swiss-medium', sans-serif;
}

/* ── MIDDLE ──────────────────────────────────────────────────────────────── */
.mil-middle {
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

/* Diagonal stripe — gives the middle a distinct atmosphere */
.mil-mid-stripe {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      135deg,
      rgba(245,242,235,0.6) 0%,
      rgba(255,255,255,0) 55%
    );
  pointer-events: none;
  z-index: 0;
}

.mil-mid-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 5%;
  gap: 6%;
}

/* LEFT */
.mil-mid-text-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  max-width: 420px;
}
.mil-mid-accent-rule {
  width: 64px;
  height: 3px;
  background: linear-gradient(90deg, #7a6000 0%, rgba(122,96,0,0.18) 100%);
  transform-origin: left center;
}
.mil-mid-overline {
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
.mil-mid-overline::before {
  content: '';
  display: inline-block;
  width: 24px;
  height: 1px;
  background: currentColor;
}
.mil-mid-quote-block { display: flex; flex-direction: column; gap: 0.6rem; }
.mil-mid-quote-mark {
  font-size: 5rem;
  line-height: 0.6;
  color: rgba(122,96,0,0.1);
  font-family: 'Gotham', serif;
  margin: 0;
}
.mil-mid-quote-body {
  font-size: clamp(0.92rem, 1.2vw, 1.05rem);
  line-height: 1.9;
  color: rgba(0,0,0,0.72);
  margin: 0;
  font-family: 'gotham-old', 'swiss-medium', sans-serif;
  font-weight: 400;
}
.mil-mid-sig {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.38);
  font-family: 'swiss-medium', sans-serif;
}
.mil-mid-sig-line { display: inline-block; width: 28px; height: 1px; background: currentColor; }
.mil-mid-list {
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-direction: column; gap: 0.6rem;
  border-top: 1px solid rgba(0,0,0,0.08);
  padding-top: 1rem;
}
.mil-mid-list-item {
  display: flex; align-items: center; gap: 0.7rem;
  font-size: 0.82rem; letter-spacing: 0.06em;
  color: rgba(0,0,0,0.62);
  font-family: 'swiss-medium', 'gotham-old', sans-serif;
  opacity: 0; animation: milFadeUp 0.5s ease forwards;
}
.mil-mid-list-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: #7a6000; flex-shrink: 0;
}

/* RIGHT */
.mil-mid-video-col {
  flex: 1.1;
  height: 60%;
}
.mil-mid-video-card {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* Bottom rule across mid section */
.mil-mid-bottom-rule {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 58%;
  height: 3px;
  background: linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 100%);
  transform-origin: right center;
}

/* ── BOTTOM ──────────────────────────────────────────────────────────────── */
.mil-bottom {
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.mil-bottom::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(
      -55deg,
      rgba(0,0,0,0.018) 0px,
      rgba(0,0,0,0.018) 1px,
      transparent 1px,
      transparent 52px
    );
  pointer-events: none;
  z-index: 0;
}
.mil-bot-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 5%;
  gap: 5%;
}

/* LEFT */
.mil-bot-text-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  max-width: 400px;
}
.mil-bot-accent-rule {
  width: 64px; height: 3px;
  background: linear-gradient(90deg, #7a6000 0%, rgba(122,96,0,0.18) 100%);
  transform-origin: left center;
}
.mil-bot-overline {
  font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: rgba(0,0,0,0.38); font-family: 'swiss-medium', sans-serif; margin: 0;
  display: flex; align-items: center; gap: 0.6rem;
}
.mil-bot-overline::before {
  content: ''; display: inline-block; width: 24px; height: 1px; background: currentColor;
}
.mil-bot-quote-block { display: flex; flex-direction: column; gap: 0.6rem; }
.mil-bot-quote-mark {
  font-size: 5rem; line-height: 0.6;
  color: rgba(122,96,0,0.1); font-family: 'Gotham', serif; margin: 0;
}
.mil-bot-body {
  font-size: clamp(0.9rem, 1.2vw, 1.05rem);
  line-height: 1.9; color: rgba(0,0,0,0.7); margin: 0;
  font-family: 'gotham-old', 'swiss-medium', sans-serif; font-weight: 400;
}
.mil-bot-sig {
  display: flex; align-items: center; gap: 0.7rem;
  font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
  color: rgba(0,0,0,0.38); font-family: 'swiss-medium', sans-serif;
}
.mil-bot-sig-line { display: inline-block; width: 28px; height: 1px; background: currentColor; }
.mil-bot-metrics {
  display: flex; gap: 1.8rem;
  padding-top: 0.6rem; border-top: 1px solid rgba(0,0,0,0.08);
}
.mil-bot-metric { display: flex; flex-direction: column; gap: 0.1rem; }
.mil-bot-metric-n {
  font-size: 1.5rem; font-family: 'Gotham', 'gotham-bold', sans-serif;
  line-height: 1; color: #0d0d0d;
}
.mil-bot-metric-d {
  font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase;
  color: rgba(0,0,0,0.4); font-family: 'swiss-medium', sans-serif;
}

/* RIGHT: side-by-side video pair */
.mil-bot-cluster {
  flex: 1.2;
  display: flex;
  gap: 1.2rem;
  height: 55%;
}
.mil-bot-vid-card {
  flex: 1;
  position: relative;
  overflow: hidden;
}
.mil-bot-vid-inner {
  position: absolute !important;
  inset: 0;
}
.mil-bot-vid-badge {
  position: absolute;
  bottom: 8px; left: 10px;
  font-size: 0.6rem; letter-spacing: 0.13em; text-transform: uppercase;
  color: rgba(255,255,255,0.88);
  background: rgba(0,0,0,0.32);
  backdrop-filter: blur(6px);
  padding: 2px 8px; border-radius: 100px;
  font-family: 'swiss-medium', sans-serif;
  z-index: 5; white-space: nowrap;
}
`;
