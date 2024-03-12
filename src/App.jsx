import React, { Suspense, useEffect, useRef, useState } from "react";
import "./App.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, extend } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Camera } from "./components/scene/Camera";
// import { Nav } from "./components/navs/Nav";
import { Header } from "./components/navs/Menu";
import {
  ModelComponent,
  ModelComponent2,
  ModelComponent3,
  ModelComponent4,
} from "./components/scene/ModelComponent";

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

  const [isShouldShowLandingPage, setIsShouldShowLandingPage] = useState(true);
  const [textAnimation, setTextAnimation] = useState(
    "category-title-no-opacity"
  );

  useEffect(() => {
    if (!isShouldShowLandingPage) return;
    const timerId = setTimeout(() => setIsShouldShowLandingPage(false), 5000);
    return () => clearTimeout(timerId);
  }, [isShouldShowLandingPage]);

  const [menuOpened, setMenuOpened] = useState(false);

  const textRef = useRef();
  const text1Ref = useRef();
  const text2Ref = useRef();
  const sect2Ref = useRef();
  const sect4Ref = useRef();

  const categories = [
    "MICROSOFT",
    "TAASIA",
    "MEDICINE",
    "CUSTOMIZATION",
    "MILITARY",
    "A.I.",
  ];

  useEffect(() => {
    setMenuOpened(false);

    const backgrounds = {
      1: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
      2: 'url("/assets/images/backgrounds/microsoft.jpg")',
      3: 'url("/assets/images/backgrounds/taasiya.jpg")',
      4: 'url("/assets/images/backgrounds/another-med.jpg")',
    };

    document.documentElement.style.setProperty(
      "--color",
      backgrounds[scrollArea.currentSection] || "black"
    );

    return () => {
      document.documentElement.style.removeProperty("--color");
    };
  }, [scrollArea]);

  return (
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
        <Header setMenuOpened={setMenuOpened} menuOpened={menuOpened} />
        {/* <Nav
          setMenuOpened={setMenuOpened}
          scrollArea={scrollArea}
          handleClickNav={handleClickNav}
        /> */}
      </div>
      <ViewableContent />

      <TestComponent
        textRef={textRef}
        scrollArea={scrollArea}
        setScrollArea={setScrollArea}
        textAnimation={textAnimation}
        setTextAnimation={setTextAnimation}
      />
    </>
  );
}

export default App;

useGLTF.preload("/assets/models/astronaut_position (1).glb");
useGLTF.preload("/assets/models/microsoft_large.glb");
useGLTF.preload("/assets/models/engener (1).glb");
useGLTF.preload("/assets/models/medical_statue_8 (4).glb");

function ViewableContent() {
  return <div className="viewable-content-wrapper"></div>;
}

function TestComponent({
  textRef,
  scrollArea,
  setScrollArea,
  textAnimation,
  setTextAnimation,
}) {
  const [visibleModels, setVisibleModels] = useState([1]);

  const astroRef = useRef();
  const microsoftRef = useRef();
  const taasiaRef = useRef();
  const medicineRef = useRef();

  return (
    <div className="scene one">
      <div
        className="h-nav-in3d-icon"
        style={{ position: "absolute", top: "5em", border: "1px solid yellow" }}
      >
        <img style={{ width: "10em" }} src="/assets/images/in3dlogo.png" />
      </div>

      <div
        style={{
          position: "fixed",
          zIndex: 0,
          // border: "1px solid black",
          height: "100vh",
          width: "100vw",
        }}
      >
        {/* {hovered ? <div style={getbgImage()}></div> : null} */}
        {/* <Canvas className={`canvas-container ${fadeIn ? "fade-in" : ""}`}> */}
        <Canvas className={`canvas-container`}>
          {/* <ambientLight intensity={0.8} /> */}
          <directionalLight intensity={3} />
          <Camera />
          <Suspense fallback={null}>
            <ModelComponent
              url={"/assets/models/astronaut_position (1).glb"}
              textRef={textRef}
              scrollArea={scrollArea}
              setScrollArea={setScrollArea}
              astroRef={astroRef}
              visibleModels={visibleModels}
              setVisibleModels={setVisibleModels}
              setTextAnimation={setTextAnimation}
            />
          </Suspense>

          {/* <ModelComponent2
            url={"/assets/models/microsoft_large.glb"}
            astroRef={astroRef}
            microsoftRef={microsoftRef}
            scrollArea={scrollArea}
            setScrollArea={setScrollArea}
            visibleModels={visibleModels}
            setVisibleModels={setVisibleModels}
          />
          <ModelComponent3
            url={"/assets/models/engener (1).glb"}
            microsoftRef={microsoftRef}
            taasiaRef={taasiaRef}
            scrollArea={scrollArea}
            setScrollArea={setScrollArea}
            visibleModels={visibleModels}
            setVisibleModels={setVisibleModels}
          />
          <ModelComponent4
            url={"/assets/models/medical_statue_8 (4).glb"}
            medicineRef={medicineRef}
            taasiaRef={taasiaRef}
            scrollArea={scrollArea}
            setScrollArea={setScrollArea}
            visibleModels={visibleModels}
            setVisibleModels={setVisibleModels}
          /> */}
        </Canvas>
      </div>

      {/* <section className="section section-one"></section> */}
      <section className="section section-one"></section>
      <section className="section section-two">
        <div
          ref={textRef}
          style={{
            height: "50%",
            width: "50%",
            // border: "1px solid yellow",
            position: "absolute",
            top: 0,
          }}
          id="midSection2"
        ></div>
        <div className="home-categories-wrapper">
          {categories.map((title, idx) => (
            <div
              onMouseOver={() => {
                // getbgImage(title);
                // setHovered(true);
                document.documentElement.style.setProperty(
                  "--color",
                  backgrounds[title] || backgrounds[1]
                );
                // document.documentElement.style.setProperty(
                //   "--color",
                //   'url("/assets/images/backgrounds/taasiya.jpg")'
                // );
              }}
              onMouseOut={() => {
                document.documentElement.style.setProperty(
                  "--color",
                  backgrounds[1]
                );
              }}
              key={idx}
              className={textAnimation}
              style={{ height: "0px" }}
            >
              {title}
            </div>
          ))}
        </div>
      </section>
      <section className="section section-three"></section>
      <section className="section section-four"></section>
      <section className="section section-five"></section>
      <section className="section section-six"></section>
    </div>
  );
}

const categories = [
  "MICROSOFT",
  "TAASIA",
  "MEDICINE",
  "CUSTOMIZATION",
  "MILITARY",
  "A.I.",
];
