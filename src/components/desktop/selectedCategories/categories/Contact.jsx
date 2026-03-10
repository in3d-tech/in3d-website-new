import emailjs from "@emailjs/browser";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import Tilt from "react-parallax-tilt";
import { useAppContext } from "../../../../context/appContext";
import { Logo } from "../../../common/Logo";
import AnimatedBackground from "./AnimatedPointsBg";

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT PAGE — single viewport, editorial / About-family treatment
// Accent: warm gold (#c9a84c) matching About, paired with ink (#0d0d0d)
// ─────────────────────────────────────────────────────────────────────────────
export function Contact() {
  const { setIsCursorHovering } = useAppContext();

  return (
    <>
      <style>{css}</style>
      <div className="con-page">
        <Logo />
        <Top setIsCursorHovering={setIsCursorHovering} />
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOP — full layout, single viewport
// ─────────────────────────────────────────────────────────────────────────────
const Top = ({ setIsCursorHovering }) => {
  const [messageSent, setMessageSent] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const astroRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    if (messageSent) {
      const t = setTimeout(() => setMessageSent(false), 2500);
      return () => clearTimeout(t);
    }
  }, [messageSent]);

  // Floating astronaut + glow pulse — mirrors Ai.jsx
  useEffect(() => {
    const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
    floatTl.to(astroRef.current, { y: -16, duration: 3.8, ease: "sine.inOut" });
    gsap.to(glowRef.current, {
      scale: 1.15,
      opacity: 0.5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    return () => {
      floatTl.kill();
      gsap.killTweensOf([astroRef.current, glowRef.current]);
    };
  }, []);

  return (
    <div className="con-top">
      {/* Animated particle background — preserved from original */}
      {/* <AnimatedBackground /> */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <AnimatedBackground />
      </div>
      {/* ── LEFT: astronaut + glow ── */}
      <div className="con-left">
        <div ref={glowRef} className="con-glow" />
        <img
          ref={astroRef}
          src="https://in3dwebsite.blob.core.windows.net/photos/astronaut6-min.png"
          alt="astronaut"
          className="con-astro-img"
        />
      </div>

      {/* ── RIGHT: contact content ── */}
      <div className="con-right">
        {/* Eyebrow */}
        <div className="con-eyebrow">
          <span className="con-eyebrow-line" />
          <span>in3D</span>
          <span className="con-eyebrow-dot" />
          <span>Get In Touch</span>
        </div>

        {/* Headline */}
        <h1 className="con-headline">
          <span className="con-hl-word" style={{ animationDelay: "0.05s" }}>
            Let's
          </span>
          <span
            className="con-hl-word con-hl-outline"
            style={{ animationDelay: "0.2s" }}
          >
            Talk
          </span>
        </h1>

        <div className="con-divider-rule" />

        {/* Contact card — flips between details and message form */}
        <div className="con-card con-glass">
          {showForm ? (
            <ContactForm
              setShowForm={setShowForm}
              setMessageSent={setMessageSent}
              setIsCursorHovering={setIsCursorHovering}
            />
          ) : (
            <ContactDetails
              messageSent={messageSent}
              setShowForm={setShowForm}
              setIsCursorHovering={setIsCursorHovering}
            />
          )}
        </div>

        {/* Ghost deco word */}
        <div className="con-deco-word">HI</div>
      </div>

      {/* Disclaimer — preserved verbatim from original */}
      <div className="con-disclaimer">
        in3D does not disclose, collect, edit, transfer to a third party or use
        private information of its customers or website users. In any case in
        which in3D is asked to transfer private information, it will immediately
        notify the relevant customer and act under his guidance. For any inquiry
        contact: Nathanael@in3D-Tech.com — in3D works according to ISO9001,
        ISO27001, ISO27701.
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT DETAILS
// ─────────────────────────────────────────────────────────────────────────────
const ContactDetails = ({ messageSent, setShowForm, setIsCursorHovering }) => {
  const [copiedText, setCopiedText] = useState(null);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 1800);
    });
  };

  return (
    <div className="con-details">
      <p className="con-details-label">Feel free to reach us via</p>

      {[
        {
          icon: "https://in3dwebsite.blob.core.windows.net/photos/telefon-min.png",
          alt: "phone IL",
          text: "+972-52-678-7276",
          delay: "0.3s",
        },
        {
          icon: "https://in3dwebsite.blob.core.windows.net/photos/telefon-min.png",
          alt: "phone US",
          text: "+1 (302) 219-4023",
          delay: "0.45s",
        },
        {
          icon: "https://in3dwebsite.blob.core.windows.net/photos/mail-min.png",
          alt: "email",
          text: "sales@in3d-tech.com",
          delay: "0.6s",
        },
      ].map(({ icon, alt, text, delay }) => {
        const copied = copiedText === text;
        return (
          <Tilt
            key={text}
            glareEnable
            glareMaxOpacity={0.6}
            glareColor="#ffffff"
            glarePosition="bottom"
            glareBorderRadius="12px"
          >
            <div
              className={`con-contact-row${copied ? " con-contact-row--copied" : ""}`}
              style={{ animationDelay: delay }}
              onClick={() => handleCopy(text)}
              title={`Click to copy ${text}`}
            >
              <div className="con-icon-wrap">
                <img src={icon} alt={alt} className="con-contact-icon" />
              </div>
              <span className="con-contact-text">{text}</span>
              <div className="con-row-arrow">
                {copied ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7l4 4 6-7"
                      stroke="#2d6a2d"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  "→"
                )}
              </div>
            </div>
          </Tilt>
        );
      })}

      <div className="con-or-row">
        <span className="con-or-line" />
        <span className="con-or-label">or</span>
        <span className="con-or-line" />
      </div>

      {messageSent ? (
        <div className="con-sent-badge">
          <span className="con-sent-dot" />
          Message sent!
        </div>
      ) : (
        <button
          className="con-message-btn"
          onClick={() => setShowForm(true)}
          onMouseOver={() => setIsCursorHovering(true)}
          onMouseOut={() => setIsCursorHovering(false)}
        >
          <span>Send us a message</span>
          <span className="con-btn-arrow">→</span>
        </button>
      )}
    </div>
  );
};
// ─────────────────────────────────────────────────────────────────────────────
// CONTACT FORM — preserves all original emailjs logic exactly
// ─────────────────────────────────────────────────────────────────────────────

const ContactForm = ({ setShowForm, setMessageSent, setIsCursorHovering }) => {
  const form = useRef();

  useEffect(() => emailjs.init("YOUR-PUBLIC-KEY-HERE"), []);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_tv1wlgo",
        "template_evr30vn",
        form.current,
        "HorIaM2iMYpuvqSef",
      )
      .then(
        (result) => {
          console.log("Message sent successfully:", result.text);
          setMessageSent(true);
          setTimeout(() => setShowForm(false), 200);
        },
        (error) => console.log("error sending message:", error),
      );
  };

  return (
    <div className="con-form-wrap">
      {/* Close button */}
      <button
        className="con-form-close"
        onClick={() => setShowForm(false)}
        onMouseOver={() => setIsCursorHovering(true)}
        onMouseOut={() => setIsCursorHovering(false)}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M1 1l12 12M13 1L1 13"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <p className="con-form-label">Your message</p>

      <form ref={form} onSubmit={sendEmail} className="con-form">
        <textarea
          name="message"
          placeholder="Type your message here…"
          className="con-textarea"
        />
        <button
          type="submit"
          className="con-submit-btn"
          onMouseOver={() => setIsCursorHovering(true)}
          onMouseOut={() => setIsCursorHovering(false)}
        >
          <span>Send</span>
          <span className="con-btn-arrow">→</span>
        </button>
      </form>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCOPED CSS
// ─────────────────────────────────────────────────────────────────────────────
const css = `
/* ── Base ────────────────────────────────────────────────────────────────── */
.con-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Gotham', 'gotham-bold', 'Swiss 721 Black', sans-serif;
  color: #0d0d0d;
  overflow: hidden;
  position: relative;
}

.con-glass {
  background: rgba(255,255,255,0.13);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  border: 1px solid rgba(255,255,255,0.38);
  border-radius: 16px;
  box-shadow: 0 10px 48px rgba(0,0,0,0.12);
}

/* ── Keyframes ───────────────────────────────────────────────────────────── */
@keyframes conFadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes conSliceUp {
  to { opacity: 1; transform: translateY(0) skewX(0deg); }
}
@keyframes conGrowLine {
  to { width: 64px; }
}
@keyframes conBlink {
  0%,100% { opacity: 1; }
  50%      { opacity: 0.2; }
}
@keyframes conRowIn {
  from { opacity: 0; transform: translateX(-12px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* ── LAYOUT ──────────────────────────────────────────────────────────────── */
.con-top {
  display: flex;
  height: 100%;
  padding: 0 5%;
  gap: 4%;
  align-items: center;
  position: relative;
}

/* ── LEFT ────────────────────────────────────────────────────────────────── */
.con-left {
  flex: 0.9;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
}
.con-glow {
  position: absolute;
  width: 70%;
  height: 70%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201,168,76,0.2) 0%, rgba(201,168,76,0.06) 55%, transparent 70%);
  filter: blur(36px);
  pointer-events: none;
  opacity: 0.7;
}
.con-astro-img {
  width: 85%;
  object-fit: contain;
  position: relative;
  z-index: 1;
  /* Warm tone to match gold palette */
  filter: saturate(0.9) sepia(0.08);
}

/* ── RIGHT ───────────────────────────────────────────────────────────────── */
.con-right {
  flex: 1.1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
}

.con-eyebrow {
  display: flex; align-items: center; gap: 0.6rem;
  font-size: 0.72rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: rgba(0,0,0,0.45);
  opacity: 0; animation: conFadeUp 0.7s ease forwards; animation-delay: 0.1s;
  font-family: 'swiss-medium', 'gotham-old', sans-serif;
}
.con-eyebrow-line { display: inline-block; width: 28px; height: 1px; background: currentColor; }
.con-eyebrow-dot  { width: 3px; height: 3px; border-radius: 50%; background: currentColor; }

/* Oversized 2-word headline — matches About's "Who We Are" pattern */
.con-headline {
  font-size: clamp(4rem, 8vw, 8.5rem);
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  line-height: 0.9; margin: 0;
  display: flex; gap: 0.25em; align-items: baseline;
}
.con-hl-word {
  display: inline-block; opacity: 0;
  transform: translateY(55px) skewX(-6deg);
  animation: conSliceUp 0.65s cubic-bezier(0.16,1,0.3,1) forwards;
}
/* "Talk" is hollow / outlined — same trick as About's "We" */
.con-hl-outline {
  color: transparent;
  -webkit-text-stroke: 2.5px #0d0d0d;
}

/* Gold accent rule */
.con-divider-rule {
  width: 0; height: 3px;
  background: linear-gradient(90deg, #c9a84c 0%, rgba(201,168,76,0.18) 100%);
  animation: conGrowLine 1s cubic-bezier(0.16,1,0.3,1) forwards;
  animation-delay: 0.45s;
}

/* ── CONTACT CARD ────────────────────────────────────────────────────────── */
.con-card {
  padding: 1.8rem 2rem;
  position: relative;
  overflow: hidden;
}

/* ── DETAILS ─────────────────────────────────────────────────────────────── */
.con-details {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}
.con-details-label {
  font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase;
  color: rgba(0,0,0,0.38); font-family: 'swiss-medium', sans-serif; margin: 0 0 0.4rem 0;
}

.con-contact-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  border: 1px solid rgba(201,168,76,0.25);
  background: rgba(255,255,255,0.08);
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
  opacity: 0;
  animation: conRowIn 0.5s ease forwards;
}
.con-contact-row:hover {
  background: rgba(201,168,76,0.08);
  border-color: rgba(201,168,76,0.55);
}
.con-icon-wrap {
  width: 32px; height: 32px;
  border-radius: 8px;
  background: rgba(201,168,76,0.12);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.con-contact-icon { width: 1rem; }
.con-contact-text {
  flex: 1;
  font-size: clamp(0.82rem, 1vw, 0.96rem);
  font-family: 'gotham-old', 'swiss-medium', sans-serif;
  color: rgba(0,0,0,0.78); letter-spacing: 0.03em;
}
.con-row-arrow {
  font-size: 0.85rem; color: rgba(201,168,76,0.7);
  transition: transform 0.2s ease;
}
.con-contact-row:hover .con-row-arrow { transform: translateX(3px); }
.con-contact-row--copied {
  background: rgba(45,106,45,0.08) !important;
  border-color: rgba(45,106,45,0.35) !important;
}
.con-contact-row--copied .con-contact-text {
  color: #2d6a2d;
}

/* or divider */
.con-or-row {
  display: flex; align-items: center; gap: 0.7rem;
  padding: 0.3rem 0;
}
.con-or-line { flex: 1; height: 1px; background: rgba(0,0,0,0.1); }
.con-or-label {
  font-size: 0.64rem; letter-spacing: 0.16em; text-transform: uppercase;
  color: rgba(0,0,0,0.3); font-family: 'swiss-medium', sans-serif;
}

/* Message button */
.con-message-btn {
  display: flex; align-items: center; justify-content: space-between;
  gap: 0.8rem;
  padding: 0.85rem 1.3rem;
  border-radius: 10px;
  border: 1.5px solid #c9a84c;
  background: transparent;
  cursor: pointer;
  font-size: 0.82rem; letter-spacing: 0.1em; text-transform: uppercase;
  font-family: 'swiss-medium', sans-serif; color: #0d0d0d;
  transition: background 0.2s ease, color 0.2s ease;
  opacity: 0; animation: conFadeUp 0.5s ease forwards; animation-delay: 0.75s;
}
.con-message-btn:hover { background: #c9a84c; color: #fff; }
.con-btn-arrow { transition: transform 0.2s ease; }
.con-message-btn:hover .con-btn-arrow { transform: translateX(4px); }

/* Sent badge */
.con-sent-badge {
  display: inline-flex; align-items: center; gap: 0.6rem;
  padding: 0.6rem 1.2rem; border-radius: 100px;
  background: rgba(45,106,45,0.12); border: 1px solid rgba(45,106,45,0.3);
  font-size: 0.76rem; letter-spacing: 0.12em; text-transform: uppercase;
  color: #2d6a2d; font-family: 'swiss-medium', sans-serif;
  opacity: 0; animation: conFadeUp 0.4s ease forwards;
}
.con-sent-dot {
  width: 6px; height: 6px; border-radius: 50%; background: #2d6a2d;
  animation: conBlink 1.4s infinite;
}

/* ── FORM ────────────────────────────────────────────────────────────────── */
.con-form-wrap {
  position: relative;
  display: flex; flex-direction: column; gap: 0.9rem;
  opacity: 0; animation: conFadeUp 0.5s ease forwards; animation-delay: 0.05s;
}
.con-form-close {
  position: absolute; top: 0; right: 0;
  background: none; border: none; cursor: pointer;
  color: rgba(0,0,0,0.45); padding: 0.2rem;
  transition: color 0.2s ease;
}
.con-form-close:hover { color: #0d0d0d; }
.con-form-label {
  font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
  color: rgba(0,0,0,0.38); font-family: 'swiss-medium', sans-serif; margin: 0;
}
.con-form { display: flex; flex-direction: column; gap: 0.8rem; }
.con-textarea {
  width: 100%;
  height: 9rem;
  font-size: 0.9rem;
  font-family: 'gotham-old', sans-serif;
  padding: 2em;
  border-radius: 10px;
  border: 1px solid rgba(201,168,76,0.3);
  background: rgba(255,255,255,0.35);
  resize: none;
  outline: none;
  color: #0d0d0d;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}
.con-textarea:focus { border-color: #c9a84c; }
.con-textarea::placeholder { color: rgba(0,0,0,0.3); }
.con-submit-btn {
  display: flex; align-items: center; justify-content: center; gap: 0.6rem;
  align-self: flex-end;
  padding: 0.7rem 1.8rem;
  border-radius: 10px;
  border: 1.5px solid #c9a84c;
  background: transparent;
  cursor: pointer;
  font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase;
  font-family: 'swiss-medium', sans-serif; color: #0d0d0d;
  transition: background 0.2s ease, color 0.2s ease;
}
.con-submit-btn:hover { background: #c9a84c; color: #fff; }
.con-submit-btn:hover .con-btn-arrow { transform: translateX(4px); }

/* ── Ghost word ──────────────────────────────────────────────────────────── */
.con-deco-word {
  position: absolute;
  bottom: -8%;
  right: -2%;
  font-size: clamp(5rem, 10vw, 10rem);
  font-family: 'Gotham', 'gotham-bold', sans-serif;
  color: transparent;
  -webkit-text-stroke: 1px rgba(201,168,76,0.12);
  pointer-events: none; user-select: none; line-height: 1;
  opacity: 0; animation: conFadeUp 1.2s ease forwards; animation-delay: 0.9s;
}

/* ── Disclaimer ──────────────────────────────────────────────────────────── */
.con-disclaimer {
  position: absolute;
  bottom: 1rem; left: 0; right: 0;
  padding: 0 5%;
  font-size: 0.58rem;
  font-family: 'gotham-old', 'swiss-medium', sans-serif;
  color: rgba(0,0,0,0.3);
  text-align: center;
  line-height: 1.7;
  z-index: 1;
}
`;
