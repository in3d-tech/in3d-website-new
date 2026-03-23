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
    modelIdx: 0,
    description:
      "Transform manufacturing workflows with photorealistic 3D asset pipelines built for scale.",
  },
  {
    title: "MEDICINE",
    tagline: "Precision health, visualized",
    accent: "#D4537E",
    idx: "002",
    modelIdx: 1,
    description: "Spatial mapping and surgical simulation.",
  },
  {
    title: "MICROSOFT",
    tagline: "Enterprise-grade integration",
    accent: "#378ADD",
    idx: "003",
    modelIdx: 2,
    description:
      "Native 3D content pipelines embedded across the Microsoft ecosystem, from Teams to Azure.",
  },
  {
    title: "SECURITY",
    tagline: "Threat surfaces, mapped in 3D",
    accent: "#E24B4A",
    idx: "004",
    modelIdx: 3,
    description:
      "Physical and digital threat visualization for defense and response operations.",
  },
  {
    title: "ARTIFICIAL INTELLIGENCE",
    tagline: "Beyond the neural frontier",
    accent: "#16e3d2",
    idx: "005",
    modelIdx: 4,
    description: "AI-driven real-time generative environments.",
  },
  {
    title: "MILITARY",
    tagline: "Tactical spatial awareness",
    accent: "#888780",
    idx: "006",
    modelIdx: 5,
    description:
      "Mission-critical 3D terrain and asset generation for defense simulation and field intelligence.",
  },
  {
    title: "CUSTOMIZATION",
    tagline: "Your vision, our dimension",
    accent: "#BA7517",
    idx: "007",
    modelIdx: 6,
    description: "",
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
    const localRef = useRef(null);

    useEffect(() => {
      const el = localRef.current;
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
          localRef.current = el;
          if (typeof sectionRef === "function") sectionRef(el);
          else if (sectionRef) sectionRef.current = el;
        }}
        className={`vcs-section ${isActive ? "vcs-section--active" : ""} ${
          category.isWelcome ? "vcs-section--welcome" : ""
        }`}
        style={{ "--section-accent": category.accent }}
      >
        {/* Full-screen touch target — this is the key fix.
            The entire section is the scroll surface. Content is
            positioned inside but doesn't block scrolling. */}

        {category.isWelcome ? (
          <WelcomeContent isActive={isActive} />
        ) : (
          <CategoryContent
            category={category}
            isActive={isActive}
            onEnter={handleEnter}
          />
        )}

        {/* Section index — decorative */}
        <div className="vcs-section__idx-badge">
          <span className="vcs-section__idx-num">{category.idx}</span>
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
    <div className="vcs-welcome__hint">
      <div className="vcs-welcome__hint-line" />
      <span className="vcs-welcome__hint-text">Scroll to explore</span>
      <div className="vcs-welcome__hint-chevrons">
        <span className="vcs-welcome__chevron">‹</span>
        <span className="vcs-welcome__chevron">‹</span>
        <span className="vcs-welcome__chevron">‹</span>
      </div>
    </div>
  </div>
));

/* ─── Category section content ─── */
const CategoryContent = memo(({ category, isActive, onEnter }) => (
  <div className={`vcs-card ${isActive ? "vcs-card--visible" : ""}`}>
    {/* Scan-line accent at top */}
    <div className="vcs-card__scanline" />

    {/* Index + tagline row */}
    {/* <div className="vcs-card__meta">
      <span className="vcs-card__meta-idx">{category.idx}</span>
      <span className="vcs-card__meta-sep">//</span>
      <span className="vcs-card__meta-tag">{category.tagline}</span>
    </div> */}

    {/* Title */}
    <h2 className="vcs-card__title">{category.title}</h2>

    {/* Description */}
    <p className="vcs-card__desc">{category.description}</p>

    {/* CTA */}
    <button className="vcs-card__cta" onClick={onEnter}>
      <span className="vcs-card__cta-label">EXPLORE</span>
      <span className="vcs-card__cta-icon">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M4 9h10M10 5l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>

    {/* Corner brackets */}
    <div className="vcs-card__bracket vcs-card__bracket--tl" />
    <div className="vcs-card__bracket vcs-card__bracket--br" />
  </div>
));

/* ─── Nav rail (replaces dots) ─── */
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
    requestTilt,
  }) => {
    const containerRef = useRef(null);
    const sectionRefs = useRef([]);
    const [activeModelIdx, setActiveModelIdx] = useState(-1);
    const [hasScrolled, setHasScrolled] = useState(false);
    const tiltRequested = useRef(false);

    // Throttle gate: prevent model swaps faster than the 3D crossfade.
    // This matches TRANSITION_DURATION in MobileModelSwapper (0.5s).
    const MODEL_SETTLE_MS = 550;
    const lastModelChangeTime = useRef(0);
    const pendingModelIdx = useRef(null);
    const settleTimer = useRef(null);

    // Detect first scroll to hide the indicator
    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      const onScroll = () => {
        if (el.scrollTop > 30) {
          setHasScrolled(true);
        }
      };
      el.addEventListener("scroll", onScroll, { passive: true });
      return () => el.removeEventListener("scroll", onScroll);
    }, []);

    // Request device orientation on the very first touch anywhere
    // in the scroll container. This covers iOS's requirement that
    // the permission prompt is triggered by a user gesture.
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

    // Clean up settle timer
    useEffect(() => {
      return () => {
        if (settleTimer.current) clearTimeout(settleTimer.current);
      };
    }, []);

    /**
     * Throttled section change: if a model swap is already in flight,
     * queue the latest index and apply it once the transition settles.
     * This prevents rapid-fire swaps that desync card ↔ model.
     */
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
        const now = Date.now();
        const elapsed = now - lastModelChangeTime.current;

        if (elapsed >= MODEL_SETTLE_MS) {
          // Enough time has passed — swap immediately
          applyModelChange(modelIdx);
        } else {
          // Transition still in flight — queue this index
          pendingModelIdx.current = modelIdx;

          // Clear any existing timer, schedule for when settle completes
          if (settleTimer.current) clearTimeout(settleTimer.current);
          settleTimer.current = setTimeout(() => {
            if (pendingModelIdx.current !== null) {
              applyModelChange(pendingModelIdx.current);
            }
          }, MODEL_SETTLE_MS - elapsed);
        }
      },
      [applyModelChange],
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
        {/* Vertical snap-scroll container — FULL SCREEN touch target */}
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

        {/* Sidebar nav rail */}
        {!selectedCategory && (
          <NavRail
            activeModelIdx={activeModelIdx}
            onDotClick={scrollToSection}
          />
        )}

        {/* Bottom scroll indicator — fades after first scroll */}
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
