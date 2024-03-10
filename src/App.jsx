import React, { useEffect, useRef, useState, useMemo } from "react";
import "./App.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";

import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Camera } from "./components/scene/Camera";
// import { MainContent } from "./components/viewableContent/MainContent";
import { Nav } from "./components/navs/Nav";
import { Header } from "./components/navs/Menu";
import { ScrollingComponent } from "./components/viewableContent/ScrollingComponent";

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

      {/* <div className="viewable-section"> */}
      <TestComponent textRef={textRef} />
      {/* <MainContent
          menuOpened={menuOpened}
          scrollArea={scrollArea}
          gsap={gsap}
          ScrollTrigger={ScrollTrigger}
          text1Ref={text1Ref}
          text2Ref={text2Ref}
          sect2Ref={sect2Ref}
          sect4Ref={sect4Ref}
          boxRef={boxRef}
        /> */}
      {/* </div> */}
      {/* <ScrollingComponent
        setScrollArea={setScrollArea}
        scrollArea={scrollArea}
        text1Ref={text1Ref}
        text2Ref={text2Ref}
        sect2Ref={sect2Ref}
        sect4Ref={sect4Ref}
      /> */}
    </>
  );
}

export default App;
0;

function TestComponent({ textRef }) {
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
          <ambientLight intensity={0.8} />
          <Camera />

          <ModelComponent
            url={"/assets/models/astronaut_position (1).glb"}
            // textRef={textRef}
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
      <section className="section section-two"></section>
      <section className="section section-three"></section>
      <section className="section section-four"></section>
      <section className="section section-five"></section>
    </div>
  );
}

function ModelComponent({ url }) {
  const { scene, animations } = useGLTF(url);
  const mixer = useGLTFAnimations(scene, animations);

  if (url == "/assets/models/astronaut_position (1).glb") {
    scene.traverse((child) => {
      // if (child.material) child.material.wireframe = true;
      if (child.material) {
        // child.material.transparent = true;
        // child.material.opacity = 0.8;
      }
    });
  }

  const ref = useRef(null);

  // gsap.set(".scene", { scale: 0.7 });

  useEffect(() => {
    let timeline = gsap.timeline({
      defaults: { ease: "power1.out" },
      scrollTrigger: {
        trigger: ".section-two",
        start: "top top",
        endTrigger: ".section-three",
        end: "bottom bottom",
        scrub: 1,
        markers: true,
        onEnter: () => console.log("ENTERED THE THING!"),
        onEnterBack: () => console.log("RUNNING IT BACK AGAIN"),
      },
    });

    let timeline2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-three",
        start: "top top",
        endTrigger: ".section-four",
        end: "bottom bottom",
        onEnter: () => console.log("MINI THING 1 entered 3"),
        onEnterBack: () => console.log("BIG THING TWO, entered back into 4/3"),
      },
    });

    timeline
      .to(ref.current.position, { x: -10, y: -20.2, z: 0 }, "simultaneously")
      .to(
        ref.current.rotation,
        { x: 0.5, y: Math.PI + 0.3, z: -0 },
        "simultaneously"
      )
      .from(
        ".helper, .tester",
        {
          y: 260,
          x: 200,
          stagger: 0.1,
          duration: 0.8,
          ease: "back",
        },
        "simultaneously"
      );
    // .to(textRef.current, { xPercent: -20, yPercent: -30 }, "simultaneously");
  }, [ref]);

  return (
    <group>
      <primitive
        ref={ref}
        object={scene}
        dispose={null}
        // scale={[2, 2, 2]}
        scale={[3, 3, 3]}
        // position={[-10, -20.2, 0]}
        // rotation={[0.5, Math.PI + 0.3, -0]}
        position={[-9, -18.2, -7]}
        rotation={[0, Math.PI / 2 + 0.5, 0]}
      />
    </group>
  );
}

function useGLTFAnimations(scene, animations) {
  const { invalidate } = useThree();
  const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);

  useEffect(() => {
    if (!mixer || !animations) return;

    animations.forEach((clip) => mixer.clipAction(clip).play());

    const handler = setInterval(() => invalidate(), 1000 / 60);
    return () => clearInterval(handler);
  }, [animations, mixer, invalidate]);

  useFrame((_state, delta) => mixer && mixer.update(delta));

  return mixer;
}
