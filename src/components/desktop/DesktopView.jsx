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
  const { selectedCategory, setIsInstantScroll } = useAppContext();

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

  const goToSection = (direction) => {
    if (isAnimating.current || !lenis) return;

    let nextIdx = currentSectionIdx.current + direction;
    if (nextIdx < 0) nextIdx = 0;
    if (nextIdx >= allSections.length) nextIdx = allSections.length - 1;
    if (nextIdx === currentSectionIdx.current) return;

    isAnimating.current = true;
    currentSectionIdx.current = nextIdx;
    setIsInstantScroll(true);

    lenis.scrollTo(`.section-${allSections[nextIdx]}`, {
      duration: 3.0,
      lock: true, // 👇 1. THIS IS CRITICAL: Locks user input while scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      onComplete: () => {
        setIsInstantScroll(false);
        // 👇 2. Increased cooldown to 600ms to eat up leftover trackpad momentum
        setTimeout(() => {
          isAnimating.current = false;
        }, 600);
      },
    });
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

  // useEffect(() => {
  //   // Intercept mouse wheel events
  //   const handleWheel = (e) => {
  //     // 👇 3. UNCONDITIONALLY prevent native scroll.
  //     // We are completely highjacking the wheel!
  //     e.preventDefault();

  //     if (isAnimating.current) return;

  //     // 👇 4. Sensitivity threshold (ignores tiny accidental micro-touches)
  //     if (Math.abs(e.deltaY) < 15) return;

  //     const direction = e.deltaY > 0 ? 1 : -1;
  //     goToSection(direction);
  //   };

  //   // passive: false is required so we can call e.preventDefault()
  //   window.addEventListener("wheel", handleWheel, { passive: false });

  //   return () => {
  //     window.removeEventListener("wheel", handleWheel);
  //   };
  // }, [lenis]); // Make sure this dependency array is just [lenis]

  // 👇 Update your click navigation to match the new array indexing
  const scrollToElementById = (categoryIdx) => {
    if (isAnimating.current || !lenis) return;

    isAnimating.current = true;
    // Category 0 ("Industry") needs to map to section "four" (index 3)
    const targetIdx = categoryIdx + 2;
    currentSectionIdx.current = targetIdx;
    setIsInstantScroll(true);

    lenis.scrollTo(`.section-${allSections[targetIdx]}`, {
      duration: 3.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      onComplete: () => {
        setIsInstantScroll(false);
        setTimeout(() => {
          isAnimating.current = false;
        }, 100);
      },
    });
  };

  // useEffect(() => {
  //   // Intercept mouse wheel events
  //   const handleWheel = (e) => {
  //     // If we are already animating, prevent default scrolling behavior entirely
  //     if (isAnimating.current) {
  //       e.preventDefault();
  //       return;
  //     }

  //     // Determine direction (1 for down, -1 for up)
  //     const direction = e.deltaY > 0 ? 1 : -1;
  //     goToSection(direction);
  //   };

  //   // Passive: false is required so we can call e.preventDefault()
  //   window.addEventListener("wheel", handleWheel, { passive: false });

  //   return () => {
  //     window.removeEventListener("wheel", handleWheel);
  //   };
  // }, [lenis]);

  // 2. FOR CLICKING: Handles your background text navigation
  // const scrollToElementById = (idx) => {
  //   if (isAnimating.current || !lenis) return;

  //   isAnimating.current = true;
  //   currentSectionIdx.current = idx; // Sync the tracker with the clicked index!
  //   setIsInstantScroll(true);

  //   lenis.scrollTo(`#section${sections[idx]}`, {
  //     duration: 1.5,
  //     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //     onComplete: () => {
  //       setIsInstantScroll(false);
  //       setTimeout(() => {
  //         isAnimating.current = false;
  //       }, 100);
  //     },
  //   });
  // };

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
        <LazyHomepageContent scrollToElementById={scrollToElementById} />
      </Suspense>
    </>
  );
}
