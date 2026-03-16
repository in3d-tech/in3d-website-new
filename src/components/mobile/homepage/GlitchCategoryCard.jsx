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

/* ─── Swipe / transition tuning ─── */
const SWIPE_THRESHOLD = 30;
const TRANSITION_COOLDOWN = 350;
const SETTLE_DELAY = 150;

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
      if (category.isWelcome) return;
      if (setSelectedCategory) setSelectedCategory(category.title);
      if (setSelectedCategoryItemByIdx) setSelectedCategoryItemByIdx(idx - 1);
      if (categoryIdxRef) categoryIdxRef.current = idx - 1;
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
        <div
          className="glitch-card__bg"
          style={{ backgroundImage: `url("${category.bg}")` }}
        />
        <div className="glitch-card__scanline" />
        <div className="glitch-card__accent-bar" />
        <div className="glitch-card__data-index">
          {category.isWelcome ? "HOME //" : `${category.idx} //`}
        </div>
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

/* ═══════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════ */

/** Compute the scrollLeft that centers card[idx] in the container */
function getCardScrollTarget(container, idx) {
  const cards = container.querySelectorAll(".glitch-card");
  if (!cards[idx]) return null;
  const card = cards[idx];
  return card.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2;
}

/** Find which card is visually closest to the container center */
function findNearestCardIdx(container) {
  const containerRect = container.getBoundingClientRect();
  const center = containerRect.left + containerRect.width / 2;
  const cards = container.querySelectorAll(".glitch-card");

  let bestIdx = 0;
  let bestDist = Infinity;

  cards.forEach((card, idx) => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    const dist = Math.abs(cardCenter - center);
    if (dist < bestDist) {
      bestDist = dist;
      bestIdx = idx;
    }
  });

  return bestIdx;
}

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

    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const isTransitioning = useRef(false);
    const activeIdxRef = useRef(0);
    const animFrameRef = useRef(null);
    const settleTimerRef = useRef(null);

    useEffect(() => {
      activeIdxRef.current = activeIdx;
    }, [activeIdx]);

    /* ──────────────────────────────────────────────
       Custom rAF scroll animation — fully owned by us,
       so it can't be interrupted by native scroll.
       ────────────────────────────────────────────── */
    const animateScrollTo = useCallback((targetLeft, duration = 300) => {
      const container = scrollRef.current;
      if (!container) return;

      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }

      const start = container.scrollLeft;
      const delta = targetLeft - start;

      if (Math.abs(delta) < 1) return;

      const startTime = performance.now();

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);

        container.scrollLeft = start + delta * eased;

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(step);
        } else {
          animFrameRef.current = null;
          container.scrollLeft = targetLeft;
        }
      };

      animFrameRef.current = requestAnimationFrame(step);
    }, []);

    /* ──────────────────────────────────────────────
       goToCard — single source of truth for navigation.
       `force` lets settle re-snap even if idx matches.
       ────────────────────────────────────────────── */
    const goToCard = useCallback(
      (idx, { animate = true, force = false } = {}) => {
        const clamped = Math.max(0, Math.min(idx, ALL_CARDS.length - 1));
        const container = scrollRef.current;
        if (!container) return;

        if (
          !force &&
          clamped === activeIdxRef.current &&
          !isTransitioning.current
        )
          return;
        if (isTransitioning.current && !force) return;

        isTransitioning.current = true;

        setActiveIdx(clamped);
        activeIdxRef.current = clamped;

        const modelIdx = clamped === 0 ? -1 : clamped - 1;
        onActiveIndexChange?.(modelIdx);

        const target = getCardScrollTarget(container, clamped);
        if (target !== null) {
          if (animate) {
            animateScrollTo(target, 300);
          } else {
            if (animFrameRef.current) {
              cancelAnimationFrame(animFrameRef.current);
              animFrameRef.current = null;
            }
            container.scrollLeft = target;
          }
        }

        setTimeout(() => {
          isTransitioning.current = false;
        }, TRANSITION_COOLDOWN);
      },
      [onActiveIndexChange, animateScrollTo],
    );

    /* ──────────────────────────────────────────────
       Settle — safety net that fires after scroll stops.
       If the container ended up between two cards, this
       snaps to the nearest one.
       ────────────────────────────────────────────── */
    const scheduleSettle = useCallback(() => {
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);

      settleTimerRef.current = setTimeout(() => {
        const container = scrollRef.current;
        if (!container || isTransitioning.current) return;

        const nearestIdx = findNearestCardIdx(container);
        const expectedTarget = getCardScrollTarget(container, nearestIdx);
        if (expectedTarget === null) return;

        const drift = Math.abs(container.scrollLeft - expectedTarget);

        if (drift > 5) {
          // Misaligned — snap to nearest card
          goToCard(nearestIdx, { animate: true, force: true });
        } else if (nearestIdx !== activeIdxRef.current) {
          // Aligned but state is stale — sync
          setActiveIdx(nearestIdx);
          activeIdxRef.current = nearestIdx;
          const modelIdx = nearestIdx === 0 ? -1 : nearestIdx - 1;
          onActiveIndexChange?.(modelIdx);
        }
      }, SETTLE_DELAY);
    }, [goToCard, onActiveIndexChange]);

    /* ──────────────────────────────────────────────
       Listen to native scroll for settle detection.
       Only fires settle when our own animation isn't
       running (to avoid fighting ourselves).
       ────────────────────────────────────────────── */
    useEffect(() => {
      const el = scrollRef.current;
      if (!el) return;

      const onScroll = () => {
        if (animFrameRef.current) return;
        scheduleSettle();
      };

      el.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        el.removeEventListener("scroll", onScroll);
        if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
      };
    }, [scheduleSettle]);

    /* ──────────────────────────────────────────────
       Touch handlers
       ────────────────────────────────────────────── */
    const handleTouchStart = useCallback((e) => {
      // If animation is running, snap it to completion instantly
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;

        const container = scrollRef.current;
        if (container) {
          const target = getCardScrollTarget(container, activeIdxRef.current);
          if (target !== null) container.scrollLeft = target;
        }
        isTransitioning.current = false;
      }

      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }, []);

    const handleTouchMove = useCallback((e) => {
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

        if (Math.abs(deltaX) < SWIPE_THRESHOLD) {
          scheduleSettle();
          return;
        }

        if (deltaX > 0) {
          goToCard(activeIdxRef.current + 1);
        } else {
          goToCard(activeIdxRef.current - 1);
        }
      },
      [goToCard, scheduleSettle],
    );

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

    // ── Mouse wheel / trackpad ──
    useEffect(() => {
      const el = scrollRef.current;
      if (!el) return;

      const handleWheel = (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          e.preventDefault();
          if (Math.abs(e.deltaX) < 10) return;

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

    // ── Initial state ──
    useEffect(() => {
      onActiveIndexChange?.(-1);
    }, []);

    useEffect(() => {
      const timer = setTimeout(() => goToCard(0, { animate: false }), 100);
      return () => clearTimeout(timer);
    }, [goToCard]);

    // ── Cleanup ──
    useEffect(() => {
      return () => {
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
      };
    }, []);

    return (
      <div className="glitch-cards-carousel-wrapper">
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
