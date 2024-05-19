import React, { useEffect, useRef, useCallback } from "react";

class TextScramble {
  constructor(el, speed = 1) {
    // Add speed parameter with a default value
    this.el = el;
    this.speed = speed; // Store the speed
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.random() * 40 * this.speed;
      const end = start + Math.random() * 40 * this.speed;
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span className="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const phrases = [
  // "Pioneer",
  "Develop",
  "Advance",
  // "Expand",
  "Craft",
  "Build",
  "Design",
];

export const TextScrambleComponent = ({ colour }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const fx = new TextScramble(textRef.current);
    let counter = 0;
    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 100);
      });
      counter = (counter + 1) % phrases.length;
    };
    next();

    // Cleanup on unmount
    return () => cancelAnimationFrame(fx.frameRequest);
  }, []);

  return (
    <div className={""} style={{ marginTop: "2em" }}>
      <div className={"abla"} style={{ color: colour }} ref={textRef}></div>
    </div>
  );
};

// ----------------------------------------------------------------

export const TextScrambleComponentHover = ({ text, handleClick }) => {
  const textRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    const fx = new TextScramble(textRef.current, 0.4);
    fx.setText(text);
  }, [text]);

  return (
    // <div className={""}>
    <span
      className="button-ani"
      onClick={handleClick}
      ref={textRef}
      onMouseEnter={handleMouseEnter}
    >
      {text}
    </span>
    // </div>
  );
};
