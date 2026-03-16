import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Tracks which GlitchCategoryCard is currently "active" (most centered in viewport).
 * Returns -1 when no card is dominant (user at top, astro should show).
 *
 * Usage:
 *   const { activeCategoryIdx, registerCard } = useMobileActiveCategory();
 *   // pass registerCard as a ref callback to each card
 */
export function useMobileActiveCategory() {
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(-1);
  const cardElements = useRef(new Map()); // idx → DOM element
  const rafId = useRef(null);

  const registerCard = useCallback((idx, el) => {
    if (el) {
      cardElements.current.set(idx, el);
    } else {
      cardElements.current.delete(idx);
    }
  }, []);

  useEffect(() => {
    const viewportCenter = () => window.innerHeight / 2;

    const findActiveCard = () => {
      const center = viewportCenter();
      let bestIdx = -1;
      let bestDistance = Infinity;

      cardElements.current.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - center);

        // Card must be at least partially in the viewport center zone
        // (within 40% of viewport height from center)
        const threshold = window.innerHeight * 0.4;
        if (distance < threshold && distance < bestDistance) {
          bestDistance = distance;
          bestIdx = idx;
        }
      });

      setActiveCategoryIdx((prev) => {
        if (prev !== bestIdx) return bestIdx;
        return prev;
      });
    };

    const handleScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(findActiveCard);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    findActiveCard();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return { activeCategoryIdx, registerCard };
}
