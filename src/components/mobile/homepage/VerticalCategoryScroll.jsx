import { useEffect, useRef, useState, memo, useCallback } from "react";
import "./VerticalCategoryScroll.css";

/* ─── Welcome section (astro model, index -1) ─── */
const WELCOME_CARD = {
  title: "in3D",
  tagline: "Simply Revolutionary",
  accent: "#ffffff",
  idx: "00",
  isWelcome: true,
  modelIdx: -1,
};

/* ─── Category metadata ─── */
const CATEGORIES = [
  {
    title: "INDUSTRY",
    tagline: "Redefining production pipelines",
    accent: "#1D9E75",
    idx: "01",
    modelIdx: 0,
    description: "",
  },
  {
    title: "MEDICINE",
    tagline: "Precision health, visualized",
    accent: "#D4537E",
    idx: "02",
    modelIdx: 1,
    description: "Spatial mapping and surgical simulation.",
  },
  {
    title: "MICROSOFT",
    tagline: "Enterprise-grade integration",
    accent: "#378ADD",
    idx: "03",
    modelIdx: 2,
    description:
      "3D pipelines embedded across the Microsoft ecosystem, from Teams to Azure.",
  },
  {
    title: "SECURITY",
    tagline: "Threat surfaces, mapped in 3D",
    accent: "#E24B4A",
    idx: "04",
    modelIdx: 3,
    description: "",
  },
  {
    title: "ARTIFICIAL INTELLIGENCE",
    tagline: "Beyond the neural frontier",
    accent: "#16e3d2",
    idx: "05",
    modelIdx: 4,
    description: "AI-driven real-time generative environments.",
  },
  {
    title: "MILITARY",
    tagline: "Tactical spatial awareness",
    accent: "#888780",
    idx: "06",
    modelIdx: 5,
    description:
      "Mission-critical 3D terrain and asset generation for defense simulation and field intelligence.",
  },
  {
    title: "CUSTOMIZATION",
    tagline: "Your vision, our dimension",
    accent: "#BA7517",
    idx: "07",
    modelIdx: 6,
    description:
      "3D pipelines engineered to your exact workflow — from concept to deployment.",
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
    setSelectedCategory,
    setSelectedCategoryItemByIdx,
    categoryIdxRef,
  }) => {
    const localRef = useRef(null);

    useEffect(() => {
      const el = localRef.current;
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) onEnter(category.modelIdx);
        },
        { threshold: 0.5 },
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, [category.modelIdx, onEnter]);

    const handleExplore = useCallback(() => {
      if (category.isWelcome) return;
      if (setSelectedCategory) setSelectedCategory(category.title);
      if (setSelectedCategoryItemByIdx)
        console.log("check this out!!", category.modelIdx);
      setSelectedCategoryItemByIdx(category.modelIdx + 3);
      if (categoryIdxRef) categoryIdxRef.current = category.modelIdx;
    }, [
      category,
      setSelectedCategory,
      setSelectedCategoryItemByIdx,
      categoryIdxRef,
    ]);

    return (
      <section
        ref={(el) => {
          localRef.current = el;
          if (typeof sectionRef === "function") sectionRef(el);
        }}
        className={`vcs-section ${isActive ? "vcs-section--active" : ""}`}
        style={{ "--accent": category.accent }}
      >
        {/* FULL-WIDTH gradient that rises from the bottom.
            This covers the entire width so there are ZERO dead zones.
            The 3D model is visible above this gradient. */}
        <div className="vcs-section__fog" />

        {/* Content — positioned over the fog */}
        <div className="vcs-section__content">
          {category.isWelcome ? (
            <WelcomeContent isActive={isActive} />
          ) : (
            <CategoryContent
              category={category}
              isActive={isActive}
              onExplore={handleExplore}
            />
          )}
        </div>

        {/* Bottom accent edge */}
        <div className="vcs-section__edge" />
      </section>
    );
  },
);

/* ─── Welcome ─── */
const WelcomeContent = memo(({ isActive }) => (
  <div className={`vcs-welcome ${isActive ? "vcs-welcome--visible" : ""}`}>
    <img
      src="/assets/images/in3d-logo-white.png"
      alt="in3D"
      className="vcs-welcome__logo"
    />
    <div className="vcs-welcome__cue">
      <div className="vcs-welcome__cue-line" />
      <span className="vcs-welcome__cue-text">Scroll to explore</span>
      <div className="vcs-welcome__cue-arrows">
        <span>›</span>
        <span>›</span>
        <span>›</span>
      </div>
    </div>
  </div>
));

/* ─── Category panel ─── */
const CategoryContent = memo(({ category, isActive, onExplore }) => (
  <div className={`vcs-cat ${isActive ? "vcs-cat--visible" : ""}`}>
    {/* Number + line */}
    <div className="vcs-cat__eyebrow">
      <span className="vcs-cat__num">{category.idx}</span>
      <div className="vcs-cat__line" />
      <span className="vcs-cat__tagline-text">{category.tagline}</span>
    </div>

    {/* Title */}
    {/* <h2 className="vcs-cat__title">{category.title}</h2> */}

    {/* Description */}
    {category.description && (
      <p className="vcs-cat__desc">{category.description}</p>
    )}

    {/* CTA */}
    <button className="vcs-cat__cta" onClick={onExplore}>
      <span className="vcs-cat__cta-text">EXPLORE</span>
      <svg
        className="vcs-cat__cta-arrow"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M4 10h12M12 6l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  </div>
));

/* ─── Nav rail ─── */
const NavRail = memo(({ activeModelIdx, onDotClick }) => {
  const activeDotIdx = activeModelIdx + 1;
  return (
    <nav className="vcs-rail" aria-label="Section navigation">
      <div className="vcs-rail__track" />
      <div
        className="vcs-rail__fill"
        style={{
          height: `${(activeDotIdx / (ALL_SECTIONS.length - 1)) * 100}%`,
        }}
      />
      {ALL_SECTIONS.map((section, idx) => (
        <button
          key={idx}
          className={`vcs-rail__pip ${idx === activeDotIdx ? "vcs-rail__pip--active" : ""}`}
          style={{ "--pip-accent": section.accent }}
          onClick={() => onDotClick(idx)}
          aria-label={section.isWelcome ? "Home" : section.title}
        >
          {idx === activeDotIdx && (
            <span className="vcs-rail__pip-label">
              {section.isWelcome ? "HOME" : section.title}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
});

/* ─── Main ─── */
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
    requestTilt,
  }) => {
    const containerRef = useRef(null);
    const sectionRefs = useRef([]);
    const [activeModelIdx, setActiveModelIdx] = useState(-1);
    const [hasScrolled, setHasScrolled] = useState(false);
    const tiltRequested = useRef(false);

    const MODEL_SETTLE_MS = 550;
    const lastModelChangeTime = useRef(0);
    const pendingModelIdx = useRef(null);
    const settleTimer = useRef(null);

    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      const onScroll = () => {
        if (el.scrollTop > 30) setHasScrolled(true);
      };
      el.addEventListener("scroll", onScroll, { passive: true });
      return () => el.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
      const el = containerRef.current;
      if (!el || !requestTilt) return;
      const onFirstTouch = () => {
        if (!tiltRequested.current) {
          tiltRequested.current = true;
          requestTilt();
        }
      };
      el.addEventListener("touchstart", onFirstTouch, {
        once: true,
        passive: true,
      });
      return () => el.removeEventListener("touchstart", onFirstTouch);
    }, [requestTilt]);

    useEffect(
      () => () => {
        if (settleTimer.current) clearTimeout(settleTimer.current);
      },
      [],
    );

    const applyModelChange = useCallback(
      (modelIdx) => {
        setActiveModelIdx(modelIdx);
        onActiveIndexChange?.(modelIdx);
        lastModelChangeTime.current = Date.now();
        pendingModelIdx.current = null;
      },
      [onActiveIndexChange],
    );

    const handleEnterSection = useCallback(
      (modelIdx) => {
        const elapsed = Date.now() - lastModelChangeTime.current;
        if (elapsed >= MODEL_SETTLE_MS) {
          applyModelChange(modelIdx);
        } else {
          pendingModelIdx.current = modelIdx;
          if (settleTimer.current) clearTimeout(settleTimer.current);
          settleTimer.current = setTimeout(() => {
            if (pendingModelIdx.current !== null)
              applyModelChange(pendingModelIdx.current);
          }, MODEL_SETTLE_MS - elapsed);
        }
      },
      [applyModelChange],
    );

    const scrollToSection = useCallback((dotIdx) => {
      const el = sectionRefs.current[dotIdx];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, []);

    useEffect(() => {
      onActiveIndexChange?.(-1);
    }, []);

    return (
      <>
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
              setSelectedCategory={setSelectedCategory}
              setSelectedCategoryItemByIdx={setSelectedCategoryItemByIdx}
              categoryIdxRef={categoryIdxRef}
            />
          ))}
        </div>

        {!selectedCategory && (
          <NavRail
            activeModelIdx={activeModelIdx}
            onDotClick={scrollToSection}
          />
        )}

        {!selectedCategory && (
          <div
            className={`vcs-scroll-indicator ${hasScrolled ? "vcs-scroll-indicator--hidden" : ""}`}
          >
            <div className="vcs-scroll-indicator__line" />
            <div className="vcs-scroll-indicator__dot" />
          </div>
        )}
      </>
    );
  },
);

VerticalCategoryScroll.displayName = "VerticalCategoryScroll";
export default VerticalCategoryScroll;
