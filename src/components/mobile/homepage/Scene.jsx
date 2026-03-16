import { useGLTF, useProgress, Sparkles } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState, useRef } from "react";
import { useAppContext } from "../../../context/appContext";
import { Camera } from "../../desktop/homepage/scene/Camera";
import { useDeviceTilt } from "./useDeviceTilt"; // ← the new hook
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
const TILT_LERP_SPEED = 4;

/* ─── Scroll-driven recession config ─── */
const SCROLL_Z_MIN = -0.5;
const SCROLL_Z_MAX = 0;
const SCROLL_SCALE_MIN = 1;
const SCROLL_SCALE_MAX = 1;
const SCROLL_Y_OFFSET = 0.2;
const MAX_RECESSION = 0.4;

export function SceneMobile({
  astroRef,
  selectedCategory,
  selectedCategoryItemByIdx,
  categoryIdxRef,
}) {
  const scrollProgress = useRef(0);
  const canvasContainerRef = useRef(null);

  // ── Use the robust tilt hook ──
  const { tiltTarget, requestTilt, tiltStatus } = useDeviceTilt();

  /* ── Track scroll progress ── */
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

  const canvasBgImage =
    selectedCategoryItemByIdx >= 0
      ? hsTextBgs[selectedCategoryItemByIdx] || ""
      : "";

  // Derive container opacity + z-index from scroll progress (no re-renders)
  useEffect(() => {
    let raf;
    let prevZ = 2;
    const update = () => {
      if (canvasContainerRef.current) {
        const p = scrollProgress.current;
        const opacity = 1 - p * 0.7;
        canvasContainerRef.current.style.opacity = opacity;

        const newZ = p < 0.05 ? 2 : 0;
        if (newZ !== prevZ) {
          canvasContainerRef.current.style.zIndex = newZ;
          prevZ = newZ;
        }
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

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
        zIndex: 2,
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
        style={{ backgroundImage: canvasBgImage, pointerEvents: "auto" }}
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
            scrollProgress={scrollProgress}
          />
        </Suspense>
      </Canvas>

      {/* ── Tilt permission prompt (iOS only, shown when denied or idle) ── */}
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

/* ─── Astronaut model ─── */

const ORIGINAL_Y = -5;
const ORIGINAL_Z = -0.5;

export function AstroModel({ url, astroRef, tiltTarget, scrollProgress }) {
  const { isAstroModelDrawn, setIsAstroModelDrawn } = useAppContext();
  const { scene, animations } = useGLTF(url);
  const mixer = useGLTFAnimations(scene, animations);
  const { active } = useProgress();

  const isFullyRenderedRef = useRef(false);
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

    ref.rotation.x = BASE_ROT_X + currentOffset.current.x;
    ref.rotation.y = BASE_ROT_Y + currentOffset.current.y;

    // ── Scroll-driven recession ──
    const pRaw = scrollProgress.current;
    const p = Math.min(pRaw, MAX_RECESSION) / MAX_RECESSION;

    const z = THREE.MathUtils.lerp(ORIGINAL_Z, SCROLL_Z_MAX, p);
    ref.position.z = z;

    ref.position.y = ORIGINAL_Y + p * SCROLL_Y_OFFSET;

    const s = THREE.MathUtils.lerp(SCROLL_SCALE_MIN, SCROLL_SCALE_MAX, p);
    ref.scale.setScalar(s);
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
