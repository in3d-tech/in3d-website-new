// import { useRef, useEffect, useState, useMemo, useCallback } from "react";
// import { useFrame } from "@react-three/fiber";
// import { useGLTF } from "@react-three/drei";
// import * as THREE from "three";

// /**
//  * Model URLs — unchanged from original.
//  */
// const CATEGORY_MODEL_URLS = [
//   "/assets/models/engenir_model.glb", // 0: Industry
//   "/assets/models/medical_model1 (1).glb", // 1: Medicine
//   "/assets/models/microsoft_model.glb", // 2: Microsoft
//   "/assets/models/security.glb", // 3: Security
//   "/assets/models/ai_model.glb", // 4: AI
//   "/assets/models/military.glb", // 5: Military
//   "/assets/models/costimize_model_v02.glb", // 6: Customization
// ];

// const CATEGORY_MODEL_TRANSFORMS = {
//   0: { position: [0.4, -1.5, 1.4], scale: 1.5, rotationY: -2.5 }, // ind
//   1: { position: [3.5, -1.8, 0], scale: 2, rotationY: 0 }, // med
//   2: { position: [0, -2, -1], scale: 2, rotationY: -0.5 }, // mic
//   3: {
//     position: [-0.2, -0.2, 3],
//     scale: 2,
//     rotationY: Math.PI + 0.2,
//     rotationX: 0.1,
//   }, // sec
//   4: { position: [0, -1.4, 3.5], scale: 1.0, rotationY: -2.5 }, // ai
//   5: { position: [0, -1, 2], scale: 2, rotationY: -0.4 }, // mil
//   6: { position: [0.1, -1.5, 1.2], scale: 2, rotationY: -0.8 }, // cus
// };

// const DEFAULT_TRANSFORM = { position: [0, -4, -2], scale: 2.0, rotationY: 0 };

// /* ─── Transition tuning ─── */
// const TRANSITION_DURATION = 0.35; // seconds for full crossfade
// const SLIDE_OUT_Z = -4; // old model drifts this far back
// const SLIDE_IN_Z = 3; // new model starts this far forward
// const SLIDE_OUT_X = -1.5; // subtle lateral drift on exit
// const SLIDE_IN_X = 1.5; // subtle lateral drift on entry
// const CAT_TILT_LERP_SPEED = 4;

// /* ─── Easings ─── */
// function easeInCubic(t) {
//   return t * t * t;
// }
// function easeOutCubic(t) {
//   return 1 - Math.pow(1 - t, 3);
// }
// function easeInOutCubic(t) {
//   return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
// }

// /**
//  * MobileModelSwapper — Directional Slide + Crossfade
//  *
//  * Instead of unmount→remount, we keep up to TWO models mounted at once
//  * (outgoing + incoming) and crossfade between them with directional motion.
//  */
// export function MobileModelSwapper({ activeCategoryIdx, tiltTarget }) {
//   // Slots: we can have up to 2 models at once (outgoing + incoming)
//   const [slots, setSlots] = useState([]);
//   // slots = [{ idx, role: 'active'|'entering'|'leaving', key }]

//   const slotKeyCounter = useRef(0);
//   const transitionProgress = useRef(0);
//   const isTransitioning = useRef(false);
//   const pendingTarget = useRef(null);

//   useEffect(() => {
//     const target = activeCategoryIdx;

//     // If nothing is showing and target is < 0, do nothing
//     if (target < 0 && slots.length === 0) return;

//     // Add this: treat unknown indices same as -1 (fade out)
//     if (target >= 0 && !CATEGORY_MODEL_URLS[target]) {
//       setSlots((prev) => prev.map((s) => ({ ...s, role: "leaving" })));
//       isTransitioning.current = true;
//       transitionProgress.current = 0;
//       return;
//     }

//     // If currently mid-transition, queue this target for after
//     if (isTransitioning.current) {
//       pendingTarget.current = target;
//       return;
//     }

//     const activeSlot = slots.find(
//       (s) => s.role === "active" || s.role === "entering",
//     );

//     // Same model already active — no-op
//     if (activeSlot && activeSlot.idx === target) return;

//     if (target < 0) {
//       // Fade everything out
//       setSlots((prev) => prev.map((s) => ({ ...s, role: "leaving" })));
//       isTransitioning.current = true;
//       transitionProgress.current = 0;
//       return;
//     }

//     if (!activeSlot || activeSlot.idx < 0) {
//       // Nothing active — just enter directly
//       const key = ++slotKeyCounter.current;
//       setSlots([{ idx: target, role: "entering", key }]);
//       isTransitioning.current = true;
//       transitionProgress.current = 0;
//     } else {
//       // Swap: mark current as leaving, add new as entering
//       const key = ++slotKeyCounter.current;
//       setSlots((prev) => [
//         ...prev
//           .filter((s) => s.role === "active" || s.role === "entering")
//           .map((s) => ({ ...s, role: "leaving" })),
//         { idx: target, role: "entering", key },
//       ]);
//       isTransitioning.current = true;
//       transitionProgress.current = 0;
//     }
//   }, [activeCategoryIdx]);

//   // Animation driver
//   useFrame((_, delta) => {
//     if (!isTransitioning.current) return;

//     transitionProgress.current += delta / TRANSITION_DURATION;

//     if (transitionProgress.current >= 1) {
//       transitionProgress.current = 1;
//       isTransitioning.current = false;

//       // Promote entering → active, remove leaving
//       setSlots((prev) => {
//         const next = prev
//           .filter((s) => s.role !== "leaving")
//           .map((s) => (s.role === "entering" ? { ...s, role: "active" } : s));
//         return next;
//       });

//       // If there's a queued target, kick it off on next frame
//       if (pendingTarget.current !== null) {
//         const queued = pendingTarget.current;
//         pendingTarget.current = null;
//         // Use setTimeout to avoid setState-during-render
//         setTimeout(() => {
//           // This will trigger the useEffect above
//           // We need a way to re-trigger — simplest: update a state
//         }, 0);
//       }
//     }
//   });

//   // Handle pending target after transition completes
//   useEffect(() => {
//     if (
//       !isTransitioning.current &&
//       pendingTarget.current !== null &&
//       pendingTarget.current !== activeCategoryIdx
//     ) {
//       // The activeCategoryIdx hasn't changed, but we have a pending.
//       // This case is handled by the activeCategoryIdx effect.
//     }
//   }, [slots]);

//   return (
//     <>
//       {slots.map((slot) => {
//         const url = CATEGORY_MODEL_URLS[slot.idx];
//         if (!url) return null;
//         return (
//           <SlotWrapper
//             key={slot.key}
//             slot={slot}
//             url={url}
//             transitionProgress={transitionProgress}
//             isTransitioning={isTransitioning}
//             tiltTarget={tiltTarget}
//           />
//         );
//       })}
//     </>
//   );
// }

// /**
//  * SlotWrapper — handles the spatial slide + opacity for one model slot.
//  */
// function SlotWrapper({
//   slot,
//   url,
//   transitionProgress,
//   isTransitioning,
//   tiltTarget,
// }) {
//   const groupRef = useRef();
//   const materialsRef = useRef([]);
//   const transform = getTransform(slot.idx);

//   useFrame(() => {
//     if (!groupRef.current) return;

//     const t = transitionProgress.current;
//     const basePos = transform.position;

//     if (slot.role === "entering") {
//       // Slide in: start offset, end at base position
//       const eased = easeOutCubic(t);
//       const offsetZ = SLIDE_IN_Z * (1 - eased);
//       const offsetX = SLIDE_IN_X * (1 - eased);
//       groupRef.current.position.set(offsetX, 0, offsetZ);
//       groupRef.current.scale.setScalar(eased);

//       // Fade in
//       const opacity = easeOutCubic(t);
//       materialsRef.current.forEach((m) => {
//         m.opacity = opacity;
//         m.depthWrite = opacity > 0.5;
//       });
//     } else if (slot.role === "leaving") {
//       // Slide out: from base position, drift back + lateral
//       const eased = easeInCubic(t);
//       const offsetZ = SLIDE_OUT_Z * eased;
//       const offsetX = SLIDE_OUT_X * eased;
//       groupRef.current.position.set(offsetX, 0, offsetZ);
//       groupRef.current.scale.setScalar(1 - eased * 0.3);

//       // Fade out
//       const opacity = 1 - easeInCubic(t);
//       materialsRef.current.forEach((m) => {
//         m.opacity = opacity;
//         m.depthWrite = opacity > 0.5;
//       });
//     } else if (slot.role === "active") {
//       // Settled — ensure full opacity and correct position
//       groupRef.current.position.set(0, 0, 0);
//       groupRef.current.scale.setScalar(1);
//       materialsRef.current.forEach((m) => {
//         m.opacity = 1;
//         m.depthWrite = true;
//       });
//     }
//   });

//   return (
//     <group ref={groupRef}>
//       <CategoryModel
//         url={url}
//         categoryIdx={slot.idx}
//         tiltTarget={tiltTarget}
//         onModelReady={onModelReady}
//       />
//     </group>
//   );
// }

// /**
//  * CategoryModel — renders a single GLTF model with tilt response.
//  * Now calls `onModelReady` so the parent can control material opacity.
//  */
// function CategoryModel({ url, categoryIdx, tiltTarget, onModelReady }) {
//   const { scene, animations } = useGLTF(url);
//   const modelRef = useRef();
//   const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);
//   const currentOffset = useRef({ x: 0, y: 0 });
//   const transform = getTransform(categoryIdx);

//   // Notify parent about materials once scene is ready
//   useEffect(() => {
//     if (scene && onModelReady) {
//       onModelReady(scene);
//     }
//   }, [scene, onModelReady]);

//   useEffect(() => {
//     if (!mixer || !animations?.length) return;
//     animations.forEach((clip) => mixer.clipAction(clip).play());
//     return () => mixer.stopAllAction();
//   }, [animations, mixer]);

//   useFrame((_, delta) => {
//     mixer?.update(delta);

//     if (modelRef.current && tiltTarget?.current) {
//       const target = tiltTarget.current;
//       const lerpSpeed = 1 - Math.exp(-CAT_TILT_LERP_SPEED * delta);

//       currentOffset.current.x +=
//         (target.x - currentOffset.current.x) * lerpSpeed;
//       currentOffset.current.y +=
//         (target.y - currentOffset.current.y) * lerpSpeed;

//       modelRef.current.rotation.x =
//         (transform.rotationX ?? 0) + currentOffset.current.x;
//       modelRef.current.rotation.y =
//         transform.rotationY + currentOffset.current.y;
//     }
//   });

//   // Add a module-level cache
//   const materialCacheByUrl = new Map();

//   // In SlotWrapper, replace onModelReady:
//   const onModelReady = useCallback(
//     (scene) => {
//       if (materialCacheByUrl.has(url)) {
//         // Reapply cached cloned materials
//         const cached = materialCacheByUrl.get(url);
//         let i = 0;
//         scene.traverse((child) => {
//           if (child.isMesh && cached[i]) {
//             child.material = cached[i];
//             i++;
//           }
//         });
//         materialsRef.current = cached;
//         return;
//       }

//       const mats = [];
//       scene.traverse((child) => {
//         if (child.isMesh) {
//           const cloned = Array.isArray(child.material)
//             ? child.material.map((m) => {
//                 const c = m.clone();
//                 c.transparent = true;
//                 c.depthWrite = true;
//                 mats.push(c);
//                 return c;
//               })
//             : (() => {
//                 const c = child.material.clone();
//                 c.transparent = true;
//                 c.depthWrite = true;
//                 mats.push(c);
//                 child.material = c;
//                 return c;
//               })();
//           if (Array.isArray(cloned)) child.material = cloned;
//         }
//       });
//       materialCacheByUrl.set(url, mats);
//       materialsRef.current = mats;
//     },
//     [url],
//   );

//   return (
//     <primitive
//       ref={modelRef}
//       object={scene}
//       dispose={null}
//       position={transform.position}
//       rotation={[transform.rotationX ?? 0, transform.rotationY, 0]}
//       scale={transform.scale}
//     />
//   );
// }

// function getTransform(idx) {
//   return CATEGORY_MODEL_TRANSFORMS[idx] || DEFAULT_TRANSFORM;
// }

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const CATEGORY_MODEL_URLS = [
  "/assets/models/engenir_model.glb",
  "/assets/models/medical_model1 (1).glb",
  "/assets/models/microsoft_model.glb",
  "/assets/models/security.glb",
  "/assets/models/ai_model.glb",
  "/assets/models/military.glb",
  "/assets/models/costimize_model_v02.glb",
];

const CATEGORY_MODEL_TRANSFORMS = {
  0: { position: [0.4, -1.5, 1.4], scale: 1.5, rotationY: -2.5 },
  1: { position: [3.5, -1.8, 0], scale: 2, rotationY: 0 },
  2: { position: [0, -2, -1], scale: 2, rotationY: -0.5 },
  3: {
    position: [-0.2, -0.2, 3],
    scale: 2,
    rotationY: Math.PI + 0.2,
    rotationX: 0.1,
  },
  4: { position: [0, -1.4, 3.5], scale: 1.0, rotationY: -2.5 },
  5: { position: [0, -1, 2], scale: 2, rotationY: -0.4 },
  6: { position: [0.1, -1.5, 1.2], scale: 2, rotationY: -0.8 },
};

const DEFAULT_TRANSFORM = { position: [0, -4, -2], scale: 2.0, rotationY: 0 };

const TRANSITION_DURATION = 0.35;
const SLIDE_OUT_Z = -4;
const SLIDE_IN_Z = 3;
const SLIDE_OUT_X = -1.5;
const SLIDE_IN_X = 1.5;
const CAT_TILT_LERP_SPEED = 4;

function easeInCubic(t) {
  return t * t * t;
}
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Module-level cache — persists across mounts/unmounts
const materialCacheByUrl = new Map();

export function MobileModelSwapper({ activeCategoryIdx, tiltTarget }) {
  const [slots, setSlots] = useState([]);
  const slotKeyCounter = useRef(0);
  const transitionProgress = useRef(0);
  const isTransitioning = useRef(false);
  const pendingTarget = useRef(null);

  useEffect(() => {
    const target = activeCategoryIdx;

    if (target < 0 && slots.length === 0) return;

    if (target >= 0 && !CATEGORY_MODEL_URLS[target]) {
      setSlots((prev) => prev.map((s) => ({ ...s, role: "leaving" })));
      isTransitioning.current = true;
      transitionProgress.current = 0;
      return;
    }

    if (isTransitioning.current) {
      pendingTarget.current = target;
      return;
    }

    const activeSlot = slots.find(
      (s) => s.role === "active" || s.role === "entering",
    );

    if (activeSlot && activeSlot.idx === target) return;

    if (target < 0) {
      setSlots((prev) => prev.map((s) => ({ ...s, role: "leaving" })));
      isTransitioning.current = true;
      transitionProgress.current = 0;
      return;
    }

    if (!activeSlot || activeSlot.idx < 0) {
      const key = ++slotKeyCounter.current;
      setSlots([{ idx: target, role: "entering", key }]);
      isTransitioning.current = true;
      transitionProgress.current = 0;
    } else {
      const key = ++slotKeyCounter.current;
      setSlots((prev) => [
        ...prev
          .filter((s) => s.role === "active" || s.role === "entering")
          .map((s) => ({ ...s, role: "leaving" })),
        { idx: target, role: "entering", key },
      ]);
      isTransitioning.current = true;
      transitionProgress.current = 0;
    }
  }, [activeCategoryIdx]);

  useFrame((_, delta) => {
    if (!isTransitioning.current) return;

    transitionProgress.current += delta / TRANSITION_DURATION;

    if (transitionProgress.current >= 1) {
      transitionProgress.current = 1;
      isTransitioning.current = false;

      setSlots((prev) => {
        const next = prev
          .filter((s) => s.role !== "leaving")
          .map((s) => (s.role === "entering" ? { ...s, role: "active" } : s));
        return next;
      });

      if (pendingTarget.current !== null) {
        const queued = pendingTarget.current;
        pendingTarget.current = null;
        setTimeout(() => {}, 0);
      }
    }
  });

  useEffect(() => {
    if (
      !isTransitioning.current &&
      pendingTarget.current !== null &&
      pendingTarget.current !== activeCategoryIdx
    ) {
    }
  }, [slots]);

  return (
    <>
      {slots.map((slot) => {
        const url = CATEGORY_MODEL_URLS[slot.idx];
        if (!url) return null;
        return (
          <SlotWrapper
            key={slot.key}
            slot={slot}
            url={url}
            transitionProgress={transitionProgress}
            isTransitioning={isTransitioning}
            tiltTarget={tiltTarget}
          />
        );
      })}
    </>
  );
}

function SlotWrapper({
  slot,
  url,
  transitionProgress,
  isTransitioning,
  tiltTarget,
}) {
  const groupRef = useRef();
  const materialsRef = useRef([]);
  const transform = getTransform(slot.idx);

  // Material cache-aware onModelReady — lives here in SlotWrapper
  const onModelReady = useCallback(
    (scene) => {
      if (materialCacheByUrl.has(url)) {
        const cached = materialCacheByUrl.get(url);
        let i = 0;
        scene.traverse((child) => {
          if (child.isMesh && cached[i]) {
            child.material = cached[i];
            i++;
          }
        });
        materialsRef.current = cached;
        return;
      }

      const mats = [];
      scene.traverse((child) => {
        if (child.isMesh) {
          if (Array.isArray(child.material)) {
            child.material = child.material.map((m) => {
              const c = m.clone();
              c.transparent = true;
              c.depthWrite = true;
              mats.push(c);
              return c;
            });
          } else {
            const c = child.material.clone();
            c.transparent = true;
            c.depthWrite = true;
            child.material = c;
            mats.push(c);
          }
        }
      });
      materialCacheByUrl.set(url, mats);
      materialsRef.current = mats;
    },
    [url],
  );

  useFrame(() => {
    if (!groupRef.current) return;

    const t = transitionProgress.current;

    if (slot.role === "entering") {
      const eased = easeOutCubic(t);
      groupRef.current.position.set(
        SLIDE_IN_X * (1 - eased),
        0,
        SLIDE_IN_Z * (1 - eased),
      );
      groupRef.current.scale.setScalar(eased);
      materialsRef.current.forEach((m) => {
        m.opacity = eased;
        m.depthWrite = eased > 0.5;
      });
    } else if (slot.role === "leaving") {
      const eased = easeInCubic(t);
      groupRef.current.position.set(
        SLIDE_OUT_X * eased,
        0,
        SLIDE_OUT_Z * eased,
      );
      groupRef.current.scale.setScalar(1 - eased * 0.3);
      const opacity = 1 - eased;
      materialsRef.current.forEach((m) => {
        m.opacity = opacity;
        m.depthWrite = opacity > 0.5;
      });
    } else if (slot.role === "active") {
      groupRef.current.position.set(0, 0, 0);
      groupRef.current.scale.setScalar(1);
      materialsRef.current.forEach((m) => {
        m.opacity = 1;
        m.depthWrite = true;
      });
    }
  });

  return (
    <group ref={groupRef}>
      <CategoryModel
        url={url}
        categoryIdx={slot.idx}
        tiltTarget={tiltTarget}
        onModelReady={onModelReady}
      />
    </group>
  );
}

function CategoryModel({ url, categoryIdx, tiltTarget, onModelReady }) {
  const { scene, animations } = useGLTF(url);
  const modelRef = useRef();
  const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);
  const currentOffset = useRef({ x: 0, y: 0 });
  const transform = getTransform(categoryIdx);

  useEffect(() => {
    if (scene && onModelReady) {
      onModelReady(scene);
    }
  }, [scene, onModelReady]);

  useEffect(() => {
    if (!mixer || !animations?.length) return;
    animations.forEach((clip) => mixer.clipAction(clip).play());
    return () => mixer.stopAllAction();
  }, [animations, mixer]);

  useFrame((_, delta) => {
    mixer?.update(delta);

    if (modelRef.current && tiltTarget?.current) {
      const target = tiltTarget.current;
      const lerpSpeed = 1 - Math.exp(-CAT_TILT_LERP_SPEED * delta);

      currentOffset.current.x +=
        (target.x - currentOffset.current.x) * lerpSpeed;
      currentOffset.current.y +=
        (target.y - currentOffset.current.y) * lerpSpeed;

      modelRef.current.rotation.x =
        (transform.rotationX ?? 0) + currentOffset.current.x;
      modelRef.current.rotation.y =
        transform.rotationY + currentOffset.current.y;
    }
  });

  // No disposal cleanup — models stay cached for instant re-swap

  return (
    <primitive
      ref={modelRef}
      object={scene}
      dispose={null}
      position={transform.position}
      rotation={[transform.rotationX ?? 0, transform.rotationY, 0]}
      scale={transform.scale}
    />
  );
}

function getTransform(idx) {
  return CATEGORY_MODEL_TRANSFORMS[idx] || DEFAULT_TRANSFORM;
}
