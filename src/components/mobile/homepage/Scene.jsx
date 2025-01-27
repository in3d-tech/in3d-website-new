import { useGLTF, useProgress } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState, useRef, lazy } from "react";
import { useAppContext } from "../../../context/appContext";
import { Camera } from "../../desktop/homepage/scene/Camera";
import * as THREE from "three";
import { Sparkles } from "@react-three/drei";
import { DeviceTilt } from "../../common/SwipeAndTilt";

const INDUSTRY = 0;
const MEDICINE = 1;
const MICROSOFT = 2;
const SECURITY = 3;
const AI = 4;
const MILITARY = 5;
const CUSTOMIZATION = 6;
const ABOUT_US = 7;

export function SceneMobile({
  astroRef,
  selectedCategory,
  setDebug,
  selectedCategoryItemByIdx,
}) {
  const [slide, setSlide] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ tiltLR: 0, tiltFB: 0, dir: 0 });
  const [tempTiltValue, setTempTiltValue] = useState(null);

  // const sparklesColour = {
  //   "-1": "",
  //   [INDUSTRY]: "rgb(13,168,136, 0.1)",
  //   [MEDICINE]: "rgb(61,220,233, 0.1)",
  //   [MICROSOFT]: "rgb(0,0,255, 0.1)",
  //   [SECURITY]: "rgb(153,88,18, 0.1)",
  //   [AI]: "rgb(61,217,233, 0.1)",
  //   [MILITARY]: "rgb(80,123,63, 0.2)",
  //   [CUSTOMIZATION]: "rgb(240,183,94, 0.2)",
  // };

  const bgColours = {
    "-1": "",
    [INDUSTRY]: "rgb(13,168,136, 0.1)",
    [MEDICINE]: "rgb(13,168,136, 0.1)",
    [MICROSOFT]: "rgb(0,0,255, 0.1)",
    [SECURITY]: "rgb(0,0,255, 0.1)",
    [AI]: "rgb(0,0,255, 0.1)",
    [MILITARY]: "rgb(240,183,94, 0.2)",
    [CUSTOMIZATION]: "rgb(240,183,94, 0.2)",
    [ABOUT_US]: "rgb(240,183,94, 0.2)",
  };

  const handleTiltChange = (tiltData) => {
    setTilt({
      tiltLR: tiltData.gamma,
      tiltFB: tiltData.beta,
      dir: tiltData.alpha,
    });
  };

  useEffect(() => {
    if (!tempTiltValue) {
      setTimeout(() => setTempTiltValue(tilt), 2000);
    }
  }, []);

  // console.log("hello world");

  const hsTextBgs = {
    0: "url(/assets/images/backgrounds/taasia/taasia_bg.jpg)",
    1: "url(/assets/images/backgrounds/medicine/medicine_bg.jpg)",
    2: "url(/assets/images/backgrounds/microsoft/microsoft_bg.jpg)",
    3: "url(/assets/images/backgrounds/security/security.jpg)",
    4: "url(/assets/images/backgrounds/ai/ai_bg.png)",
    5: "url(/assets/images/backgrounds/military/military_bg.jpg)",
    6: "url(/assets/images/backgrounds/customize/Costumize_Smoke_Background_V01.png)",
    7: "url(/assets/images/backgrounds/customize/Costumize_Smoke_Background_V01.png)",
  };

  return (
    <div className="canvas-container-mobile">
      {!selectedCategory ? (
        <>
          <DeviceTilt
            setDebug={setDebug}
            position={position}
            setPosition={setPosition}
            onTiltChange={handleTiltChange}
          />
        </>
      ) : null}
      <Canvas
        style={{
          // backgroundColor: bgColours[selectedCat
          backgroundImage: selectedCategoryItemByIdx
            ? hsTextBgs[selectedCategoryItemByIdx]
            : "",
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight intensity={3} />
        <Camera />
        <Sparkles count={300} scale={10} size={2} color="pink" />
        <Suspense fallback={null}>
          <AstroModel
            url={"/assets/models/astronaut_new5 (3).glb"}
            astroRef={astroRef}
            position={position}
            setPosition={setPosition}
            tilt={tilt}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export function AstroModel({ url, astroRef, tilt }) {
  const { isAstroModelDrawn, setIsAstroModelDrawn } = useAppContext();
  const { scene, animations } = useGLTF(url);
  const mixer = useGLTFAnimations(scene, animations);

  const { active, progress, errors, total } = useProgress();

  const isFullyRenderedRef = useRef(false);

  // Define rotation limits and sensitivity multipliers for both X and Y axes
  const minRotationY = Math.PI - 0.42;
  const maxRotationY = Math.PI - 0.28;
  const minRotationX = 0.41;
  const maxRotationX = 0.64;

  const ySensitivity = 0.0001; // Sensitivity for Y-axis
  const xSensitivity = 0.0001; // Sensitivity for X-axis

  useEffect(() => {
    console.log(progress);
  }, [progress]);

  useFrame(() => {
    // Check if the object is visible in the scene and loaded
    if (astroRef.current && scene && !isFullyRenderedRef.current) {
      const fullyRendered = scene.children.every((child) => child.visible);
      if (
        fullyRendered &&
        isAstroModelDrawn === false &&
        active === false &&
        scene
      ) {
        isFullyRenderedRef.current = true;
        setTimeout(() => setIsAstroModelDrawn(true), 1000);
        console.log("Astro object is fully rendered!");
      }
    }

    if (astroRef.current) {
      // Update Y rotation based on tiltLR values
      const newRotationY =
        astroRef.current.rotation.y + tilt.tiltLR * ySensitivity;
      // Update X rotation based on tiltFB values
      const newRotationX =
        astroRef.current.rotation.x + tilt.tiltFB * xSensitivity;

      // Apply constraints for Y rotation
      if (newRotationY <= maxRotationY && newRotationY >= minRotationY) {
        astroRef.current.rotation.y = newRotationY;
      }

      // Apply constraints for X rotation
      if (newRotationX <= maxRotationX && newRotationX >= minRotationX) {
        astroRef.current.rotation.x = newRotationX;
      }
    }
  });

  useEffect(() => {
    if (scene && astroRef.current && !isFullyRenderedRef.current) {
      const fullyRendered = scene.children.every((child) => child.visible);

      if (fullyRendered && isAstroModelDrawn === false) {
        setTimeout(() => setIsAstroModelDrawn(true), 1500);
        console.log("Astro object is fully rendered!");
      }
    }
  }, [isAstroModelDrawn]);

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
