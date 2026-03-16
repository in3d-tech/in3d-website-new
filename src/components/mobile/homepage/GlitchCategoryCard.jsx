import { useEffect, useRef, useState, memo, useCallback } from "react";
import "./GlitchCategoryCard.css";

/* ─── Welcome card (maps to astro model, index -1) ─── */
const WELCOME_CARD = {
  title: "in3D",
  tagline: "Simply Revolutionary",
  accent: "#ffffff",
  idx: "000",
  bg: "/assets/images/backgrounds/Astro_1_Background.webp",
  isWelcome: true,
};

/* ─── Category metadata ─── */
const CATEGORIES = [
  {
    title: "INDUSTRY",
    tagline: "Redefining production pipelines",
    accent: "#1D9E75",
    idx: "001",
    bg: "/assets/images/backgrounds/Astro_1_Background.webp",
  },
  {
    title: "MEDICINE",
    tagline: "Precision health, visualized",
    accent: "#D4537E",
    idx: "002",
    bg: "/assets/images/backgrounds/medicine/medicine_bg.jpg",
  },
  {
    title: "MICROSOFT",
    tagline: "Enterprise-grade integration",
    accent: "#378ADD",
    idx: "003",
    bg: "/assets/images/backgrounds/microsoft/microsoft_bg.jpg",
  },
  {
    title: "SECURITY",
    tagline: "Threat surfaces, mapped in 3D",
    accent: "#E24B4A",
    idx: "004",
    bg: "/assets/images/backgrounds/security/security.jpg",
  },
  {
    title: "ARTIFICIAL INTELLIGENCE",
    tagline: "Beyond the neural frontier",
    accent: "#7F77DD",
    idx: "005",
    bg: "https://in3dwebsite.blob.core.windows.net/photos/Ai_Tugle_Finish-min.jpg",
  },
  {
    title: "MILITARY",
    tagline: "Tactical spatial awareness",
    accent: "#888780",
    idx: "006",
    bg: "/assets/images/backgrounds/military/military_bg.jpg",
  },
  {
    title: "CUSTOMIZATION",
    tagline: "Your vision, our dimension",
    accent: "#BA7517",
    idx: "007",
    bg: "https://in3dwebsite.blob.core.windows.net/photos/Customize_Togle_Finish-min.jpg",
  },
];

/* Full list: welcome card + categories */
const ALL_CARDS = [WELCOME_CARD, ...CATEGORIES];

/* ─── Minimum swipe distance (px) to register as intentional ─── */
const SWIPE_THRESHOLD = 30;
/* ─── Cooldown between card transitions (ms) ─── */
const TRANSITION_COOLDOWN = 400;

/* ─── Single card ─── */
const GlitchCategoryCard = memo(
  ({
    category,
    idx,
    isActive,
    selectedCategory,
    setSelectedCategory,
    setSelectedCategoryItemByIdx,
    categoryIdxRef,
  }) => {
    const cardRef = useRef(null);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setRevealed(true), 100 + idx * 80);
      return () => clearTimeout(timer);
    }, [idx]);

    const handleClick = useCallback(() => {
      // Welcome card is not clickable into a category page
      if (category.isWelcome) return;

      if (setSelectedCategory) {
        setSelectedCategory(category.title);
      }
      if (setSelectedCategoryItemByIdx) {
        // Category cards are offset by 1 because of the welcome card
        setSelectedCategoryItemByIdx(idx - 1);
      }
      if (categoryIdxRef) {
        categoryIdxRef.current = idx - 1;
      }
    }, [
      idx,
      category,
      setSelectedCategory,
      setSelectedCategoryItemByIdx,
      categoryIdxRef,
    ]);

    return (
      <div
        ref={cardRef}
        className={`glitch-card ${revealed ? "glitch-card--revealed" : ""} ${
          isActive ? "glitch-card--active" : ""
        } ${category.isWelcome ? "glitch-card--welcome" : ""}`}
        style={{
          "--card-accent": category.accent,
          opacity: selectedCategory ? 0 : undefined,
          pointerEvents: selectedCategory ? "none" : undefined,
        }}
        onClick={handleClick}
      >
        {/* Background image layer */}
        <div
          className="glitch-card__bg"
          style={{ backgroundImage: `url("${category.bg}")` }}
        />

        {/* Scanline sweep */}
        <div className="glitch-card__scanline" />

        {/* Left accent bar */}
        <div className="glitch-card__accent-bar" />

        {/* Data index top-right */}
        <div className="glitch-card__data-index">
          {category.isWelcome ? "HOME //" : `${category.idx} //`}
        </div>

        {/* Content */}
        <div className="glitch-card__content">
          {!category.isWelcome && (
            <div className="glitch-card__idx">// {category.idx}</div>
          )}

          <div className="glitch-card__title">
            {category.isWelcome ? (
              <span className="glitch-card__welcome-title">
                <img
                  src="/assets/images/in3d-logo-white.png"
                  alt="in3D"
                  className="glitch-card__welcome-logo"
                />
              </span>
            ) : (
              <span
                className="glitch-card__glitch-text"
                data-text={category.title}
              >
                {category.title}
              </span>
            )}
          </div>

          <div className="glitch-card__tagline">{category.tagline}</div>

          {category.isWelcome && (
            <div className="glitch-card__swipe-hint">Swipe to explore ›</div>
          )}
        </div>
      </div>
    );
  },
);

GlitchCategoryCard.displayName = "GlitchCategoryCard";

/* ─── Horizontal carousel wrapper ─── */
export const GlitchCategoryCards = memo(
  ({
    selectedCategory,
    setSelectedCategory,
    selectedMenuActionMobile,
    setSelectedMenuActionMobile,
    selectedCategoryItemByIdx,
    setSelectedCategoryItemByIdx,
    categoryIdxRef,
    onActiveIndexChange,
  }) => {
    const scrollRef = useRef(null);
    const [activeIdx, setActiveIdx] = useState(0);

    // ── Controlled swipe state ──
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const isTransitioning = useRef(false);
    const activeIdxRef = useRef(0); // mirror of activeIdx for touch handler

    // Keep ref in sync with state
    useEffect(() => {
      activeIdxRef.current = activeIdx;
    }, [activeIdx]);

    /**
     * Scroll to a specific card index (smooth animated).
     * This is the single source of truth for card navigation.
     */
    const scrollToCard = useCallback((idx) => {
      const container = scrollRef.current;
      if (!container) return;
      const cards = container.querySelectorAll(".glitch-card");
      if (!cards[idx]) return;

      cards[idx].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }, []);

    /**
     * Navigate to a card and update active state.
     * Enforces cooldown to prevent rapid-fire transitions.
     */
    const goToCard = useCallback(
      (idx) => {
        const clamped = Math.max(0, Math.min(idx, ALL_CARDS.length - 1));
        if (clamped === activeIdxRef.current) return;
        if (isTransitioning.current) return;

        isTransitioning.current = true;

        setActiveIdx(clamped);
        activeIdxRef.current = clamped;

        // Notify parent: convert carousel index to model index
        const modelIdx = clamped === 0 ? -1 : clamped - 1;
        onActiveIndexChange?.(modelIdx);

        scrollToCard(clamped);

        // Cooldown — prevents queued swipes from firing
        setTimeout(() => {
          isTransitioning.current = false;
        }, TRANSITION_COOLDOWN);
      },
      [onActiveIndexChange, scrollToCard],
    );

    // ── Touch handlers: one-card-at-a-time swipe ──
    const handleTouchStart = useCallback((e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }, []);

    const handleTouchMove = useCallback((e) => {
      // Prevent native horizontal scroll so momentum doesn't skip cards
      // Allow vertical scroll through (if delta Y > delta X, don't prevent)
      const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
      const dy = Math.abs(e.touches[0].clientY - touchStartY.current);

      if (dx > dy) {
        e.preventDefault();
      }
    }, []);

    const handleTouchEnd = useCallback(
      (e) => {
        const endX = e.changedTouches[0].clientX;
        const deltaX = touchStartX.current - endX;

        // Only act if swipe exceeds threshold
        if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

        if (deltaX > 0) {
          // Swiped left → next card
          goToCard(activeIdxRef.current + 1);
        } else {
          // Swiped right → previous card
          goToCard(activeIdxRef.current - 1);
        }
      },
      [goToCard],
    );

    // ── Attach touch listeners (non-passive so we can preventDefault) ──
    useEffect(() => {
      const el = scrollRef.current;
      if (!el) return;

      el.addEventListener("touchstart", handleTouchStart, { passive: true });
      el.addEventListener("touchmove", handleTouchMove, { passive: false });
      el.addEventListener("touchend", handleTouchEnd, { passive: true });

      return () => {
        el.removeEventListener("touchstart", handleTouchStart);
        el.removeEventListener("touchmove", handleTouchMove);
        el.removeEventListener("touchend", handleTouchEnd);
      };
    }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

    // ── Mouse wheel / trackpad: one card per discrete scroll ──
    useEffect(() => {
      const el = scrollRef.current;
      if (!el) return;

      const handleWheel = (e) => {
        // Only intercept horizontal-dominant scrolls
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          e.preventDefault();
          if (Math.abs(e.deltaX) < 10) return; // ignore tiny trackpad noise

          if (e.deltaX > 0) {
            goToCard(activeIdxRef.current + 1);
          } else {
            goToCard(activeIdxRef.current - 1);
          }
        }
      };

      el.addEventListener("wheel", handleWheel, { passive: false });
      return () => el.removeEventListener("wheel", handleWheel);
    }, [goToCard]);

    // Notify parent of initial state: welcome card = astro model
    useEffect(() => {
      onActiveIndexChange?.(-1);
    }, []);

    // Scroll to card 0 (welcome) on mount
    useEffect(() => {
      const timer = setTimeout(() => scrollToCard(0), 100);
      return () => clearTimeout(timer);
    }, [scrollToCard]);

    return (
      <div className="glitch-cards-carousel-wrapper">
        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="glitch-cards-carousel glitch-cards-carousel--controlled"
        >
          <div className="glitch-cards-carousel__spacer" />

          {ALL_CARDS.map((category, idx) => (
            <GlitchCategoryCard
              key={category.idx}
              category={category}
              idx={idx}
              isActive={idx === activeIdx}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              setSelectedCategoryItemByIdx={setSelectedCategoryItemByIdx}
              categoryIdxRef={categoryIdxRef}
            />
          ))}

          <div className="glitch-cards-carousel__spacer" />
        </div>

        {/* Dot indicators + arrows */}
        <div className="glitch-cards-carousel__hint">
          <span
            className={`glitch-cards-carousel__arrow glitch-cards-carousel__arrow--left ${
              activeIdx === 0 ? "glitch-cards-carousel__arrow--hidden" : ""
            }`}
            onClick={() => goToCard(activeIdx - 1)}
          >
            ‹
          </span>

          <div className="glitch-cards-carousel__dots">
            {ALL_CARDS.map((card, idx) => (
              <button
                key={idx}
                className={`glitch-cards-carousel__dot ${
                  idx === activeIdx ? "glitch-cards-carousel__dot--active" : ""
                } ${idx === 0 ? "glitch-cards-carousel__dot--home" : ""}`}
                onClick={() => goToCard(idx)}
                aria-label={
                  idx === 0 ? "Go to home" : `Go to ${ALL_CARDS[idx].title}`
                }
              />
            ))}
          </div>

          <span
            className={`glitch-cards-carousel__arrow glitch-cards-carousel__arrow--right ${
              activeIdx === ALL_CARDS.length - 1
                ? "glitch-cards-carousel__arrow--hidden"
                : ""
            }`}
            onClick={() => goToCard(activeIdx + 1)}
          >
            ›
          </span>
        </div>
      </div>
    );
  },
);

GlitchCategoryCards.displayName = "GlitchCategoryCards";

export default GlitchCategoryCard;
