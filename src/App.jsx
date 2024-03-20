import React, { Suspense, useEffect, useRef, useState } from "react";
import "./App.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, extend } from "@react-three/fiber";
import { Html, useGLTF, useProgress } from "@react-three/drei";
import * as THREE from "three";
import { Camera } from "./components/scene/Camera";
// import { Nav } from "./components/navs/Nav";
import { Header } from "./components/navs/Menu";
import { MappedModels, AstroModel } from "./components/scene/ModelComponent";
import { SelectedCategoryPage } from "./components/viewableContent/SelectedCategoryPage";
import { LoadingScreen } from "./components/viewableContent/LoadingScreen";
import { Model_Data } from "./components/common/modelData";
import {
  AiText,
  ContactUsText,
  CustomizationText,
  IndustryText,
  MedicineText,
  MicrosoftText,
  MilitaryText,
  SecurityText,
} from "./components/common/textData";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  immediateRender: false,
  ease: "power1.inOut",
});

extend({ PerspectiveCamera: THREE.PerspectiveCamera });

const backgrounds = {
  1: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
  MICROSOFT: 'url("/assets/images/backgrounds/microsoft.jpg")',
  TAASIA: 'url("/assets/images/backgrounds/taasiya.jpg")',
  MEDICINE: 'url("/assets/images/backgrounds/another-med.jpg")',
  CUSTOMIZATION: "",
  MILITARY: "",
  "A.I.": "",
};

function App() {
  const [scrollArea, setScrollArea] = useState({
    currentSection: 1,
    prevSection: 0,
  });
  const [loadingScreen, setloadingScreen] = useState(true);
  const [bgImage, setbgImage] = useState(
    'url("/assets/images/backgrounds/Astro_1_Background.webp")'
  );
  const [textAnimation, setTextAnimation] = useState(
    "category-title-no-opacity"
  );
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menuOpened, setMenuOpened] = useState(false);

  const textRef = useRef();

  useEffect(() => {
    setMenuOpened(false);

    const backgrounds = {
      1: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
      2: 'url("/assets/images/backgrounds/taasia/taasia_bg.jpg")',
      3: 'url("/assets/images/backgrounds//medicine/medicine_bg.jpg")',
      4: 'url("/assets/images/backgrounds/microsoft/microsoft_bg.jpg")',
      5: 'url("/assets/images/backgrounds/security/security.jpg")',
      6: 'url("/assets/images/backgrounds/ai/ai_bg.png',
      7: 'url("/assets/images/backgrounds/military/military_bg.jpg")',
      8: 'url("/assets/images/backgrounds/customize/Costumize_Smoke_Background_V01.png")',
      9: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
    };

    // setbgImage(backgrounds[scrollArea.currentSection] || backgrounds[1]);

    // console.log(backgrounds[scrollArea.currentSection]);

    document.documentElement.style.setProperty(
      "--color",
      backgrounds[scrollArea.currentSection] || backgrounds[1]
    );

    return () => {
      document.documentElement.style.removeProperty("--color");
      null;
    };
  }, [scrollArea]);

  const scrollToElementById = (idx) => {
    console.log(idx);
    const sections = ["Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const element = document.getElementById(`section${sections[idx]}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {false ? (
        <LoadingScreen setloadingScreen={setloadingScreen} />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              position: "fixed",
              width: "100%",
              justifyContent: "center",
              zIndex: 5,
            }}
          >
            <Header
              setMenuOpened={setMenuOpened}
              menuOpened={menuOpened}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
            <SelectedCategoryPage selectedCategory={selectedCategory} />
            {/* <Nav
          setMenuOpened={setMenuOpened}
          scrollArea={scrollArea}
          // handleClickNav={handleClickNav}
        /> */}
          </div>
          <ViewableContent bgImage={bgImage} />
          <TestComponent
            textRef={textRef}
            scrollArea={scrollArea}
            setScrollArea={setScrollArea}
            textAnimation={textAnimation}
            setTextAnimation={setTextAnimation}
            scrollToElementById={scrollToElementById}
          />
        </>
      )}
    </>
  );
}

export default App;

useGLTF.preload("/assets/models/astronaut_position (1).glb");
useGLTF.preload("/assets/models/microsoft_large.glb");
useGLTF.preload("/assets/models/engenir_model_new.glb");
useGLTF.preload("/assets/models/medical_model.glb");

// export const LoaderComponent = () => {
//   const { active, progress, errors } = useProgress();
//   useEffect(() => console.log(progress), [progress]);
//   return (
//     <Html center>
//       <span style={{ color: "black", fontSize: "3em" }}>{`${Math.trunc(
//         progress
//       )} % loaded`}</span>
//     </Html>
//   );
// };
function ViewableContent({ bgImage }) {
  return (
    <div
      // style={{ background: bgImage }}
      className="viewable-content-wrapper"
    ></div>
  );
}

function TestComponent({
  textRef,
  scrollArea,
  setScrollArea,
  textAnimation,
  setTextAnimation,
  scrollToElementById,
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
        markers: true,
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
        markers: true,
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
        markers: true,
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

    if (idx == 4) {
      console.log(model.url);
    }

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
      <section className="section section-one">
        <div
          style={{
            position: "absolute",
            top: "12em",
            left: "3%",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "flex-end",
            height: "500px",
            // border: "1px solid orange",
          }}
        >
          <div style={{ lineHeight: "15vh" }}>
            <h1
              className="section-one-first-title"
              style={{
                fontSize: "2em",
              }}
            >
              in3D-Tech
            </h1>
            <div ref={simplyExpandedRef}>
              <span className="section-one-first-title">Simply</span>
              <span
                className="section-one-first-title"
                style={{
                  position: "relative",
                  top: "1em",
                }}
              >
                Expand
              </span>
            </div>
          </div>

          {/* <img style={{ width: "10em" }} src="/assets/images/in3dlogo.png" /> */}
        </div>
      </section>
      <section className="section section-two">
        <div
          ref={textRef}
          style={{
            height: "50%",
            width: "50%",
            position: "absolute",
            top: 0,
          }}
          id="midSection2"
        ></div>
        <div
          ref={titlesContainerRef}
          style={
            fixed
              ? { position: "fixed", bottom: "108%", right: "14%" }
              : { position: "absolute", right: "14%" }
          }
          className={`home-categories-wrapper ${hovered}`}
        >
          {fixed
            ? categories.map((title, idx) => (
                <div
                  onMouseOver={() => {
                    // document.documentElement.style.setProperty(
                    //   "--color",
                    //   backgrounds[title] || backgrounds[1]
                    // );
                    // setHovered("taasia");
                  }}
                  onMouseOut={() => {
                    // document.documentElement.style.setProperty(
                    //   "--color",
                    //   backgrounds[1]
                    // );
                    // setHovered("");
                  }}
                  onClick={() => scrollToElementById(idx)}
                  key={idx}
                  className={textAnimation}
                  style={{ height: "0px" }}
                >
                  {title}
                </div>
              ))
            : null}
        </div>
      </section>
      <section id="sectionThree" className="section section-three"></section>
      <section id="sectionFour" className="section section-four"></section>
      <section id="sectionFive" className="section section-five"></section>
      <section id="sectionSix" className="section section-six"></section>
      <section id="sectionSeven" className="section section-seven"></section>
      <section id="sectionEight" className="section section-eight"></section>
      <section id="sectionNine" className="section section-nine"></section>
      <section id="sectionTen" className="section section-ten"></section>
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
