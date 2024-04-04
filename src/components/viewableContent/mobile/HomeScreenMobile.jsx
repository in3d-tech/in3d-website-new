import { useGLTF, useProgress } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState, useRef } from "react";
import { useAppContext } from "../../../context/appContext";
import { Camera } from "../../scene/Camera";
import * as THREE from "three";
import gsap from "gsap";
import SelectedCategoryMobile from "./SelectedCategoryMobile";

function HomeScreenMobile() {
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
  } = useAppContext();

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
    if (!renderModels) return;

    if (!startExpandedAnimation) setStartExpandedAnimation(true);
  }, [renderModels]);

  return (
    <>
      <div
        style={{
          // minWidth: "100%",
          width: "100%",
          height: "100vh",
          position: "fixed",
          overflow: "hidden",
          top: 0,
          left: 0,
          background: backgrounds[mobileBackground],
          // opacity: 0.4,
        }}
      ></div>
      <div
        style={{
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          transition: "background-image 0.8s",
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
        {/* <div style={{ position: "absolute", top: "1em" }}>
          <div
            className="text-animation"
            style={{
              color: "white",
              fontSize: "2.5em",
              marginRight: "2em",
              fontFamily: "gotham",
              transform: "translateX(-100px)", // Initial horizontal position
            }}
          >
            Simply
          </div>
          <div
            className="text-animation2"
            style={{
              color: "white",
              fontSize: "2.5em",
              marginLeft: "2em",
              fontFamily: "gotham",
              marginTop: "0.3em",
              transform: "translateX(100px)", // Initial horizontal position
            }}
          >
            Expand
          </div>
        </div> */}
        {startExpandedAnimation ? (
          <>
            <div
              style={{
                bottom: "3em",
                left: "1em",
                height: "15em",
                zIndex: 1,
                position: "absolute",
                width: "70%",
              }}
              className="container"
            >
              <span
                style={{ fontSize: "2em", marginTop: "5em" }}
                className="text-animate simply-header"
              >
                SIMPLY EXPAND
              </span>
            </div>
          </>
        ) : null}

        {true ? (
          <SelectedCategoryMobile
            titleKey={isShouldShowCategoryInformation}
            astroRef={astroRef}
            setMobileBackground={setMobileBackground}
          />
        ) : null}

        {/* {isShouldShowCategoryInformation ? (
          <SelectedCategoryMobile titleKey={isShouldShowCategoryInformation} />
        ) : (
          <div className="mobile-categories-wrapper">
            {categories.map((category, idx) => (
              <Category
                category={category}
                key={`categoryMobile${idx}`}
                setIsShouldShowCategoryInformation={
                  setIsShouldShowCategoryInformation
                }
                idx={idx}
                scrollToElementById={scrollToElementById}
              />
            ))}
          </div>
        )} */}
        <div className="canvas-container-mobile">
          <Canvas>
            {/* <LoaderComponent /> */}
            <ambientLight intensity={0.8} />
            <directionalLight intensity={3} />
            <Camera />
            <Suspense fallback={null}>
              <AstroModel
                url={"/assets/models/astronaut_new5 (1).glb"}
                astroRef={astroRef}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default HomeScreenMobile;

const Category = ({
  category,
  idx,
  setIsShouldShowCategoryInformation,
  scrollToElementById,
}) => {
  return (
    <button
      onClick={() => {
        setIsShouldShowCategoryInformation(idx);
        setTimeout(() => {
          scrollToElementById();
        }, 200);
      }}
      className="mobile-category-wrapper"
    >
      <span
        style={{
          fontSize: "0.9em",
        }}
      >
        {category}
      </span>
    </button>
  );
};

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

export function AstroModel({
  url,
  astroRef,
  visibleModels,
  setVisibleModels,
  textRef,
  setTextAnimation,
  customizeRef,
}) {
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
        position={[-3.75, -5, -0.1]}
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
