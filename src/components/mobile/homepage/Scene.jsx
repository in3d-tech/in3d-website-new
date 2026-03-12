// // import { useGLTF, useProgress } from "@react-three/drei";
// // import { Canvas, useFrame, useThree } from "@react-three/fiber";
// // import { Suspense, useEffect, useMemo, useState, useRef, lazy } from "react";
// // import { useAppContext } from "../../../context/appContext";
// // import { Camera } from "../../desktop/homepage/scene/Camera";
// // import * as THREE from "three";
// // import { Sparkles } from "@react-three/drei";
// // import { DeviceTilt } from "../../common/SwipeAndTilt";

// // const INDUSTRY = 0;
// // const MEDICINE = 1;
// // const MICROSOFT = 2;
// // const SECURITY = 3;
// // const AI = 4;
// // const MILITARY = 5;
// // const CUSTOMIZATION = 6;
// // const ABOUT_US = 7;

// // export function SceneMobile({
// //   astroRef,
// //   selectedCategory,
// //   setDebug,
// //   selectedCategoryItemByIdx,
// //   categoryIdxRef,
// // }) {
// //   const [slide, setSlide] = useState(0);
// //   const [position, setPosition] = useState({ x: 0, y: 0 });
// //   const [tilt, setTilt] = useState({ tiltLR: 0, tiltFB: 0, dir: 0 });
// //   const [tempTiltValue, setTempTiltValue] = useState(null);

// //   // const sparklesColour = {
// //   //   "-1": "",
// //   //   [INDUSTRY]: "rgb(13,168,136, 0.1)",
// //   //   [MEDICINE]: "rgb(61,220,233, 0.1)",
// //   //   [MICROSOFT]: "rgb(0,0,255, 0.1)",
// //   //   [SECURITY]: "rgb(153,88,18, 0.1)",
// //   //   [AI]: "rgb(61,217,233, 0.1)",
// //   //   [MILITARY]: "rgb(80,123,63, 0.2)",
// //   //   [CUSTOMIZATION]: "rgb(240,183,94, 0.2)",
// //   // };

// //   const bgColours = {
// //     "-1": "",
// //     [INDUSTRY]: "rgb(13,168,136, 0.1)",
// //     [MEDICINE]: "rgb(13,168,136, 0.1)",
// //     [MICROSOFT]: "rgb(0,0,255, 0.1)",
// //     [SECURITY]: "rgb(0,0,255, 0.1)",
// //     [AI]: "rgb(0,0,255, 0.1)",
// //     [MILITARY]: "rgb(240,183,94, 0.2)",
// //     [CUSTOMIZATION]: "rgb(240,183,94, 0.2)",
// //     [ABOUT_US]: "rgb(240,183,94, 0.2)",
// //   };

// //   const handleTiltChange = (tiltData) => {
// //     setTilt({
// //       tiltLR: tiltData.gamma,
// //       tiltFB: tiltData.beta,
// //       dir: tiltData.alpha,
// //     });
// //   };

// //   useEffect(() => {
// //     if (!tempTiltValue) {
// //       setTimeout(() => setTempTiltValue(tilt), 2000);
// //     }
// //   }, []);

// //   // console.log("hello world");

// //   const hsTextBgs = {
// //     0: "url(/assets/images/backgrounds/taasia/taasia_bg.jpg)",
// //     1: "url(/assets/images/backgrounds/medicine/medicine_bg.jpg)",
// //     2: "url(/assets/images/backgrounds/microsoft/microsoft_bg.jpg)",
// //     3: "url(/assets/images/backgrounds/security/security.jpg)",
// //     4: "url(/assets/images/backgrounds/ai/ai_bg.png)",
// //     5: "url(/assets/images/backgrounds/military/military_bg.jpg)",
// //     6: "url(/assets/images/backgrounds/customize/Costumize_Smoke_Background_V01.png)",
// //     7: "url(/assets/images/backgrounds/customize/Costumize_Smoke_Background_V01.png)",
// //   };

// //   return (
// //     <div className="canvas-container-mobile">
// //       {!selectedCategory ? (
// //         <>
// //           <DeviceTilt
// //             setDebug={setDebug}
// //             position={position}
// //             setPosition={setPosition}
// //             onTiltChange={handleTiltChange}
// //           />
// //         </>
// //       ) : null}
// //       <Canvas
// //         style={{
// //           // backgroundColor: bgColours[selectedCat
// //           backgroundImage: selectedCategoryItemByIdx
// //             ? hsTextBgs[selectedCategoryItemByIdx]
// //             : "",
// //         }}
// //       >
// //         <ambientLight intensity={0.8} />
// //         <directionalLight intensity={3} />
// //         <Camera />
// //         <Sparkles count={300} scale={10} size={2} color="pink" />
// //         <Suspense fallback={null}>
// //           <AstroModel
// //             url={"/assets/models/astronaut_new5 (3).glb"}
// //             astroRef={astroRef}
// //             position={position}
// //             setPosition={setPosition}
// //             tilt={tilt}
// //             categoryIdxRef={categoryIdxRef}
// //           />
// //         </Suspense>
// //       </Canvas>
// //     </div>
// //   );
// // }

// // export function AstroModel({ url, astroRef, tilt, categoryIdxRef }) {
// //   const { isAstroModelDrawn, setIsAstroModelDrawn } = useAppContext();
// //   const { scene, animations } = useGLTF(url);
// //   const mixer = useGLTFAnimations(scene, animations);

// //   const { active, progress, errors, total } = useProgress();

// //   const isFullyRenderedRef = useRef(false);

// //   const [oscillationSpeed] = useState(1); // Oscillation speed factor
// //   const [oscillationAmplitude] = useState(0.005); // Amplitude of oscillation (in scene units)
// //   const oscillationPhaseRef = useRef(0); // Phase of the oscillation

// //   // Define rotation limits and sensitivity multipliers for both X and Y axes
// //   const minRotationY = Math.PI - 0.42;
// //   const maxRotationY = Math.PI - 0.28;
// //   const minRotationX = 0.41;
// //   const maxRotationX = 0.64;

// //   const ySensitivity = 0.0001; // Sensitivity for Y-axis
// //   const xSensitivity = 0.0001; // Sensitivity for X-axis

// //   useEffect(() => {
// //     console.log(progress);
// //   }, [progress]);

// //   const originalYPosition = -5;

// //   useFrame(() => {
// //     // Check if the object is visible in the scene and loaded
// //     if (astroRef.current && scene && !isFullyRenderedRef.current) {
// //       const fullyRendered = scene.children.every((child) => child.visible);
// //       if (
// //         fullyRendered &&
// //         isAstroModelDrawn === false &&
// //         active === false &&
// //         scene
// //       ) {
// //         isFullyRenderedRef.current = true;
// //         setTimeout(() => setIsAstroModelDrawn(true), 1000);
// //         console.log("Astro object is fully rendered!");
// //       }
// //     }

// //     if (astroRef.current) {
// //       // Update Y rotation based on tiltLR values
// //       const newRotationY =
// //         astroRef.current.rotation.y + tilt.tiltLR * ySensitivity;
// //       // Update X rotation based on tiltFB values
// //       const newRotationX =
// //         astroRef.current.rotation.x + tilt.tiltFB * xSensitivity;

// //       // Apply constraints for Y rotation
// //       if (newRotationY <= maxRotationY && newRotationY >= minRotationY) {
// //         astroRef.current.rotation.y = newRotationY;
// //       }

// //       // Apply constraints for X rotation
// //       if (newRotationX <= maxRotationX && newRotationX >= minRotationX) {
// //         astroRef.current.rotation.x = newRotationX;
// //       }

// //       if (categoryIdxRef.current == -1 || categoryIdxRef.current === 8) {
// //         // Calculate the difference and smoothly transition back to the original position
// //         const currentYPosition = astroRef.current.position.y;
// //         const deltaY = originalYPosition - currentYPosition;
// //         const lerpFactor = 0.02; // Adjust the speed of the return (smaller is slower, larger is faster)
// //         // Apply the lerp to smoothly return to the original position
// //         astroRef.current.position.y += deltaY * lerpFactor;
// //       } else {
// //         oscillationPhaseRef.current += oscillationSpeed * 0.01; // You can adjust the speed

// //         // Update the y-position based on a sine wave
// //         const newYPosition =
// //           astroRef.current.position.y +
// //           Math.sin(oscillationPhaseRef.current) * oscillationAmplitude;

// //         // Apply the new y-position
// //         astroRef.current.position.y = newYPosition;
// //       }
// //     }
// //     // if (astroRef.current) {
// //     //   // Original y position of the astronaut model
// //     //   const originalYPosition = -5;

// //     //   if (categoryIdxRef.current === -1 || categoryIdxRef.current === 8) {
// //     //     // Calculate the difference and smoothly transition back to the original position
// //     //     const currentYPosition = astroRef.current.position.y;
// //     //     const deltaY = originalYPosition - currentYPosition;
// //     //     const lerpFactor = 0.02; // Adjust the speed of the return (smaller is slower, larger is faster)

// //     //     // Apply the lerp to smoothly return to the original position
// //     //     astroRef.current.position.y += deltaY * lerpFactor;
// //     //   } else {
// //     //     // Oscillate up and down when not in the specified categories
// //     //     oscillationPhaseRef.current += oscillationSpeed * 0.01;

// //     //     // Calculate oscillating position
// //     //     const newYPosition =
// //     //       originalYPosition +
// //     //       Math.sin(oscillationPhaseRef.current) * oscillationAmplitude;

// //     //     // Apply the new y-position
// //     //     astroRef.current.position.y = newYPosition;
// //     //   }

// //     //   // Update Y and X rotation based on tilt values with constraints
// //     //   const newRotationY =
// //     //     astroRef.current.rotation.y + tilt.tiltLR * ySensitivity;
// //     //   const newRotationX =
// //     //     astroRef.current.rotation.x + tilt.tiltFB * xSensitivity;

// //     //   if (newRotationY <= maxRotationY && newRotationY >= minRotationY) {
// //     //     astroRef.current.rotation.y = newRotationY;
// //     //   }

// //     //   if (newRotationX <= maxRotationX && newRotationX >= minRotationX) {
// //     //     astroRef.current.rotation.x = newRotationX;
// //     //   }
// //     // }
// //   });

// //   useEffect(() => {
// //     if (scene && astroRef.current && !isFullyRenderedRef.current) {
// //       const fullyRendered = scene.children.every((child) => child.visible);

// //       if (fullyRendered && isAstroModelDrawn === false) {
// //         setTimeout(() => setIsAstroModelDrawn(true), 1500);
// //         console.log("Astro object is fully rendered!");
// //       }
// //     }
// //   }, [isAstroModelDrawn]);

// //   return (
// //     <group>
// //       <primitive
// //         ref={astroRef}
// //         object={scene}
// //         dispose={null}
// //         scale={[1, 1, 1]}
// //         position={[-3.75, -5, -0.5]}
// //         rotation={[0.54, Math.PI - 0.35, 0]}
// //       />
// //     </group>
// //   );
// // }

// // function useGLTFAnimations(scene, animations) {
// //   const { invalidate } = useThree();
// //   const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);

// //   useEffect(() => {
// //     if (!mixer || !animations) return;

// //     animations.forEach((clip) => mixer.clipAction(clip).play());

// //     const handler = setInterval(() => invalidate(), 1000 / 60);
// //     return () => clearInterval(handler);
// //   }, [animations, mixer, invalidate]);

// //   useFrame((_state, delta) => mixer && mixer.update(delta));

// //   return mixer;
// // }

// import { useGLTF, useProgress, Sparkles } from "@react-three/drei";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { Suspense, useEffect, useMemo, useState, useRef } from "react";
// import { useAppContext } from "../../../context/appContext";
// import { Camera } from "../../desktop/homepage/scene/Camera";
// import * as THREE from "three";
// import { DeviceTilt } from "../../common/SwipeAndTilt";

// const INDUSTRY = 0;
// const MEDICINE = 1;
// const MICROSOFT = 2;
// const SECURITY = 3;
// const AI = 4;
// const MILITARY = 5;
// const CUSTOMIZATION = 6;
// const ABOUT_US = 7;

// /* ─── Background image map (static, outside component) ─── */
// const hsTextBgs = {
//   0: "url(/assets/images/backgrounds/taasia/taasia_bg.jpg)",
//   1: "url(/assets/images/backgrounds/medicine/medicine_bg.jpg)",
//   2: "url(/assets/images/backgrounds/microsoft/microsoft_bg.jpg)",
//   3: "url(/assets/images/backgrounds/security/security.jpg)",
//   4: "url(/assets/images/backgrounds/ai/ai_bg.png)",
//   5: "url(/assets/images/backgrounds/military/military_bg.jpg)",
//   6: "url(/assets/images/backgrounds/customize/Costumize_Smoke_Background_V01.png)",
//   7: "url(/assets/images/backgrounds/customize/Costumize_Smoke_Background_V01.png)",
// };

// export function SceneMobile({
//   astroRef,
//   selectedCategory,
//   selectedCategoryItemByIdx,
//   categoryIdxRef,
// }) {
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [tilt, setTilt] = useState({ tiltLR: 0, tiltFB: 0, dir: 0 });

//   const handleTiltChange = (tiltData) => {
//     setTilt({
//       tiltLR: tiltData.gamma,
//       tiltFB: tiltData.beta,
//       dir: tiltData.alpha,
//     });
//   };

//   // Compute canvas background only when category changes
//   const canvasBgImage =
//     selectedCategoryItemByIdx >= 0
//       ? hsTextBgs[selectedCategoryItemByIdx] || ""
//       : "";

//   return (
//     <div className="canvas-container-mobile">
//       {!selectedCategory && (
//         <DeviceTilt
//           position={position}
//           setPosition={setPosition}
//           onTiltChange={handleTiltChange}
//         />
//       )}

//       <Canvas
//         // Limit pixel ratio on mobile for performance
//         dpr={[1, 1.5]}
//         // Use a lower-overhead gl config
//         gl={{
//           antialias: false,
//           powerPreference: "high-performance",
//           alpha: true,
//         }}
//         style={{
//           backgroundImage: canvasBgImage,
//         }}
//       >
//         <ambientLight intensity={0.8} />
//         <directionalLight intensity={3} />
//         <Camera />
//         <Sparkles count={200} scale={10} size={2} color="pink" />
//         <Suspense fallback={null}>
//           <AstroModel
//             url="/assets/models/astronaut_new5 (3).glb"
//             astroRef={astroRef}
//             position={position}
//             setPosition={setPosition}
//             tilt={tilt}
//             categoryIdxRef={categoryIdxRef}
//           />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// }

// /* ─── Astronaut model ─── */

// // Constants outside component to avoid re-creation
// const ORIGINAL_Y = -5;
// const LERP_FACTOR = 0.02;
// const OSCILLATION_SPEED = 0.01;
// const OSCILLATION_AMPLITUDE = 0.005;
// const MIN_ROT_Y = Math.PI - 0.42;
// const MAX_ROT_Y = Math.PI - 0.28;
// const MIN_ROT_X = 0.41;
// const MAX_ROT_X = 0.64;
// const Y_SENSITIVITY = 0.0001;
// const X_SENSITIVITY = 0.0001;

// export function AstroModel({ url, astroRef, tilt, categoryIdxRef }) {
//   const { isAstroModelDrawn, setIsAstroModelDrawn } = useAppContext();
//   const { scene, animations } = useGLTF(url);
//   const mixer = useGLTFAnimations(scene, animations);
//   const { active } = useProgress();

//   const isFullyRenderedRef = useRef(false);
//   const oscillationPhaseRef = useRef(0);

//   // Use a ref to read tilt inside useFrame without causing re-renders
//   const tiltRef = useRef(tilt);
//   useEffect(() => {
//     tiltRef.current = tilt;
//   }, [tilt]);

//   useFrame((_, delta) => {
//     if (!astroRef.current) return;

//     const ref = astroRef.current;
//     const t = tiltRef.current;

//     // ── Model-ready detection ──
//     if (!isFullyRenderedRef.current && scene && !active) {
//       const fullyRendered = scene.children.every((child) => child.visible);
//       if (fullyRendered && !isAstroModelDrawn) {
//         isFullyRenderedRef.current = true;
//         setTimeout(() => setIsAstroModelDrawn(true), 1000);
//       }
//     }

//     // ── Tilt-based rotation ──
//     const newRotY = ref.rotation.y + t.tiltLR * Y_SENSITIVITY;
//     const newRotX = ref.rotation.x + t.tiltFB * X_SENSITIVITY;

//     if (newRotY >= MIN_ROT_Y && newRotY <= MAX_ROT_Y) {
//       ref.rotation.y = newRotY;
//     }
//     if (newRotX >= MIN_ROT_X && newRotX <= MAX_ROT_X) {
//       ref.rotation.x = newRotX;
//     }

//     // ── Vertical movement ──
//     const catIdx = categoryIdxRef.current;
//     if (catIdx === -1 || catIdx === 8) {
//       // Lerp back to rest position (delta-aware for frame-rate independence)
//       const factor = 1 - Math.pow(1 - LERP_FACTOR, delta * 60);
//       ref.position.y += (ORIGINAL_Y - ref.position.y) * factor;
//     } else {
//       // Gentle float oscillation
//       oscillationPhaseRef.current += OSCILLATION_SPEED * delta * 60;
//       ref.position.y +=
//         Math.sin(oscillationPhaseRef.current) * OSCILLATION_AMPLITUDE;
//     }
//   });

//   return (
//     <group>
//       <primitive
//         ref={astroRef}
//         object={scene}
//         dispose={null}
//         scale={[1, 1, 1]}
//         position={[-3.75, ORIGINAL_Y, -0.5]}
//         rotation={[0.54, Math.PI - 0.35, 0]}
//       />
//     </group>
//   );
// }

// /* ─── Animation mixer hook ─── */

// function useGLTFAnimations(scene, animations) {
//   const { invalidate } = useThree();
//   const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);

//   useEffect(() => {
//     if (!mixer || !animations) return;
//     animations.forEach((clip) => mixer.clipAction(clip).play());

//     // Use RAF-driven invalidation instead of setInterval for smoother frames
//     let running = true;
//     const tick = () => {
//       if (!running) return;
//       invalidate();
//       requestAnimationFrame(tick);
//     };
//     requestAnimationFrame(tick);

//     return () => {
//       running = false;
//     };
//   }, [animations, mixer, invalidate]);

//   useFrame((_, delta) => mixer?.update(delta));

//   return mixer;
// }

import { useGLTF, useProgress, Sparkles } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState, useRef } from "react";
import { useAppContext } from "../../../context/appContext";
import { Camera } from "../../desktop/homepage/scene/Camera";
import * as THREE from "three";

const INDUSTRY = 0;
const MEDICINE = 1;
const MICROSOFT = 2;
const SECURITY = 3;
const AI = 4;
const MILITARY = 5;
const CUSTOMIZATION = 6;
const ABOUT_US = 7;

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

/* ─── Base rotation of the astronaut primitive ─── */
const BASE_ROT_X = 0.54;
const BASE_ROT_Y = Math.PI - 0.35;

/* ─── Tilt config ─── */
const TILT_RANGE_DEG = 30; // degrees of device tilt that map to max rotation offset
const MAX_OFFSET_X = 0.15; // max radians the model tilts on X
const MAX_OFFSET_Y = 0.15; // max radians the model tilts on Y
const TILT_LERP_SPEED = 4; // how fast the model catches up (per second)

export function SceneMobile({
  astroRef,
  selectedCategory,
  selectedCategoryItemByIdx,
  categoryIdxRef,
}) {
  // Store tilt offsets as a ref so useFrame can read them without re-renders
  const tiltTarget = useRef({ x: 0, y: 0 });
  const [permissionGranted, setPermissionGranted] = useState(false);

  /* ── Request permission (required on iOS 13+) and listen to device orientation ── */
  useEffect(() => {
    let handler;

    const startListening = () => {
      // Capture the initial beta/gamma so we can compute deltas
      let initialBeta = null;
      let initialGamma = null;

      handler = (e) => {
        const beta = e.beta; // front-back tilt, -180..180
        const gamma = e.gamma; // left-right tilt, -90..90

        if (beta == null || gamma == null) return;

        // Set initial reference on first valid reading
        if (initialBeta === null) {
          initialBeta = beta;
          initialGamma = gamma;
        }

        // Delta from the orientation when the page loaded
        const deltaBeta = beta - initialBeta;
        const deltaGamma = gamma - initialGamma;

        // Map to -1..1 range based on TILT_RANGE_DEG
        const normX = Math.max(-1, Math.min(1, deltaBeta / TILT_RANGE_DEG));
        const normY = Math.max(-1, Math.min(1, deltaGamma / TILT_RANGE_DEG));

        tiltTarget.current = {
          x: normX * MAX_OFFSET_X,
          y: normY * MAX_OFFSET_Y,
        };
      };

      window.addEventListener("deviceorientation", handler, { passive: true });
      setPermissionGranted(true);
    };

    // iOS 13+ requires explicit permission request
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      // We need a user gesture to request — attach a one-time tap listener
      const requestOnTap = () => {
        DeviceOrientationEvent.requestPermission()
          .then((state) => {
            if (state === "granted") startListening();
          })
          .catch(console.warn);
        window.removeEventListener("touchstart", requestOnTap);
        window.removeEventListener("click", requestOnTap);
      };
      window.addEventListener("touchstart", requestOnTap, { once: true });
      window.addEventListener("click", requestOnTap, { once: true });
    } else {
      // Android / desktop — just start
      startListening();
    }

    return () => {
      if (handler) window.removeEventListener("deviceorientation", handler);
    };
  }, []);

  const canvasBgImage =
    selectedCategoryItemByIdx >= 0
      ? hsTextBgs[selectedCategoryItemByIdx] || ""
      : "";

  return (
    <div className="canvas-container-mobile">
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: true,
        }}
        style={{ backgroundImage: canvasBgImage }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight intensity={3} />
        <Camera />
        <Sparkles count={200} scale={10} size={2} color="pink" />
        <Suspense fallback={null}>
          <AstroModel
            url="/assets/models/astronaut_new5 (3).glb"
            astroRef={astroRef}
            tiltTarget={tiltTarget}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

/* ─── Astronaut model ─── */

const ORIGINAL_Y = -5;

export function AstroModel({ url, astroRef, tiltTarget }) {
  const { isAstroModelDrawn, setIsAstroModelDrawn } = useAppContext();
  const { scene, animations } = useGLTF(url);
  const mixer = useGLTFAnimations(scene, animations);
  const { active } = useProgress();

  const isFullyRenderedRef = useRef(false);
  // Track current applied offsets for smooth lerping
  const currentOffset = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    if (!astroRef.current) return;
    const ref = astroRef.current;

    // ── Model-ready detection ──
    if (!isFullyRenderedRef.current && scene && !active) {
      const fullyRendered = scene.children.every((child) => child.visible);
      if (fullyRendered && !isAstroModelDrawn) {
        isFullyRenderedRef.current = true;
        setTimeout(() => setIsAstroModelDrawn(true), 1000);
      }
    }

    // ── Smooth tilt ──
    const target = tiltTarget.current;
    const lerpFactor = 1 - Math.exp(-TILT_LERP_SPEED * delta);

    currentOffset.current.x +=
      (target.x - currentOffset.current.x) * lerpFactor;
    currentOffset.current.y +=
      (target.y - currentOffset.current.y) * lerpFactor;

    // Apply as absolute rotation = base + offset (no accumulation drift)
    ref.rotation.x = BASE_ROT_X + currentOffset.current.x;
    ref.rotation.y = BASE_ROT_Y + currentOffset.current.y;

    // Keep Y position fixed — no oscillation
    ref.position.y = ORIGINAL_Y;
  });

  return (
    <group>
      <primitive
        ref={astroRef}
        object={scene}
        dispose={null}
        scale={[1, 1, 1]}
        position={[-3.75, ORIGINAL_Y, -0.5]}
        rotation={[BASE_ROT_X, BASE_ROT_Y, 0]}
      />
    </group>
  );
}

/* ─── Animation mixer hook ─── */

function useGLTFAnimations(scene, animations) {
  const { invalidate } = useThree();
  const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);

  useEffect(() => {
    if (!mixer || !animations) return;
    animations.forEach((clip) => mixer.clipAction(clip).play());

    let running = true;
    const tick = () => {
      if (!running) return;
      invalidate();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    return () => {
      running = false;
    };
  }, [animations, mixer, invalidate]);

  useFrame((_, delta) => mixer?.update(delta));
  return mixer;
}
