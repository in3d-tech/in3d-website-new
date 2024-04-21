import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AstroModel } from "../../components/scene/ModelComponent";
import {
  ASTRO,
  CUSTOMIZATION,
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
  const {
    scrollArea,
    setMenuOpened,
    titleOnMainPageHovered,
    setIsInstantScroll,
    modelAnimationIsHalfWay,
    customizeHasRendered,
  } = useAppContext();

  const containerRef = useRef(null);
  const section1MenuRef = useRef(null);
  const textContainerRef = useRef();
  const titlesContainerRef = useRef();
  const astroRef = useRef();
  const microsoftRef = useRef();
  const taasiaRef = useRef();
  const medicineRef = useRef();
  const militaryRef = useRef();
  const customizeRef = useRef();
  const securityRef = useRef();
  const aiRef = useRef();

  const textClass = shouldFadeIn ? "fade-in" : "fade-out";

  const categoriesObj = {
    2: "Industry",
    3: "Medicine",
    4: "Microsoft",
    5: "Security",
    6: "Artificial intelligence",
    7: "Military",
    8: "Customization",
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
      2: 'url("/assets/images/backgrounds/taasia/taasia_bg.jpg")',
      3: 'url("/assets/images/backgrounds/medicine/medicine_bg.jpg")',
      4: 'url("/assets/images/backgrounds/microsoft/microsoft_bg.jpg")',
      5: 'url("/assets/images/backgrounds/security/security.jpg")',
      6: 'url("/assets/images/backgrounds/ai/ai_bg.png',
      7: 'url("/assets/images/backgrounds/military/military_bg.jpg")',
      8: 'url("/assets/images/backgrounds/customize/Costumize_Smoke_Background_V01.png")',
      9: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
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
        trigger: ".section-two",
        start: "top bottom",
        endTrigger: ".section-three",
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

      // After a delay, reset shouldFadeIn to trigger fade out
      const timeout = setTimeout(() => {
        setShouldFadeIn(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [visibleText]);

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
      />
    );
  });

  function scrollToTop() {
    window.scrollTo({
      top: 0,
    });
  }

  // const scrollToElement = () => {
  //   if (section1MenuRef.current) {
  //     const elementPosition =
  //       section1MenuRef.current.getBoundingClientRect().top;
  //     window.scrollTo({
  //       top: elementPosition,
  //     });
  //   }
  // };
  // midSection2

  return (
    <div className="scene one" style={{}} ref={containerRef}>
      {customizeHasRendered ? (
        <div className="h-nav-in3d-icon" onClick={scrollToTop}>
          <img
            className="in3d-fixed-logo"
            src="/assets/images/in3d-logo-white.png"
          />
        </div>
      ) : null}

      <div
        style={{
          position: "fixed",
          height: "100vh",
          width: "100vw",
        }}
      >
        {scrollArea.currentSection >= 2
          ? scrollArea.currentSection > scrollArea.prevSection
            ? scrollArea.currentSection == modelAnimationIsHalfWay
              ? refsObj[scrollArea.currentSection - 2].text
              : null
            : refsObj[scrollArea.currentSection - 2].text
          : null}
        <Canvas className={`canvas-container`}>
          {/* <Stars intensity={0.5} count={2000} /> */}
          <Sparkles
            count={300}
            scale={10}
            size={2}
            color={getSparkleColour(scrollArea.currentSection)}
          />

          {
            <ambientLight
              intensity={
                scrollArea?.currentSection == CUSTOMIZATION
                  ? 2
                  : scrollArea.currentSection == ASTRO
                  ? 0.2
                  : 1
              }
            />
          }
          {customizeHasRendered ? (
            <>
              <directionalLight
                color={
                  titleOnMainPageHovered
                    ? hoveredTitleLight
                    : "rgb(200,255,255)"
                }
                intensity={5}
                position={[-25, 50, 10]}
              />
              <directionalLight
                intensity={1}
                position={[20, 0, -1]}
                color={
                  titleOnMainPageHovered
                    ? hoveredTitleLight
                    : "rgb(254,200,255)"
                }
              />
            </>
          ) : null}

          <Camera />
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
