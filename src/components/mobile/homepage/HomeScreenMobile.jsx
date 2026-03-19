// import {
//   Suspense,
//   useEffect,
//   useState,
//   useRef,
//   lazy,
//   useCallback,
//   memo,
// } from "react";
// import { useAppContext } from "../../../context/appContext";
// import { MenuAboutContact, MenuWheel } from "../nav/MenuWheel";
// import { SceneMobile } from "./Scene";
// import { TextScrambleComponent } from "../../common/shuffleTextMobile";
// import { GlitchCategoryCards } from "./GlitchCategoryCard";

// const LazySelectedContent = lazy(
//   () => import("../categories/MobileCategoryPage"),
// );

// function HomeScreenMobile() {
//   const [isMenuCentered, setIsMenuCentered] = useState(false);
//   const astroRef = useRef();
//   const [startExpandedAnimation, setStartExpandedAnimation] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [selectedCategoryItemByIdx, setSelectedCategoryItemByIdx] =
//     useState(-1);

//   const categoryIdxRef = useRef(-1);

//   /**
//    * Starts at -1 (welcome/astro card is first in carousel).
//    * Carousel reports: -1 = welcome card (astro), 0-6 = category models.
//    */
//   const [activeCategoryIdx, setActiveCategoryIdx] = useState(-1);

//   const {
//     selectedCategory,
//     setSelectedCategory,
//     mobileBackground,
//     isAstroModelDrawn,
//     setCustomizeHasRendered,
//     selectedMenuActionMobile,
//     setSelectedMenuActionMobile,
//   } = useAppContext();

//   const handleMenuClick = useCallback(
//     (wasCategoryClicked) => {
//       if (!isMenuCentered) {
//         document.body.style.overflow = "hidden";
//       } else {
//         if (!selectedCategory) document.body.style.overflowY = "auto";
//       }
//       if (!wasCategoryClicked) {
//         setIsMenuCentered((prev) => !prev);
//       }
//     },
//     [isMenuCentered, selectedCategory],
//   );

//   useEffect(() => {
//     const raf = requestAnimationFrame(() => setIsMobile(true));
//     return () => cancelAnimationFrame(raf);
//   }, []);

//   useEffect(() => {
//     if (!isAstroModelDrawn || startExpandedAnimation) return;
//     const id = setTimeout(() => {
//       setCustomizeHasRendered(true);
//       setStartExpandedAnimation(true);
//     }, 200);
//     return () => clearTimeout(id);
//   }, [isAstroModelDrawn, startExpandedAnimation, setCustomizeHasRendered]);

//   /* Lock body scroll — single-viewport layout */
//   useEffect(() => {
//     if (!selectedCategory) {
//       document.body.style.overflow = "hidden";
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [selectedCategory]);

//   const handleActiveIndexChange = useCallback((idx) => {
//     setActiveCategoryIdx(idx);
//   }, []);

//   return (
//     <>
//       {/* ─── 3D scene: fixed, fills viewport ─── */}
//       <SceneMobile
//         astroRef={astroRef}
//         selectedCategory={selectedCategory}
//         selectedCategoryItemByIdx={selectedCategoryItemByIdx}
//         activeCategoryIdx={activeCategoryIdx}
//       />

//       <MenuWheel
//         setSelectedMenuActionMobile={setSelectedMenuActionMobile}
//         handleMenuClick={handleMenuClick}
//         isMenuCentered={isMenuCentered}
//         selectedMenuActionMobile={selectedMenuActionMobile}
//         setSelectedCategory={setSelectedCategory}
//         selectedCategory={selectedCategory}
//       />

//       {/* Menu overlay */}
//       <div
//         className={
//           isMenuCentered
//             ? "homescreen-mobile mobile-menu-opened-bg"
//             : "homescreen-mobile"
//         }
//         style={{
//           background: isMenuCentered ? "" : backgrounds[mobileBackground],
//           zIndex: isMenuCentered ? 3 : 0,
//           transition: "background 1s",
//         }}
//       >
//         {isMenuCentered && (
//           <>
//             <div
//               className="h-nav-in3d-icon"
//               style={{ animationDelay: "0.6s", left: "37%" }}
//             >
//               <img
//                 className="in3d-fixed-logo"
//                 style={{ width: "6em" }}
//                 src="/assets/images/in3d-logo-white.png"
//                 alt="fixedLogo"
//               />
//             </div>
//             <MenuAboutContact
//               isMenuCentered={isMenuCentered}
//               handleMenuClick={handleMenuClick}
//             />
//           </>
//         )}
//       </div>

//       {/* ─── Title ─── */}
//       {startExpandedAnimation && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: "1em",
//             height: "10em",
//             zIndex: 3,
//             width: "50%",
//             pointerEvents: "none",
//           }}
//         >
//           <TitleWithAnimation isMobile={isMobile} />
//         </div>
//       )}

//       {/* ─── Horizontal card carousel — fixed at bottom ─── */}
//       <div
//         style={{
//           position: "fixed",
//           bottom: 0,
//           left: 0,
//           width: "100%",
//           zIndex: 5,
//           pointerEvents: selectedCategory ? "none" : "auto",
//           opacity: selectedCategory ? 0 : 1,
//           transition: "opacity 0.3s ease",
//         }}
//       >
//         <GlitchCategoryCards
//           selectedCategory={selectedCategory}
//           setSelectedCategory={setSelectedCategory}
//           selectedMenuActionMobile={selectedMenuActionMobile}
//           setSelectedMenuActionMobile={setSelectedMenuActionMobile}
//           selectedCategoryItemByIdx={selectedCategoryItemByIdx}
//           setSelectedCategoryItemByIdx={setSelectedCategoryItemByIdx}
//           categoryIdxRef={categoryIdxRef}
//           onActiveIndexChange={handleActiveIndexChange}
//         />
//       </div>

//       <Suspense fallback={null}>
//         {selectedCategory ? <LazySelectedContent /> : null}
//       </Suspense>
//     </>
//   );
// }

// export default HomeScreenMobile;

// /* ─── Static data ─── */

// const backgrounds = {
//   1: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
//   2: 'url("https://in3dwebsite.blob.core.windows.net/photos/Medical_Togle-min.jpg")',
//   3: 'url("/assets/images/backgrounds/medicine/medicine_bg.jpg")',
//   4: 'url("/assets/images/backgrounds/microsoft/microsoft_bg.jpg")',
//   5: 'url("/assets/images/backgrounds/security/security.jpg")',
//   6: 'url("https://in3dwebsite.blob.core.windows.net/photos/Ai_Tugle_Finish-min.jpg")',
//   7: 'url("/assets/images/backgrounds/military/military_bg.jpg")',
//   8: 'url("https://in3dwebsite.blob.core.windows.net/photos/Customize_Togle_Finish-min.jpg")',
//   9: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
// };

// /* ─── Title component ─── */

// const TitleWithAnimation = memo(({ isMobile }) => (
//   <>
//     <div
//       style={{
//         fontSize: "1.8em",
//         marginTop: "1em",
//         animationDelay: "2.5s",
//       }}
//       className="text-animate simply-header"
//     >
//       SIMPLY
//     </div>
//     <div
//       style={{
//         textAlign: "center",
//         animationDelay: "2.5s",
//       }}
//       className="text-animate simply-header"
//     >
//       <TextScrambleComponent isHomepage isMobile={isMobile} />
//     </div>
//   </>
// ));

import {
  Suspense,
  useEffect,
  useState,
  useRef,
  lazy,
  useCallback,
  memo,
} from "react";
import { useAppContext } from "../../../context/appContext";
import { MenuAboutContact, MenuWheel } from "../nav/MenuWheel";
import { SceneMobile } from "./Scene";
import { TextScrambleComponent } from "../../common/shuffleTextMobile";
// ← Replaced GlitchCategoryCards with VerticalCategoryScroll
import { VerticalCategoryScroll } from "./VerticalCategoryScroll";

const LazySelectedContent = lazy(
  () => import("../categories/MobileCategoryPage"),
);

function HomeScreenMobile() {
  const [isMenuCentered, setIsMenuCentered] = useState(false);
  const astroRef = useRef();
  const [startExpandedAnimation, setStartExpandedAnimation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCategoryItemByIdx, setSelectedCategoryItemByIdx] =
    useState(-1);

  const categoryIdxRef = useRef(-1);

  const [activeCategoryIdx, setActiveCategoryIdx] = useState(-1);

  const {
    selectedCategory,
    setSelectedCategory,
    mobileBackground,
    isAstroModelDrawn,
    setCustomizeHasRendered,
    selectedMenuActionMobile,
    setSelectedMenuActionMobile,
  } = useAppContext();

  const handleMenuClick = useCallback(
    (wasCategoryClicked) => {
      if (!isMenuCentered) {
        document.body.style.overflow = "hidden";
      } else {
        if (!selectedCategory) document.body.style.overflowY = "auto";
      }
      if (!wasCategoryClicked) {
        setIsMenuCentered((prev) => !prev);
      }
    },
    [isMenuCentered, selectedCategory],
  );

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsMobile(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!isAstroModelDrawn || startExpandedAnimation) return;
    const id = setTimeout(() => {
      setCustomizeHasRendered(true);
      setStartExpandedAnimation(true);
    }, 200);
    return () => clearTimeout(id);
  }, [isAstroModelDrawn, startExpandedAnimation, setCustomizeHasRendered]);

  // NOTE: body overflow is now managed by the vcs-container scroll,
  // so we keep body itself locked to prevent double-scroll.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleActiveIndexChange = useCallback((idx) => {
    setActiveCategoryIdx(idx);
  }, []);

  return (
    <>
      {/* ─── 3D scene: fixed, fills viewport ─── */}
      <SceneMobile
        astroRef={astroRef}
        selectedCategory={selectedCategory}
        selectedCategoryItemByIdx={selectedCategoryItemByIdx}
        activeCategoryIdx={activeCategoryIdx}
      />

      <MenuWheel
        setSelectedMenuActionMobile={setSelectedMenuActionMobile}
        handleMenuClick={handleMenuClick}
        isMenuCentered={isMenuCentered}
        selectedMenuActionMobile={selectedMenuActionMobile}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      {/* Menu overlay */}
      <div
        className={
          isMenuCentered
            ? "homescreen-mobile mobile-menu-opened-bg"
            : "homescreen-mobile"
        }
        style={{
          background: isMenuCentered ? "" : backgrounds[mobileBackground],
          zIndex: isMenuCentered ? 3 : 0,
          transition: "background 1s",
        }}
      >
        {isMenuCentered && (
          <>
            <div
              className="h-nav-in3d-icon"
              style={{ animationDelay: "0.6s", left: "37%" }}
            >
              <img
                className="in3d-fixed-logo"
                style={{ width: "6em" }}
                src="/assets/images/in3d-logo-white.png"
                alt="fixedLogo"
              />
            </div>
            <MenuAboutContact
              isMenuCentered={isMenuCentered}
              handleMenuClick={handleMenuClick}
            />
          </>
        )}
      </div>

      {/* ─── Title ─── */}
      {startExpandedAnimation && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: "1em",
            height: "10em",
            zIndex: 3,
            width: "50%",
            pointerEvents: "none",
          }}
        >
          <TitleWithAnimation isMobile={isMobile} />
        </div>
      )}

      {/* ─── Vertical snap-scroll sections (replaces horizontal carousel) ─── */}
      <VerticalCategoryScroll
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedMenuActionMobile={selectedMenuActionMobile}
        setSelectedMenuActionMobile={setSelectedMenuActionMobile}
        selectedCategoryItemByIdx={selectedCategoryItemByIdx}
        setSelectedCategoryItemByIdx={setSelectedCategoryItemByIdx}
        categoryIdxRef={categoryIdxRef}
        onActiveIndexChange={handleActiveIndexChange}
      />

      <Suspense fallback={null}>
        {selectedCategory ? <LazySelectedContent /> : null}
      </Suspense>
    </>
  );
}

export default HomeScreenMobile;

/* ─── Static data ─── */

const backgrounds = {
  1: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
  2: 'url("https://in3dwebsite.blob.core.windows.net/photos/Medical_Togle-min.jpg")',
  3: 'url("/assets/images/backgrounds/medicine/medicine_bg.jpg")',
  4: 'url("/assets/images/backgrounds/microsoft/microsoft_bg.jpg")',
  5: 'url("/assets/images/backgrounds/security/security.jpg")',
  6: 'url("https://in3dwebsite.blob.core.windows.net/photos/Ai_Tugle_Finish-min.jpg")',
  7: 'url("/assets/images/backgrounds/military/military_bg.jpg")',
  8: 'url("https://in3dwebsite.blob.core.windows.net/photos/Customize_Togle_Finish-min.jpg")',
  9: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
};

/* ─── Title component ─── */

const TitleWithAnimation = memo(({ isMobile }) => (
  <>
    <div
      style={{
        fontSize: "1.8em",
        marginTop: "1em",
        animationDelay: "2.5s",
      }}
      className="text-animate simply-header"
    >
      SIMPLY
    </div>
    <div
      style={{
        textAlign: "center",
        animationDelay: "2.5s",
      }}
      className="text-animate simply-header"
    >
      <TextScrambleComponent isHomepage isMobile={isMobile} />
    </div>
  </>
));
