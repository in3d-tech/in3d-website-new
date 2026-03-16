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
      className={`cus-hover-video ${className || ""}`}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="cus-video-controls-mask" />
      <VideoPlayer videoRef={videoRef} src={src} startTime={startTime} />
      <div className="cus-hover-play-hint">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      </div>
      {children}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOMIZE PAGE
// ─────────────────────────────────────────────────────────────────────────────
export function Customize() {
  const topVid1Ref = useRef(null);
  const topVid2Ref = useRef(null);
  const midVid1Ref = useRef(null);
  const midVid2Ref = useRef(null);
  const midVid3Ref = useRef(null);
  const botVid1Ref = useRef(null);
  const botVid2Ref = useRef(null);

  // GSAP scroll refs — Middle
  const middleRef = useRef(null);
  const midTextRef = useRef(null);
  const midClusterRef = useRef(null);
  const midAccentRef = useRef(null);

  // GSAP scroll refs — Bottom
  const bottomRef = useRef(null);
  const botImageRef = useRef(null);
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
            end: "top 42%",
            scrub: 1,
          },
        },
      );
      gsap.fromTo(
        midTextRef.current,
        { clipPath: "inset(0 0 100% 0)", y: 20, opacity: 0 },
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
        midClusterRef.current,
        { y: 80, opacity: 0, filter: "grayscale(100%) brightness(0.5)" },
        {
          y: 0,
          opacity: 1,
          filter: "grayscale(0%) brightness(1)",
          ease: "none",
          scrollTrigger: {
            trigger: middleRef.current,
            scroller,
            start: "top 65%",
            end: "top 5%",
            scrub: 1.5,
          },
        },
      );

      // ── BOTTOM ──────────────────────────────────────────────────────────
      // DNA image slides in from left
      gsap.fromTo(
        botImageRef.current,
        { x: -60, opacity: 0, scale: 1.04 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: bottomRef.current,
            scroller,
            start: "top 85%",
            end: "top 35%",
            scrub: 1.8,
          },
        },
      );
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
            end: "top 12%",
            scrub: 1.2,
          },
        },
      );
      gsap.fromTo(
        botClusterRef.current,
        { y: 60, opacity: 0, filter: "grayscale(100%) brightness(0.5)" },
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
            scrub: 1.4,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="cus-page">
        <Logo />
        <Top topVid1Ref={topVid1Ref} topVid2Ref={topVid2Ref} />
        <Middle
          middleRef={middleRef}
          midTextRef={midTextRef}
          midClusterRef={midClusterRef}
          midAccentRef={midAccentRef}
          midVid1Ref={midVid1Ref}
          midVid2Ref={midVid2Ref}
          midVid3Ref={midVid3Ref}
        />
        <Bottom
          bottomRef={bottomRef}
          botImageRef={botImageRef}
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
// TOP — videos LEFT, text RIGHT (matches original layout)
// ─────────────────────────────────────────────────────────────────────────────
const Top = ({ topVid1Ref, topVid2Ref }) => (
  <div className="cus-top">
    {/* Mesh gradient — gives it an organic, creative feel vs the tactical lines of Military/Security */}
    <div className="cus-top-mesh" />

    {/* ── LEFT: stacked video pair ── */}
    <div className="cus-top-left">
      <div className="cus-top-cluster">
        <HoverVideoCard
          videoRef={topVid1Ref}
          src="https://in3dwebsite.blob.core.windows.net/video/ar real estate.mp4"
          startTime={1}
          className="cus-top-vid cus-top-vid--main cus-glass"
        >
          <span className="cus-vid-label">AR Real Estate</span>
          <div className="cus-img-corner cus-img-corner--tl" />
          <div className="cus-img-corner cus-img-corner--br" />
        </HoverVideoCard>

        <HoverVideoCard
          videoRef={topVid2Ref}
          src="https://in3dwebsite.blob.core.windows.net/video/Globe 3D Store - 14.10.20.mp4"
          startTime={1}
          className="cus-top-vid cus-top-vid--offset cus-glass"
        >
          <span className="cus-vid-label">3D Globe Store</span>
        </HoverVideoCard>

        <div className="cus-deco-word">XR</div>
      </div>
    </div>

    {/* ── RIGHT: text ── */}
    <div className="cus-top-right">
      <div className="cus-eyebrow">
        <span className="cus-eyebrow-line" />
        <span>Full-Stack XR</span>
        <span className="cus-dot" />
        <span>Custom Solutions</span>
      </div>

      <h1 className="cus-headline">
        <span className="cus-headline-word" style={{ animationDelay: "0.05s" }}>
          Customize
        </span>
      </h1>

      <div className="cus-divider-animated" />

      <p className="cus-body-text">
        We specialize in 3D and Extended Reality (XR), and as specialists we
        keep an amazing team of developers, 3D generalists, interface and
        graphic artists, and product designers — providing the flexibility to
        deliver the best tailor-made product.
      </p>

      <div className="cus-tags">
        {["VR", "AR", "MR", "3D", "Unity", "Web XR"].map((t, i) => (
          <span
            key={t}
            className="cus-tag"
            style={{ animationDelay: `${0.8 + i * 0.08}s` }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Platform badge row */}
      <div className="cus-platforms" style={{ animationDelay: "1.2s" }}>
        {["Mobile", "Desktop", "HoloLens", "Quest", "Tablet"].map((p, i) => (
          <span
            key={p}
            className="cus-platform-chip cus-glass"
            style={{ animationDelay: `${1.2 + i * 0.07}s` }}
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MIDDLE — text LEFT, 3-video cluster RIGHT
// ─────────────────────────────────────────────────────────────────────────────
const Middle = ({
  middleRef,
  midTextRef,
  midClusterRef,
  midAccentRef,
  midVid1Ref,
  midVid2Ref,
  midVid3Ref,
}) => (
  <div ref={middleRef} className="cus-middle">
    <div className="cus-mid-mesh" />

    <div className="cus-mid-content">
      {/* ── LEFT: quote + platform list ── */}
      <div className="cus-mid-text-col">
        <div ref={midAccentRef} className="cus-mid-accent-rule" />
        <p className="cus-mid-overline">Platform Coverage</p>

        <div ref={midTextRef} className="cus-mid-quote-block">
          <p className="cus-mid-quote-mark">"</p>
          <p className="cus-mid-quote-body">
            With constant curiosity and accumulated experience, we've
            successfully developed software on most existing hardware platforms
            — smartphones, desktops, tablets, and all XR headsets including VR,
            AR, and Mixed Reality.
          </p>
          {/* <div className="cus-mid-sig">
            <span className="cus-mid-sig-line" />
            <span>in3D R&D Team</span>
          </div> */}
        </div>

        <ul className="cus-mid-list">
          {[
            "All major XR headsets",
            "iOS, Android & Web",
            "Enterprise-grade deployment",
          ].map((item, i) => (
            <li
              key={item}
              className="cus-mid-list-item"
              style={{ animationDelay: `${i * 0.12 + 0.4}s` }}
            >
              <span className="cus-mid-list-dot" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* ── RIGHT: 3-video stacked cluster ── */}
      <div ref={midClusterRef} className="cus-mid-cluster">
        {/* Top card */}
        <div className="cus-mid-vid-top cus-glass">
          <HoverVideoCard
            videoRef={midVid3Ref}
            src="https://in3dwebsite.blob.core.windows.net/video/Hotze - VR Rakal.mp4"
            startTime={1}
            className="cus-mid-vid-inner"
          >
            <span className="cus-bot-vid-badge">VR Training</span>
          </HoverVideoCard>
          <div className="cus-img-corner cus-img-corner--tl" />
        </div>

        {/* Bottom row: two side-by-side */}
        <div className="cus-mid-vid-row">
          <div className="cus-mid-vid-small cus-glass">
            <HoverVideoCard
              videoRef={midVid1Ref}
              src="https://in3dwebsite.blob.core.windows.net/video/BIM Construction with Hololens.mp4"
              startTime={1}
              className="cus-mid-vid-inner"
            >
              <span className="cus-bot-vid-badge">BIM + HoloLens</span>
            </HoverVideoCard>
          </div>
          <div className="cus-mid-vid-small cus-glass">
            <HoverVideoCard
              videoRef={midVid2Ref}
              src="https://in3dwebsite.blob.core.windows.net/video/Package scanning and moving pilot.mp4"
              startTime={1}
              className="cus-mid-vid-inner"
            >
              <span className="cus-bot-vid-badge">Package Scan</span>
            </HoverVideoCard>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// BOTTOM — DNA image LEFT, text + video pair RIGHT
// ─────────────────────────────────────────────────────────────────────────────
const Bottom = ({
  bottomRef,
  botImageRef,
  botTextRef,
  botClusterRef,
  botAccentRef,
  botVid1Ref,
  botVid2Ref,
}) => (
  <div ref={bottomRef} className="cus-bottom">
    {/* ── LEFT: DNA background image panel ── */}
    <div className="cus-bot-image-col">
      <div
        ref={botImageRef}
        className="cus-bot-dna-image"
        style={{
          backgroundImage:
            'url("https://in3dwebsite.blob.core.windows.net/photos/customize-dna-min.jpg")',
        }}
      >
        <div className="cus-bot-dna-overlay" />
        <div className="cus-bot-dna-label">
          <span className="cus-bot-dna-label-line" />
          <span>Tailor-made</span>
        </div>
      </div>
    </div>

    {/* ── RIGHT: text + video cluster ── */}
    <div className="cus-bot-right-col">
      <div className="cus-bot-text-col">
        <div ref={botAccentRef} className="cus-bot-accent-rule" />
        <p className="cus-bot-overline">Enterprise Ready</p>

        <div ref={botTextRef} className="cus-bot-quote-block">
          <p className="cus-bot-quote-mark">"</p>
          <p className="cus-bot-body">
            With years of experience across a huge variety of sectors, we
            provide assistance with INFOSEC authorizations, hardware
            modifications, worker's committees, legal, and collaboration with
            major IT teams — delivering tailor-made solutions that started as a
            single employee's vision.
          </p>
          <div className="cus-bot-sig">
            <span className="cus-bot-sig-line" />
            <span>in3D Customization Team</span>
          </div>
        </div>

        <div className="cus-bot-metrics">
          {[
            // { n: "50+", d: "Platforms" },
            { n: "INFOSEC", d: "Certified" },
            { n: "Full", d: "Stack XR" },
          ].map(({ n, d }) => (
            <div key={d} className="cus-bot-metric">
              <span className="cus-bot-metric-n">{n}</span>
              <span className="cus-bot-metric-d">{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Video pair */}
      <div ref={botClusterRef} className="cus-bot-cluster">
        <div className="cus-bot-vid-card cus-glass">
          <HoverVideoCard
            videoRef={botVid1Ref}
            src="https://in3dwebsite.blob.core.windows.net/video/Hololens 2 - Guides (2).mp4"
            startTime={5}
            className="cus-mid-vid-inner"
          >
            <span className="cus-bot-vid-badge">HoloLens 2 Guides</span>
          </HoverVideoCard>
          <div className="cus-img-corner cus-img-corner--tl" />
        </div>
        <div className="cus-bot-vid-card cus-glass">
          <HoverVideoCard
            videoRef={botVid2Ref}
            src="https://in3dwebsite.blob.core.windows.net/video/Hololens 1 - Remote Assist (2).mp4"
            startTime={3}
            className="cus-mid-vid-inner"
          >
            <span className="cus-bot-vid-badge">Remote Assist</span>
          </HoverVideoCard>
          <div className="cus-img-corner cus-img-corner--br" />
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
.cus-page {
  display: flex;
  flex-direction: column;
  height: 300vh;
  font-family: 'Gotham', 'gotham-bold', 'Swiss 721 Black', sans-serif;
  color: #0d0d0d;
}

.cus-glass {
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(14px) saturate(170%);
  -webkit-backdrop-filter: blur(14px) saturate(170%);
  border: 1px solid rgba(255,255,255,0.36);
  border-radius: 14px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.16);
}

/* ── HoverVideoCard ──────────────────────────────────────────────────────── */
.cus-hover-video {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  width: 100%;
  height: 100%;
}
.cus-video-controls-mask {
  position: absolute; inset: 0; z-index: 3; background: transparent; pointer-events: none;
}
.cus-hover-video video::-webkit-media-controls { display: none !important; }
.cus-hover-video video::-webkit-media-controls-enclosure { display: none !important; }
.cus-hover-video video { pointer-events: none; }
.cus-hover-play-hint {
  position: absolute; inset: 0; z-index: 4;
  display: flex; align-items: center; justify-content: center;
  opacity: 1; transition: opacity 0.3s ease; background: rgba(0,0,0,0.18);
}
.cus-hover-video:hover .cus-hover-play-hint { opacity: 0; }
.cus-hover-play-hint svg { filter: drop-shadow(0 2px 6px rgba(0,0,0,0.6)); }

/* ── Keyframes ───────────────────────────────────────────────────────────── */
@keyframes cusFadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes cusSliceUp {
  to { opacity: 1; transform: translateY(0) skewX(0deg); }
}
@keyframes cusGrowLine {
  to { width: 72px; }
}

/* ── TOP ─────────────────────────────────────────────────────────────────── */
.cus-top {
  display: flex;
  height: 100vh;
  padding: 0 5%;
  gap: 4%;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* Organic gradient mesh — creative/studio feel vs tactical lines */
.cus-top-mesh {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 80% 30%, rgba(168,204,255,0.18) 0%, transparent 70%),
    radial-gradient(ellipse 40% 60% at 10% 70%, rgba(200,168,255,0.12) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.cus-top-left {
  flex: 1.1;
  position: relative;
  height: 72%;
  z-index: 1;
}
.cus-top-cluster {
  position: relative;
  width: 100%;
  height: 100%;
}
.cus-top-vid {
  position: absolute;
  overflow: hidden;
  opacity: 0;
  animation: cusFadeUp 0.9s ease forwards;
}
.cus-top-vid--main {
  top: 8%;
  left: 6%;
  width: 70%;
  height: 56%;
  animation-delay: 0.3s;
}
.cus-top-vid--offset {
  bottom: 3%;
  right: -2%;
  width: 62%;
  height: 42%;
  animation-delay: 0.5s;
}

.cus-vid-label {
  position: absolute;
  bottom: 9px; left: 11px;
  font-size: 0.6rem; letter-spacing: 0.14em; text-transform: uppercase;
  color: rgba(255,255,255,0.88);
  background: rgba(0,0,0,0.3);
  backdrop-filter: blur(6px);
  padding: 2px 9px; border-radius: 100px;
  font-family: 'swiss-medium', sans-serif;
  z-index: 5; white-space: nowrap;
}
.cus-img-corner {
  position: absolute;
  width: 18px; height: 18px;
  border-color: rgba(255,255,255,0.85);
  border-style: solid;
  z-index: 5;
}
.cus-img-corner--tl { top: 8px; left: 8px; border-width: 2px 0 0 2px; }
.cus-img-corner--br { bottom: 8px; right: 8px; border-width: 0 2px 2px 0; }

.cus-deco-word {
  position: absolute;
  bottom: 0%;
  left: -2%;
  font-size: clamp(4rem, 7vw, 7.5rem);
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  color: transparent;
  -webkit-text-stroke: 1px rgba(0,0,0,0.07);
  pointer-events: none; user-select: none; line-height: 1;
  opacity: 0;
  animation: cusFadeUp 1.2s ease forwards;
  animation-delay: 0.9s;
}

.cus-top-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.3rem;
  z-index: 1;
}
.cus-eyebrow {
  display: flex; align-items: center; gap: 0.6rem;
  font-size: 0.72rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: rgba(0,0,0,0.45);
  opacity: 0; animation: cusFadeUp 0.7s ease forwards; animation-delay: 0.1s;
  font-family: 'swiss-medium', 'gotham-old', sans-serif;
}
.cus-eyebrow-line { display: inline-block; width: 32px; height: 1px; background: currentColor; }
.cus-dot { width: 3px; height: 3px; border-radius: 50%; background: currentColor; }

.cus-headline {
  font-size: clamp(3.8rem, 7vw, 7rem);
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  line-height: 0.92; margin: 0;
}
.cus-headline-word {
  display: inline-block; opacity: 0;
  transform: translateY(50px) skewX(-6deg);
  animation: cusSliceUp 0.65s cubic-bezier(0.16,1,0.3,1) forwards;
}

.cus-divider-animated {
  width: 0; height: 3px;
  background: linear-gradient(90deg, #0d0d0d 0%, rgba(13,13,13,0.18) 100%);
  animation: cusGrowLine 1s cubic-bezier(0.16,1,0.3,1) forwards;
  animation-delay: 0.45s;
}
.cus-body-text {
  font-size: clamp(0.9rem, 1.2vw, 1.05rem); line-height: 1.88;
  color: rgba(13,13,13,0.68); max-width: 420px;
  opacity: 0; animation: cusFadeUp 0.8s ease forwards; animation-delay: 0.5s;
  font-family: 'gotham-old', 'swiss-medium', sans-serif; font-weight: 400;
}
.cus-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.cus-tag {
  font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
  padding: 0.35em 0.9em; border: 1px solid rgba(0,0,0,0.22); border-radius: 100px;
  color: rgba(0,0,0,0.58);
  opacity: 0; animation: cusFadeUp 0.5s ease forwards;
  font-family: 'swiss-medium', sans-serif;
}

/* Platform chips row */
.cus-platforms { display: flex; gap: 0.4rem; flex-wrap: wrap; }
.cus-platform-chip {
  font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase;
  padding: 0.3em 0.75em; color: rgba(0,0,0,0.52);
  opacity: 0; animation: cusFadeUp 0.5s ease forwards;
  font-family: 'swiss-medium', sans-serif;
}

/* ── MIDDLE ──────────────────────────────────────────────────────────────── */
.cus-middle {
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.cus-mid-mesh {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 50% 70% at 90% 50%, rgba(168,220,255,0.12) 0%, transparent 70%),
    radial-gradient(ellipse 60% 40% at 5% 20%, rgba(220,200,255,0.1) 0%, transparent 70%);
  pointer-events: none; z-index: 0;
}
.cus-mid-content {
  position: relative; z-index: 1;
  display: flex; align-items: center;
  width: 100%; padding: 0 5%; gap: 6%;
  height: 100%;
}

/* LEFT */
.cus-mid-text-col {
  flex: 1; display: flex; flex-direction: column; gap: 1.4rem; max-width: 400px;
}
.cus-mid-accent-rule {
  width: 64px; height: 3px;
  background: linear-gradient(90deg, #5b3fc8 0%, rgba(91,63,200,0.18) 100%);
  transform-origin: left center;
}
.cus-mid-overline {
  font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: rgba(0,0,0,0.38); font-family: 'swiss-medium', sans-serif; margin: 0;
  display: flex; align-items: center; gap: 0.6rem;
}
.cus-mid-overline::before {
  content: ''; display: inline-block; width: 24px; height: 1px; background: currentColor;
}
.cus-mid-quote-block { display: flex; flex-direction: column; gap: 0.6rem; }
.cus-mid-quote-mark {
  font-size: 5rem; line-height: 0.6;
  color: rgba(91,63,200,0.1); font-family: 'Gotham', serif; margin: 0;
}
.cus-mid-quote-body {
  font-size: clamp(0.92rem, 1.2vw, 1.05rem); line-height: 1.9;
  color: rgba(0,0,0,0.72); margin: 0;
  font-family: 'gotham-old', 'swiss-medium', sans-serif; font-weight: 400;
}
.cus-mid-sig {
  display: flex; align-items: center; gap: 0.7rem;
  font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
  color: rgba(0,0,0,0.38); font-family: 'swiss-medium', sans-serif;
}
.cus-mid-sig-line { display: inline-block; width: 28px; height: 1px; background: currentColor; }
.cus-mid-list {
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-direction: column; gap: 0.6rem;
  border-top: 1px solid rgba(0,0,0,0.08); padding-top: 1rem;
}
.cus-mid-list-item {
  display: flex; align-items: center; gap: 0.7rem;
  font-size: 0.82rem; letter-spacing: 0.06em; color: rgba(0,0,0,0.62);
  font-family: 'swiss-medium', 'gotham-old', sans-serif;
  opacity: 0; animation: cusFadeUp 0.5s ease forwards;
}
.cus-mid-list-dot { width: 5px; height: 5px; border-radius: 50%; background: #5b3fc8; flex-shrink: 0; }

/* RIGHT: 3-video cluster (1 top, 2 bottom row) */
.cus-mid-cluster { flex: 1.2; display: flex; flex-direction: column; gap: 0.9rem; height: 64%; }
.cus-mid-vid-top { flex: 1.3; position: relative; overflow: hidden; }
.cus-mid-vid-row { flex: 1; display: flex; gap: 0.9rem; }
.cus-mid-vid-small { flex: 1; position: relative; overflow: hidden; }
.cus-mid-vid-inner { position: absolute !important; inset: 0; }
.cus-bot-vid-badge {
  position: absolute; bottom: 8px; left: 10px;
  font-size: 0.58rem; letter-spacing: 0.13em; text-transform: uppercase;
  color: rgba(255,255,255,0.88); background: rgba(0,0,0,0.32);
  backdrop-filter: blur(6px); padding: 2px 8px; border-radius: 100px;
  font-family: 'swiss-medium', sans-serif; z-index: 5; white-space: nowrap;
}

/* ── BOTTOM ──────────────────────────────────────────────────────────────── */
.cus-bottom {
  height: 100vh;
  position: relative;
  display: flex;
  overflow: hidden;
}

/* LEFT: DNA image panel */
.cus-bot-image-col {
  flex: 0.9;
  position: relative;
  overflow: hidden;
}
.cus-bot-dna-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  position: relative;
}
.cus-bot-dna-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 100%);
}
.cus-bot-dna-label {
  position: absolute;
  bottom: 2.5rem; left: 1.8rem;
  display: flex; align-items: center; gap: 0.6rem;
  font-size: 0.65rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: rgba(255,255,255,0.75); font-family: 'swiss-medium', sans-serif;
}
.cus-bot-dna-label-line { display: inline-block; width: 24px; height: 1px; background: currentColor; }

/* RIGHT: text + video pair */
.cus-bot-right-col {
  flex: 1.1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  padding: 3rem 4% 3rem 5%;
}
.cus-bot-text-col { display: flex; flex-direction: column; gap: 1.2rem; }
.cus-bot-accent-rule {
  width: 64px; height: 3px;
  background: linear-gradient(90deg, #5b3fc8 0%, rgba(91,63,200,0.18) 100%);
  transform-origin: left center;
}
.cus-bot-overline {
  font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: rgba(0,0,0,0.38); font-family: 'swiss-medium', sans-serif; margin: 0;
  display: flex; align-items: center; gap: 0.6rem;
}
.cus-bot-overline::before {
  content: ''; display: inline-block; width: 24px; height: 1px; background: currentColor;
}
.cus-bot-quote-block { display: flex; flex-direction: column; gap: 0.6rem; }
.cus-bot-quote-mark {
  font-size: 5rem; line-height: 0.6;
  color: rgba(91,63,200,0.1); font-family: 'Gotham', serif; margin: 0;
}
.cus-bot-body {
  font-size: clamp(0.88rem, 1.1vw, 1rem); line-height: 1.9; color: rgba(0,0,0,0.7); margin: 0;
  font-family: 'gotham-old', 'swiss-medium', sans-serif; font-weight: 400;
}
.cus-bot-sig {
  display: flex; align-items: center; gap: 0.7rem;
  font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
  color: rgba(0,0,0,0.38); font-family: 'swiss-medium', sans-serif;
}
.cus-bot-sig-line { display: inline-block; width: 28px; height: 1px; background: currentColor; }
.cus-bot-metrics {
  display: flex; gap: 1.8rem;
  padding-top: 0.6rem; border-top: 1px solid rgba(0,0,0,0.08);
}
.cus-bot-metric { display: flex; flex-direction: column; gap: 0.1rem; }
.cus-bot-metric-n {
  font-size: 1.5rem; font-family: 'Gotham', 'gotham-bold', sans-serif; line-height: 1; color: #0d0d0d;
}
.cus-bot-metric-d {
  font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase;
  color: rgba(0,0,0,0.4); font-family: 'swiss-medium', sans-serif;
}

/* Video pair */
.cus-bot-cluster { display: flex; gap: 1.2rem; height: 42%; }
.cus-bot-vid-card { flex: 1; position: relative; overflow: hidden; }
`;
