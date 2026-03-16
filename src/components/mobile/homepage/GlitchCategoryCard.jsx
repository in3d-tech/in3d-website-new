import { useEffect, useRef, useState, memo, useCallback } from "react";
import "./GlitchCategoryCard.css";

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

/* ─── Single card ─── */
const GlitchCategoryCard = memo(
  ({
    category,
    idx,
    selectedCategory,
    setSelectedCategory,
    selectedMenuActionMobile,
    setSelectedMenuActionMobile,
    selectedCategoryItemByIdx,
    setSelectedCategoryItemByIdx,
    categoryIdxRef,
  }) => {
    const cardRef = useRef(null);
    const [revealed, setRevealed] = useState(false);

    /* Intersection Observer — reveal on scroll */
    useEffect(() => {
      const el = cardRef.current;
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.unobserve(el);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }, []);

    const handleClick = useCallback(() => {
      /* Wire up to your existing category selection logic */
      if (setSelectedCategory) {
        setSelectedCategory(category.title);
      }
      if (setSelectedCategoryItemByIdx) {
        setSelectedCategoryItemByIdx(idx);
      }
      if (categoryIdxRef) {
        categoryIdxRef.current = idx;
      }
    }, [
      idx,
      category.title,
      setSelectedCategory,
      setSelectedCategoryItemByIdx,
      categoryIdxRef,
    ]);

    return (
      <div
        ref={cardRef}
        className={`glitch-card ${revealed ? "glitch-card--revealed" : ""}`}
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

        {/* Left accent bar — pulses on reveal */}
        <div className="glitch-card__accent-bar" />

        {/* Data index top-right */}
        <div className="glitch-card__data-index">
          {category.idx} //
        </div>

        {/* Content */}
        <div className="glitch-card__content">
          <div className="glitch-card__idx">// {category.idx}</div>

          <div className="glitch-card__title">
            <span
              className="glitch-card__glitch-text"
              data-text={category.title}
            >
              {category.title}
            </span>
          </div>

          <div className="glitch-card__tagline">{category.tagline}</div>
        </div>
      </div>
    );
  }
);

GlitchCategoryCard.displayName = "GlitchCategoryCard";

/* ─── Cards list (replaces your categories.map in HomeScreenMobile) ─── */
export const GlitchCategoryCards = memo(
  ({
    selectedCategory,
    setSelectedCategory,
    selectedMenuActionMobile,
    setSelectedMenuActionMobile,
    selectedCategoryItemByIdx,
    setSelectedCategoryItemByIdx,
    categoryIdxRef,
  }) => {
    return (
      <div
        className="glitch-cards-wrapper"
        style={{ opacity: selectedCategory ? 0 : undefined }}
      >
        {CATEGORIES.map((category, idx) => (
          <GlitchCategoryCard
            key={category.idx}
            category={category}
            idx={idx}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedMenuActionMobile={selectedMenuActionMobile}
            setSelectedMenuActionMobile={setSelectedMenuActionMobile}
            selectedCategoryItemByIdx={selectedCategoryItemByIdx}
            setSelectedCategoryItemByIdx={setSelectedCategoryItemByIdx}
            categoryIdxRef={categoryIdxRef}
          />
        ))}
      </div>
    );
  }
);

GlitchCategoryCards.displayName = "GlitchCategoryCards";

export default GlitchCategoryCard;
