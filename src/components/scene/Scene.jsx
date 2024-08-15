import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AstroModel } from "../../components/scene/ModelComponent";
import {
  ASTRO,
  CUSTOMIZATION,
  INDUSTRY,
  Model_Data,
} from "../../components/common/modelData";

import {
  IndustryText,
  AiText,
  ContactUsText,
  CustomizationText,
  MedicineText,
  MicrosoftText,
  MilitaryText,
  SecurityText,
} from "../common/textData";
import { gsap } from "gsap";
import { Camera } from "../../components/scene/Camera";
import { BackgroundScroll } from "./BackgroundScroll";
import { useAppContext } from "../../context/appContext";
import { Sparkles } from "@react-three/drei";
import { getSparkleColour } from "./ornaments/getSparkleColour.js";
import {
  preloadImage,
  firstImagesToLoad,
  preloadVideos,
  // secondImagesToLoad,
} from "../common/cacheImages.js";

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

function Scene({ scrollToElementById }) {
  const [visibleModels, setVisibleModels] = useState([]);
  const [visibleText, setVisibleText] = useState(false);
  const [shouldFadeIn, setShouldFadeIn] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [hovered, setHovered] = useState("");
  const [textAnimation, setTextAnimation] = useState(
    "category-title-no-opacity"
  );
  // const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const {
    scrollArea,
    setMenuOpened,
    titleOnMainPageHovered,
    modelAnimationIsHalfWay,
    isAstroModelDrawn,
    customizeHasRendered,
    firstContentLoaded,
    setfirstContentLoaded,
    videosPreloaded,
    setVideosPreloaded,
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
      backgrounds[scrollArea.currentSection] || ""
    );

    return () => {
      document.documentElement.style.removeProperty("--color");
      null;
    };
  }, [scrollArea]);

  useEffect(() => {
    let timeline = gsap.timeline({
      defaults: { ease: "power1.out" },
      scrollTrigger: {
        trigger: ".section-three",
        start: "top top",
        endTrigger: ".section-three",
        end: "bottom bottom",
        scrub: 1,
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
    const titlesContainer = titlesContainerRef.current;

    let titlesTimeline = gsap.timeline({
      defaults: { ease: "power1.out" },
      scrollTrigger: {
        trigger: ".section-three",
        start: "top bottom",
        endTrigger: ".section-four",
        end: "top bottom",
        scrub: 1,
        // markers: true,
        onEnter: () => {
          setFixed(true);
        },
        onLeaveBack: () => {
          setFixed(false);
        },
        onLeave: () => setFixed(false),
        onEnterBack: () => setFixed(true),
      },
    });
  }, [titlesContainerRef]);

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

  function scrollToTop() {
    window.scrollTo({
      top: 0,
    });
  }

  return (
    <div className="scene one" style={{}} ref={containerRef}>
      {/* {customizeHasRendered ? (
        <div
          style={{
            position: "fixed",
            top: "2em",
            left: "3em",
            zIndex: 1,
          }}
          className="hover14 column"
          onClick={scrollToTop}
        >
          <figure>
            <img
              style={{ height: "90px" }}
              // className="in3d-fixed-logo"
              src="/assets/images/in3d-logo-white.png"
            />
          </figure>
        </div>
      ) : null} */}

      {customizeHasRendered ? (
        <div
          style={{
            position: "fixed",
            top: "2em",
            left: "3em",
            zIndex: 1,
          }}
          className="hover14 column"
          onClick={scrollToTop}
        >
          <span className="two-dee-box">
            <img
              style={{ height: "90px", border: "1px solid yellow" }}
              className="logo"
              src="/assets/images/in3d-logo-white.png"
            />
          </span>
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

export default Scene;

const Lights = ({
  scrollArea,
  titleOnMainPageHovered,
  hoveredTitleLight,
  customizeHasRendered,
}) => {
  return (
    <>
      {
        <ambientLight
          intensity={
            scrollArea?.currentSection == CUSTOMIZATION
              ? 2
              : scrollArea.currentSection == ASTRO ||
                scrollArea.currentSection == INDUSTRY
              ? 0.2
              : 1
          }
        />
      }
      {customizeHasRendered ? (
        <>
          <directionalLight
            color={
              titleOnMainPageHovered ? hoveredTitleLight : "rgb(200,255,255)"
            }
            intensity={5}
            position={[-25, 50, 10]}
            castShadow
          />
          <directionalLight
            intensity={1}
            position={[20, 0, -1]}
            castShadow
            color={
              titleOnMainPageHovered ? hoveredTitleLight : "rgb(254,200,255)"
            }
          />
        </>
      ) : null}
    </>
  );
};
