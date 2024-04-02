import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  AstroModel,
  // MappedModels,
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
import { useAppContext } from "../../context/appContext";

const MappedModels = lazy(() => import("./MappedModels.jsx"));

function Scene({ textRef, scrollToElementById }) {
  const [visibleModels, setVisibleModels] = useState([]);
  const [visibleText, setVisibleText] = useState(false);
  const [shouldFadeIn, setShouldFadeIn] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [hovered, setHovered] = useState("");
  const [textAnimation, setTextAnimation] = useState(
    "category-title-no-opacity"
  );

  const { scrollArea, renderModels, setMenuOpened } = useAppContext();

  const containerRef = useRef(null);
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
    6: "ARTIFICAL INTELLIGENCE",
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

  const handleWheel = (e) => {
    console.log("deltaY: ", e.deltaY);
    const container = containerRef.current;

    const maxDeltaY = 10; // As per your previous code
    const scrollDirection = Math.sign(e.deltaY); // Getting the direction of scroll
    const normalizedDeltaY = Math.min(Math.abs(e.deltaY), maxDeltaY); // Getting the normalized deltaY
    let deltaY = normalizedDeltaY * scrollDirection; // Getting the new deltaY after normalization

    if (container) {
      const maxScrollTop = container.scrollHeight - container.clientHeight;

      const newScrollTop = container.scrollTop + deltaY; // Now using normalized deltaY value

      // Allow default behavior if scrolling exceeds container bounds
      if (newScrollTop <= maxScrollTop && newScrollTop >= 0) {
        container.scrollTop = newScrollTop;
        e.preventDefault();
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

  return (
    <div className="scene one" style={{}} ref={containerRef}>
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
          {renderModels ? (
            <>
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
            </>
          ) : null}
          <Camera />
          <Suspense fallback={null}>
            <AstroModel
              url={"/assets/models/astronaut_new5.glb"}
              astroRef={astroRef}
              visibleModels={visibleModels}
              setVisibleModels={setVisibleModels}
              setTextAnimation={setTextAnimation}
              customizeRef={customizeRef}
            />
            {renderModels ? models : null}
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
