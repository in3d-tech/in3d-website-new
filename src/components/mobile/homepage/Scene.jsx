import { useGLTF, Sparkles } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { useAppContext } from "../../../context/appContext";
import { Camera } from "../../desktop/homepage/scene/Camera";
import { useDeviceTilt } from "./useDeviceTilt";
import { MobileModelSwapper } from "./MobileModelSwapper";
import * as THREE from "three";

/* ─── Constants ─── */
const BASE_ROT_X = 0.54;
const BASE_ROT_Y = Math.PI - 0.35;
const TILT_LERP_SPEED = 4;
const SCROLL_Z_MAX = 0;
const SCROLL_Y_OFFSET = 0.2;
const MAX_RECESSION = 0.4;
const ORIGINAL_Y = -5;
const ORIGINAL_Z = -0.5;

const SPARKLE_COLORS = {
  [-1]: "pink",
  0: "#1D9E75",
  1: "#D4537E",
  2: "#378ADD",
  3: "#E24B4A",
  4: "#7F77DD",
  5: "#888780",
  6: "#BA7517",
};

export function SceneMobile({
  astroRef,
  selectedCategory,
  selectedCategoryItemByIdx,
  activeCategoryIdx,
}) {
  const scrollProgress = useRef(0);
  const canvasContainerRef = useRef(null);
  const { tiltTarget, requestTilt, tiltStatus } = useDeviceTilt();

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.6;
      const scrollY = window.scrollY || window.pageYOffset;
      const progress = Math.min(1, Math.max(0, scrollY / scrollThreshold));
      scrollProgress.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showAstro = activeCategoryIdx < 0;

  useEffect(() => {
    let raf;
    const update = () => {
      if (canvasContainerRef.current) {
        if (activeCategoryIdx >= 0) {
          canvasContainerRef.current.style.opacity = "1";
          canvasContainerRef.current.style.zIndex = "1";
        } else {
          const p = scrollProgress.current;
          canvasContainerRef.current.style.opacity = String(1 - p * 0.7);
          canvasContainerRef.current.style.zIndex = p < 0.05 ? "2" : "0";
        }
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [activeCategoryIdx]);

  const sparkleColor = SPARKLE_COLORS[activeCategoryIdx] || "pink";

  return (
    <div
      ref={canvasContainerRef}
      className="canvas-container-mobile"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: true,
        }}
        style={{ pointerEvents: "auto" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight intensity={3} />
        <Camera />
        <Sparkles count={200} scale={10} size={2} color={sparkleColor} />

        <Suspense fallback={null}>
          <AstroModel
            url="/assets/models/astronaut_new5 (3).glb"
            astroRef={astroRef}
            tiltTarget={tiltTarget}
            scrollProgress={scrollProgress}
            visible={showAstro}
          />
          <MobileModelSwapper activeCategoryIdx={activeCategoryIdx} />
        </Suspense>
      </Canvas>

      {(tiltStatus === "denied" || tiltStatus === "idle") && (
        <button
          onClick={requestTilt}
          style={{
            position: "absolute",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            pointerEvents: "auto",
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 20,
            color: "#fff",
            padding: "8px 18px",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            zIndex: 10,
            opacity: 0.85,
            transition: "opacity 0.3s",
          }}
        >
          Tap to enable tilt
        </button>
      )}
    </div>
  );
}

/* ─── Astronaut model ───
 *
 * KEY FIX: Removed `useProgress` from this component.
 * `useProgress` is a shared global hook from drei — when CategoryModel
 * mounts and loads a new GLTF, useProgress updates its state, which
 * triggers a re-render in every component using it. If that re-render
 * happens during React's render phase of CategoryModel, React throws
 * "Cannot update a component while rendering a different component".
 *
 * Instead, we detect readiness by checking scene.children visibility
 * directly in useFrame, with no dependency on useProgress.
 */
export function AstroModel({
  url,
  astroRef,
  tiltTarget,
  scrollProgress,
  visible = true,
}) {
  const { isAstroModelDrawn, setIsAstroModelDrawn } = useAppContext();
  const { scene, animations } = useGLTF(url);
  const mixer = useGLTFAnimations(scene, animations);

  const isFullyRenderedRef = useRef(false);
  const currentOffset = useRef({ x: 0, y: 0 });
  const visibilityScale = useRef(1);
  const frameCount = useRef(0);

  useFrame((_, delta) => {
    if (!astroRef.current) return;
    const ref = astroRef.current;

    // Model-ready detection — wait a few frames for GPU upload, then check
    // No useProgress dependency!
    if (!isFullyRenderedRef.current && scene) {
      frameCount.current++;
      // Give it ~30 frames (~0.5s at 60fps) for the GPU to upload buffers
      if (frameCount.current > 30) {
        const fullyRendered = scene.children.every((child) => child.visible);
        if (fullyRendered && !isAstroModelDrawn) {
          isFullyRenderedRef.current = true;
          // Defer the setState to be safe
          setTimeout(() => setIsAstroModelDrawn(true), 100);
        }
      }
    }

    // Smooth visibility transition
    const targetVis = visible ? 1 : 0;
    const lerpSpeed = 1 - Math.exp(-6 * delta);
    visibilityScale.current +=
      (targetVis - visibilityScale.current) * lerpSpeed;

    const vis = visibilityScale.current;
    ref.scale.setScalar(Math.max(vis, 0.001));

    if (vis < 0.01) return;

    // Smooth tilt
    const target = tiltTarget.current;
    const tiltLerp = 1 - Math.exp(-TILT_LERP_SPEED * delta);

    currentOffset.current.x += (target.x - currentOffset.current.x) * tiltLerp;
    currentOffset.current.y += (target.y - currentOffset.current.y) * tiltLerp;

    ref.rotation.x = BASE_ROT_X + currentOffset.current.x;
    ref.rotation.y = BASE_ROT_Y + currentOffset.current.y;

    // Scroll-driven recession
    const pRaw = scrollProgress.current;
    const p = Math.min(pRaw, MAX_RECESSION) / MAX_RECESSION;

    ref.position.z = THREE.MathUtils.lerp(ORIGINAL_Z, SCROLL_Z_MAX, p);
    ref.position.y = ORIGINAL_Y + p * SCROLL_Y_OFFSET;
  });

  return (
    <group>
      <primitive
        ref={astroRef}
        object={scene}
        dispose={null}
        scale={[1, 1, 1]}
        position={[-3.75, ORIGINAL_Y, ORIGINAL_Z]}
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
