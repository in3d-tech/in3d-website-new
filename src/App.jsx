import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Camera } from "./components/scene/Camera";
import { Nav } from "./components/navs/Nav";
import { Header } from "./components/navs/Menu";
import {
  ModelComponent,
  ModelComponent2,
  ModelComponent3,
} from "./components/scene/ModelComponent";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  immediateRender: false,
  ease: "power1.inOut",
});

extend({ PerspectiveCamera: THREE.PerspectiveCamera });

function App() {
  const [scrollArea, setScrollArea] = useState({
    currentSection: 1,
    prevSection: 0,
  });

  const [menuOpened, setMenuOpened] = useState(false);

  const textRef = useRef();
  const text1Ref = useRef();
  const text2Ref = useRef();
  const sect2Ref = useRef();
  const sect4Ref = useRef();

  const handleClickNav = () => {
    return null;
    if (sect4Ref.current)
      sect4Ref.current?.scrollIntoView({ behavior: "smooth" });
    const areaObj = { ...scrollArea };
    areaObj.currentSection = 4;
    areaObj.prevSection = 3;
    setScrollArea(areaObj);
    if (!sect4Ref.current) {
      console.log("nothing going on here");
    }
    gsap.to(
      "body",
      // section 1
      {
        "--color": "url('/assets/images/backgrounds/taasiya.jpg')",
        opacity: 1,
        scrollTrigger: {},
        onComplete: () => {
          // Re-enable scrolling after animation or transition is completed
          document.body.style.overflowY = "auto";
        },
      }
    );
  };

  useEffect(() => {
    setMenuOpened(false);

    let background;
    switch (scrollArea.currentSection) {
      case 1:
        background =
          'url("/assets/images/backgrounds/Astro_1_Background.webp")';
        break;
      case 2:
        background = 'url("/assets/images/backgrounds/microsoft.jpg")';
        break;
      case 3:
        background = 'url("/assets/images/backgrounds/taasiya.jpg")';
        break;
      case 4:
        background = 'url("/assets/images/backgrounds/another-med.jpg")';
        break;
      default:
        background = "black"; // default value
    }

    // Set the CSS variable value
    document.documentElement.style.setProperty("--color", background);

    // Cleanup function
    return () => {
      // Reset the CSS variable when component unmounts
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
        <Nav
          setMenuOpened={setMenuOpened}
          scrollArea={scrollArea}
          handleClickNav={handleClickNav}
        />
      </div>
      <ViewableContent />

      <TestComponent
        textRef={textRef}
        scrollArea={scrollArea}
        setScrollArea={setScrollArea}
      />
    </>
  );
}

export default App;

useGLTF.preload("/assets/models/astronaut_position (1).glb");
useGLTF.preload("/assets/models/microsoft_large.glb");
useGLTF.preload("/assets/models/engener (1).glb");

function ViewableContent() {
  return <div className="viewable-content-wrapper"></div>;
}

function TestComponent({ textRef, scrollArea, setScrollArea }) {
  const [visibleModels, setVisibleModels] = useState([1]);
  const model1Ref = useRef();
  const model2Ref = useRef();
  const astroRef = useRef();
  const microsoftRef = useRef();
  const taasiaRef = useRef();
  const medicineRef = useRef();

  return (
    <div className="scene one">
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
          <OrbitControls />
          <ModelComponent
            url={"/assets/models/astronaut_position (1).glb"}
            // textRef={textRef}
            scrollArea={scrollArea}
            setScrollArea={setScrollArea}
            astroRef={astroRef}
            visibleModels={visibleModels}
            setVisibleModels={setVisibleModels}
          />
          <ModelComponent2
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
        </Canvas>
      </div>
      <div
        className="helper"
        ref={textRef}
        style={{
          position: "absolute",
          border: "1px solid yellow",
          // width: "100vw",
          // height: "100vh",
          // bottom: 0,
          // bottom: "-100%",
          // top: "50%",
          // transform: "translateY(-50%)",
          // right: "3em",
          zIndex: 2,
        }}
      >
        <ul>
          {/* <TitleList hovered={hovered} setIsHovered={setIsHovered} /> */}
        </ul>
      </div>
      {/* <section className="section section-one"></section> */}
      <section className="section section-one"></section>
      <section className="section section-two">
        <div
          style={{
            height: "50%",
            width: "50%",
            border: "1px solid yellow",
            position: "absolute",
            bottom: 0,
          }}
          id="midSection2"
        ></div>
      </section>
      <section className="section section-three"></section>
      <section className="section section-four"></section>
      <section className="section section-five"></section>
      <section className="section section-six"></section>
    </div>
  );
}
