import "../selectedCategories.css";
import { Suspense, useEffect, useRef, useState } from "react";
import { ContactBtn, Logo, VideoPlayer } from "../../../common/Logo";
import { categoryObserver } from "../../../common/categoryObserver";
// import { Canvas } from "@react-three/fiber";
// import { ModelComponent } from "./ModelComponent";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

export function Industry({ selectedCategory }) {
  const [displayVideos, setDisplayVideos] = useState(false);
  const [vids, setVids] = useState(false);

  const vid1 = useRef(null);
  const vid2 = useRef(null);
  const midVid = useRef(null);
  const botVid1 = useRef(null);
  const botVid2 = useRef(null);

  const middleRef = useRef(null);
  const middleImageRef = useRef(null);
  const overlayRef = useRef(null);
  const middleTextRef = useRef(null);
  const bottomRef = useRef(null);
  const bottomTextRef = useRef(null);
  const bottomImageRef = useRef(null);
  const bottomImage2Ref = useRef(null);

  useEffect(() => {
    if (!vids) {
      [vid1, vid2].forEach((r) => {
        if (!r.current) return;
        r.current.preload = "auto";
        r.current.addEventListener("loadedmetadata", () => {
          r.current.play();
          r.current.pause();
        });
      });
      setVids(true);
    }
    setTimeout(() => setDisplayVideos(true), 1500);
  }, []);

  // ── GSAP ScrollTrigger animations ──────────────────────────────────────────
  useEffect(() => {
    const scroller = ".selected-category-wrapper";

    const ctx = gsap.context(() => {
      // ── MIDDLE: cinematic background slide
      gsap.fromTo(
        overlayRef.current,
        { x: -120, opacity: 0, scale: 1.08 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: middleRef.current,
            scroller,
            start: "top 85%",
            end: "top 25%",
            scrub: 1.8,
          },
        },
      );

      // ── MIDDLE: phone rises + degreyscales
      gsap.fromTo(
        middleImageRef.current,
        { y: 80, filter: "grayscale(100%) brightness(0.6)", opacity: 0 },
        {
          y: 0,
          filter: "grayscale(0%) brightness(1)",
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: middleRef.current,
            scroller,
            start: "top 75%",
            end: "top 15%",
            scrub: 1.4,
          },
        },
      );

      // ── MIDDLE: text clip-path reveal
      gsap.fromTo(
        middleTextRef.current,
        { clipPath: "inset(0 0 100% 0)", y: 30, opacity: 0 },
        {
          clipPath: "inset(0 0 0% 0)",
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: middleRef.current,
            scroller,
            start: "top 55%",
            end: "top 10%",
            scrub: 1.2,
          },
        },
      );

      // ── BOTTOM: stagger reveal
      gsap.fromTo(
        [
          bottomTextRef.current,
          bottomImageRef.current,
          bottomImage2Ref.current,
        ],
        { y: 100, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.14,
          ease: "none",
          scrollTrigger: {
            trigger: bottomRef.current,
            scroller,
            start: "top 72%",
            end: "top 20%",
            scrub: 1.1,
          },
        },
      );

      // ── BOTTOM: images degreyscale
      gsap.fromTo(
        [bottomImageRef.current, bottomImage2Ref.current],
        { filter: "grayscale(100%) brightness(0.55)" },
        {
          filter: "grayscale(0%) brightness(1)",
          ease: "none",
          scrollTrigger: {
            trigger: bottomRef.current,
            scroller,
            start: "top 65%",
            end: "center 45%",
            scrub: 1.6,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{css}</style>

      <div className="ind-page">
        <Logo />
        <Top vid1={vid1} vid2={vid2} />
        <Middle
          middleRef={middleRef}
          middleImageRef={middleImageRef}
          overlayRef={overlayRef}
          middleTextRef={middleTextRef}
          displayVideos={displayVideos}
          midVid={midVid}
        />
        <Bottom
          bottomRef={bottomRef}
          bottomTextRef={bottomTextRef}
          bottomImageRef={bottomImageRef}
          bottomImage2Ref={bottomImage2Ref}
          displayVideos={displayVideos}
          botVid1={botVid1}
          botVid2={botVid2}
        />
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HoverVideoCard — wraps VideoPlayer, hides native controls, hover-to-play
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
      className={`ind-hover-video ${className || ""}`}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="ind-video-controls-mask" />
      <VideoPlayer videoRef={videoRef} src={src} startTime={startTime} />
      <div className="ind-hover-play-hint">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      </div>
      {children}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// TOP
// ─────────────────────────────────────────────────────────────────────────────
const Top = ({ vid1, vid2 }) => (
  <div className="ind-top">
    {/* ── LEFT: headline + body ── */}
    <div className="ind-top-left">
      <div className="ind-eyebrow">
        <span className="ind-eyebrow-line" />
        {/* <span>Category</span> */}
        <span className="ind-dot" />
        {/* <span>2024</span> */}
      </div>

      <h1 className="ind-headline">
        <span className="ind-headline-word" style={{ animationDelay: "0.05s" }}>
          Industry
        </span>
        <span
          className="ind-headline-word ind-headline-accent"
          style={{ animationDelay: "0.18s" }}
        >
          4.0
        </span>
      </h1>

      <div className="ind-divider-animated" />

      <p className="ind-body-text">
        The world was recently introduced to the wonders of the industry 4.0
        revolution. Industry is experiencing a quantum leap forward, with
        seemingly endless tools that impact everything we know about
        manufacturing and maintenance.
      </p>

      <div className="ind-tags">
        {["XR", "3D", "AI", "IoT"].map((t, i) => (
          <span
            key={t}
            className="ind-tag"
            style={{ animationDelay: `${0.8 + i * 0.1}s` }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>

    {/* ── RIGHT: floating image cluster ── */}
    <div className="ind-top-right">
      <div className="ind-image-cluster">
        {/* Large hero image */}
        <div className="ind-img-hero ind-glass">
          <img
            src="https://in3dwebsite.blob.core.windows.net/photos/industry-large-min.jpg"
            alt="Industry"
          />
          <div className="ind-img-corner ind-img-corner--tl" />
          <div className="ind-img-corner ind-img-corner--br" />
        </div>

        {/* Top-left float */}
        <div className="ind-img-float ind-img-float--tl ind-glass">
          <img
            src="https://in3dwebsite.blob.core.windows.net/photos/industry-hat-min.png"
            alt="Worker Hat"
          />
        </div>

        {/* Top-right video — hover to play, no native controls */}
        <HoverVideoCard
          videoRef={vid1}
          src="https://in3dwebsite.blob.core.windows.net/video/ICL - Smart 3D Warehouse.mp4"
          className="ind-img-float ind-img-float--tr ind-glass"
        >
          <span className="ind-live-badge">LIVE</span>
        </HoverVideoCard>

        {/* Bottom-left video — hover to play, no native controls */}
        <HoverVideoCard
          videoRef={vid2}
          src="https://in3dwebsite.blob.core.windows.net/video/agoran 2.mp4"
          startTime={2}
          className="ind-img-float ind-img-float--bl ind-glass"
        />

        {/* Decorative number */}
        <div className="ind-deco-number">4.0</div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MIDDLE
// ─────────────────────────────────────────────────────────────────────────────
const Middle = ({
  middleRef,
  middleImageRef,
  overlayRef,
  middleTextRef,
  displayVideos,
  midVid,
}) => (
  <div ref={middleRef} className="ind-middle">
    {/* Full-bleed background */}
    <div className="ind-mid-bg">
      <img
        ref={overlayRef}
        src="https://in3dwebsite.blob.core.windows.net/photos/industry-machine-min.jpg"
        alt="background"
      />
      <div className="ind-mid-bg-vignette" />
    </div>

    {/* Content row */}
    <div className="ind-mid-content">
      {/* Floating stat cards on the left */}
      <div className="ind-mid-stats">
        {[
          { value: "40%", label: "Efficiency gain" },
          { value: "3×", label: "Faster training" },
          { value: "99%", label: "Uptime SLA" },
        ].map(({ value, label }, i) => (
          <div
            key={label}
            className="ind-stat-card ind-glass"
            style={{ animationDelay: `${i * 0.15 + 0.3}s` }}
          >
            <span className="ind-stat-value">{value}</span>
            <span className="ind-stat-label">{label}</span>
          </div>
        ))}
      </div>

      {/* Phone mockup */}
      <div className="ind-mid-phone-wrap" ref={middleImageRef}>
        <div className="ind-phone-glow" />
        <img
          src="/assets/images/phone_frame_2.png"
          alt="Phone frame"
          className="ind-phone-frame"
        />
        <div className="ind-phone-screen">
          {displayVideos && (
            <VideoPlayer
              videoRef={midVid}
              isHaveBorderRadius
              src="https://in3dwebsite.blob.core.windows.net/video/AR Factory Real Time Control Panel Data - 2 level (3).mp4"
            />
          )}
        </div>
      </div>

      {/* Text block */}
      <div ref={middleTextRef} className="ind-mid-text-block">
        <p className="ind-mid-quote">"</p>
        <p className="ind-mid-body">
          Together with our clients we map out the challenges they face and
          develop tailor-made solutions using{" "}
          <strong className="ind-mid-emphasis">XR</strong> and{" "}
          <strong className="ind-mid-emphasis">3D</strong> technology — which
          creates a whole new and improved visual interface platform.
        </p>
        <div className="ind-mid-sig">
          <span className="ind-mid-sig-line" />
          <span>in3D Team</span>
        </div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// BOTTOM
// ─────────────────────────────────────────────────────────────────────────────
const Bottom = ({
  bottomRef,
  bottomTextRef,
  bottomImageRef,
  bottomImage2Ref,
  displayVideos,
  botVid1,
  botVid2,
}) => (
  <div ref={bottomRef} className="ind-bottom">
    {/* Left: editorial text */}
    <div ref={bottomTextRef} className="ind-bot-text-col">
      <span className="ind-bot-overline">Return on Investment</span>
      <h2 className="ind-bot-headline">
        Not just innovation.
        <br />
        <em>Smart business.</em>
      </h2>
      <p className="ind-bot-body">
        <strong>3D XR</strong> isn't just an innovative experience. We carefully
        evaluate each solution through business perspectives such as ROI,
        workplace efficiency, and simplification of complex procedures.
      </p>
      <div className="ind-bot-metrics">
        {[
          { n: "12+", d: "Industries" },
          { n: "50+", d: "Deployments" },
          { n: "2×", d: "Avg. ROI" },
        ].map(({ n, d }) => (
          <div key={d} className="ind-bot-metric">
            <span className="ind-bot-metric-n">{n}</span>
            <span className="ind-bot-metric-d">{d}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Right: video stack */}
    <div className="ind-bot-video-col">
      {displayVideos && (
        <HoverVideoCard
          videoRef={botVid1}
          src="https://in3dwebsite.blob.core.windows.net/video/Kornit Guide (1).mp4"
          startTime={1}
          className="ind-bot-video-card ind-glass ind-bot-video-card--large"
          style={{ ref: bottomImageRef }}
        >
          <div className="ind-bot-video-label">Kornit Guide</div>
        </HoverVideoCard>
      )}
      {!displayVideos && (
        <div
          ref={bottomImageRef}
          className="ind-bot-video-card ind-glass ind-bot-video-card--large"
        />
      )}

      {displayVideos && (
        <HoverVideoCard
          videoRef={botVid2}
          src="https://in3dwebsite.blob.core.windows.net/video/Intel Remote Assist and Guides (1).mp4"
          startTime={1}
          className="ind-bot-video-card ind-glass ind-bot-video-card--offset"
          style={{ ref: bottomImage2Ref }}
        >
          <div className="ind-bot-video-label">Intel Remote Assist</div>
        </HoverVideoCard>
      )}
      {!displayVideos && (
        <div
          ref={bottomImage2Ref}
          className="ind-bot-video-card ind-glass ind-bot-video-card--offset"
        />
      )}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SCOPED CSS
// ─────────────────────────────────────────────────────────────────────────────
const css = `
/* ── Base ────────────────────────────────────────────────────────────────── */
.ind-page {
  display: flex;
  flex-direction: column;
  height: 300vh;
  font-family: 'Gotham', 'gotham-bold', 'Swiss 721 Black', sans-serif;
  color: #0d0d0d;
}

.ind-glass {
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(14px) saturate(180%);
  -webkit-backdrop-filter: blur(14px) saturate(180%);
  border: 1px solid rgba(255,255,255,0.35);
  border-radius: 14px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.18);
}

/* ── HoverVideoCard ──────────────────────────────────────────────────────── */
.ind-hover-video {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

/* Blocks the browser's native control bar from receiving pointer events */
.ind-video-controls-mask {
  position: absolute;
  inset: 0;
  z-index: 3;
  background: transparent;
  pointer-events: none; /* pass clicks through so hover still fires on parent */
}

/* Hide native controls entirely via CSS on the video element inside */
.ind-hover-video video::-webkit-media-controls { display: none !important; }
.ind-hover-video video::-webkit-media-controls-enclosure { display: none !important; }
.ind-hover-video video { pointer-events: none; }

/* Centred play icon that fades in on hover */
.ind-hover-play-hint {
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
.ind-hover-video:hover .ind-hover-play-hint {
  opacity: 0; /* hide hint once playing */
}
.ind-hover-play-hint svg {
  filter: drop-shadow(0 2px 6px rgba(0,0,0,0.6));
}

/* ── TOP ─────────────────────────────────────────────────────────────────── */
.ind-top {
  display: flex;
  height: 100vh;
  padding: 0 5%;
  gap: 4%;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* subtle grid overlay */
.ind-top::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  z-index: 0;
}

.ind-top-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.4rem;
  z-index: 1;
}

.ind-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.45);
  opacity: 0;
  animation: indFadeUp 0.7s ease forwards;
  animation-delay: 0.1s;
  font-family: 'swiss-medium', 'gotham-old', sans-serif;
}

.ind-eyebrow-line {
  display: inline-block;
  width: 32px;
  height: 1px;
  background: currentColor;
}

.ind-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: currentColor;
}

.ind-headline {
  font-size: clamp(3.8rem, 7vw, 7rem);
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  line-height: 0.92;
  margin: 0;
  display: flex;
  gap: 0.22em;
  flex-wrap: wrap;
}

.ind-headline-word {
  display: inline-block;
  opacity: 0;
  transform: translateY(50px) skewX(-6deg);
  animation: indSliceUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.ind-headline-accent {
  color: transparent;
  -webkit-text-stroke: 2px #0d0d0d;
  letter-spacing: -0.02em;
}

@keyframes indSliceUp {
  to { opacity: 1; transform: translateY(0) skewX(0deg); }
}

.ind-divider-animated {
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #0d0d0d 0%, rgba(13,13,13,0.2) 100%);
  animation: indGrowLine 1s cubic-bezier(0.16,1,0.3,1) forwards;
  animation-delay: 0.45s;
}

@keyframes indGrowLine {
  to { width: 72px; }
}

.ind-body-text {
  font-size: clamp(0.9rem, 1.2vw, 1.1rem);
  line-height: 1.85;
  color: rgba(13,13,13,0.7);
  max-width: 420px;
  opacity: 0;
  animation: indFadeUp 0.8s ease forwards;
  animation-delay: 0.5s;
  font-family: 'gotham-old', 'swiss-medium', sans-serif;
  font-weight: 400;
}

.ind-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.ind-tag {
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 0.35em 0.9em;
  border: 1px solid rgba(0,0,0,0.25);
  border-radius: 100px;
  color: rgba(0,0,0,0.6);
  opacity: 0;
  animation: indFadeUp 0.5s ease forwards;
  font-family: 'swiss-medium', sans-serif;
}

@keyframes indFadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── TOP RIGHT ───────────────────────────────────────────────────────────── */
.ind-top-right {
  flex: 1.1;
  position: relative;
  height: 70%;
  z-index: 1;
}

.ind-image-cluster {
  position: relative;
  width: 100%;
  height: 100%;
}

.ind-img-hero {
  position: absolute;
  top: 10%;
  left: 10%;
  width: 70%;
  height: 75%;
  overflow: hidden;
  opacity: 0;
  animation: indFadeUp 1s ease forwards;
  animation-delay: 0.3s;
}

.ind-img-hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 6s ease;
}

.ind-img-hero:hover img { transform: scale(1.04); }

/* corner accents */
.ind-img-corner {
  position: absolute;
  width: 18px;
  height: 18px;
  border-color: rgba(255,255,255,0.9);
  border-style: solid;
}
.ind-img-corner--tl { top: 8px; left: 8px; border-width: 2px 0 0 2px; }
.ind-img-corner--br { bottom: 8px; right: 8px; border-width: 0 2px 2px 0; }

.ind-img-float {
  position: absolute;
  overflow: hidden;
  opacity: 0;
  animation: indFadeUp 0.8s ease forwards;
}

.ind-img-float--tl {
  top: -4%;
  left: -2%;
  width: 34%;
  height: 32%;
  animation-delay: 0.55s;
}
.ind-img-float--tl img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.ind-img-float--tr {
  top: 0%;
  right: -2%;
  width: 36%;
  height: 38%;
  animation-delay: 0.65s;
}

.ind-img-float--bl {
  bottom: -4%;
  left: -4%;
  width: 36%;
  height: 34%;
  animation-delay: 0.75s;
}

.ind-live-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  background: #e5002b;
  color: #fff;
  padding: 2px 7px;
  border-radius: 100px;
  font-family: 'swiss-medium', sans-serif;
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 2;
}
.ind-live-badge::before {
  content: '';
  width: 5px;
  height: 5px;
  background: #fff;
  border-radius: 50%;
  animation: indBlink 1s infinite;
}
@keyframes indBlink {
  0%,100% { opacity:1; }
  50%      { opacity:0; }
}

.ind-deco-number {
  position: absolute;
  right: -3%;
  bottom: 8%;
  font-size: clamp(4rem, 8vw, 8rem);
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  color: transparent;
  -webkit-text-stroke: 1px rgba(0,0,0,0.12);
  pointer-events: none;
  line-height: 1;
  user-select: none;
  opacity: 0;
  animation: indFadeUp 1.2s ease forwards;
  animation-delay: 0.9s;
}

/* ── MIDDLE ──────────────────────────────────────────────────────────────── */
.ind-middle {
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.ind-mid-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.ind-mid-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.ind-mid-bg-vignette {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    rgba(255,255,255,0.92) 0%,
    rgba(255,255,255,0.55) 45%,
    rgba(0,0,0,0.1) 100%
  );
}

.ind-mid-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 5%;
  gap: 4%;
}

/* Stat cards */
.ind-mid-stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 0 0 auto;
}

.ind-stat-card {
  padding: 1.2rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  opacity: 0;
  animation: indFadeUp 0.6s ease forwards;
  min-width: 130px;
}

.ind-stat-value {
  font-size: 2.2rem;
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  line-height: 1;
  color: #0d0d0d;
}

.ind-stat-label {
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.5);
  font-family: 'swiss-medium', sans-serif;
}

/* Phone */
.ind-mid-phone-wrap {
  position: relative;
  flex: 0 0 auto;
  width: 16%;
  height: 65vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ind-phone-glow {
  position: absolute;
  inset: -20%;
  background: radial-gradient(circle, rgba(80,180,255,0.25) 0%, transparent 70%);
  filter: blur(30px);
  pointer-events: none;
}

.ind-phone-frame {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
  z-index: 2;
}

.ind-phone-screen {
  position: absolute;
  top: 12%;
  left: 9%;
  width: 82%;
  height: 76%;
  z-index: 1;
  overflow: hidden;
  border-radius: 6px;
}

/* Quote block */
.ind-mid-text-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 360px;
}

.ind-mid-quote {
  font-size: 5rem;
  line-height: 0.6;
  color: rgba(0,0,0,0.15);
  font-family: 'Gotham', serif;
  margin: 0;
}

.ind-mid-body {
  font-size: clamp(0.95rem, 1.2vw, 1.1rem);
  line-height: 1.9;
  color: rgba(0,0,0,0.75);
  margin: 0;
  font-family: 'gotham-old', 'swiss-medium', sans-serif;
  font-weight: 400;
}

.ind-mid-emphasis {
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  font-weight: 900;
  color: #0d0d0d;
  font-size: 1.1em;
}

.ind-mid-sig {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.4);
  font-family: 'swiss-medium', sans-serif;
}

.ind-mid-sig-line {
  display: inline-block;
  width: 28px;
  height: 1px;
  background: currentColor;
}

/* ── BOTTOM ──────────────────────────────────────────────────────────────── */
.ind-bottom {
  height: 100vh;
  display: flex;
  align-items: center;
  padding: 0 5%;
  gap: 6%;
  background: linear-gradient(160deg, rgba(255,255,255,0) 0%, rgba(240,243,248,0.6) 100%);
}

.ind-bot-text-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  max-width: 440px;
}

.ind-bot-overline {
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: 'swiss-medium', sans-serif;
}
.ind-bot-overline::before {
  content: '';
  width: 28px;
  height: 1px;
  background: currentColor;
}

.ind-bot-headline {
  font-size: clamp(2.4rem, 4vw, 4rem);
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  line-height: 1.05;
  margin: 0;
  color: #0d0d0d;
}
.ind-bot-headline em {
  font-style: italic;
  color: transparent;
  -webkit-text-stroke: 2px #0d0d0d;
}

.ind-bot-body {
  font-size: clamp(0.9rem, 1.1vw, 1rem);
  line-height: 1.85;
  color: rgba(0,0,0,0.65);
  margin: 0;
  font-family: 'gotham-old', 'swiss-medium', sans-serif;
  font-weight: 400;
}
.ind-bot-body strong {
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  color: #0d0d0d;
}

.ind-bot-metrics {
  display: flex;
  gap: 2rem;
  padding-top: 0.6rem;
  border-top: 1px solid rgba(0,0,0,0.1);
}

.ind-bot-metric {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.ind-bot-metric-n {
  font-size: 1.8rem;
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  line-height: 1;
  color: #0d0d0d;
}

.ind-bot-metric-d {
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.4);
  font-family: 'swiss-medium', sans-serif;
}

/* Video stack */
.ind-bot-video-col {
  flex: 1.1;
  position: relative;
  height: 65%;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  align-items: flex-end;
}

.ind-bot-video-card {
  overflow: hidden;
  position: relative;
}

.ind-bot-video-card--large {
  width: 90%;
  height: 55%;
}

.ind-bot-video-card--offset {
  width: 76%;
  height: 40%;
  align-self: flex-start;
  margin-left: 8%;
}

.ind-bot-video-label {
  position: absolute;
  bottom: 10px;
  left: 12px;
  font-size: 0.65rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.85);
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(6px);
  padding: 3px 10px;
  border-radius: 100px;
  font-family: 'swiss-medium', sans-serif;
  z-index: 2;
}
`;

// const BottomModel = ({ modelRef }) => (
//   <div style={{ height: "70vh", display: "flex" }}>
//     <div
//       style={{
//         flex: 1,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Canvas
//         // style={{ border: "1px solid black", zIndex: 54433 }}
//         camera={{ position: [0, 0, 10], fov: 75 }}
//       >
//         <ambientLight intensity={1} />
//         <pointLight position={[10, 10, 10]} />
//         <directionalLight position={[0, 10, 0]} intensity={1} />
//         {/* <OrbitControls /> */}
//         {/* <Stars count={2/000} /> */}
//         {/* <Camera /> */}
//         <Suspense fallback={null}>
//           {/* <ModelComponent url={"/assets/models/engenir_model.glb"} /> */}
//           <ModelComponent
//             url={"/assets/models/engenir_model.glb"}
//             modelRef={modelRef}
//             position={[0, -3, -3]}
//           />
//         </Suspense>
//       </Canvas>
//     </div>
//   </div>
// );
