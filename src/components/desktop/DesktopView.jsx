import { Suspense, lazy } from "react";

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

  const scrollToElementById = (idx) => {
    setIsInstantScroll(true);
    const sections = ["Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const targetId = `#section${sections[idx]}`;

    // 👇 3. Let Lenis handle the smooth journey!
    if (lenis) {
      // lenis.scrollTo handles the math, easing, and timing flawlessly
      lenis.scrollTo(targetId, {
        duration: 1.5, // Take 1.5 seconds to glide there
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // A nice premium ease out
        onComplete: () => setIsInstantScroll(false), // Fires exactly when the scroll is done!
      });
    }
  };

  // const scrollToElementById = (idx) => {
  //   setIsInstantScroll(true);
  //   const sections = ["Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  //   const element = document.getElementById(`section${sections[idx]}`);

  //   setTimeout(() => {
  //     if (element) {
  //       element.scrollIntoView(); // { behavior: "smooth" }
  //     }
  //     setIsInstantScroll(false);
  //   }, 220);
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
