import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
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
      className={`med-hover-video ${className || ""}`}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="med-video-controls-mask" />
      <VideoPlayer videoRef={videoRef} src={src} startTime={startTime} />
      <div className="med-hover-play-hint">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      </div>
      {children}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MEDICINE PAGE
// ─────────────────────────────────────────────────────────────────────────────
export function Medicine() {
  const topVideoRef = useRef(null);
  const middleVideoRef = useRef(null);

  // GSAP scroll-trigger refs
  const middleRef = useRef(null);
  const overlayBotRef = useRef(null);
  const midTextRef = useRef(null);
  const midVideoWrapRef = useRef(null);
  const midAccentRef = useRef(null);

  useEffect(() => {
    const scroller = ".selected-category-wrapper";

    const ctx = gsap.context(() => {
      // Background overlay slides up from below
      gsap.fromTo(
        overlayBotRef.current,
        { y: 80, opacity: 0, scale: 1.06 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: middleRef.current,
            scroller,
            start: "top 85%",
            end: "top 25%",
            scrub: 1.8,
          },
        },
      );

      // Text wipe upward via clip-path
      gsap.fromTo(
        midTextRef.current,
        { clipPath: "inset(0 0 100% 0)", y: 24, opacity: 0 },
        {
          clipPath: "inset(0 0 0% 0)",
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: middleRef.current,
            scroller,
            start: "top 65%",
            end: "top 15%",
            scrub: 1.2,
          },
        },
      );

      // Video card rises + degreyscales
      gsap.fromTo(
        midVideoWrapRef.current,
        { y: 70, opacity: 0, filter: "grayscale(100%) brightness(0.55)" },
        {
          y: 0,
          opacity: 1,
          filter: "grayscale(0%) brightness(1)",
          ease: "none",
          scrollTrigger: {
            trigger: middleRef.current,
            scroller,
            start: "top 70%",
            end: "top 10%",
            scrub: 1.4,
          },
        },
      );

      // Accent rule grows
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
            start: "top 55%",
            end: "top 30%",
            scrub: 1,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="med-page">
        <Logo />
        <Top topVideoRef={topVideoRef} />
        <Middle
          middleRef={middleRef}
          overlayBotRef={overlayBotRef}
          midTextRef={midTextRef}
          midVideoWrapRef={midVideoWrapRef}
          midAccentRef={midAccentRef}
          middleVideoRef={middleVideoRef}
        />
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOP
// ─────────────────────────────────────────────────────────────────────────────
const Top = ({ topVideoRef }) => (
  <div className="med-top">
    {/* Full-bleed background overlay */}
    <div className="med-top-bg">
      <img
        src="https://in3dwebsite.blob.core.windows.net/photos/medical_overlay_1-min.jpg"
        alt="Medical background"
      />
      <div className="med-top-bg-vignette" />
    </div>

    {/* ── LEFT ── */}
    <div className="med-top-left">
      <div className="med-eyebrow">
        <span className="med-eyebrow-line" />
        <span>Healthcare</span>
        <span className="med-dot" />
        <span>XR Solutions</span>
      </div>

      <h1 className="med-headline">
        <span className="med-headline-word" style={{ animationDelay: "0.05s" }}>
          Medicine
        </span>
      </h1>

      <div className="med-divider-animated" />

      <p className="med-body-text">
        The world of medicine is one of the most innovative sectors in the
        world. Using Extended Reality (XR) we at in3D became pioneers in
        development of XR products for medical organisations — collaborating to
        empower innovation and efficiency for clinics and hospitals.
      </p>

      <div className="med-tags">
        {["XR", "AR", "Holoportation", "Clinical"].map((t, i) => (
          <span
            key={t}
            className="med-tag"
            style={{ animationDelay: `${0.8 + i * 0.1}s` }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>

    {/* ── RIGHT: floating video cluster ── */}
    <div className="med-top-right">
      <div className="med-cluster">
        {/* Background card with corner accents */}
        <div className="med-cluster-bg-card med-glass">
          <div className="med-img-corner med-img-corner--tl" />
          <div className="med-img-corner med-img-corner--br" />
          <span className="med-cluster-label">Ichilov Hospital</span>
        </div>

        {/* Main video — hover to play */}
        <HoverVideoCard
          videoRef={topVideoRef}
          src="https://in3dwebsite.blob.core.windows.net/video/Medical Holoportation - Ichilov (1) (1).mp4"
          startTime={2}
          className="med-cluster-main-video med-glass"
        >
          <span className="med-live-badge">DEMO</span>
        </HoverVideoCard>

        {/* Floating stat pills */}
        <div
          className="med-stat-pill med-glass med-stat-pill--one"
          style={{ animationDelay: "0.7s" }}
        >
          {/* <span className="med-stat-n">98%</span> */}
          <span className="med-stat-l">Surgeon accuracy</span>
        </div>
        <div
          className="med-stat-pill med-glass med-stat-pill--two"
          style={{ animationDelay: "0.85s" }}
        >
          {/* <span className="med-stat-n">3×</span> */}
          <span className="med-stat-l">Faster onboarding</span>
        </div>

        {/* Decorative ghost word */}
        <div className="med-deco-word">XR</div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MIDDLE
// ─────────────────────────────────────────────────────────────────────────────
const Middle = ({
  middleRef,
  overlayBotRef,
  midTextRef,
  midVideoWrapRef,
  midAccentRef,
  middleVideoRef,
}) => (
  <div ref={middleRef} className="med-middle">
    {/* Background overlay image */}
    <div className="med-mid-bg">
      <img
        ref={overlayBotRef}
        src="https://in3dwebsite.blob.core.windows.net/photos/med-overlay-bot-min.jpg"
        alt="Medical skeletons"
      />
      <div className="med-mid-bg-vignette" />
    </div>

    <div className="med-mid-content">
      {/* ── LEFT: quote + list ── */}
      <div className="med-mid-text-col">
        <div ref={midAccentRef} className="med-mid-accent-rule" />

        <p className="med-mid-overline">Our Approach</p>

        <div ref={midTextRef} className="med-mid-quote-block">
          <p className="med-mid-quote-mark">"</p>
          <p className="med-mid-quote-body">
            Our team is very conscious of our medical clients' needs, and
            together we can develop a new and exciting working environment that
            upgrades working methods and quality of care.
          </p>
          <div className="med-mid-sig">
            <span className="med-mid-sig-line" />
            <span>in3D Medical Division</span>
          </div>
        </div>

        <ul className="med-mid-list">
          {[
            "Real-time surgical guidance",
            "Remote holoportation",
            "AR training simulations",
          ].map((item, i) => (
            <li
              key={item}
              className="med-mid-list-item"
              style={{ animationDelay: `${i * 0.12 + 0.4}s` }}
            >
              <span className="med-mid-list-dot" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* ── RIGHT: video card ── */}
      <div ref={midVideoWrapRef} className="med-mid-video-col">
        <HoverVideoCard
          videoRef={middleVideoRef}
          src="https://in3dwebsite.blob.core.windows.net/video/Medical - Real time operation (1).mp4"
          className="med-mid-video-card med-glass"
        >
          <div className="med-mid-video-label">Real-time Operation</div>
        </HoverVideoCard>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SCOPED CSS
// ─────────────────────────────────────────────────────────────────────────────
const css = `
/* ── Base ────────────────────────────────────────────────────────────────── */
.med-page {
  display: flex;
  flex-direction: column;
  height: 200vh;
  font-family: 'Gotham', 'gotham-bold', 'Swiss 721 Black', sans-serif;
  color: #0d0d0d;
}

.med-glass {
  background: rgba(255,255,255,0.13);
  backdrop-filter: blur(14px) saturate(170%);
  -webkit-backdrop-filter: blur(14px) saturate(170%);
  border: 1px solid rgba(255,255,255,0.38);
  border-radius: 14px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.16);
}

/* ── HoverVideoCard ──────────────────────────────────────────────────────── */
.med-hover-video {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.med-video-controls-mask {
  position: absolute;
  inset: 0;
  z-index: 3;
  background: transparent;
  pointer-events: none;
}
.med-hover-video video::-webkit-media-controls { display: none !important; }
.med-hover-video video::-webkit-media-controls-enclosure { display: none !important; }
.med-hover-video video { pointer-events: none; }
.med-hover-play-hint {
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
.med-hover-video:hover .med-hover-play-hint { opacity: 0; }
.med-hover-play-hint svg { filter: drop-shadow(0 2px 6px rgba(0,0,0,0.6)); }

/* ── Keyframes ───────────────────────────────────────────────────────────── */
@keyframes medFadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes medSliceUp {
  to { opacity: 1; transform: translateY(0) skewX(0deg); }
}
@keyframes medGrowLine {
  to { width: 72px; }
}
@keyframes medBlink {
  0%,100% { opacity:1; }
  50%      { opacity:0; }
}

/* ── TOP ─────────────────────────────────────────────────────────────────── */
.med-top {
  display: flex;
  height: 100vh;
  padding: 0 5%;
  gap: 4%;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.med-top::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
  z-index: 0;
}
.med-top-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.med-top-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.med-top-bg-vignette {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    100deg,
    rgba(255,255,255,0.95) 0%,
    rgba(255,255,255,0.62) 42%,
    rgba(255,255,255,0.04) 100%
  );
}

.med-top-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.4rem;
  z-index: 1;
}
.med-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.45);
  opacity: 0;
  animation: medFadeUp 0.7s ease forwards;
  animation-delay: 0.1s;
  font-family: 'swiss-medium', 'gotham-old', sans-serif;
}
.med-eyebrow-line {
  display: inline-block;
  width: 32px;
  height: 1px;
  background: currentColor;
}
.med-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: currentColor;
}
.med-headline {
  font-size: clamp(3.8rem, 7vw, 7rem);
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  line-height: 0.92;
  margin: 0;
}
.med-headline-word {
  display: inline-block;
  opacity: 0;
  transform: translateY(50px) skewX(-6deg);
  animation: medSliceUp 0.65s cubic-bezier(0.16,1,0.3,1) forwards;
}
.med-divider-animated {
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #0d0d0d 0%, rgba(13,13,13,0.18) 100%);
  animation: medGrowLine 1s cubic-bezier(0.16,1,0.3,1) forwards;
  animation-delay: 0.45s;
}
.med-body-text {
  font-size: clamp(0.9rem, 1.2vw, 1.05rem);
  line-height: 1.88;
  color: rgba(13,13,13,0.68);
  max-width: 420px;
  opacity: 0;
  animation: medFadeUp 0.8s ease forwards;
  animation-delay: 0.5s;
  font-family: 'gotham-old', 'swiss-medium', sans-serif;
  font-weight: 400;
}
.med-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.med-tag {
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 0.35em 0.9em;
  border: 1px solid rgba(0,0,0,0.22);
  border-radius: 100px;
  color: rgba(0,0,0,0.58);
  opacity: 0;
  animation: medFadeUp 0.5s ease forwards;
  font-family: 'swiss-medium', sans-serif;
}

/* ── TOP RIGHT cluster ───────────────────────────────────────────────────── */
.med-top-right {
  flex: 1.1;
  position: relative;
  height: 72%;
  z-index: 1;
}
.med-cluster {
  position: relative;
  width: 100%;
  height: 100%;
}
.med-cluster-bg-card {
  position: absolute;
  top: 8%;
  left: 8%;
  width: 72%;
  height: 78%;
  overflow: hidden;
  opacity: 0;
  animation: medFadeUp 1s ease forwards;
  animation-delay: 0.3s;
  background: rgba(210,230,245,0.2);
}
.med-cluster-label {
  position: absolute;
  bottom: 10px;
  left: 14px;
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.45);
  font-family: 'swiss-medium', sans-serif;
}
.med-img-corner {
  position: absolute;
  width: 18px;
  height: 18px;
  border-color: rgba(255,255,255,0.85);
  border-style: solid;
}
.med-img-corner--tl { top: 8px; left: 8px; border-width: 2px 0 0 2px; }
.med-img-corner--br { bottom: 8px; right: 8px; border-width: 0 2px 2px 0; }

.med-cluster-main-video {
  position: absolute;
  top: 0%;
  right: -2%;
  width: 66%;
  height: 64%;
  opacity: 0;
  animation: medFadeUp 0.9s ease forwards;
  animation-delay: 0.5s;
}
.med-live-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  background: #006b9f;
  color: #fff;
  padding: 2px 8px;
  border-radius: 100px;
  font-family: 'swiss-medium', sans-serif;
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 5;
}
.med-live-badge::before {
  content: '';
  width: 5px;
  height: 5px;
  background: #fff;
  border-radius: 50%;
  animation: medBlink 1.4s infinite;
}
.med-stat-pill {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding: 0.8rem 1.1rem;
  opacity: 0;
  animation: medFadeUp 0.7s ease forwards;
}
.med-stat-pill--one { bottom: 12%; left: -2%; }
.med-stat-pill--two { bottom: -2%; right: 2%; }
.med-stat-n {
  font-size: 1.6rem;
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  line-height: 1;
  color: #0d0d0d;
}
.med-stat-l {
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.45);
  font-family: 'swiss-medium', sans-serif;
}
.med-deco-word {
  position: absolute;
  bottom: 4%;
  left: 4%;
  font-size: clamp(4rem, 7vw, 7rem);
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  color: transparent;
  -webkit-text-stroke: 1px rgba(0,0,0,0.07);
  pointer-events: none;
  user-select: none;
  line-height: 1;
  opacity: 0;
  animation: medFadeUp 1.2s ease forwards;
  animation-delay: 0.9s;
}

/* ── MIDDLE ──────────────────────────────────────────────────────────────── */
.med-middle {
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.med-mid-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.med-mid-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.med-mid-bg-vignette {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    110deg,
    rgba(255,255,255,0.95) 0%,
    rgba(255,255,255,0.58) 40%,
    rgba(0,0,0,0.06) 100%
  );
}
.med-mid-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 5%;
  gap: 6%;
}

/* LEFT */
.med-mid-text-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  max-width: 420px;
}
.med-mid-accent-rule {
  width: 64px;
  height: 3px;
  background: linear-gradient(90deg, #006b9f 0%, rgba(0,107,159,0.18) 100%);
  transform-origin: left center;
}
.med-mid-overline {
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
.med-mid-overline::before {
  content: '';
  display: inline-block;
  width: 24px;
  height: 1px;
  background: currentColor;
}
.med-mid-quote-block {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.med-mid-quote-mark {
  font-size: 5rem;
  line-height: 0.6;
  color: rgba(0,107,159,0.1);
  font-family: 'Gotham', serif;
  margin: 0;
}
.med-mid-quote-body {
  font-size: clamp(0.92rem, 1.2vw, 1.05rem);
  line-height: 1.9;
  color: rgba(0,0,0,0.72);
  margin: 0;
  font-family: 'gotham-old', 'swiss-medium', sans-serif;
  font-weight: 400;
}
.med-mid-sig {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.38);
  font-family: 'swiss-medium', sans-serif;
}
.med-mid-sig-line {
  display: inline-block;
  width: 28px;
  height: 1px;
  background: currentColor;
}
.med-mid-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  border-top: 1px solid rgba(0,0,0,0.08);
  padding-top: 1rem;
}
.med-mid-list-item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.82rem;
  letter-spacing: 0.06em;
  color: rgba(0,0,0,0.62);
  font-family: 'swiss-medium', 'gotham-old', sans-serif;
  opacity: 0;
  animation: medFadeUp 0.5s ease forwards;
}
.med-mid-list-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #006b9f;
  flex-shrink: 0;
}

/* RIGHT */
.med-mid-video-col {
  flex: 1.1;
  display: flex;
  height: 62%;
}
.med-mid-video-card {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.med-mid-video-label {
  position: absolute;
  bottom: 10px;
  left: 12px;
  font-size: 0.63rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.88);
  background: rgba(0,0,0,0.32);
  backdrop-filter: blur(6px);
  padding: 3px 10px;
  border-radius: 100px;
  font-family: 'swiss-medium', sans-serif;
  z-index: 2;
}
`;
