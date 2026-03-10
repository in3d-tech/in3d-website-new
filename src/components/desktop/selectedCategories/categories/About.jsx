import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Logo } from "../../../common/Logo";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT PAGE — 4 sections, editorial / magazine treatment
// Deliberately different from the category pages:
//   · Full-bleed imagery drives the layout rather than video clusters
//   · Large typographic statements dominate over body copy
//   · Kinetic text reveals are the primary animation language
//   · Accent color: warm off-black / ink (#1a1209) with gold (#c9a84c) highlights
// ─────────────────────────────────────────────────────────────────────────────
export function About() {
  const midRef = useRef(null);
  const midImgRef = useRef(null);
  const midTxt1Ref = useRef(null);
  const midTxt2Ref = useRef(null);
  const midRuleRef = useRef(null);

  const mid2Ref = useRef(null);
  const mid2Txt1Ref = useRef(null);
  const mid2Txt2Ref = useRef(null);

  const botRef = useRef(null);
  const botTxtRef = useRef(null);
  const botRuleRef = useRef(null);

  useEffect(() => {
    const scroller = ".selected-category-wrapper";

    const ctx = gsap.context(() => {
      // ── MIDDLE 1 ──────────────────────────────────────────────────────
      // Image parallax slide in from left
      gsap.fromTo(
        midImgRef.current,
        { x: -80, opacity: 0, filter: "grayscale(60%)" },
        {
          x: 0,
          opacity: 1,
          filter: "grayscale(0%)",
          ease: "none",
          scrollTrigger: {
            trigger: midRef.current,
            scroller,
            start: "top 85%",
            end: "top 25%",
            scrub: 1.8,
          },
        },
      );
      // First text line wipes up
      gsap.fromTo(
        midTxt1Ref.current,
        { clipPath: "inset(0 0 100% 0)", y: 16, opacity: 0 },
        {
          clipPath: "inset(0 0 0% 0)",
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: midRef.current,
            scroller,
            start: "top 65%",
            end: "top 20%",
            scrub: 1.1,
          },
        },
      );
      // Second text block wipes slightly after
      gsap.fromTo(
        midTxt2Ref.current,
        { clipPath: "inset(0 0 100% 0)", y: 16, opacity: 0 },
        {
          clipPath: "inset(0 0 0% 0)",
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: midRef.current,
            scroller,
            start: "top 50%",
            end: "top 5%",
            scrub: 1.2,
          },
        },
      );
      // Gold accent rule grows
      gsap.fromTo(
        midRuleRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: midRef.current,
            scroller,
            start: "top 60%",
            end: "top 35%",
            scrub: 1,
          },
        },
      );

      // ── MIDDLE 2 (full-bleed image section) ───────────────────────────
      gsap.fromTo(
        mid2Txt1Ref.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: mid2Ref.current,
            scroller,
            start: "top 70%",
            end: "top 20%",
            scrub: 1.2,
          },
        },
      );
      gsap.fromTo(
        mid2Txt2Ref.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: mid2Ref.current,
            scroller,
            start: "top 45%",
            end: "top 5%",
            scrub: 1.1,
          },
        },
      );

      // ── BOTTOM ────────────────────────────────────────────────────────
      gsap.fromTo(
        botRuleRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          ease: "none",
          transformOrigin: "right center",
          scrollTrigger: {
            trigger: botRef.current,
            scroller,
            start: "top 70%",
            end: "top 45%",
            scrub: 1,
          },
        },
      );
      gsap.fromTo(
        botTxtRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: botRef.current,
            scroller,
            start: "top 55%",
            end: "bottom 90%",
            scrub: 1.3,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="abt-page">
        <Logo />
        <Top />
        <Middle
          midRef={midRef}
          midImgRef={midImgRef}
          midTxt1Ref={midTxt1Ref}
          midTxt2Ref={midTxt2Ref}
          midRuleRef={midRuleRef}
        />
        <MiddleTwo
          mid2Ref={mid2Ref}
          mid2Txt1Ref={mid2Txt1Ref}
          mid2Txt2Ref={mid2Txt2Ref}
        />
        <Bottom botRef={botRef} botTxtRef={botTxtRef} botRuleRef={botRuleRef} />
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOP — full-bleed astronaut image with oversized headline overlay
// ─────────────────────────────────────────────────────────────────────────────
const Top = () => (
  <div className="abt-top">
    <img
      className="abt-top-bg"
      src="https://in3dwebsite.blob.core.windows.net/photos/astronaut_P1_stronger-min.png"
      alt="Astronaut"
    />
    {/* Dark gradient so text is always readable */}
    <div className="abt-top-vignette" />

    {/* Eyebrow */}
    <div className="abt-top-eyebrow">
      <span className="abt-eyebrow-line" />
      <span>Israeli Software House</span>
      <span className="abt-eyebrow-dot" />
      <span>Since 2018</span>
    </div>

    {/* Oversized stacked headline */}
    <div className="abt-top-headline-wrap">
      <h1 className="abt-top-headline">
        <span className="abt-top-hl-word" style={{ animationDelay: "0.1s" }}>
          Who
        </span>
        <span
          className="abt-top-hl-word abt-top-hl-outline"
          style={{ animationDelay: "0.25s" }}
        >
          We
        </span>
        <span className="abt-top-hl-word" style={{ animationDelay: "0.4s" }}>
          Are
        </span>
      </h1>
    </div>

    {/* Bottom strip descriptor */}
    <div className="abt-top-strip">
      <p className="abt-top-strip-text">
        In3D is an Israeli software house with ambitions to become a software
        house without borders.
      </p>
      <div className="abt-top-strip-rule" />
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MIDDLE — image left, large editorial text right
// ─────────────────────────────────────────────────────────────────────────────
const Middle = ({ midRef, midImgRef, midTxt1Ref, midTxt2Ref, midRuleRef }) => (
  <div ref={midRef} className="abt-mid">
    {/* LEFT: floating image panel */}
    <div className="abt-mid-img-col">
      <img
        ref={midImgRef}
        src="https://in3dwebsite.blob.core.windows.net/photos/about-2-min.png"
        alt="in3D team"
        className="abt-mid-img"
      />
      {/* corner accents */}
      <div className="abt-corner abt-corner--tl" />
      <div className="abt-corner abt-corner--br" />
    </div>

    {/* RIGHT: editorial text stack */}
    <div className="abt-mid-text-col">
      <div ref={midRuleRef} className="abt-mid-rule" />
      <p className="abt-mid-overline">Our Focus</p>

      <div ref={midTxt1Ref} className="abt-mid-statement">
        We develop 3D virtual environments for different business sectors in
        Israel and all over the world.
      </div>

      <div ref={midTxt2Ref} className="abt-mid-kicker-block">
        <p className="abt-mid-kicker-label">We specialize in</p>
        <p className="abt-mid-kicker">
          Mixed Reality
          <br />
          <span className="abt-mid-kicker-sub">(XR)</span>
        </p>
        <p className="abt-mid-kicker-belief">
          But first and foremost — we are firm believers in it.
        </p>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MIDDLE TWO — full-bleed image with overlaid manifesto text
// ─────────────────────────────────────────────────────────────────────────────
const MiddleTwo = ({ mid2Ref, mid2Txt1Ref, mid2Txt2Ref }) => (
  <div ref={mid2Ref} className="abt-mid2">
    <img
      className="abt-mid2-bg"
      src="https://in3dwebsite.blob.core.windows.net/photos/about-3-min.png"
      alt="in3D innovation"
    />
    {/* Gradient overlay — light top, dark bottom for text legibility */}
    <div className="abt-mid2-vignette" />

    {/* Top-left manifesto */}
    <div ref={mid2Txt1Ref} className="abt-mid2-manifesto">
      <span className="abt-mid2-manifesto-rule" />
      <p>
        We are not a startup —<br />
        we are ready to start working with you.
      </p>
      <p className="abt-mid2-manifesto-small">
        We push ourselves to continue to be called innovative every day. This
        requires us to break our own way — and the way of our technology.
      </p>
    </div>

    {/* Bottom-right mission */}
    <div ref={mid2Txt2Ref} className="abt-mid2-mission">
      <p className="abt-mid2-mission-label">Our Mission</p>
      <p className="abt-mid2-mission-text">
        To play an important role in the technology market for many years to
        come.
      </p>
      <div className="abt-mid2-mission-rule" />
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// BOTTOM — full-bleed image with closing credentials
// ─────────────────────────────────────────────────────────────────────────────
const Bottom = ({ botRef, botTxtRef, botRuleRef }) => (
  <div ref={botRef} className="abt-bot">
    <img
      className="abt-bot-bg"
      src="https://in3dwebsite.blob.core.windows.net/photos/about-4-min.png"
      alt="in3D credentials"
    />
    <div className="abt-bot-vignette" />

    <div className="abt-bot-content">
      <div ref={botRuleRef} className="abt-bot-rule" />

      <div ref={botTxtRef} className="abt-bot-text-block">
        <p className="abt-bot-overline">Standards & Trust</p>

        {/* Large closing statement */}
        {/* <h2 className="abt-bot-closing">
          Built on
          <br />
          <span className="abt-bot-closing-outline">standards.</span>
        </h2> */}

        <div className="abt-bot-iso-row">
          {["ISO 9001", "ISO 27001"].map((iso) => (
            <div key={iso} className="abt-bot-iso-chip">
              <span className="abt-bot-iso-dot" />
              <span>{iso}</span>
            </div>
          ))}
        </div>

        <p className="abt-bot-body">
          In3D provides services under the strictest standard definitions for
          well-known and large businesses and organisations worldwide. Choose us
          for your next project.
        </p>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SCOPED CSS
// ─────────────────────────────────────────────────────────────────────────────
const css = `
/* ── Base ────────────────────────────────────────────────────────────────── */
.abt-page {
  display: flex;
  flex-direction: column;
  height: 400vh;
  font-family: 'Gotham', 'gotham-bold', 'Swiss 721 Black', sans-serif;
  color: #0d0d0d;
}

/* ── Keyframes ───────────────────────────────────────────────────────────── */
@keyframes abtFadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes abtSliceUp {
  to { opacity: 1; transform: translateY(0) skewX(0deg); }
}
@keyframes abtGrowRight {
  to { width: 100%; }
}
@keyframes abtBlink {
  0%,100% { opacity: 1; }
  50%      { opacity: 0; }
}

/* ─────────────────────────────────────────────────────────────────────────
   TOP
───────────────────────────────────────────────────────────────────────── */
.abt-top {
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.abt-top-bg {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
}

/* Gradient: transparent top → dark bottom for headline + strip readability */
.abt-top-vignette {
  position: absolute; inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0,0,0,0) 0%,
    rgba(0,0,0,0.1) 40%,
    rgba(0,0,0,0.72) 100%
  );
  z-index: 1;
}

/* Eyebrow — top-left corner */
.abt-top-eyebrow {
  position: absolute;
  top: 2.5rem; left: 5%;
  display: flex; align-items: center; gap: 0.6rem;
  font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: rgba(255,255,255,0.65);
  z-index: 2;
  opacity: 0; animation: abtFadeUp 0.8s ease forwards; animation-delay: 0.2s;
  font-family: 'swiss-medium', 'gotham-old', sans-serif;
}
.abt-eyebrow-line { display: inline-block; width: 28px; height: 1px; background: currentColor; }
.abt-eyebrow-dot { width: 3px; height: 3px; border-radius: 50%; background: currentColor; }

/* Oversized 3-word headline — left-aligned, stacked, 30% from bottom */
.abt-top-headline-wrap {
  position: absolute;
  bottom: 22%; left: 5%;
  z-index: 2;
}
.abt-top-headline {
  font-size: clamp(4.5rem, 10vw, 11rem);
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  line-height: 0.9; margin: 0;
  display: flex; flex-direction: column; gap: 0.05em;
  color: #fff;
}
.abt-top-hl-word {
  display: inline-block; opacity: 0;
  transform: translateY(60px) skewX(-5deg);
  animation: abtSliceUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards;
}
/* Middle word "We" is hollow / outlined — white stroke on transparent */
.abt-top-hl-outline {
  color: transparent;
  -webkit-text-stroke: 3px rgba(255,255,255,0.9);
}

/* Bottom strip — descriptor + horizontal rule */
.abt-top-strip {
  position: relative; z-index: 2;
  padding: 1.6rem 5%;
  display: flex; align-items: center; gap: 3rem;
  border-top: 1px solid rgba(255,255,255,0.2);
}
.abt-top-strip-text {
  font-size: clamp(0.82rem, 1.1vw, 0.98rem);
  color: rgba(255,255,255,0.75);
  margin: 0; max-width: 500px; line-height: 1.7;
  font-family: 'gotham-old', 'swiss-medium', sans-serif; font-weight: 400;
  opacity: 0; animation: abtFadeUp 0.8s ease forwards; animation-delay: 0.9s;
}
.abt-top-strip-rule {
  flex: 1; height: 1px;
  background: linear-gradient(90deg, rgba(255,255,255,0.3) 0%, transparent 100%);
  opacity: 0; animation: abtFadeUp 0.8s ease forwards; animation-delay: 1.1s;
}

/* ─────────────────────────────────────────────────────────────────────────
   MIDDLE 1 — image LEFT, editorial text RIGHT
───────────────────────────────────────────────────────────────────────── */
.abt-mid {
  height: 100vh;
  display: flex;
  align-items: center;
  padding: 0 5%;
  gap: 5%;
  position: relative;
  overflow: hidden;
}

/* Subtle warm dot texture — different from the blue/tactical grids of other pages */
.abt-mid::before {
  content: '';
  position: absolute; inset: 0;
  background-image: radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none; z-index: 0;
}

.abt-mid-img-col {
  flex: 1.1;
  height: 72%;
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 20px 60px rgba(0,0,0,0.14);
}
.abt-mid-img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
}

/* Corner accents — gold-tinted to match page palette */
.abt-corner {
  position: absolute; width: 20px; height: 20px;
  border-color: rgba(201,168,76,0.8); border-style: solid; z-index: 5;
}
.abt-corner--tl { top: 10px; left: 10px; border-width: 2px 0 0 2px; }
.abt-corner--br { bottom: 10px; right: 10px; border-width: 0 2px 2px 0; }

.abt-mid-text-col {
  flex: 1;
  display: flex; flex-direction: column; gap: 1.8rem;
  z-index: 1;
}

/* Gold accent rule */
.abt-mid-rule {
  width: 64px; height: 3px;
  background: linear-gradient(90deg, #c9a84c 0%, rgba(201,168,76,0.18) 100%);
  transform-origin: left center;
}

.abt-mid-overline {
  font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: rgba(0,0,0,0.38); font-family: 'swiss-medium', sans-serif; margin: 0;
  display: flex; align-items: center; gap: 0.6rem;
}
.abt-mid-overline::before {
  content: ''; display: inline-block; width: 24px; height: 1px; background: currentColor;
}

/* Large editorial statement */
.abt-mid-statement {
  font-size: clamp(1.4rem, 2.4vw, 2.2rem);
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  line-height: 1.25; color: #0d0d0d;
}

/* Kicker — "We specialize in / Mixed Reality" */
.abt-mid-kicker-block {
  display: flex; flex-direction: column; gap: 0.4rem;
  border-left: 3px solid #c9a84c;
  padding-left: 1.2rem;
}
.abt-mid-kicker-label {
  font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase;
  color: rgba(0,0,0,0.4); font-family: 'swiss-medium', sans-serif; margin: 0;
}
.abt-mid-kicker {
  font-size: clamp(2rem, 3.5vw, 3.5rem);
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  line-height: 1; margin: 0; color: #0d0d0d;
}
.abt-mid-kicker-sub {
  font-size: 0.5em;
  color: transparent;
  -webkit-text-stroke: 1.5px #0d0d0d;
  display: inline-block;
  margin-left: 0.2em;
}
.abt-mid-kicker-belief {
  font-size: clamp(0.88rem, 1.1vw, 1rem);
  line-height: 1.7; color: rgba(0,0,0,0.55); margin: 0.4rem 0 0 0;
  font-family: 'gotham-old', 'swiss-medium', sans-serif; font-style: italic; font-weight: 400;
}

/* ─────────────────────────────────────────────────────────────────────────
   MIDDLE 2 — full-bleed image with manifesto overlay
───────────────────────────────────────────────────────────────────────── */
.abt-mid2 {
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.abt-mid2-bg {
  position: absolute; inset: 0;
  width: 100%; height: 100%; object-fit: cover; display: block;
}
/* Gradient: semi-transparent top + dark bottom */
.abt-mid2-vignette {
  position: absolute; inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0,0,0,0.55) 0%,
    rgba(0,0,0,0.1) 45%,
    rgba(0,0,0,0.7) 100%
  );
  z-index: 1;
}

/* Manifesto — top-left */
.abt-mid2-manifesto {
  position: relative; z-index: 2;
  padding: 4rem 5% 0;
  max-width: 520px;
  display: flex; flex-direction: column; gap: 1rem;
}
.abt-mid2-manifesto-rule {
  display: block; width: 40px; height: 3px;
  background: #c9a84c; margin-bottom: 0.5rem;
}
.abt-mid2-manifesto p {
  font-size: clamp(1.4rem, 2.2vw, 2rem);
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  line-height: 1.3; color: #fff; margin: 0;
}
.abt-mid2-manifesto-small {
  font-size: clamp(0.82rem, 1.1vw, 0.96rem) !important;
  font-family: 'gotham-old', 'swiss-medium', sans-serif !important;
  font-weight: 400 !important;
  color: rgba(255,255,255,0.72) !important;
  line-height: 1.8 !important;
}

/* Mission statement — bottom-right */
.abt-mid2-mission {
  position: relative; z-index: 2;
  padding: 0 5% 4rem;
  max-width: 440px;
  align-self: flex-end;
  display: flex; flex-direction: column; gap: 0.7rem;
}
.abt-mid2-mission-label {
  font-size: 0.68rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: rgba(255,255,255,0.5); font-family: 'swiss-medium', sans-serif; margin: 0;
}
.abt-mid2-mission-text {
  font-size: clamp(1.1rem, 1.8vw, 1.6rem);
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  color: #fff; line-height: 1.3; margin: 0;
}
.abt-mid2-mission-rule {
  width: 0; height: 2px; background: #c9a84c;
  animation: abtGrowRight 1.4s ease forwards; animation-delay: 0.4s;
}

/* ─────────────────────────────────────────────────────────────────────────
   BOTTOM — full-bleed image, bottom-right credentials block
───────────────────────────────────────────────────────────────────────── */
.abt-bot {
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
.abt-bot-bg {
  position: absolute; inset: 0;
  width: 100%; height: 100%; object-fit: cover; display: block;
}
.abt-bot-vignette {
  position: absolute; inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0,0,0,0) 0%,
    rgba(0,0,0,0.15) 50%,
    rgba(0,0,0,0.78) 100%
  );
  z-index: 1;
}

.abt-bot-content {
  position: relative; z-index: 2;
  padding: 0 5% 8% 0;
  max-width: 480px;
  display: flex; flex-direction: column; gap: 1.8rem;
  align-items: flex-end;
}

/* Gold rule — grows from right */
.abt-bot-rule {
  width: 64px; height: 3px;
  background: linear-gradient(270deg, #c9a84c 0%, rgba(201,168,76,0.18) 100%);
  transform-origin: right center;
  align-self: flex-end;
}

.abt-bot-text-block {
  display: flex; flex-direction: column; gap: 1.2rem;
  align-items: flex-end; text-align: right;
}

.abt-bot-overline {
  font-size: 0.68rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: rgba(255,255,255,0.5); font-family: 'swiss-medium', sans-serif; margin: 0;
  display: flex; align-items: center; gap: 0.6rem;
}
.abt-bot-overline::after {
  content: ''; display: inline-block; width: 24px; height: 1px; background: currentColor;
}

/* Large closing headline */
.abt-bot-closing {
  font-size: clamp(2.8rem, 5vw, 5rem);
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  line-height: 0.95; margin: 0; color: #fff;
}
.abt-bot-closing-outline {
  color: transparent;
  -webkit-text-stroke: 2.5px rgba(255,255,255,0.9);
}

/* ISO chips */
.abt-bot-iso-row {
  display: flex; gap: 0.7rem;
}
.abt-bot-iso-chip {
  display: flex; align-items: center; gap: 0.5rem;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(201,168,76,0.4);
  border-radius: 100px;
  padding: 0.3em 0.85em;
  font-size: 0.64rem; letter-spacing: 0.14em; text-transform: uppercase;
  color: rgba(255,255,255,0.8); font-family: 'swiss-medium', sans-serif;
}
.abt-bot-iso-dot {
  width: 5px; height: 5px; border-radius: 50%; background: #c9a84c;
  animation: abtBlink 2.5s infinite;
  flex-shrink: 0;
}

.abt-bot-body {
  font-size: clamp(0.8rem, 1vw, 0.92rem); line-height: 1.85;
  color: rgba(255,255,255,0.62); margin: 0; max-width: 380px;
  font-family: 'gotham-old', 'swiss-medium', sans-serif; font-weight: 400;
}
`;
