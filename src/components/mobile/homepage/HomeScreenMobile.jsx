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
import { HomeScreenCategoryText } from "../categories/CategoryHsDetails";
import { MenuAboutContact, MenuWheel } from "../nav/MenuWheel";
// import { TextScrambleComponent } from "../../common/shuffleTexts";
import { SceneMobile } from "./Scene";
import { TextScrambleComponent } from "../../common/shuffleTextMobile";

// const LazySelectedContent = lazy(() => import("../categories/CategoryDetails"));
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

  // Mark as mobile after initial paint — no artificial 5s delay
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

  return (
    <>
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

      {/* Main scrollable content — removed stray parentheses */}
      <div className="home-categories-wrapper-mobile">
        {startExpandedAnimation && <TitleWithAnimation isMobile={isMobile} />}

        <div
          style={{
            width: "100%",
            height: "50px",
            marginTop: "68vh",
          }}
        />

        <div
          className="home-categories-map-mobile"
          style={{ opacity: selectedCategory ? 0 : undefined }}
        >
          {categories.map((category, idx) => (
            <HomeScreenCategoryText
              selectedCategory={selectedCategory}
              key={idx}
              idx={idx}
              selectedMenuActionMobile={selectedMenuActionMobile}
              setSelectedMenuActionMobile={setSelectedMenuActionMobile}
              setSelectedCategory={setSelectedCategory}
              selectedCategoryItemByIdx={selectedCategoryItemByIdx}
              setSelectedCategoryItemByIdx={setSelectedCategoryItemByIdx}
              categoryIdxRef={categoryIdxRef}
            />
          ))}
        </div>

        <SceneMobile
          astroRef={astroRef}
          selectedCategory={selectedCategory}
          selectedCategoryItemByIdx={selectedCategoryItemByIdx}
          // categoryIdxRef={categoryIdxRef}
        />
      </div>

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

const categories = [
  "INDUSTRY",
  "MEDICINE",
  "MICROSOFT",
  "SECURITY",
  "ARTIFICAL INTELLIGENCE",
  "MILITARY",
  "CUSTOMIZATION",
  "About",
  "ABOUTCONTACT",
];

/* ─── Title component ─── */

const TitleWithAnimation = memo(({ isMobile }) => (
  <div
    style={{
      top: 0,
      left: "1em",
      height: "10em",
      zIndex: 1,
      position: "absolute",
      width: "50%",
    }}
  >
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
  </div>
));
