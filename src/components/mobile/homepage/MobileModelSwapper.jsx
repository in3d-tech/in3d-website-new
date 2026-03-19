import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

/**
 * Correct model URLs from Model_Data.
 */
const CATEGORY_MODEL_URLS = [
  "/assets/models/engenir_model.glb", // 0: Industry
  "/assets/models/medical_model1 (1).glb", // 1: Medicine
  "/assets/models/microsoft_model.glb", // 2: Microsoft
  "/assets/models/security.glb", // 3: Security
  "/assets/models/ai_model.glb", // 4: AI
  "/assets/models/military.glb", // 5: Military
  "/assets/models/costimize_model_v02.glb", // 6: Customization
];

// const CATEGORY_MODEL_TRANSFORMS = {
//   0: { position: [0, -3.75, 1.5], scale: 2.5, rotationY: Math.PI + 0.3 },
//   1: { position: [0, -3, -1], scale: 2.5, rotationY: 0 },
//   2: { position: [0, -4, -0.2], scale: 2.5, rotationY: -0.9 },
//   3: { position: [0, -0.5, 3.2], scale: 2.5, rotationY: Math.PI + 1.3 },
//   4: { position: [0, -1.6, 4.2], scale: 1.0, rotationY: -3 },
//   5: { position: [0, -1.2, 2.8], scale: 1.8, rotationY: 1 },
//   6: { position: [0, -3, 3], scale: 2.5, rotationY: -2.2 },
// };

const CATEGORY_MODEL_TRANSFORMS = {
  0: { position: [0, -1.5, -1], scale: 1.5, rotationY: 0 }, //ind
  1: { position: [3.5, -1.8, -3], scale: 2, rotationY: 0 }, // med
  2: { position: [0, -2, -3], scale: 2, rotationY: 0 }, // microso
  3: {
    position: [-0.1, -0.2, 0.5],
    scale: 2,
    rotationY: Math.PI,
    rotationX: 0.1,
  }, // security
  4: { position: [0, -1.4, 3.5], scale: 1.0, rotationY: -2.5 }, // ai
  5: { position: [-0.2, -1, 0], scale: 1.8, rotationY: 1 }, // military
  6: { position: [0.1, -2, -1], scale: 2, rotationY: -0.4 }, // custom
};

const DEFAULT_TRANSFORM = { position: [0, -4, -2], scale: 2.0, rotationY: 0 };

const TRANSITION_DURATION = 0.4;
const IDLE_ROTATE_SPEED = 0; // 0.15;

/**
 * MobileModelSwapper
 *
 * All state transitions are done via useEffect (never inside useFrame)
 * to avoid the "Cannot update component while rendering" error.
 */
export function MobileModelSwapper({ activeCategoryIdx, tiltTarget }) {
  // `displayIdx` is what's actually mounted in the scene right now
  const [displayIdx, setDisplayIdx] = useState(-1);
  const phase = useRef("idle");
  const progress = useRef(0);
  const groupRef = useRef();
  const targetRef = useRef(-1);

  // When the target changes, kick off transitions
  useEffect(() => {
    targetRef.current = activeCategoryIdx;

    if (activeCategoryIdx === displayIdx) {
      // Already showing the right thing
      phase.current = "idle";
      return;
    }

    if (displayIdx < 0 && activeCategoryIdx >= 0) {
      // Nothing loaded yet → mount directly and fade in
      setDisplayIdx(activeCategoryIdx);
      phase.current = "fading-in";
      progress.current = 0;
    } else if (activeCategoryIdx < 0 && displayIdx >= 0) {
      // Going back to astro → fade out then unmount
      phase.current = "fading-out-to-none";
      progress.current = 0;
    } else {
      // Swapping from one model to another → fade out first
      phase.current = "fading-out-to-swap";
      progress.current = 0;
    }
  }, [activeCategoryIdx]);
  // NOTE: intentionally NOT including displayIdx in deps —
  // we only want this to fire when the external target changes.

  // Animation loop
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const currentPhase = phase.current;
    const transform = getTransform(displayIdx >= 0 ? displayIdx : 0);

    if (
      currentPhase === "fading-out-to-swap" ||
      currentPhase === "fading-out-to-none"
    ) {
      progress.current += delta / TRANSITION_DURATION;
      const t = Math.min(progress.current, 1);
      const s = (1 - easeInCubic(t)) * transform.scale;
      groupRef.current.scale.setScalar(Math.max(s, 0.001));

      if (t >= 1) {
        // Mark as needing a swap — the actual setState happens in the
        // useEffect below that watches this flag
        phase.current =
          currentPhase === "fading-out-to-swap"
            ? "needs-swap"
            : "needs-unmount";
      }
    } else if (currentPhase === "fading-in") {
      progress.current += delta / TRANSITION_DURATION;
      const t = Math.min(progress.current, 1);
      const s = easeOutCubic(t) * transform.scale;
      groupRef.current.scale.setScalar(Math.max(s, 0.001));

      if (t >= 1) {
        groupRef.current.scale.setScalar(transform.scale);
        phase.current = "idle";
      }
    } else if (currentPhase === "idle" && displayIdx >= 0) {
      groupRef.current.rotation.y += IDLE_ROTATE_SPEED * delta;
    }
  });

  /**
   * Poll-based swap trigger.
   * We use a short interval to detect when useFrame has set phase to
   * "needs-swap" or "needs-unmount", then do the setState safely
   * outside of the render cycle.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      if (phase.current === "needs-swap") {
        phase.current = "_swapping";
        const next = targetRef.current;
        setDisplayIdx(next >= 0 ? next : -1);
        if (next >= 0) {
          // Will fade in once the new component mounts
          phase.current = "fading-in";
          progress.current = 0;
        } else {
          phase.current = "idle";
        }
      } else if (phase.current === "needs-unmount") {
        phase.current = "idle";
        setDisplayIdx(-1);
      }
    }, 30); // ~33fps check rate, plenty fast

    return () => clearInterval(interval);
  }, []);

  if (displayIdx < 0) return null;

  const url = CATEGORY_MODEL_URLS[displayIdx];
  if (!url) return null;

  return (
    <group ref={groupRef} scale={0.001}>
      <CategoryModel
        key={displayIdx}
        url={url}
        categoryIdx={displayIdx}
        tiltTarget={tiltTarget}
      />
    </group>
  );
}

// Add these constants at the top of the file (after imports),
// matching the values in Scene.jsx:
const CAT_TILT_LERP_SPEED = 4;

// ─── CategoryModel — updated to accept tiltTarget ───
function CategoryModel({ url, categoryIdx, tiltTarget }) {
  const { scene, animations } = useGLTF(url);
  const modelRef = useRef();
  const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);
  const currentOffset = useRef({ x: 0, y: 0 }); // ← add this

  const transform = getTransform(categoryIdx);

  useEffect(() => {
    if (!mixer || !animations?.length) return;
    animations.forEach((clip) => mixer.clipAction(clip).play());
    return () => mixer.stopAllAction();
  }, [animations, mixer]);

  useFrame((_, delta) => {
    mixer?.update(delta);

    // ── Tilt logic (mirrors AstroModel) ──
    if (modelRef.current && tiltTarget?.current) {
      const target = tiltTarget.current;
      const lerpSpeed = 1 - Math.exp(-CAT_TILT_LERP_SPEED * delta);

      currentOffset.current.x +=
        (target.x - currentOffset.current.x) * lerpSpeed;
      currentOffset.current.y +=
        (target.y - currentOffset.current.y) * lerpSpeed;

      // Apply tilt on top of the base rotation from transform
      modelRef.current.rotation.x =
        (transform.rotationX ?? 0) + currentOffset.current.x;
      modelRef.current.rotation.y =
        transform.rotationY + currentOffset.current.y;
    }
  });

  useEffect(() => {
    return () => {
      scene?.traverse((child) => {
        if (child.isMesh) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material?.dispose();
          }
        }
      });
      useGLTF.clear(url);
    };
  }, [scene, url]);

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

function easeInCubic(t) {
  return t * t * t;
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
