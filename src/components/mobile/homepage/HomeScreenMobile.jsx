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
import { BackgroundLayer } from "./BackgroundLayer";
import { TextScramble } from "../../common/shuffleTextMobile";

const LazySelectedContent = lazy(
  () => import("../categories/MobileCategoryPage"),
);

// Add this mapping near the top of the file or import CATEGORIES

function HomeScreenMobile() {
  const [isMenuCentered, setIsMenuCentered] = useState(false);
  const astroRef = useRef();
  const [startExpandedAnimation, setStartExpandedAnimation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCategoryItemByIdx, setSelectedCategoryItemByIdx] =
    useState(-1);

  const categoryIdxRef = useRef(-1);
  const requestTiltRef = useRef(null);

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

  const handleTiltReady = useCallback(({ requestTilt }) => {
    requestTiltRef.current = requestTilt;
  }, []);

  const handleRequestTilt = useCallback(() => {
    requestTiltRef.current?.();
  }, []);

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
        onTiltReady={handleTiltReady}
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
      <BackgroundLayer activeModelIdx={activeCategoryIdx} />
      {/* <div
        className={
          isMenuCentered
            ? "homescreen-mobile mobile-menu-opened-bg"
            : "homescreen-mobile"
        }
        style={{ zIndex: isMenuCentered ? 3 : 0, transition: "background 1s" }}
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
      </div> */}

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
          <TitleWithAnimation
            isMobile={isMobile}
            activeCategoryIdx={activeCategoryIdx}
          />
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
        requestTilt={handleRequestTilt}
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

const CATEGORY_TITLES = [
  "INDUSTRY",
  "MEDICINE",
  "MICROSOFT",
  "SECURITY",
  "ARTIFICIAL\nINTELLIGENCE",
  "MILITARY",
  "CUSTOMIZATION",
];

const TitleWithAnimation = memo(({ isMobile, activeCategoryIdx }) => {
  const containerRef = useRef(null);
  const fxRef = useRef(null);
  const hasInitRef = useRef(false);
  const prevIdxRef = useRef(-1);
  const [isCompact, setIsCompact] = useState(false);

  // Replace BOTH the "Create the scramble instance once" and
  // "Initial SIMPLY EXPAND animation" useEffects with this single one:

  useEffect(() => {
    if (!containerRef.current) return;
    const fx = new TextScramble(containerRef.current);
    fxRef.current = fx;

    // Initial "SIMPLY EXPAND" animation
    let intervalId;
    let timeoutId;
    let counter = 0;
    const phrases = ["SIMPLY\nEXPAND"];

    const next = () => {
      fx.setText(phrases[counter]);
      counter = (counter + 1) % phrases.length;
    };

    intervalId = setInterval(next, 1000);
    timeoutId = setTimeout(() => clearInterval(intervalId), 3200);

    return () => {
      fx.destroy();
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  // When active category changes, scramble to new title
  useEffect(() => {
    if (!fxRef.current) return;
    if (activeCategoryIdx === prevIdxRef.current) return;
    prevIdxRef.current = activeCategoryIdx;

    if (activeCategoryIdx < 0) {
      setIsCompact(false);
      fxRef.current.setText("SIMPLY\nEXPAND");
    } else {
      const title = CATEGORY_TITLES[activeCategoryIdx] ?? "";
      // Compact mode for category titles (they're longer)
      setIsCompact(true);
      fxRef.current.setText(title);
    }
  }, [activeCategoryIdx]);

  return (
    <div
      ref={containerRef}
      className={`text-animate simply-header ${isCompact ? "vcs-title-scramble--compact" : ""}`}
      style={{
        whiteSpace: "pre-line",
        animationDelay: "2.5s",
        fontSize: isCompact ? "1.35em" : "1.8em",
        marginTop: "1em",
        textAlign: "center",
        transition: "font-size 0.4s ease",
      }}
    />
  );
});

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
