import React from "react";

/**
 * Futuristic Scroll Indicator
 *
 * Drop-in replacement for the down-indicator-wrapper block in BackgroundScroll.
 *
 * Usage:
 *   Replace the entire <div className="down-indicator-wrapper">...</div>
 *   with: <ScrollIndicator />
 */

const styles = `
.scroll-indicator-wrapper {
  margin-top: 4.5em;
  margin-left: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  opacity: 0;
  animation: scrollInd-fadeIn 3s forwards;
  animation-delay: 3s;
  user-select: none;
}

@keyframes scrollInd-fadeIn {
  to { opacity: 1; }
}

/* Capsule track */
.scroll-indicator-track {
  position: relative;
  width: 26px;
  height: 48px;
  border-radius: 18px;
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  overflow: hidden;
  background: rgba(255, 255, 255, 0.04);
}

/* Scanline sweep */
.scroll-indicator-track::before {
  content: "";
  position: absolute;
  top: -100%;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(0, 168, 255, 0.08) 40%,
    rgba(0, 168, 255, 0.18) 50%,
    rgba(0, 168, 255, 0.08) 60%,
    transparent 100%
  );
  animation: scrollInd-scanline 3s ease-in-out infinite;
}

@keyframes scrollInd-scanline {
  0%   { top: -100%; }
  50%  { top: 100%; }
  100% { top: 100%; }
}

/* Glowing dot */
.scroll-indicator-dot {
  position: absolute;
  left: 50%;
  top: 10px;
  width: 6px;
  height: 6px;
  margin-left: -3px;
  border-radius: 50%;
  background: rgba(0, 168, 255, 1);
  box-shadow:
    0 0 6px rgba(0, 168, 255, 0.7),
    0 0 20px rgba(0, 168, 255, 0.3);
  animation: scrollInd-dot 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes scrollInd-dot {
  0% {
    top: 10px;
    opacity: 1;
    transform: scale(1);
  }
  60% {
    top: 46px;
    opacity: 0.4;
    transform: scale(0.6);
  }
  61% {
    opacity: 0;
  }
  100% {
    top: 10px;
    opacity: 0;
    transform: scale(1);
  }
}

/* Ping on reset */
.scroll-indicator-dot::after {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: rgba(0, 168, 255, 0.4);
  animation: scrollInd-dotPing 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes scrollInd-dotPing {
  0% { transform: scale(1); opacity: 0.6; }
  8% { transform: scale(2.2); opacity: 0; }
  100% { opacity: 0; }
}

/* Trail behind dot */
.scroll-indicator-trail {
  position: absolute;
  left: 50%;
  top: 10px;
  width: 1px;
  margin-left: -0.5px;
  height: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 168, 255, 0.6),
    transparent
  );
  animation: scrollInd-trail 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes scrollInd-trail {
  0% {
    height: 0;
    top: 10px;
    opacity: 0.9;
  }
  40% {
    height: 30px;
    top: 16px;
    opacity: 0.6;
  }
  60% {
    height: 0;
    top: 46px;
    opacity: 0;
  }
  100% {
    height: 0;
    top: 10px;
    opacity: 0;
  }
}

/* Single chevron — wrapper handles vertical bounce, inner handles rotation */
.scroll-indicator-chevron-wrap {
  margin-top: 12px;
  display: flex;
  justify-content: center;
  animation: scrollInd-chevronBounce 2.4s ease-in-out infinite;
}

.scroll-indicator-chevron {
  width: 12px;
  height: 12px;
  border-right: 1.5px solid rgba(0, 168, 255, 0.5);
  border-bottom: 1.5px solid rgba(0, 168, 255, 0.5);
  transform: rotate(45deg);
}

@keyframes scrollInd-chevronBounce {
  0%, 30%  { opacity: 0.3; transform: translateY(-3px); }
  50%      { opacity: 0.8; transform: translateY(0); }
  70%, 100% { opacity: 0.3; transform: translateY(3px); }
}

/* Text label */
.scroll-indicator-label {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0px;
}

.scroll-indicator-label span {
  font-size: 9px;
  font-family: "gotham", sans-serif;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  animation: scrollInd-textPulse 4s ease-in-out infinite;
}

.scroll-indicator-label span:nth-child(2) {
  animation-delay: 0.2s;
}

@keyframes scrollInd-textPulse {
  0%, 100% { color: rgba(255, 255, 255, 0.3); }
  50%      { color: rgba(255, 255, 255, 0.5); }
}
`;

export function ScrollIndicator() {
  return (
    <>
      <style>{styles}</style>
      <div className="scroll-indicator-wrapper">
        <div className="scroll-indicator-track">
          <div className="scroll-indicator-trail" />
          <div className="scroll-indicator-dot" />
        </div>
        <div className="scroll-indicator-chevron-wrap">
          <div className="scroll-indicator-chevron" />
        </div>
        <div className="scroll-indicator-label">
          <span>Scroll</span>
          <span>Down</span>
        </div>
      </div>
    </>
  );
}

export default ScrollIndicator;
