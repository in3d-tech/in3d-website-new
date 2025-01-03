import React, { useEffect, useRef, useCallback } from "react";
const VOWELS = "aeiouAEIOU";

class TextScramble {
  constructor(el, speed = 1) {
    this.el = el;
    this.speed = speed;
    this.chars = "!<>-_/[]{}—=+*^?#________";
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
      // Only scramble vowels
      if (!VOWELS.includes(to)) {
        this.queue.push({ from, to, start: 0, end: 0 });
        continue;
      }
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
        output += `<span class="dud">${char}</span>`;
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

export const TextScrambleComponent = ({ colour, isHomePage, isMobile }) => {
  const textRef = useRef(null);
  // change back develope to pioneer
  const phrases = isHomePage
    ? ["SIMPLY EXPAND"]
    : [
        isMobile ? "Expand" : "Pioneer",
        "Develop",
        "Advance",
        "Expand",
        "Craft",
        "Build",
        "Design",
      ];

  useEffect(() => {
    const fx = new TextScramble(textRef.current);
    let counter = 0;

    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        if (!isMobile && !isHomePage) {
          setTimeout(next, 100);
        }
      });
      counter = (counter + 1) % phrases.length;
    };

    if (isHomePage) {
      const intervalId = setInterval(next, 1000);
      setTimeout(() => clearInterval(intervalId), 3200);
      return () => clearInterval(intervalId);
    } else {
      next();
    }

    return () => cancelAnimationFrame(fx.frameRequest);
  }, [isHomePage, isMobile, phrases]);

  return (
    <div
      style={
        {
          // marginTop: isHomePage ? "0.3em" : isMobile ? "0em" : "2em",
        }
      }
    >
      <div
        className={isHomePage ? "" : "abla"}
        style={{ color: isHomePage ? "white" : colour }}
        ref={textRef}
      ></div>
    </div>
  );
};

export const TextScrambleComponentHover = ({
  text,
  handleClick,
  setIsCursorHovering,
}) => {
  const textRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    const fx = new TextScramble(textRef.current, 0.4);
    fx.setText(text);
  }, [text]);

  return (
    <span
      className="button-ani"
      onClick={handleClick}
      ref={textRef}
      onMouseEnter={handleMouseEnter}
      onMouseOver={() => setIsCursorHovering(true)}
      onMouseOut={() => setIsCursorHovering(false)}
    >
      {text}
    </span>
  );
};
