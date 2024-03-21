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
import { Scene } from "./components/scene/Scene";

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
  const [isInstantScroll, setIsInstandScroll] = useState(false);

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
    setIsInstandScroll(true);
    const sections = ["Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const element = document.getElementById(`section${sections[idx]}`);
    if (element) {
      element.scrollIntoView(); // { behavior: "smooth" }
    }
    setTimeout(() => setIsInstandScroll(false), 200);
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
          <Scene
            textRef={textRef}
            scrollArea={scrollArea}
            setScrollArea={setScrollArea}
            textAnimation={textAnimation}
            setTextAnimation={setTextAnimation}
            scrollToElementById={scrollToElementById}
            isInstantScroll={isInstantScroll}
            setIsInstandScroll={setIsInstandScroll}
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
