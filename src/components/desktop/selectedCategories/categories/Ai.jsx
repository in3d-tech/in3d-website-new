import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { Logo } from "../../../common/Logo";

// ─────────────────────────────────────────────────────────────────────────────
// AI PAGE — single section, full viewport
// ─────────────────────────────────────────────────────────────────────────────
export function Ai() {
  const eyeRef = useRef(null);
  const headlineRef = useRef(null);
  const bodyRef = useRef(null);
  const tagsRef = useRef(null);
  const glowRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    // Subtle floating animation on the eye image
    const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
    floatTl.to(eyeRef.current, {
      y: -14,
      duration: 3.5,
      ease: "sine.inOut",
    });

    // Slow pulse on the glow disc behind the eye
    gsap.to(glowRef.current, {
      scale: 1.12,
      opacity: 0.55,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Scan-line grid drift — very subtle, gives depth
    gsap.to(gridRef.current, {
      backgroundPositionY: "60px",
      duration: 8,
      repeat: -1,
      ease: "none",
    });

    return () => {
      floatTl.kill();
      gsap.killTweensOf([eyeRef.current, glowRef.current, gridRef.current]);
    };
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="ai-page">
        <Logo />

        {/* Ambient scan-line grid */}
        <div ref={gridRef} className="ai-scan-grid" />

        {/* Radial glow disc — sits behind the eye */}
        <div ref={glowRef} className="ai-glow-disc" />

        {/* ── LEFT: text ── */}
        <div className="ai-left">
          <div className="ai-eyebrow">
            <span className="ai-eyebrow-line" />
            <span>Next Generation</span>
            <span className="ai-dot" />
            <span>in3D</span>
          </div>

          <h1 ref={headlineRef} className="ai-headline">
            <span
              className="ai-headline-word"
              style={{ animationDelay: "0.05s" }}
            >
              Artificial
            </span>
            <br />
            <span
              className="ai-headline-word ai-headline-outline"
              style={{ animationDelay: "0.2s" }}
            >
              Intelligence
            </span>
          </h1>

          <div className="ai-divider-animated" />

          <p ref={bodyRef} className="ai-body-text">
            Navigate through our virtual environments with ease, blending with
            real-world operations for intuitive control and system management.
            Harness the potential of AI for virtual collaboration — granting
            operators fuller control over both software and hardware, paving the
            way for a future where innovation feels closer than ever before.
          </p>

          <div ref={tagsRef} className="ai-tags">
            {["LLM", "Computer Vision", "Generative AI", "Neural XR"].map(
              (t, i) => (
                <span
                  key={t}
                  className="ai-tag"
                  style={{ animationDelay: `${0.9 + i * 0.1}s` }}
                >
                  {t}
                </span>
              ),
            )}
          </div>

          {/* Stat row */}
          {/* <div className="ai-stats">
            {[
              { n: "∞", l: "Scalability" },
              { n: "RT", l: "Real-time AI" },
              { n: "XR", l: "Integrated" },
            ].map(({ n, l }, i) => (
              <div
                key={l}
                className="ai-stat"
                style={{ animationDelay: `${1.2 + i * 0.12}s` }}
              >
                <span className="ai-stat-n">{n}</span>
                <span className="ai-stat-l">{l}</span>
              </div>
            ))}
          </div> */}
        </div>

        {/* ── RIGHT: eye image ── */}
        <div className="ai-right">
          <div className="ai-eye-frame">
            <img
              ref={eyeRef}
              src="https://in3dwebsite.blob.core.windows.net/photos/ai-2-min.png"
              alt="AI Eye"
              className="ai-eye-img"
            />
            {/* Corner accents — carried over from system */}
            <div className="ai-corner ai-corner--tl" />
            <div className="ai-corner ai-corner--br" />
            {/* Scanning line animation */}
            <div className="ai-scan-line" />
          </div>

          {/* Ghost label */}
          <div className="ai-deco-word">AI</div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCOPED CSS
// ─────────────────────────────────────────────────────────────────────────────
const css = `
/* ── Base ────────────────────────────────────────────────────────────────── */
.ai-page {
  display: flex;
  height: 100vh;
  padding: 0 5%;
  gap: 4%;
  align-items: center;
  position: relative;
  overflow: hidden;
  font-family: 'Gotham', 'gotham-bold', 'Swiss 721 Black', sans-serif;
  color: #0d0d0d;
}

/* Ambient scan-line grid — drifts upward slowly */
.ai-scan-grid {
  position: absolute;
  inset: -60px;
  background-image:
    linear-gradient(rgba(100,180,255,0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(100,180,255,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  z-index: 0;
}

/* Radial glow disc behind the eye */
.ai-glow-disc {
  position: absolute;
  right: 8%;
  top: 50%;
  transform: translate(0, -50%);
  width: 48vw;
  height: 48vw;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(80,160,255,0.18) 0%,
    rgba(120,80,255,0.1) 45%,
    transparent 70%
  );
  filter: blur(40px);
  pointer-events: none;
  z-index: 0;
  opacity: 0.65;
}

/* ── Keyframes ───────────────────────────────────────────────────────────── */
@keyframes aiFadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes aiSliceUp {
  to { opacity: 1; transform: translateY(0) skewX(0deg); }
}
@keyframes aiGrowLine {
  to { width: 72px; }
}
@keyframes aiScanLine {
  0%   { top: 0%; opacity: 0.6; }
  90%  { opacity: 0.6; }
  100% { top: 100%; opacity: 0; }
}

/* ── LEFT ────────────────────────────────────────────────────────────────── */
.ai-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.4rem;
  z-index: 1;
}

.ai-eyebrow {
  display: flex; align-items: center; gap: 0.6rem;
  font-size: 0.72rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: rgba(0,0,0,0.45);
  opacity: 0; animation: aiFadeUp 0.7s ease forwards; animation-delay: 0.1s;
  font-family: 'swiss-medium', 'gotham-old', sans-serif;
}
.ai-eyebrow-line { display: inline-block; width: 32px; height: 1px; background: currentColor; }
.ai-dot { width: 3px; height: 3px; border-radius: 50%; background: currentColor; }

.ai-headline {
  font-size: clamp(3.4rem, 6.5vw, 6.5rem);
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  line-height: 0.95; margin: 0;
}
.ai-headline-word {
  display: inline-block; opacity: 0;
  transform: translateY(50px) skewX(-6deg);
  animation: aiSliceUp 0.65s cubic-bezier(0.16,1,0.3,1) forwards;
}
/* Second line is outline — gives the headline kinetic tension */
.ai-headline-outline {
  color: transparent;
  -webkit-text-stroke: 2.5px #0d0d0d;
}

.ai-divider-animated {
  width: 0; height: 3px;
  background: linear-gradient(90deg, #5080ff 0%, rgba(80,128,255,0.18) 100%);
  animation: aiGrowLine 1s cubic-bezier(0.16,1,0.3,1) forwards;
  animation-delay: 0.5s;
}

.ai-body-text {
  font-size: clamp(0.88rem, 1.15vw, 1rem); line-height: 1.9;
  color: rgba(13,13,13,0.66); max-width: 440px;
  opacity: 0; animation: aiFadeUp 0.8s ease forwards; animation-delay: 0.55s;
  font-family: 'gotham-old', 'swiss-medium', sans-serif; font-weight: 400;
}

.ai-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.ai-tag {
  font-size: 0.66rem; letter-spacing: 0.16em; text-transform: uppercase;
  padding: 0.35em 0.9em;
  border: 1px solid rgba(80,128,255,0.35);
  border-radius: 100px;
  color: rgba(0,0,0,0.55);
  background: rgba(80,128,255,0.06);
  opacity: 0; animation: aiFadeUp 0.5s ease forwards;
  font-family: 'swiss-medium', sans-serif;
}

/* Stat row */
.ai-stats {
  display: flex; gap: 2rem;
  padding-top: 0.6rem;
  border-top: 1px solid rgba(0,0,0,0.08);
}
.ai-stat {
  display: flex; flex-direction: column; gap: 0.1rem;
  opacity: 0; animation: aiFadeUp 0.5s ease forwards;
}
.ai-stat-n {
  font-size: 1.6rem; font-family: 'Gotham', 'gotham-bold', sans-serif;
  line-height: 1; color: #0d0d0d;
}
.ai-stat-l {
  font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase;
  color: rgba(0,0,0,0.4); font-family: 'swiss-medium', sans-serif;
}

/* ── RIGHT ───────────────────────────────────────────────────────────────── */
.ai-right {
  flex: 1.1;
  position: relative;
  height: 80%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-eye-frame {
  position: relative;
  width: 88%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 16px;
  /* Glassmorphism frame */
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(80,128,255,0.22);
  box-shadow: 0 12px 60px rgba(80,128,255,0.12);
  opacity: 0;
  animation: aiFadeUp 1s ease forwards;
  animation-delay: 0.3s;
}

.ai-eye-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  /* Slight blue tint to tie into the page palette */
  filter: saturate(1.1) hue-rotate(5deg);
}

/* Corner accents */
.ai-corner {
  position: absolute;
  width: 20px; height: 20px;
  border-color: rgba(80,128,255,0.7);
  border-style: solid;
  z-index: 5;
}
.ai-corner--tl { top: 10px; left: 10px; border-width: 2px 0 0 2px; }
.ai-corner--br { bottom: 10px; right: 10px; border-width: 0 2px 2px 0; }

/* Scanning line that sweeps top→bottom on loop */
.ai-scan-line {
  position: absolute;
  left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, rgba(80,180,255,0.7) 50%, transparent 100%);
  animation: aiScanLine 3.5s ease-in-out infinite;
  z-index: 4;
  pointer-events: none;
}

/* Ghost decorative word */
.ai-deco-word {
  position: absolute;
  bottom: -4%;
  right: -4%;
  font-size: clamp(5rem, 9vw, 9rem);
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  color: transparent;
  -webkit-text-stroke: 1px rgba(80,128,255,0.12);
  pointer-events: none; user-select: none; line-height: 1;
  opacity: 0;
  animation: aiFadeUp 1.2s ease forwards;
  animation-delay: 0.9s;
}
`;
