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
  ModelComponent5,
} from "./components/scene/ModelComponent";
import { SelectedCategoryPage } from "./components/viewableContent/SelectedCategoryPage";

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
  const [selectedCategory, setSelectedCategory] = useState(null);

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
      5: 'url("/assets/images/backgrounds/customize/Costumize_Sky_Background_V01.png")',
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
  const [visibleText, setVisibleText] = useState(false);
  const [shouldFadeIn, setShouldFadeIn] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [hovered, setHovered] = useState("");

  const textContainerRef = useRef();
  const titlesContainerRef = useRef();
  const astroRef = useRef();
  const microsoftRef = useRef();
  const taasiaRef = useRef();
  const medicineRef = useRef();
  const customizeRef = useRef();

  const categoriesObj = {
    2: "MICROSOFT",
    3: "TAASIA",
    4: "MEDICINE",
    5: "CUSTOMIZATION",
    6: "MILITARY",
    7: "A.I.",
  };

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
          console.log("YESSS");
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

  const textClass = shouldFadeIn ? "fade-in" : "fade-out";

  return (
    <div className="scene one">
      <div
        className="h-nav-in3d-icon"
        style={{ position: "fixed", top: "5em", border: "1px solid yellow" }}
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
        {visibleText ? (
          <div
            className={`fader ${textClass}`}
            style={{
              height: "80vh",
              width: "30%",
              // border: "1px solid orange",
              top: "10%",
              left: "10%",
              position: "absolute",
              color: "white",
              fontSize: "4em",
              fontFamily: "gotham",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>{categoriesObj[scrollArea.currentSection]}</div>
            <div>
              <div>line 1</div>
              <div>and line 2</div>
              <div>and and line 3</div>
            </div>
          </div>
        ) : null}
        <Canvas className={`canvas-container`}>
          <ambientLight intensity={0.8} />
          <directionalLight intensity={3} />
          <Camera />
          <Suspense fallback={null}>
            <ModelComponent
              url={"/assets/models/astronaut_position (1).glb"}
              scrollArea={scrollArea}
              setScrollArea={setScrollArea}
              astroRef={astroRef}
              visibleModels={visibleModels}
              setVisibleModels={setVisibleModels}
              setTextAnimation={setTextAnimation}
            />

            {true ? (
              <ModelComponent2
                url={"/assets/models/microsoft_large.glb"}
                astroRef={astroRef}
                microsoftRef={microsoftRef}
                scrollArea={scrollArea}
                setScrollArea={setScrollArea}
                visibleModels={visibleModels}
                setVisibleModels={setVisibleModels}
              />
            ) : null}
            {true ? (
              <ModelComponent3
                url={"/assets/models/engener (1).glb"}
                microsoftRef={microsoftRef}
                taasiaRef={taasiaRef}
                scrollArea={scrollArea}
                setScrollArea={setScrollArea}
                visibleModels={visibleModels}
                setVisibleModels={setVisibleModels}
              />
            ) : null}

            {true ? (
              <ModelComponent4
                url={"/assets/models/medical_statue_8 (4).glb"}
                medicineRef={medicineRef}
                taasiaRef={taasiaRef}
                scrollArea={scrollArea}
                setScrollArea={setScrollArea}
                visibleModels={visibleModels}
                setVisibleModels={setVisibleModels}
              />
            ) : null}

            {true ? (
              <ModelComponent5
                url={"/assets/models/costimize_model_v02.glb"}
                medicineRef={medicineRef}
                customizeRef={customizeRef}
                scrollArea={scrollArea}
                setScrollArea={setScrollArea}
                visibleModels={visibleModels}
                setVisibleModels={setVisibleModels}
              />
            ) : null}
          </Suspense>
        </Canvas>
      </div>

      {/* <section className="section section-one"></section> */}
      <section className="section section-one">
        <div
          style={{
            position: "absolute",
            top: "2em",
            left: "5%",
            display: "flex",
            flexDirection: "column",
            // border: "1px solid orange",
            height: "500px",
          }}
        >
          <h1
            style={{
              color: "white",

              fontFamily: "gotham",
              fontSize: "2em",
            }}
          >
            in3D-Tech
          </h1>
          <img style={{ width: "10em" }} src="/assets/images/in3dlogo.png" />
        </div>
      </section>
      <section className="section section-two">
        <div
          ref={textRef}
          style={{
            // border: "1px solid pink",
            height: "50%",
            width: "50%",
            // border: "1px solid yellow",
            position: "absolute",
            top: 0,
          }}
          id="midSection2"
        ></div>
        <div
          ref={titlesContainerRef}
          style={
            fixed
              ? { position: "fixed", bottom: "100%", right: "14%" }
              : { position: "absolute", right: "14%" }
          }
          className={`home-categories-wrapper ${hovered}`}
        >
          {fixed
            ? categories.map((title, idx) => (
                <div
                  onMouseOver={() => {
                    document.documentElement.style.setProperty(
                      "--color",
                      backgrounds[title] || backgrounds[1]
                    );
                    // setHovered("taasia");
                    console.log("ye");
                  }}
                  onMouseOut={() => {
                    document.documentElement.style.setProperty(
                      "--color",
                      backgrounds[1]
                    );
                    // setHovered("");
                  }}
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

// const MODELS_DATA = {
//   in3d: {
//     url: "/assets/models/astronaut_position (1).glb",
//   },
//   taasia: {
//     url: "/assets/models/engener (1).glb",
//   },
//   medicine: {
//     url: "/assets/models/medical_statue_8 (4).glb",
//   },
//   microsoft: {
//     url: "/assets/models/microsoft_large.glb",
//   },
//   customize: {
//     url: "/assets/models/costimize_model_v02.glb",
//   },
// };

// const tempComponent = ({
//   url,
//   setScrollArea,
//   scrollArea,
//   astroRef,
//   visibleModels,
//   setVisibleModels,
//   setTextAnimation,
// }) => {
//   const { scene, animations } = useGLTF(url);
//   const mixer = useGLTFAnimations(scene, animations);

//   if (url == "/assets/models/astronaut_position (1).glb") {
//     scene.traverse((child) => {
//       // if (child.material) child.material.wireframe = true;
//       if (child.material) {
//         if (child.name == "Meteor-M2_Material_#0_0") {
//           // child.material.transparent = true;
//           // child.material.opacity = 0.5;
//         }
//       }
//     });
//   }

//   // gsap.set(".scene", { scale: 0.7 });

//   useEffect(() => {
//     let timeline = gsap.timeline({
//       defaults: { ease: "power1.out" },
//       scrollTrigger: {
//         trigger: ".section-one",
//         start: "top top",
//         endTrigger: "#midSection2", //".section-two",
//         end: "bottom bottom",
//         scrub: 1,
//         markers: true,
//         onEnter: () => {
//           // console.log("entered 1 MODEL? ");
//           const areaObj = { ...scrollArea };
//           areaObj.currentSection = 1;
//           areaObj.prevSection = 0;
//           setScrollArea(areaObj);
//         },
//         onEnterBack: () => {
//           setVisibleModels([1]);
//         },
//       },
//     });

//     //third section

//     let timeline3 = gsap.timeline({
//       scrollTrigger: {
//         trigger: ".section-four",
//         start: "top bottom",
//         endTrigger: ".section-five",
//         end: "top bottom",
//         onEnter: () => {
//           const areaObj = { ...scrollArea };
//           areaObj.currentSection = 3;
//           areaObj.prevSection = 2;
//           setScrollArea(areaObj);
//         },
//         onLeaveBack: () => {
//           const areaObj = { ...scrollArea };
//           areaObj.currentSection = 2;
//           areaObj.prevSection = 3;
//           setScrollArea(areaObj);
//         },
//       },
//     });

//     timeline
//       .to(
//         astroRef.current.position,
//         { x: -10, y: -20.2, z: 0 },
//         "simultaneously"
//       )
//       .to(
//         astroRef.current.rotation,
//         { x: 0.5, y: Math.PI + 0.3, z: -0 },
//         "simultaneously"
//       );

//     let textTimeline = gsap.timeline({
//       scrollTrigger: {
//         trigger: ".section-two",
//         start: "top top",
//         // endTrigger: textRef,
//         // end: "top top",
//         once: true,
//         onEnter: () => {
//           setTextAnimation("category-title");
//         },
//       },
//     });
//   }, [astroRef]);

//   return (
//     <group>
//       <primitive
//         ref={astroRef}
//         object={scene}
//         dispose={null}
//         scale={[3, 3, 3]}
//         position={[-9, -18.2, -7]}
//         rotation={[0, Math.PI / 2 + 0.5, 0]}
//         // visible={visibleModels.includes(1) ? true : false}
//       />
//     </group>
//   );
// };
