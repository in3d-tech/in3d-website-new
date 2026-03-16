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
    const snapTimeout = useRef(null);

    /**
     * Detect which card is centered.
     * Returns the carousel index (0 = welcome, 1-7 = categories).
     * We convert to model index before calling onActiveIndexChange:
     *   carousel 0 (welcome) → model -1 (astro)
     *   carousel 1 (industry) → model 0
     *   carousel 2 (medicine) → model 1
     *   etc.
     */
    const detectActiveCard = useCallback(() => {
      const container = scrollRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let bestIdx = 0;
      let bestDist = Infinity;

      const cards = container.querySelectorAll(".glitch-card");
      cards.forEach((card, idx) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenter - containerCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = idx;
        }
      });

      setActiveIdx((prev) => {
        if (prev !== bestIdx) {
          // Convert carousel index to model index
          const modelIdx = bestIdx === 0 ? -1 : bestIdx - 1;
          setTimeout(() => onActiveIndexChange?.(modelIdx), 0);
          return bestIdx;
        }
        return prev;
      });
    }, [onActiveIndexChange]);

    const handleScroll = useCallback(() => {
      if (snapTimeout.current) clearTimeout(snapTimeout.current);
      snapTimeout.current = setTimeout(detectActiveCard, 60);
    }, [detectActiveCard]);

    useEffect(() => {
      const el = scrollRef.current;
      if (!el) return;
      el.addEventListener("scroll", handleScroll, { passive: true });
      const initialTimer = setTimeout(detectActiveCard, 100);
      return () => {
        el.removeEventListener("scroll", handleScroll);
        if (snapTimeout.current) clearTimeout(snapTimeout.current);
        clearTimeout(initialTimer);
      };
    }, [handleScroll, detectActiveCard]);

    // Notify parent of initial state: welcome card = astro model
    useEffect(() => {
      onActiveIndexChange?.(-1);
    }, []);

    const scrollToCard = useCallback((idx) => {
      const container = scrollRef.current;
      if (!container) return;
      const cards = container.querySelectorAll(".glitch-card");
      if (cards[idx]) {
        cards[idx].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }, []);

    return (
      <div className="glitch-cards-carousel-wrapper">
        {/* Horizontal scroll container */}
        <div ref={scrollRef} className="glitch-cards-carousel">
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
                onClick={() => scrollToCard(idx)}
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
