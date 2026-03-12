import React, { useEffect, useRef, useCallback, memo } from "react";

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
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
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

  destroy() {
    cancelAnimationFrame(this.frameRequest);
  }
}

export const TextScrambleComponent = memo(
  ({ colour, isHomePage, isMobile }) => {
    const textRef = useRef(null);
    const fxRef = useRef(null);

    // Stable phrases array — avoids recreating on each render
    const phrasesRef = useRef(
      isHomePage
        ? ["SIMPLY EXPAND"]
        : [
            isMobile ? "Expand" : "Pioneer",
            "Develop",
            "Advance",
            "Expand",
            "Craft",
            "Build",
            "Design",
          ],
    );

    useEffect(() => {
      if (!textRef.current) return;

      const fx = new TextScramble(textRef.current);
      fxRef.current = fx;
      const phrases = phrasesRef.current;
      let counter = 0;
      let timeoutId;
      let intervalId;

      const next = () => {
        fx.setText(phrases[counter]).then(() => {
          if (!isMobile && !isHomePage) {
            timeoutId = setTimeout(next, 100);
          }
        });
        counter = (counter + 1) % phrases.length;
      };

      if (isHomePage) {
        intervalId = setInterval(next, 1000);
        timeoutId = setTimeout(() => clearInterval(intervalId), 3200);
      } else {
        next();
      }

      return () => {
        fx.destroy();
        clearTimeout(timeoutId);
        clearInterval(intervalId);
      };
    }, [isHomePage, isMobile]);

    return (
      <div>
        <div
          className={isHomePage ? "" : "abla"}
          style={{ color: isHomePage ? "white" : colour }}
          ref={textRef}
        />
      </div>
    );
  },
);

export const TextScrambleComponentHover = memo(
  ({ text, handleClick, setIsCursorHovering }) => {
    const textRef = useRef(null);

    const handleMouseEnter = useCallback(() => {
      if (!textRef.current) return;
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
        style={{ border: "2px solid red" }}
      >
        {text}
      </span>
    );
  },
);
