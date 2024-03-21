import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { Html, useGLTF, useProgress } from "@react-three/drei";
import * as THREE from "three";
import {
  MappedModels,
  AstroModel,
} from "../../components/scene/ModelComponent";
import { Model_Data } from "../../components/common/modelData";
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

export function Scene({
  textRef,
  scrollArea,
  setScrollArea,
  textAnimation,
  setTextAnimation,
  scrollToElementById,
  isInstantScroll,
  setIsInstandScroll,
}) {
  const [visibleModels, setVisibleModels] = useState([1]);
  const [visibleText, setVisibleText] = useState(false);
  const [shouldFadeIn, setShouldFadeIn] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [hovered, setHovered] = useState("");

  const simplyExpandedRef = useRef();
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
    2: "INDUSTRY",
    3: "MEDICINE",
    4: "MICROSOFT",
    5: "SECURITY",
    6: "A.I.",
    7: "MILITARY",
    8: "CUSTOMIZATION",
  };

  const refsObj = {
    0: {
      currentRef: taasiaRef,
      prevRef: astroRef,
      text: (
        <IndustryText
          textClass={textClass}
          scrollArea={scrollArea}
          categoriesObj={categoriesObj}
        />
      ),
    },
    1: {
      currentRef: medicineRef,
      prevRef: taasiaRef,
      text: (
        <MedicineText
          textClass={textClass}
          scrollArea={scrollArea}
          categoriesObj={categoriesObj}
        />
      ),
    },
    2: {
      currentRef: microsoftRef,
      prevRef: medicineRef,
      text: (
        <MicrosoftText
          textClass={textClass}
          scrollArea={scrollArea}
          categoriesObj={categoriesObj}
        />
      ),
    },
    3: {
      currentRef: securityRef,
      prevRef: microsoftRef,
      text: (
        <SecurityText
          textClass={textClass}
          scrollArea={scrollArea}
          categoriesObj={categoriesObj}
        />
      ),
    },
    4: {
      currentRef: aiRef,
      prevRef: securityRef,
      text: (
        <AiText
          textClass={textClass}
          scrollArea={scrollArea}
          categoriesObj={categoriesObj}
        />
      ),
    },
    5: {
      currentRef: militaryRef,
      prevRef: aiRef,
      text: (
        <MilitaryText
          textClass={textClass}
          scrollArea={scrollArea}
          categoriesObj={categoriesObj}
        />
      ),
    },
    6: {
      currentRef: customizeRef,
      prevRef: militaryRef,
      text: (
        <CustomizationText
          textClass={textClass}
          scrollArea={scrollArea}
          categoriesObj={categoriesObj}
        />
      ),
    },
    7: {
      currentRef: astroRef,
      prevRef: customizeRef,
      text: (
        <ContactUsText
          textClass={textClass}
          scrollArea={scrollArea}
          categoriesObj={categoriesObj}
        />
      ),
    },
  };

  useEffect(() => {
    let simplyExpandedTimeline = gsap.timeline({
      defaults: { ease: "power1.out" },
      scrollTrigger: {
        trigger: ".section-one",
        start: "top top",
        endTrigger: ".section-one",
        end: "top center",
        scrub: 1,
        // markers: true,
      },
    });
  }, [simplyExpandedRef]);

  // -----
  // ----
  // ----

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

    // if (!titlesContainer) {
    //   return;
    // }

    let titlesTimeline = gsap.timeline({
      defaults: { ease: "power1.out" },
      scrollTrigger: {
        trigger: ".home-categories-wrapper",
        start: "top top",
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

  const models = Model_Data.map((model, idx) => {
    const { currentRef, prevRef } = refsObj[idx] || refsObj[0];

    // if (idx == 4) {
    //   console.log(model.url);
    // }

    return (
      <MappedModels
        key={`heyo${idx}`}
        idx={idx}
        prevRef={prevRef}
        currentRef={currentRef}
        scrollArea={scrollArea}
        setScrollArea={setScrollArea}
        visibleModels={visibleModels}
        setVisibleModels={setVisibleModels}
        model={model}
        isInstantScroll={isInstantScroll}
        setIsInstandScroll={setIsInstandScroll}
      />
    );
  });

  return (
    <div className="scene one">
      <div
        className="h-nav-in3d-icon"
        style={{ position: "fixed", top: "5em" }}
      >
        <img style={{ width: "10em" }} src="/assets/images/in3dlogo.png" />
      </div>

      <div
        style={{
          position: "fixed",
          height: "100vh",
          width: "100vw",
        }}
      >
        {scrollArea.currentSection >= 2
          ? refsObj[scrollArea.currentSection - 2].text
          : null}
        {/* {!visibleText ? ( */}
        {/* <MedicineText
                  textClass={textClass}
                  scrollArea={scrollArea}
                  categoriesObj={categoriesObj}
                /> */}
        {/* ) : null} */}
        <Canvas className={`canvas-container`}>
          {/* <LoaderComponent /> */}
          <ambientLight intensity={0.8} />
          <directionalLight intensity={3} />
          <Camera />
          <Suspense fallback={null}>
            <AstroModel
              url={"/assets/models/astronaut_position (1).glb"}
              scrollArea={scrollArea}
              setScrollArea={setScrollArea}
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

      {/* <section className="section section-one"></section> */}
      <BackgroundScroll
        scrollToElementById={scrollToElementById}
        simplyExpandedRef={simplyExpandedRef}
        textRef={textRef}
        titlesContainerRef={titlesContainerRef}
        hovered={hovered}
        textAnimation={textAnimation}
        fixed={fixed}
      />
    </div>
  );
}

const categories = [
  "INDUSTRY",
  "MEDICINE",
  "MICROSOFT",
  "SECURITY",
  "ARTIFICALINTELLIGENCE",
  "MILITARY",
  "CUSTOMIZATION",
];
