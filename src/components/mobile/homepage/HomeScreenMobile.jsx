import { Suspense, useEffect, useState, useRef, lazy } from "react";
import { useAppContext } from "../../../context/appContext";
import { HomeScreenCategoryText } from "../categories/CategoryHsDetails";
import { MenuAboutContact, MenuWheel } from "../nav/MenuWheel";
import { TextScrambleComponent } from "../../common/shuffleTexts";
// import { CategoryTracker } from "./CategoryTracker";
import { SceneMobile } from "./Scene";

const LazySelectedContent = lazy(() => import("../categories/CategoryDetails"));

function HomeScreenMobile() {
  const [isMenuCentered, setIsMenuCentered] = useState(false);
  // const [tilt, setTilt] = useState({ tiltLR: 0, tiltFB: 0, dir: 0 });
  // const [slide, setSlide] = useState(0);
  const astroRef = useRef();
  const [startExpandedAnimation, setStartExpandedAnimation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [debug, setDebug] = useState("yessss");
  const [selectedCategoryItemByIdx, setSelectedCategoryItemByIdx] =
    useState(-1);
  const {
    selectedCategory,
    setSelectedCategory,
    mobileBackground,
    isAstroModelDrawn,
    setCustomizeHasRendered,
    selectedMenuActionMobile,
    setSelectedMenuActionMobile,
  } = useAppContext();

  const handleMenuClick = (wasCategoryClicked) => {
    if (!isMenuCentered) {
      document.body.style.overflow = "hidden";
    } else {
      if (!selectedCategory) document.body.style.overflowY = "auto";
    }
    if (!wasCategoryClicked) {
      setIsMenuCentered(!isMenuCentered);
    }
  };

  useEffect(() => {
    if (!isMobile) setTimeout(() => setIsMobile(true), 5000);
  }, []);

  useEffect(() => {
    if (!isAstroModelDrawn) return;
    if (!startExpandedAnimation) {
      setTimeout(() => {
        setCustomizeHasRendered(true);
        setStartExpandedAnimation(true);
      }, 200);
    }
  }, [isAstroModelDrawn]);

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
          // border: "2px solid yellow",
        }}
      >
        {isMenuCentered ? (
          <div
            className="h-nav-in3d-icon"
            style={{ animationDelay: "0.6s", left: "37%" }}
          >
            <img
              className="in3d-fixed-logo"
              style={{ width: "6em" }}
              src="/assets/images/in3d-logo-white.png"
            />
          </div>
        ) : null}
        {isMenuCentered ? (
          <MenuAboutContact
            isMenuCentered={isMenuCentered}
            handleMenuClick={handleMenuClick}
          />
        ) : null}
      </div>
      (
      <div className="home-categories-wrapper-mobile">
        {startExpandedAnimation ? (
          <TitleWithAnimation isMobile={isMobile} />
        ) : null}
        {/* <div
          style={{
            position: "fixed",
            bottom: "1em",
            right: "34%",
            zIndex: 2,
            height: "auto",
          }}
        >
          <CategoryTracker
            selectedCategoryItemByIdx={selectedCategoryItemByIdx}
          />
        </div> */}
        <div
          style={{
            width: "100%",
            height: "50px",
            marginTop: "68vh",
          }}
        ></div>
        <div
          className="home-categories-map-mobile"
          style={{ opacity: selectedCategory ? 0 : "" }}
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
            />
          ))}
        </div>
        <SceneMobile
          astroRef={astroRef}
          selectedCategory={selectedCategory}
          setDebug={setDebug}
          selectedCategoryItemByIdx={selectedCategoryItemByIdx}
        />
      </div>
      )
      <Suspense fallback={null}>
        {selectedCategory ? <LazySelectedContent /> : null}
      </Suspense>
    </>
  );
}

export default HomeScreenMobile;

const backgrounds = {
  1: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
  2: 'url("https://in3dwebsite.blob.core.windows.net/photos/Medical_Togle-min.jpg")',
  3: 'url("/assets/images/backgrounds//medicine/medicine_bg.jpg")',
  4: 'url("/assets/images/backgrounds/microsoft/microsoft_bg.jpg")',
  5: 'url("/assets/images/backgrounds/security/security.jpg")',
  6: 'url("https://in3dwebsite.blob.core.windows.net/photos/Ai_Tugle_Finish-min.jpg',
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

const TitleWithAnimation = ({ isMobile }) => {
  return (
    <div
      style={{
        top: "0em",
        left: "1em",
        height: "10em",
        zIndex: 1,
        position: "absolute",
        width: "50%",
        // border: "2px solid yellow",
      }}
      // className="container"
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
          // fontSize: "1em",
          animationDelay: "2.5s",
        }}
        className="text-animate simply-header"
      >
        <TextScrambleComponent isHomepage isMobile={isMobile} />
      </div>
    </div>
  );
};
