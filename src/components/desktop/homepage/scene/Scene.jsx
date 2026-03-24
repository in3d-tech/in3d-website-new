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
    selectedCategory,
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
  const categoryBtnRef = useRef(null);
  const scrollIconRef = useRef(null);
  const wasSection7 = useRef(false);
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

  // useEffect(() => {
  //   if (!categoryBtnRef.current || !scrollIconRef.current) return;

  //   // Check if we are currently in section 7
  //   const isSection7 = scrollArea?.currentSection == 7;

  //   // IMPORTANT: If we are already in the correct state (e.g., scrolling from section 3 to 4),
  //   // do absolutely nothing and stop the bounce!
  //   if (isSection7 === wasSection7.current) return;

  //   const tl = gsap.timeline();

  //   const catRestingOpacity = scrollArea?.currentSection != 2.5 ? 0.7 : 0;
  //   const scrollRestingOpacity = scrollArea?.currentSection >= 2 ? 1 : 0;

  //   if (isSection7) {
  //     tl.add("moveStart")
  //       .to(
  //         categoryBtnRef.current,
  //         { x: 100, y: -70, duration: 0.6, ease: "power2.inOut" },
  //         "moveStart",
  //       )
  //       .to(
  //         scrollIconRef.current,
  //         { x: 150, y: -118, duration: 0.6, ease: "power2.inOut" },
  //         "moveStart",
  //       )
  //       .to(
  //         [categoryBtnRef.current, scrollIconRef.current],
  //         {
  //           opacity: 0.4,
  //           rotation: 15,
  //           duration: 0.3,
  //           ease: "power1.inOut",
  //         },
  //         "moveStart",
  //       )
  //       .to(
  //         categoryBtnRef.current,
  //         {
  //           opacity: catRestingOpacity,
  //           rotation: 0,
  //           duration: 0.3,
  //           ease: "power1.inOut",
  //         },
  //         "moveStart+=0.3",
  //       )
  //       .to(
  //         scrollIconRef.current,
  //         {
  //           opacity: scrollRestingOpacity,
  //           rotation: 0,
  //           duration: 0.3,
  //           ease: "power1.inOut",
  //         },
  //         "moveStart+=0.3",
  //       );
  //   } else {
  //     tl.add("moveBack")
  //       .to(
  //         [categoryBtnRef.current, scrollIconRef.current],
  //         { x: 0, y: 0, duration: 0.6, ease: "power2.inOut" },
  //         "moveBack",
  //       )
  //       .to(
  //         [categoryBtnRef.current, scrollIconRef.current],
  //         {
  //           opacity: 0.4,
  //           rotation: -15,
  //           duration: 0.3,
  //           ease: "power1.inOut",
  //         },
  //         "moveBack",
  //       )
  //       .to(
  //         categoryBtnRef.current,
  //         {
  //           opacity: catRestingOpacity,
  //           rotation: 0,
  //           duration: 0.3,
  //           ease: "power1.inOut",
  //         },
  //         "moveBack+=0.3",
  //       )
  //       .to(
  //         scrollIconRef.current,
  //         {
  //           opacity: scrollRestingOpacity,
  //           rotation: 0,
  //           duration: 0.3,
  //           ease: "power1.inOut",
  //         },
  //         "moveBack+=0.3",
  //       );
  //   }

  //   // Update the tracker so it knows its current state for the next scroll!
  //   wasSection7.current = isSection7;

  //   return () => tl.kill();
  // }, [scrollArea?.currentSection]);

  useEffect(() => {
    if (!categoryBtnRef.current || !scrollIconRef.current) return;

    const isSection7 = scrollArea?.currentSection == 7;

    // Always kill any running tweens on these elements first
    gsap.killTweensOf(categoryBtnRef.current);
    gsap.killTweensOf(scrollIconRef.current);

    const catRestingOpacity = scrollArea?.currentSection != 2.5 ? 0.7 : 0;
    const scrollRestingOpacity = scrollArea?.currentSection >= 2 ? 1 : 0;

    if (isSection7 && !wasSection7.current) {
      // Entering section 7 — animate to offset position
      const tl = gsap.timeline();
      tl.add("moveStart")
        .to(
          categoryBtnRef.current,
          { x: 100, y: -70, duration: 0.6, ease: "power2.inOut" },
          "moveStart",
        )
        .to(
          scrollIconRef.current,
          { x: 150, y: -118, duration: 0.6, ease: "power2.inOut" },
          "moveStart",
        )
        .to(
          [categoryBtnRef.current, scrollIconRef.current],
          { opacity: 0.4, rotation: 15, duration: 0.3, ease: "power1.inOut" },
          "moveStart",
        )
        .to(
          categoryBtnRef.current,
          { opacity: catRestingOpacity, rotation: 0, duration: 0.3 },
          "moveStart+=0.3",
        )
        .to(
          scrollIconRef.current,
          { opacity: scrollRestingOpacity, rotation: 0, duration: 0.3 },
          "moveStart+=0.3",
        );
    } else if (!isSection7 && wasSection7.current) {
      // Leaving section 7 — animate back
      const tl = gsap.timeline();
      tl.add("moveBack")
        .to(
          [categoryBtnRef.current, scrollIconRef.current],
          { x: 0, y: 0, rotation: 0, duration: 0.6, ease: "power2.inOut" },
          "moveBack",
        )
        .to(
          categoryBtnRef.current,
          { opacity: catRestingOpacity, duration: 0.3 },
          "moveBack+=0.3",
        )
        .to(
          scrollIconRef.current,
          { opacity: scrollRestingOpacity, duration: 0.3 },
          "moveBack+=0.3",
        );
    } else if (!isSection7) {
      // Not section 7 and wasn't section 7 — ensure clean state
      gsap.set(categoryBtnRef.current, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: catRestingOpacity,
      });
      gsap.set(scrollIconRef.current, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: scrollRestingOpacity,
      });
    }

    wasSection7.current = isSection7;
  }, [scrollArea?.currentSection]);

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

  // const cursorIndicatorColor = isUserScrolling
  //   ? "darkred"
  //   : "rgb(255,255,255,0.6)"; // "#00a8ff"; // Blue when enabled
  // const listIndicatorColor = isUserScrolling ? "darkred" : "#00a8ff"; // Blue when enabled
  const cursorIndicatorColor = "rgb(255,255,255,0.6)";
  const listIndicatorColor = "#00a8ff";
  return (
    <div className="scene one" style={{}} ref={containerRef}>
      {customizeHasRendered ? (
        <div
          style={{
            position: "fixed",
            top: "2em",
            left: "3em",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="hover14 column"
          onClick={scrollToTop}
        >
          <span className="two-dee-box">
            <img
              // onMouseOver={() => setIsCursorHovering(true)}
              // onMouseOut={() => setIsCursorHovering(false)}
              style={{ height: "90px" }}
              className="logo"
              src="/assets/images/in3d-logo-white.png"
              alt="sceneLogo"
            />
          </span>
          <div
            ref={categoryBtnRef}
            onClick={() =>
              scrollArea.currentSection != 2.5 && scrollToElementById(0)
            }
            onMouseOver={() => setIsCursorHovering(true)}
            onMouseOut={() => setIsCursorHovering(false)}
            title="Back to Categories"
            style={{
              // 1. CONDITIONAL VISIBILITY & SIZING
              maxHeight: scrollArea.currentSection != 2.5 ? "40px" : "0px",
              opacity: scrollArea.currentSection != 2.5 ? 0.7 : 0,
              pointerEvents: scrollArea.currentSection != 2.5 ? "auto" : "none",
              overflow: "hidden", // Crucial: hides the SVG during the shrink animation

              // 2. YOUR EXISTING STYLES
              maxWidth: "30px",
              color: listIndicatorColor,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "1.5em",

              // 3. ADDED MAX-HEIGHT TO THE TRANSITION
              transition: "max-height 0.4s ease",
            }}
            // onMouseEnter={(e) => {
            //   if (scrollArea.currentSection != 2.5) {
            //     e.currentTarget.style.opacity = 1;
            //     gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2 }); // Swapped to GSAP for hover scale to avoid CSS transform conflicts
            //   }
            // }}
            // onMouseLeave={(e) => {
            //   if (scrollArea.currentSection != 2.5) {
            //     e.currentTarget.style.opacity = 0.7;
            //     gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
            //   }
            // }}
            onMouseEnter={(e) => {
              if (scrollArea.currentSection != 2.5) {
                gsap.to(e.currentTarget, {
                  opacity: 1,
                  scale: 1.1,
                  duration: 0.2,
                });
              }
            }}
            onMouseLeave={(e) => {
              if (scrollArea.currentSection != 2.5) {
                gsap.to(e.currentTarget, {
                  opacity: 0.7,
                  scale: 1,
                  duration: 0.2,
                });
              }
            }}
          >
            <svg
              style={{
                opacity: isUserScrolling ? 0.6 : 1,
                transition: "opacity 0.3s ease",
              }}
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

          <div
            ref={scrollIconRef}
            className="fade-in-longer"
            style={{
              // 1. CONDITIONAL VISIBILITY & SIZING
              maxHeight: scrollArea.currentSection >= 2 ? "60px" : "0px",
              opacity: scrollArea.currentSection >= 2 ? 1 : 0,
              pointerEvents: scrollArea.currentSection >= 2 ? "auto" : "none",
              overflow: "hidden",

              // 2. YOUR EXISTING STYLES
              maxWidth: "70px",
              // transform: "scale(0.6)",
              display: "flex",
              justifyContent: "center",

              // 3. SMOOTH TRANSITION
              transition: "max-height 0.4s ease",
            }}
          >
            <div
              style={{
                position: "relative",
                marginRight: "1.3em",
                width: "30px",
                height: "55px",
                borderRadius: "25px",
                boxShadow: `inset 0 0 0 2px ${cursorIndicatorColor}`,
                // opacity: 1,
                transform: "scale(0.6)",
                opacity: isUserScrolling ? 0.6 : 1, // Drops to 0.2 while scrolling
                transition: "opacity 0.3s ease", // Smooth fade in/out
                // right: "100px",
              }}
              onMouseOver={() => setIsCursorHovering(true)}
              onMouseOut={() => setIsCursorHovering(false)}
            >
              <div
                className="icon-scroll-dot"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "8px",
                  width: "8px",
                  height: "8px",
                  marginLeft: "-4px",
                  borderRadius: "50%",
                  backgroundColor: cursorIndicatorColor,
                }}
              ></div>
            </div>
          </div>
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
          frameloop={selectedCategory ? "never" : "always"}
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
