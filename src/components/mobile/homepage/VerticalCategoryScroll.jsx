import { useEffect, useRef, useState, memo, useCallback } from "react";
import "./VerticalCategoryScroll.css";

/* ─── Welcome section (astro model, index -1) ─── */
const WELCOME_CARD = {
  title: "in3D",
  tagline: "Simply Revolutionary",
  accent: "#ffffff",
  idx: "000",
  bg: "/assets/images/backgrounds/Astro_1_Background.webp",
  isWelcome: true,
  modelIdx: -1,
};

/* ─── Category metadata ─── */
const CATEGORIES = [
  {
    title: "INDUSTRY",
    tagline: "Redefining production pipelines",
    accent: "#1D9E75",
    idx: "001",
    bg: "/assets/images/backgrounds/Astro_1_Background.webp",
    modelIdx: 0,
    description:
      "Transform manufacturing workflows with photorealistic 3D asset pipelines built for scale.",
  },
  {
    title: "MEDICINE",
    tagline: "Precision health, visualized",
    accent: "#D4537E",
    idx: "002",
    bg: "/assets/images/backgrounds/medicine/medicine_bg.jpg",
    modelIdx: 1,
    description:
      "Spatial anatomy mapping and surgical simulation at the intersection of biology and rendering.",
  },
  {
    title: "MICROSOFT",
    tagline: "Enterprise-grade integration",
    accent: "#378ADD",
    idx: "003",
    bg: "/assets/images/backgrounds/microsoft/microsoft_bg.jpg",
    modelIdx: 2,
    description:
      "Native 3D content pipelines embedded across the Microsoft ecosystem, from Teams to Azure.",
  },
  {
    title: "SECURITY",
    tagline: "Threat surfaces, mapped in 3D",
    accent: "#E24B4A",
    idx: "004",
    bg: "/assets/images/backgrounds/security/security.jpg",
    modelIdx: 3,
    description:
      "Physical and digital threat visualization for perimeter defense and response operations.",
  },
  {
    title: "ARTIFICIAL INTELLIGENCE",
    tagline: "Beyond the neural frontier",
    accent: "#7F77DD",
    idx: "005",
    bg: "https://in3dwebsite.blob.core.windows.net/photos/Ai_Tugle_Finish-min.jpg",
    modelIdx: 4,
    description:
      "AI-driven 3D synthesis enabling real-time generative environments and predictive spatial modeling.",
  },
  {
    title: "MILITARY",
    tagline: "Tactical spatial awareness",
    accent: "#888780",
    idx: "006",
    bg: "/assets/images/backgrounds/military/military_bg.jpg",
    modelIdx: 5,
    description:
      "Mission-critical 3D terrain and asset generation for defense simulation and field intelligence.",
  },
  {
    title: "CUSTOMIZATION",
    tagline: "Your vision, our dimension",
    accent: "#BA7517",
    idx: "007",
    bg: "https://in3dwebsite.blob.core.windows.net/photos/Customize_Togle_Finish-min.jpg",
    modelIdx: 6,
    description:
      "Bespoke 3D pipelines engineered to your exact workflow — from concept to deployment.",
  },
];

const ALL_SECTIONS = [WELCOME_CARD, ...CATEGORIES];

/* ─── Single scroll section ─── */
const CategorySection = memo(
  ({
    category,
    isActive,
    sectionRef,
    onEnter,
    selectedCategory,
    setSelectedCategory,
    setSelectedCategoryItemByIdx,
    categoryIdxRef,
  }) => {
    const intersectionRef = useRef(null);

    useEffect(() => {
      const el = intersectionRef.current;
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            onEnter(category.modelIdx);
          }
        },
        { threshold: 0.5 },
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, [category.modelIdx, onEnter]);

    const handleEnter = useCallback(() => {
      if (category.isWelcome) return;
      if (setSelectedCategory) setSelectedCategory(category.title);
      if (setSelectedCategoryItemByIdx)
        setSelectedCategoryItemByIdx(category.modelIdx);
      if (categoryIdxRef) categoryIdxRef.current = category.modelIdx;
    }, [
      category,
      setSelectedCategory,
      setSelectedCategoryItemByIdx,
      categoryIdxRef,
    ]);

    return (
      <div
        ref={(el) => {
          intersectionRef.current = el;
          if (sectionRef) sectionRef.current = el;
        }}
        className={`vcs-section ${isActive ? "vcs-section--active" : ""} ${
          category.isWelcome ? "vcs-section--welcome" : ""
        }`}
        style={{ "--section-accent": category.accent }}
      >
        {category.isWelcome ? (
          <WelcomeContent isActive={isActive} />
        ) : (
          <CategoryContent
            category={category}
            isActive={isActive}
            onEnter={handleEnter}
          />
        )}

        {/* Scroll progress indicator on the left edge */}
        <div className="vcs-section__edge-marker">
          <div className="vcs-section__edge-line" />
          <div className="vcs-section__edge-index">{category.idx}</div>
        </div>
      </div>
    );
  },
);

/* ─── Welcome section content ─── */
const WelcomeContent = memo(({ isActive }) => (
  <div className={`vcs-welcome ${isActive ? "vcs-welcome--visible" : ""}`}>
    <div className="vcs-welcome__logo-wrap">
      <img
        src="/assets/images/in3d-logo-white.png"
        alt="in3D"
        className="vcs-welcome__logo"
      />
    </div>
    {/* <div className="vcs-welcome__tagline">Simply Revolutionary</div> */}
    <div className="vcs-welcome__hint">
      <span className="vcs-welcome__hint-arrow">↓</span>
      <span>Scroll to explore</span>
    </div>
  </div>
));

/* ─── Category section content ─── */
const CategoryContent = memo(({ category, isActive, onEnter }) => (
  <div className={`vcs-panel ${isActive ? "vcs-panel--visible" : ""}`}>
    {/* Title */}
    <h2 className="vcs-panel__title" data-text={category.title}>
      {category.title}
    </h2>

    {/* Accent rule */}
    <div className="vcs-panel__rule" />

    {/* CTA */}
    <button className="vcs-panel__cta" onClick={onEnter}>
      <span>EXPLORE</span>
      <span className="vcs-panel__cta-arrow">→</span>
    </button>

    {/* Corner decoration */}
    <div className="vcs-panel__corner vcs-panel__corner--tl" />
    <div className="vcs-panel__corner vcs-panel__corner--br" />
  </div>
));

/* ─── Nav dots sidebar ─── */
const NavDots = memo(({ activeModelIdx, onDotClick }) => {
  // activeModelIdx: -1 = welcome, 0-6 = categories
  // Convert to dot index: -1 → 0, 0 → 1, etc.
  const activeDotIdx = activeModelIdx + 1;

  return (
    <nav className="vcs-nav">
      {ALL_SECTIONS.map((section, idx) => (
        <button
          key={idx}
          className={`vcs-nav__dot ${idx === activeDotIdx ? "vcs-nav__dot--active" : ""} ${
            idx === 0 ? "vcs-nav__dot--home" : ""
          }`}
          style={{ "--dot-accent": section.accent }}
          onClick={() => onDotClick(idx)}
          aria-label={section.isWelcome ? "Home" : section.title}
          title={section.isWelcome ? "Home" : section.title}
        />
      ))}

      {/* Vertical progress track */}
      <div className="vcs-nav__track">
        <div
          className="vcs-nav__progress"
          style={{
            height: `${(activeDotIdx / (ALL_SECTIONS.length - 1)) * 100}%`,
          }}
        />
      </div>
    </nav>
  );
});

/* ─── Main exported component ─── */
export const VerticalCategoryScroll = memo(
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
    const containerRef = useRef(null);
    const sectionRefs = useRef([]);
    const [activeModelIdx, setActiveModelIdx] = useState(-1);

    const handleEnterSection = useCallback(
      (modelIdx) => {
        setActiveModelIdx(modelIdx);
        onActiveIndexChange?.(modelIdx);
      },
      [onActiveIndexChange],
    );

    const scrollToSection = useCallback((dotIdx) => {
      const el = sectionRefs.current[dotIdx];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, []);

    // Notify parent of initial state
    useEffect(() => {
      onActiveIndexChange?.(-1);
    }, []);

    return (
      <>
        {/* Vertical snap-scroll container */}
        <div
          ref={containerRef}
          className="vcs-container"
          style={{
            opacity: selectedCategory ? 0 : 1,
            pointerEvents: selectedCategory ? "none" : "auto",
            transition: "opacity 0.3s ease",
          }}
        >
          {ALL_SECTIONS.map((section, idx) => (
            <CategorySection
              key={section.idx}
              category={section}
              isActive={section.modelIdx === activeModelIdx}
              sectionRef={(el) => (sectionRefs.current[idx] = el)}
              onEnter={handleEnterSection}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              setSelectedCategoryItemByIdx={setSelectedCategoryItemByIdx}
              categoryIdxRef={categoryIdxRef}
            />
          ))}
        </div>

        {/* Sidebar nav dots */}
        <NavDots activeModelIdx={activeModelIdx} onDotClick={scrollToSection} />
      </>
    );
  },
);

VerticalCategoryScroll.displayName = "VerticalCategoryScroll";
export default VerticalCategoryScroll;
