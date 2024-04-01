import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AstroModel } from "../../components/scene/ModelComponent";
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
import { useAppContext } from "../../context/appContext";

const MappedModels = lazy(() => import("./MappedModels"));

function Scene({ textRef, scrollToElementById, backgrounds }) {
  const [visibleModels, setVisibleModels] = useState([]);
  const [visibleText, setVisibleText] = useState(false);
  const [shouldFadeIn, setShouldFadeIn] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [hovered, setHovered] = useState("");
  const [textAnimation, setTextAnimation] = useState(
    "category-title-no-opacity"
  );

  const { scrollArea, renderModels, setMenuOpened } = useAppContext();

  const simplyRef = useRef();
  const expandedRef = useRef();
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

  // useEffect(() => {
  //   gsap.to(".section-one-first-title", {
  //     x: -300,
  //     duration: 8,
  //     stagger: 0.2,
  //     ease: "back",
  //     opacity: 0.2,
  //   });
  // }, []);

  // -----
  // ----
  // ----

  useEffect(() => {
    setMenuOpened(false);
    // setbgImage(backgrounds[scrollArea.currentSection] || backgrounds[1]);

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

    // if (!titlesContainer) {
    //   return;
    // }

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

    // if (idx == 4) {
    //   console.log(model.url);
    // }

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

  return (
    <div className="scene one">
      <div
        className="h-nav-in3d-icon"
        style={{ position: "fixed", top: "4em" }}
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
        <Canvas className={`canvas-container`}>
          {<ambientLight intensity={0.2} />}
          <directionalLight
            color={"rgb(200,255,255)"}
            intensity={5}
            position={[-25, 50, 10]}
          />
          <directionalLight
            intensity={1}
            position={[20, 0, -1]}
            color={"rgb(254,200,255)"}
          />
          <Camera />
          <Suspense fallback={null}>
            <AstroModel
              url={"/assets/models/astronaut_new4.glb"}
              astroRef={astroRef}
              visibleModels={visibleModels}
              setVisibleModels={setVisibleModels}
              setTextAnimation={setTextAnimation}
              customizeRef={customizeRef}
            />
            <Suspense fallback={null}>{renderModels ? models : null}</Suspense>
          </Suspense>
        </Canvas>
      </div>
      <BackgroundScroll
        scrollToElementById={scrollToElementById}
        simplyRef={simplyRef}
        expandedRef={expandedRef}
        textRef={textRef}
        titlesContainerRef={titlesContainerRef}
        hovered={hovered}
        textAnimation={textAnimation}
        fixed={fixed}
      />
    </div>
  );
}

export default Scene;
