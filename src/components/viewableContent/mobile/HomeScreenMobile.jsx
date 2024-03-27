import { useGLTF, useProgress } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useReducer, useRef } from "react";
import { useAppContext } from "../../../context/appContext";
import { Camera } from "../../scene/Camera";
import * as THREE from "three";
function HomeScreenMobile() {
  const astroRef = useRef();
  return (
    <>
      <div
        style={{
          background: backgrounds[1],
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {/* <h1 style={{ color: "green", fontFamily: "gotham" }}>
          Hello Wisoncsin!
        </h1>
        <div style={{ fontFamily: "gotham", color: "white" }}>
          Simply Expand
        </div> */}
        <div className="mobile-categories-wrapper">
          {categories.map((category, idx) => (
            <Category category={category} />
          ))}
        </div>
        <div className="canvas-container-mobile">
          <Canvas>
            {/* <LoaderComponent /> */}
            <ambientLight intensity={0.8} />
            <directionalLight intensity={3} />
            <Camera />
            <Suspense fallback={null}>
              <AstroModel
                url={"/assets/models/astronaut_new23.glb"}
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

const Category = ({ category }) => {
  return (
    <button className="mobile-category-wrapper">
      <span style={{ fontSize: "0.9em" }}>{category}</span>
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
  const {
    isInstantScroll,
    scrollArea,
    setScrollArea,
    isAstroModelDrawn,
    setIsAstroModelDrawn,
  } = useAppContext();

  const { scene, animations } = useGLTF("/assets/models/astronaut_new23.glb");
  const mixer = useGLTFAnimations(scene, animations);

  const { active, progress, errors, total } = useProgress();

  useEffect(() => {
    console.log(progress);
  }, [progress]);
  // gsap.set(".scene", { scale: 0.7 });

  const isFullyRenderedRef = useRef(false);

  // Use useFrame to check if the object is fully rendered on every frame
  // useFrame(() => {
  //   // Check if the object is visible in the scene and loaded
  //   if (astroRef.current && scene && !isFullyRenderedRef.current) {
  //     // Check if all objects in the scene have been rendered
  //     const fullyRendered = scene.children.every((child) => child.visible);
  //     if (fullyRendered && isAstroModelDrawn === false) {
  //       // Object is fully rendered
  //       isFullyRenderedRef.current = true;
  //       setIsAstroModelDrawn(true);
  //       console.log("Astro object is fully rendered!");
  //     }
  //   }
  // });

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
