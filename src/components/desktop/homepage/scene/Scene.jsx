import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AstroModel } from "./ModelComponent.jsx";
import { Model_Data } from "../../../common/modelData.js";

import {
  IndustryText,
  AiText,
  ContactUsText,
  CustomizationText,
  MedicineText,
  MicrosoftText,
  MilitaryText,
  SecurityText,
} from "../../../common/textData.jsx";
import { gsap } from "gsap";
import { Camera, Lights } from "./Camera.jsx";
import { BackgroundScroll } from "./BackgroundScroll";
import { useAppContext } from "../../../../context/appContext.jsx";
import { Sparkles } from "@react-three/drei";
import { getSparkleColour } from "./ornaments/getSparkleColour.js";
import {
  preloadImage,
  firstImagesToLoad,
  preloadVideos,
} from "../../../common/cacheImages.js";

const MappedModels = lazy(() => import("./MappedModels.jsx"));

const hoveredTitleLight = {
  industry: "",
  medicine: "",
  microsoft: "",
  security: "",
  artificalIntelligence: "",
  military: "",
  customization: "",
};

function HomepageContent({ scrollToElementById, scrollToTop }) {
  const [visibleModels, setVisibleModels] = useState([]);
  const [visibleText, setVisibleText] = useState(false);
  const [shouldFadeIn, setShouldFadeIn] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [hovered, setHovered] = useState("");
  const [textAnimation, setTextAnimation] = useState(
    "category-title-no-opacity",
  );

  const {
    scrollArea,
    setMenuOpened,
    titleOnMainPageHovered,
    modelAnimationIsHalfWay,
    customizeHasRendered,
    firstContentLoaded,
    setfirstContentLoaded,
    videosPreloaded,
    setVideosPreloaded,
    setIsCursorHovering,
    isUserScrolling,
  } = useAppContext();

  const containerRef = useRef(null);
  const section1MenuRef = useRef(null);
  const textContainerRef = useRef();
  const titlesContainerRef = useRef();
  const astroRef = useRef();
  const aboutUsRef = useRef();
  const microsoftRef = useRef();
  const taasiaRef = useRef();
  const medicineRef = useRef();
  const militaryRef = useRef();
  const customizeRef = useRef();
  const securityRef = useRef();
  const aiRef = useRef();
  const testShadowsRef = useRef();
  const textClass = shouldFadeIn ? "fade-in" : "fade-out";

  const categoriesObj = {
    3: "Industry",
    4: "Medicine",
    5: "Microsoft",
    6: "Security",
    7: "Artificial intelligence",
    8: "Military",
    9: "Customization",
  };

  const createTextComponent = (currentRef, prevRef, TextComponent) => ({
    currentRef,
    prevRef,
    text: (
      <TextComponent
        textClass={textClass}
        scrollArea={scrollArea}
        categoriesObj={categoriesObj}
      />
    ),
  });

  const refsObj = {
    0: createTextComponent(taasiaRef, astroRef, IndustryText),
    1: createTextComponent(medicineRef, taasiaRef, MedicineText),
    2: createTextComponent(microsoftRef, medicineRef, MicrosoftText),
    3: createTextComponent(securityRef, microsoftRef, SecurityText),
    4: createTextComponent(aiRef, securityRef, AiText),
    5: createTextComponent(militaryRef, aiRef, MilitaryText),
    6: createTextComponent(customizeRef, militaryRef, CustomizationText),
    7: createTextComponent(astroRef, customizeRef, ContactUsText),
  };

  // -----
  // ----
  // ----

  useEffect(() => {
    setMenuOpened(false);

    const backgrounds = {
      1: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
      2: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
      2.5: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
      3: 'url("/assets/images/backgrounds/taasia/taasia_bg.jpg")',
      4: 'url("/assets/images/backgrounds/medicine/medicine_bg.jpg")',
      5: 'url("/assets/images/backgrounds/microsoft/microsoft_bg.jpg")',
      6: 'url("/assets/images/backgrounds/security/security.jpg")',
      7: 'url("/assets/images/backgrounds/ai/ai_bg.png',
      8: 'url("/assets/images/backgrounds/military/military_bg.jpg")',
      9: 'url("/assets/images/backgrounds/customize/Costumize_Smoke_Background_V01.png")',
      10: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
    };

    document.documentElement.style.setProperty(
      "--color",
      backgrounds[scrollArea.currentSection] || "",
    );

    return () => {
      document.documentElement.style.removeProperty("--color");
      null;
    };
  }, [scrollArea]);

  useEffect(() => {
    let timeline = gsap.timeline({
      // defaults: { ease: "power1.out" },
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: ".section-three",
        // start: "top top",
        start: "top 70%",
        endTrigger: ".section-three",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
        onEnter: () => {
          setVisibleText(true);
        },
        onLeaveBack: () => {
          setVisibleText(false);
        },
        onLeave: () => setVisibleText(false),
        onEnterBack: () => setVisibleText(true),
      },
    });
  }, [textContainerRef]);

  useEffect(() => {
    if (visibleText) {
      setShouldFadeIn(true);

      const timeout = setTimeout(() => {
        setShouldFadeIn(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [visibleText]);

  useEffect(() => {
    if (customizeHasRendered && !firstContentLoaded) {
      setfirstContentLoaded(true);

      firstImagesToLoad.forEach(preloadImage);
      preloadVideos({ setVideosPreloaded, batchSize: 3, videosPreloaded });

      // secondImagesToLoad.forEach(preloadImage);
    }
  }, [customizeHasRendered]);

  const allModelPositions = [
    taasiaRef,
    medicineRef,
    microsoftRef,
    securityRef,
    aiRef,
    militaryRef,
    customizeRef,
  ];

  const models = Model_Data.map((model, idx) => {
    const { currentRef, prevRef } = refsObj[idx] || refsObj[0];

    let nextRef;
    if (idx == 6) {
      nextRef = astroRef;
    }

    return (
      <MappedModels
        allModelPositions={allModelPositions}
        key={`heyo${idx}`}
        idx={idx}
        prevRef={prevRef}
        currentRef={currentRef}
        visibleModels={visibleModels}
        setVisibleModels={setVisibleModels}
        model={model}
        isAstro={nextRef}
        testShadowsRef={testShadowsRef}
        // textRef={textRef}
      />
    );
  });

  const cursorIndicatorColor = isUserScrolling
    ? "darkred"
    : "rgb(255,255,255,0.6)"; // "#00a8ff"; // Blue when enabled
  const listIndicatorColor = isUserScrolling ? "darkred" : "#00a8ff"; // Blue when enabled

  return (
    <div className="scene one" style={{}} ref={containerRef}>
      {customizeHasRendered ? (
        <div
          style={{
            position: "fixed",
            top: "2em",
            left: "3em",
            zIndex: 1,
            display: "flex", // 👈 Added flexbox to stack logo and indicator
            flexDirection: "column",
            alignItems: "center",
          }}
          className="hover14 column"
          onClick={scrollToTop}
        >
          <span className="two-dee-box">
            <img
              onMouseOver={() => setIsCursorHovering(true)}
              onMouseOut={() => setIsCursorHovering(false)}
              style={{ height: "90px" }}
              className="logo"
              src="/assets/images/in3d-logo-white.png"
              alt="sceneLogo"
            />
          </span>
          {scrollArea.currentSection != 2.5 && (
            <div
              onClick={() => scrollToElementById(0)} // 0 + 2 = index 2 (section-three / Categories)
              onMouseOver={() => setIsCursorHovering(true)}
              onMouseOut={() => setIsCursorHovering(false)}
              title="Back to Categories"
              style={{
                maxHeight: "40px",
                maxWidth: "30px",
                // border: "2px solid yellow",
                color: listIndicatorColor,
                opacity: 0.7,
                transition: "opacity 0.2s ease, transform 0.2s ease",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "1.5em",
              }}
              // Adding a quick inline hover effect for polish
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = 1;
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = 0.7;
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </div>
          )}
          {scrollArea.currentSection >= 2 && (
            <div
              className="fade-in-longer"
              style={{
                maxHeight: "60px",
                maxWidth: "70px",
                transform: "scale(0.6)",
                display: "flex",
                justifyContent: "center",
                // marginTop: "1em",
                // position: "absolute",
                // top: 0,
                // left: "5em",
                // alignItems: "center",
                // border: "1px solid orange",
              }}
            >
              <div
                style={{
                  position: "relative",
                  marginRight: "2em",
                  width: "30px",
                  height: "55px",
                  borderRadius: "25px", // 👈 Forces the rounded pill shape
                  boxShadow: `inset 0 0 0 2px ${cursorIndicatorColor}`,
                  opacity: 1,
                }}
              >
                <div
                  className="icon-scroll-dot"
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "8px",
                    width: "8px",
                    height: "8px",
                    marginLeft: "-4px", // Centers the 8px dot exactly
                    borderRadius: "50%", // 👈 Forces it to be a perfect circle
                    backgroundColor: cursorIndicatorColor,
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      ) : null}

      <div
        style={{
          position: "fixed",
          height: "100vh",
          width: "100vw",
        }}
      >
        {scrollArea.currentSection >= 3
          ? scrollArea.currentSection > scrollArea.prevSection
            ? scrollArea.currentSection == modelAnimationIsHalfWay
              ? refsObj[scrollArea.currentSection - 3].text
              : null
            : refsObj[scrollArea.currentSection - 3].text
          : null}
        <Canvas
          // shadows
          className={`canvas-container`}
        >
          <Sparkles
            count={300}
            scale={10}
            size={2}
            color={getSparkleColour(scrollArea.currentSection)}
          />
          <Lights
            scrollArea={scrollArea}
            titleOnMainPageHovered={titleOnMainPageHovered}
            hoveredTitleLight={hoveredTitleLight}
            customizeHasRendered={customizeHasRendered}
          />

          <Camera />
          {/* <Rig /> */}

          <Suspense fallback={null}>
            <AstroModel
              url={"/assets/models/astronaut_new5 (3).glb"}
              astroRef={astroRef}
              visibleModels={visibleModels}
              setVisibleModels={setVisibleModels}
              setTextAnimation={setTextAnimation}
              customizeRef={customizeRef}
            />

            {models}
          </Suspense>
        </Canvas>
      </div>

      <BackgroundScroll
        section1MenuRef={section1MenuRef}
        scrollToElementById={scrollToElementById}
        titlesContainerRef={titlesContainerRef}
        hovered={hovered}
        textAnimation={textAnimation}
        fixed={fixed}
      />
    </div>
  );
}

export default HomepageContent;
