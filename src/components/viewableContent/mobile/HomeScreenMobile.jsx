import { useGLTF, useProgress } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState, useRef } from "react";
import { useAppContext } from "../../../context/appContext";
import { Camera } from "../../scene/Camera";
import * as THREE from "three";
import { Sparkles } from "@react-three/drei";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import {
  AboutUsText,
  AiText,
  CustomizationText,
  IndustryText,
  MedicineText,
  MicrosoftText,
  MilitaryText,
  SecurityText,
} from "./SelectedCategoryMobile";
import {
  INDUSTRY,
  MEDICINE,
  MICROSOFT,
  SECURITY,
  MILITARY,
  AI,
  CUSTOMIZATION,
} from "../../common/modelData";

const ABOUT_US = 9;

function HomeScreenMobile() {
  const [isCentered, setIsCentered] = useState(false);

  const astroRef = useRef();
  const textContainerRef = useRef();
  const [isShouldShowCategoryInformation, setIsShouldShowCategoryInformation] =
    useState(false);
  const [startExpandedAnimation, setStartExpandedAnimation] = useState(false);

  const {
    selectedCategory,
    mobileBackground,
    setMobileBackground,
    renderModels,
    isAstroModelDrawn,
    setCustomizeHasRendered,
  } = useAppContext();

  const handleButtonClick = () => {
    if (!isCentered) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    setIsCentered(!isCentered);
  };

  useEffect(() => {
    console.log({ selectedCategory });
    if (selectedCategory) {
      scrollToElementById();
    }
  }, [selectedCategory]);

  const scrollToElementById = () => {
    const element = document.getElementById("testId");

    setTimeout(() => {
      if (element) {
        element.scrollIntoView({ behavior: "smooth" }); // { behavior: "smooth" }
      }
    }, 200);
  };

  useEffect(() => {
    if (!isAstroModelDrawn) return;
    if (!startExpandedAnimation) {
      setTimeout(() => {
        setCustomizeHasRendered(true);
        setStartExpandedAnimation(true);
      }, 200);
    }
  }, [isAstroModelDrawn]);

  return (
    <>
      <div className={isCentered ? "fab-wrapper centered" : "fab-wrapper"}>
        <input
          id="fabCheckbox"
          type="checkbox"
          className="fab-checkbox"
          onClick={handleButtonClick}
        />
        <label className="fab" for="fabCheckbox">
          {/* <span className="fab-dots fab-dots-1"></span>
          <span className="fab-dots fab-dots-2"></span>
          <span className="fab-dots fab-dots-3"></span> */}
          <div className={isCentered ? "icon-1 a" : "icon-1"}></div>
          <div className={isCentered ? "icon-2 c" : "icon-2"}></div>
          <div className={isCentered ? "icon-3 b" : "icon-3"}></div>
          <div className="clear"></div>
        </label>
        <div className="fab-wheel">
          <a className="fab-action fab-action-1">
            <i className="fas">Industry</i>
          </a>
          <a className="fab-action fab-action-2">
            <i className="fas">Medicine</i>
          </a>
          <a className="fab-action fab-action-3">
            <i className="fas">Microsoft</i>
          </a>
          <a className="fab-action fab-action-4">
            <i className="fas">Security</i>
          </a>
          <a className="fab-action fab-action-5">
            <i className="fas">A.I.</i>
          </a>
          <a className="fab-action fab-action-6">
            <i className="fas">Military</i>
          </a>
          <a className="fab-action fab-action-7">
            <i className="fas">Customization</i>
          </a>
        </div>
      </div>
      <div
        style={{
          // minWidth: "100%",
          width: "100%",
          height: "100vh",
          position: "fixed",
          overflow: "hidden",
          top: 0,
          left: 0,
          background: isCentered
            ? "rgb(0,0,0,0.8)"
            : backgrounds[mobileBackground],
          // opacity: 0.4,
          zIndex: isCentered ? 2 : 0,
          transition: "background 1s",
        }}
      >
        {isCentered ? (
          <div
            style={{
              width: "100%",
              borderTop: "1px solid rgb(255,255,255, 0.4)",
              position: "absolute",
              bottom: "5em",
              left: 0,
              height: "5em",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <div className="animate-reveal">
              <span style={{ color: "white", fontFamily: "gotham" }}>
                About Us
              </span>
            </div>
            <div className="animate-reveal">
              <span style={{ color: "white", fontFamily: "gotham" }}>
                Contact Us
              </span>
            </div>
            <div className="linkdn-icon animate-reveal">
              {<LinkedInIcon fontSize="large" sx={{ color: "white" }} />}
            </div>
          </div>
        ) : null}
      </div>
      <div
        style={{
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          transition: "background-image 0.8s",
          // border: "1px solid yellow",
        }}
      >
        {isShouldShowCategoryInformation ? (
          <div
            style={{
              position: "fixed",
              top: "1em",
              right: "1.5em",
              zIndex: 2,
            }}
          >
            <button
              style={{
                all: "unset",
                color: "yellow",
                borderRadius: "4px",
                fontSize: "1.5em",
                padding: "2px",
                width: "120%",
                textAlign: "center",
              }}
              onClick={() => setIsShouldShowCategoryInformation(false)}
            >
              Back
            </button>
          </div>
        ) : null}
        {startExpandedAnimation ? (
          <>
            <div
              style={{
                top: "0em",
                left: "1em",
                height: "10em",
                zIndex: 1,
                position: "absolute",
                width: "50%",
              }}
              // className="container"
            >
              <div
                style={{
                  fontSize: "2em",
                  marginTop: "3em",
                }}
                className="text-animate simply-header"
              >
                SIMPLY
              </div>
              <div
                style={{
                  textAlign: "right",
                  fontSize: "2em",
                }}
                className="text-animate simply-header"
              >
                EXPAND
              </div>
            </div>
          </>
        ) : null}

        <div
          style={{
            marginTop: "60vh",
            position: "absolute",
            top: 0,
            zIndex: 1,
          }}
        >
          {categories.map((category, idx) => (
            <>{listData[idx + 2].text}</>
          ))}
        </div>
        <div className="canvas-container-mobile">
          <Canvas>
            {/* <LoaderComponent /> */}
            <ambientLight intensity={0.8} />
            <directionalLight intensity={3} />
            <Camera />
            <Sparkles
              count={300}
              scale={10}
              size={2}
              color="pink" //{getSparkleColour(scrollArea.currentSection)}
            />
            <Suspense fallback={null}>
              <AstroModel
                url={"/assets/models/astronaut_new5 (3).glb"}
                astroRef={astroRef}
              />
            </Suspense>
          </Canvas>
        </div>
        {/* <div style={{ color: "white", fontSize: "3em" }}>about us</div> */}
      </div>
    </>
  );
}

export default HomeScreenMobile;

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

const categories = [
  "INDUSTRY",
  "MEDICINE",
  "MICROSOFT",
  "SECURITY",
  "ARTIFICAL INTELLIGENCE",
  "MILITARY",
  "CUSTOMIZATION",
];

export function AstroModel({ url, astroRef, setTextAnimation }) {
  const { isAstroModelDrawn, setIsAstroModelDrawn } = useAppContext();

  const { scene, animations } = useGLTF(url);
  const mixer = useGLTFAnimations(scene, animations);

  const { active, progress, errors, total } = useProgress();

  useEffect(() => {
    console.log(progress);
  }, [progress]);
  // gsap.set(".scene", { scale: 0.7 });

  const isFullyRenderedRef = useRef(false);

  // Use useFrame to check if the object is fully rendered on every frame
  useFrame(() => {
    // Check if the object is visible in the scene and loaded
    if (astroRef.current && scene && !isFullyRenderedRef.current) {
      // Check if all objects in the scene have been rendered
      const fullyRendered = scene.children.every((child) => child.visible);
      if (
        fullyRendered &&
        isAstroModelDrawn === false &&
        active === false &&
        scene
      ) {
        // Object is fully rendered
        isFullyRenderedRef.current = true;
        setTimeout(() => setIsAstroModelDrawn(true), 1000);
        console.log("Astro object is fully rendered!");
      }
    }
  });

  useEffect(() => {
    if (scene && astroRef.current && !isFullyRenderedRef.current) {
      // Check if all objects in the scene have been rendered
      const fullyRendered = scene.children.every((child) => child.visible);

      if (fullyRendered && isAstroModelDrawn === false) {
        setTimeout(() => setIsAstroModelDrawn(true), 1500);
        console.log("Astro object is fully rendered!");
      }
    }
  }, [scene, setIsAstroModelDrawn]);

  return (
    <group>
      <primitive
        ref={astroRef}
        object={scene}
        dispose={null}
        scale={[1, 1, 1]}
        position={[-3.75, -5, -0.5]}
        rotation={[0.54, Math.PI - 0.35, 0]}
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

const listData = {
  [INDUSTRY]: { text: <IndustryText title={"Industry"} /> },
  [MEDICINE]: { text: <MedicineText title={"Medicine"} /> },
  [MICROSOFT]: { text: <MicrosoftText title={"Microsoft"} /> },
  [SECURITY]: { text: <SecurityText title={"Security"} /> },
  [MILITARY]: { text: <MilitaryText title={"Military"} /> },
  [AI]: { text: <AiText title={"Artifical Intelligence"} /> },
  [CUSTOMIZATION]: { text: <CustomizationText title={"Customization"} /> },
  [ABOUT_US]: { text: <AboutUsText title={"About Us"} /> },
};
