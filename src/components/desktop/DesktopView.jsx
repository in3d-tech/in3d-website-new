import { Suspense, lazy } from "react";

import { useAppContext } from "../../context/appContext";
import { ScrollProgressBar } from "./homepage/ScrollProgressBar";
import { HamburgerMenu } from "./nav/HamburgerMenu";

const LazyHomepageContent = lazy(() => import("./homepage/scene/Scene"));
const LazySelectedContent = lazy(() =>
  import("./selectedCategories/SelectedCategoryPage")
);

export function DesktopView() {
  const { selectedCategory, setIsInstantScroll } = useAppContext();

  const scrollToElementById = (idx) => {
    setIsInstantScroll(true);
    const sections = ["Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const element = document.getElementById(`section${sections[idx]}`);

    setTimeout(() => {
      if (element) {
        element.scrollIntoView(); // { behavior: "smooth" }
      }
      setIsInstantScroll(false);
    }, 220);
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
        <LazyHomepageContent scrollToElementById={scrollToElementById} />
      </Suspense>
    </>
  );
}
