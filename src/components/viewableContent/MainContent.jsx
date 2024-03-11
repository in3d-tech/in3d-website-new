import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Box, OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { animate, useMotionValue } from "framer-motion";
import { framerMotionConfig } from "../../config";
import { useControls } from "leva";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const sections = {
  0: "hero",
  1: "microsoft",
  2: "military",
  3: "industry",
  4: "medicine",
  5: "security",
  6: "artificalIntelligence",
  7: "customization",
};

const titles = [
  "ARTIFICAL INTELLIGENCE",

  "MEDICINE",
  "MILITARY",
  "MICROSOFT",
  "INDUSTRY",
  "SECURITY",
  "CUSTOMIZATION",
];
// /     ? "/assets/models/microsoft_large.glb"
//     : "/assets/models/engener (1).glb"
const Models = [
  { title: "hero", url: "/assets/models/engener (1).glb" },
  { title: "microsoft", url: "/assets/models/microsoft_large.glb" },
  { title: "military", url: "/assets/models/soldier_statue.glb" },
  { title: "industry", url: "/assets/models/microsoft_large.glb" },
  { title: "medicine", url: "/assets/models/medical_statue_8 (4).glb" },
  { title: "security", url: "/assets/models/microsoft_large.glb" },
  { title: "customization", url: "/assets/models/customize_large.glb" },
  { title: "ai", url: "/assets/models/ai_statue2.glb" },
];

const vec = new THREE.Vector3();

function Rig() {
  return useFrame(({ camera, pointer }) => {
    vec.set(pointer.x * 2, pointer.y * 2, camera.position.z);
    camera.position.lerp(vec, 0.025);
    camera.lookAt(0, 0, 0);
  });
}

ScrollTrigger.defaults({
  immediateRender: false,
  ease: "power1.inOut",
});

export function MainContent({
  menuOpened,
  scrollArea,
  text1Ref,
  text2Ref,
  sect2Ref,
  sect4Ref,
  boxRef,
}) {
  const { title } = useControls({
    title: {
      options: Models.map(({ title }) => title),
    },
  });
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // const boxRef = useRef();

  // useEffect(() => {
  //   function handleResize() {
  //     setSize({ width: window.innerWidth, height: window.innerHeight });
  //   }
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <div className="main-content-divider">
      <div
        style={{
          flex: 1,
          marginTop: "8em",
          border: "1px solid cyan",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="main-content-title">
          <div>
            <h1
              style={{
                color: "white",
                fontFamily: "gotham-bold",
                fontSize: "4.5em",
              }}
            >
              {/* <WavyText scrollArea={scrollArea} /> */}
            </h1>
          </div>
          {menuOpened ? null : (
            <div
              style={{
                border: "1px solid yellow",
                height: "200%",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <div
                className="main-content-text-points"
                id="text-1"
                ref={text1Ref}
              >
                • הגדרת יחסים <br />• ארבעת סרטוני מייקרוסופט
              </div>
              <div
                className="main-content-text-points"
                id="text-2"
                ref={text2Ref}
              >
                • הגדרת יחסים <br />• ארבעת סרטוני מייקרוסופט
              </div>
            </div>
          )}
        </div>
        {/* <div style={{ color: "white" }}>youtube content</div> */}
      </div>
      <div style={{ flex: 1 }}></div>
      <div
        style={{
          zIndex: 50,
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      >
        <Canvas frameloop="always" shadows camera={{ fov: 42 }}>
          <ambientLight />

          {/* <directionalLight intensity={1} lookAt={[0, 0, 0]} /> */}
          {/* <OrbitControls /> */}
          <Suspense fallback={null}>
            <ModelComponent
              menuOpened={menuOpened}
              scrollArea={scrollArea}
              url={Models[Models.findIndex((m) => m.title === title)].url}
            />
            {/* <BoxComponent
              boxRef={boxRef}
              sect2Ref={sect2Ref}
              sect4Ref={sect4Ref}
            /> */}
          </Suspense>
          {/* <Preload all /> */}
          {/* <Rig /> */}
        </Canvas>
      </div>
    </div>
  );
}

export function handleModelChange(url) {}

function ModelComponent({ menuOpened, scrollArea, url }) {
  const group = useRef();

  const { scene, animations } = useGLTF(url);
  const mixer = useGLTFAnimations(scene, animations);

  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -1 : 0, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 5 : 0, {
      ...framerMotionConfig,
    });

    console.log({ menuOpened });
  }, [menuOpened]);

  useFrame((state) => {
    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);
  });

  if (url == "/assets/models/latest-astro.glb") {
    scene.traverse((child) => {
      if (child.isMesh) console.log("heloo world!");
      // if (child.material) child.material.wireframe = true;
    });
  }

  return (
    // <group>
    <primitive
      ref={group}
      object={scene}
      dispose={null}
      scale={[2, 2, 2]}
      position={[-8, -11, -3]}
      // position={[1.1, -3.2, 0.2]}
      // rotation={[0, -0.5, 0]}
      rotation={[0, Math.PI, 0]}
    />
    // </group>
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

function WavyText({ scrollArea }) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(titles[scrollArea.currentSection]);
  }, [scrollArea.currentSection]);

  return (
    <div className="waviy">
      {text &&
        text.length &&
        [...text].map((char, index) => (
          <span key={index} style={{ "--i": index + 1 }}>
            {char}
          </span>
        ))}
    </div>
  );
}
