import { Suspense, lazy, useRef, useEffect } from "react";

import { useAppContext } from "../../context/appContext";
import { ScrollProgressBar } from "./homepage/ScrollProgressBar";
import { HamburgerMenu } from "./nav/HamburgerMenu";

import { useLenis } from "lenis/react";

const LazyHomepageContent = lazy(() => import("./homepage/scene/Scene"));
const LazySelectedContent = lazy(
  () => import("./selectedCategories/SelectedCategoryPage"),
);

export function DesktopView() {
  const { selectedCategory, setIsInstantScroll, setIsUserScrolling } =
    useAppContext();

  const lenis = useLenis();

  const isAnimating = useRef(false);
  const currentSectionIdx = useRef(0);

  const allSections = [
    "one", // 0: Astro Start
    "two", // 1: Astro "About Us"
    "three", // 2: Astro "Categories List"
    "four", // 3: Industry (Mapped Model 1)
    "five", // 4: Medicine
    "six", // 5: Microsoft
    "seven", // 6: Security
    "eight", // 7: AI
    "nine", // 8: Military
    "ten", // 9: Customize
    "eleven", // 10: Contact Us / Astro Returns
  ];

  const navigateToSectionIndex = (targetIdx) => {
    if (isAnimating.current || !lenis) return;

    if (targetIdx < 0) targetIdx = 0;
    if (targetIdx >= allSections.length) targetIdx = allSections.length - 1;
    if (targetIdx === currentSectionIdx.current) return;

    // --- TIMING VARIABLES ---
    const scrollDurationSeconds = 1.5; // Tweak this to speed up the scroll
    const cooldownMs = 200; // Tweak this to reduce trackpad delay

    const totalLockoutTimeMs = scrollDurationSeconds * 1000 + cooldownMs;
    const visualUnlockTimeMs = totalLockoutTimeMs * 0.6; // 60% of the total time

    isAnimating.current = true;
    currentSectionIdx.current = targetIdx;
    setIsInstantScroll(true);
    setIsUserScrolling(true);

    setTimeout(() => {
      setIsUserScrolling(false); // turns the UI back to blue (early)
    }, visualUnlockTimeMs);

    lenis.scrollTo(`.section-${allSections[targetIdx]}`, {
      duration: scrollDurationSeconds,
      lock: true,
      // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      easing: (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
      onComplete: () => {
        setIsInstantScroll(false);

        // 4. Release the LOGICAL lock after the full duration + cooldown
        setTimeout(() => {
          isAnimating.current = false;
        }, cooldownMs);
      },
    });
  };

  const goToSection = (direction) => {
    navigateToSectionIndex(currentSectionIdx.current + direction);
  };

  useEffect(() => {
    if (!lenis) return;
    if (selectedCategory) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [selectedCategory, lenis]);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isAnimating.current) return;
      if (e.deltaY === 0) return;
      goToSection(e.deltaY > 0 ? 1 : -1);
    };

    const handleKeyDown = (e) => {
      if (["ArrowDown", "ArrowUp", " ", "PageDown", "PageUp"].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        if (isAnimating.current) return;
        goToSection(["ArrowDown", " ", "PageDown"].includes(e.key) ? 1 : -1);
      }
    };

    if (selectedCategory) return;

    window.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });
    window.addEventListener("keydown", handleKeyDown, {
      passive: false,
      capture: true,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel, { capture: true });
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, [lenis, selectedCategory]);

  const scrollToElementById = (categoryIdx) => {
    navigateToSectionIndex(categoryIdx + 2);
  };

  const scrollToTop = () => {
    navigateToSectionIndex(0); // 0 -> section-one
  };

  return (
    <>
      <div className="app-bg">
        <HamburgerMenu isMobileViewOnly={false} />

        <Suspense fallback={null}>
          {selectedCategory ? <LazySelectedContent /> : null}
        </Suspense>
      </div>

      <Suspense fallback={null}>
        <ScrollProgressBar />
        <LazyHomepageContent
          scrollToElementById={scrollToElementById}
          scrollToTop={scrollToTop}
        />
      </Suspense>
    </>
  );
}
