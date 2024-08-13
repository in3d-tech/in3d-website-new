import { useGLTF, useProgress } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useAppContext } from "../../context/appContext";
import { useGLTFAnimations, useGLTFAnimationsOnce } from "./ModelComponent";
import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";
// import { getSparkleColour } from "./ornaments/getSparkleColour";
// ---------------------- All other models ----------------------------

const headlines = {
  0: {
    url: "/assets/models/fonts/industry-thin.glb",
    scale: [7, 7, 7],
    position: [0, 1.5, 0],
    rotation: [0.2, 0, 0],
  },
  1: {
    url: "/assets/models/fonts/medicine-thin.glb",
    scale: [15, 15, 15],
    position: [0, 3, -4],
    rotation: [0.2, 0, 0],
  },
  2: {
    url: "/assets/models/fonts/microsoft -thin.glb",
    scale: [9.5, 9.5, 9.5],
    position: [-0.7, 1, -2],
    rotation: [0.1, 0, 0],
  },
  3: {
    url: "/assets/models/fonts/text_security.glb",
    scale: [1.1, 1.1, 1.1],
    position: [0.5, -0.39, 4],
    rotation: [-0.01, -0.03, 0],
  },
  4: {
    url: "/assets/models/fonts/ai-thin.glb",
    scale: [7, 7, 7],
    position: [-1, 1, -2],
    rotation: [0, 0.12, -0],
  },
  5: {
    url: "/assets/models/fonts/military-thin.glb",
    scale: [12, 12, 12],
    position: [1.2, 2, -2],
    rotation: [0.2, 0, 0],
  },
  6: {
    url: "/assets/models/fonts/customization-thin.glb",
    scale: [6, 6, 6],
    position: [-2.3, 2, 0],
    rotation: [0.1, 0, 0],
  },
};

function MappedModels({
  idx,
  currentRef,
  prevRef,
  visibleModels,
  setVisibleModels,
  model,
  allModelPositions,
  testShadowsRef,
}) {
  // const [textAnimationPlayed, setTextAnimationPlayed] = useState(false);

  if (idx == 7) return null;

  const {
    isInstantScroll,
    scrollArea,
    setScrollArea,
    setModelAnimationIsHalfWay,
    setCustomizeHasRendered,
    isAstroModelDrawn,
  } = useAppContext();

  // if (!isAstroModelDrawn) return null;

  const { scene, animations } = useGLTF(model.url);
  const mixer = useGLTFAnimations(scene, animations);
  const { active } = useProgress();
  const industryModel = 0;

  let scene2;
  let animations2;
  let mixer2;

  const textTitleRef = useRef();
  const modelTextRef = useRef(null);
  const isCustomizedRendered = useRef(false);

  if (true) {
    // console.log(model);
    const { scene: testScene, animations: testAnimations } = useGLTF(
      headlines[idx].url
    );
    scene2 = testScene;

    animations2 = testAnimations;
    mixer2 = useGLTFAnimationsOnce(scene2, animations2);
    scene2.traverse((child) => {
      if (child.isMesh) {
        // child.material = new THREE.MeshStandardMaterial({
        //   // color: getSparkleColour(scrollArea.currentSection),
        // });
      }
    });
  }

  useFrame(() => {
    if (idx == 0 && !isCustomizedRendered.current) {
      // Check if the object is visible in the scene and loaded - not working
      // isCustomizedRendered.current = true;
      // setCustomizeHasRendered(true);
      // if (currentRef.current && scene) {
      //   // Check if all objects in the scene have been rendered - not working
      //   const fullyRendered = scene.children.every((child) => child.visible);
      //   if (fullyRendered && active === false && scene) {
      //     // Object is fully rendered
      //     isCustomizedRendered.current = true;
      //     setCustomizeHasRendered(true);
      //     // setTimeout(() => setIsAstroModelDrawn(true), 1000);
      //     console.log("industry object is fully rendered!");
      //   }
      // }
    }
  });

  useEffect(() => {
    let timeline = gsap.timeline({
      defaults: { ease: "power1.out" },

      scrollTrigger: {
        trigger: `.${model.section}`,
        start: "top bottom",
        endTrigger: `.${model.section}`,
        end: "top top",
        scrub: 1,
        // markers: true,
        preventOverlaps: isInstantScroll ? true : false,
        // fastScrollEnd: true, // 2500 is default,
        onEnter: () => {
          setVisibleModels([idx - 1, idx]);
          const areaObj = { ...scrollArea };
          areaObj.currentSection = model.onEnter.currentSection;
          areaObj.prevSection = model.onEnter.prevSection;
          setScrollArea(areaObj);
        },
        onLeaveBack: () => {
          setVisibleModels(idx == industryModel ? [] : [idx, idx - 1]);
          const areaObj = { ...scrollArea };
          areaObj.currentSection = model.onLeave.currentSection;
          areaObj.prevSection = model.onLeave.prevSection;
          setScrollArea(areaObj);
        },
      },
    });

    let halfwayReachedForward = false;
    let halfwayReachedBack = true;

    model.timeline(timeline, currentRef, prevRef, textTitleRef);

    // timeline.eventCallback("onUpdate", () => {
    //   // Calculate the current progress of the animation
    //   const currentProgress = timeline.progress();
    //   // console.log({ currentProgress });

    //   // Check if the halfway point has not been reached and if we are past halfway
    //   if (!halfwayReachedForward && currentProgress >= 0.5) {
    //     // Set the flag to true to indicate that halfway point has been reached
    //     halfwayReachedForward = true;

    //     // Call your function to set state or perform any other action
    //     handleHalfwayPoint();
    //   }
    // });

    // this second trigger is for timing the text animation with the model movement
    gsap.to(`.${model.section}`, {
      scrollTrigger: {
        trigger: `.${model.section}`,
        start: "top 50%",
        scrub: 1,
        // markers: true,

        onEnter: () => {
          setModelAnimationIsHalfWay(idx + 3); // (+ 1 because only starts effect scrollSection 1)
        },
      },
    });

    return () => {
      timeline.kill();
    };
  }, [currentRef, isInstantScroll]);

  function handleHalfwayPoint() {
    // console.log("Halfway point reached!");
  }

  return (
    <group key={`test${idx}`}>
      <group>
        {/* <spotLight
          position={[0, 8, 9]}
          intensity={4}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={20}
        /> */}
        <primitive
          ref={textTitleRef} //{testShadowsRef}
          object={scene2}
          dispose={null}
          scale={headlines[idx].scale}
          visible={scrollArea.currentSection === idx + 3 ? true : false}
          position={model.textPosition} //{headlines[idx].position}
          rotation={model.textRotation} //{headlines[idx].rotation}
          // color="black"
          // castShadow
        ></primitive>
      </group>

      <primitive
        ref={currentRef}
        object={scene}
        dispose={null}
        scale={model.scale}
        position={model.position}
        visible={visibleModels.includes(idx)}
        rotation={model.rotation}
      >
        {/* <Html position={[-0.6, 1.3, 0]} transform> //Medicine */}
        {/* {idx == 3 ? (
          <Html
            position={[-12, 6, 30]}
            rotation={[0.01, Math.PI - 1.2, 0]}
            transform
          >
            <div
              className="annotation"
              // style={{ color: "white", fontSize: "1px" }}
            >
              Apple Vision Pro
            </div>
          </Html>
        ) : null} */}
      </primitive>
    </group>
  );
}

export default MappedModels;
