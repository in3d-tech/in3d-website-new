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

  // Track animation state to prevent overlapping scrolls
  const isAnimating = useRef(false);
  // Track current section index (0 to 6 for your 7 sections)
  const currentSectionIdx = useRef(0);

  // 👇 1. We now include the Astro sections at the beginning!
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

    // Bounds checking
    if (targetIdx < 0) targetIdx = 0;
    if (targetIdx >= allSections.length) targetIdx = allSections.length - 1;
    if (targetIdx === currentSectionIdx.current) return;

    // --- TIMING VARIABLES ---
    const scrollDurationSeconds = 1.5; // Tweak this to speed up the scroll
    const cooldownMs = 200; // Tweak this to reduce trackpad delay

    const totalLockoutTimeMs = scrollDurationSeconds * 1000 + cooldownMs;
    const visualUnlockTimeMs = totalLockoutTimeMs * 0.6; // 60% of the total time

    // 1. Lock everything down
    isAnimating.current = true;
    currentSectionIdx.current = targetIdx;
    setIsInstantScroll(true);
    setIsUserScrolling(true); // Turns the UI red

    // 2. Release the VISUAL lock early (e.g., after ~2.1 seconds instead of 3.6s)
    setTimeout(() => {
      setIsUserScrolling(false); // Turns the UI back to blue early!
    }, visualUnlockTimeMs);

    // 3. Execute the actual scroll
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
          // Notice we removed setIsUserScrolling(false) from here!
        }, cooldownMs);
      },
    });
  };

  const goToSection = (direction) => {
    navigateToSectionIndex(currentSectionIdx.current + direction);
  };

  useEffect(() => {
    // 1. Intercept mouse wheel / trackpad
    const handleWheel = (e) => {
      // Completely stop the browser AND Lenis from seeing this event
      e.preventDefault();
      e.stopPropagation();

      if (isAnimating.current) return;

      // Ignore purely horizontal trackpad swipes
      if (e.deltaY === 0) return;

      // The moment they scroll even a tiny bit, we hijack it!
      const direction = e.deltaY > 0 ? 1 : -1;
      goToSection(direction);
    };

    // 2. Intercept Keyboard arrows (Up, Down, Spacebar)
    const handleKeyDown = (e) => {
      if (["ArrowDown", "ArrowUp", " ", "PageDown", "PageUp"].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();

        if (isAnimating.current) return;

        const direction = ["ArrowDown", " ", "PageDown"].includes(e.key)
          ? 1
          : -1;
        goToSection(direction);
      }
    };

    // Use { capture: true } so our code gets the event BEFORE Lenis does!
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
  }, [lenis]);

  const scrollToElementById = (categoryIdx) => {
    // Keep your existing math (categoryIdx + 2)
    navigateToSectionIndex(categoryIdx + 2);
  };

  const scrollToTop = () => {
    navigateToSectionIndex(0); // 0 is the index for "section-one"
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
