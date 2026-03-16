import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useAppContext } from "../../../../context/appContext";
import { useGLTFAnimations, useGLTFAnimationsOnce } from "./ModelComponent";
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
  // allModelPositions,
  // testShadowsRef,
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

  // Initialize models as hidden so they don't block the screen
  useEffect(() => {
    if (currentRef.current) {
      currentRef.current.visible = false;
    }
  }, [currentRef]);

  const { scene, animations } = useGLTF(model.url);
  const mixer = useGLTFAnimations(scene, animations, currentRef);
  // const { active } = useProgress();
  const industryModel = 0;

  let scene2;
  let animations2;
  let mixer2;

  const textTitleRef = useRef();
  // const modelTextRef = useRef(null);
  const isCustomizedRendered = useRef(false);
  const isHovered = useRef(false);
  const hoverTween = useRef(null);
  const restingPos = useRef(null);
  const restingRot = useRef(null);

  // The hover target — right side of the scene
  const MILITARY_HOVER_POS = { x: 5, y: -1.2, z: 2.8 };
  const MILITARY_HOVER_ROT = { y: 2.5 };

  const handlePointerOver = () => {
    // Only allow hover interaction when this model is the "current" one on screen
    if (idx !== 5) return;
    if (scrollArea.currentSection !== 8) return;
    if (isHovered.current) return;
    if (!currentRef.current) return;

    isHovered.current = true;

    // Snapshot the current GSAP-driven position/rotation as our "home"
    restingPos.current = {
      x: currentRef.current.position.x,
      y: currentRef.current.position.y,
      z: currentRef.current.position.z,
    };
    restingRot.current = {
      x: currentRef.current.rotation.x,
      y: currentRef.current.rotation.y,
      z: currentRef.current.rotation.z,
    };

    // Kill any in-progress hover tween
    if (hoverTween.current) hoverTween.current.kill();

    hoverTween.current = gsap
      .timeline()
      .to(
        currentRef.current.position,
        {
          x: MILITARY_HOVER_POS.x,
          y: MILITARY_HOVER_POS.y,
          z: MILITARY_HOVER_POS.z,
          duration: 1.8,
          ease: "power2.inOut",
        },
        "go",
      )
      .to(
        currentRef.current.rotation,
        {
          y: MILITARY_HOVER_ROT.y,
          duration: 1.8,
          ease: "power2.inOut",
        },
        "go",
      );
  };

  const handlePointerOut = () => {
    if (idx !== 5) return;
    if (!isHovered.current) return;
    if (!restingPos.current) return;

    isHovered.current = false;

    if (hoverTween.current) hoverTween.current.kill();

    hoverTween.current = gsap
      .timeline()
      .to(
        currentRef.current.position,
        {
          x: restingPos.current.x,
          y: restingPos.current.y,
          z: restingPos.current.z,
          duration: 1.8,
          ease: "power2.inOut",
        },
        "back",
      )
      .to(
        currentRef.current.rotation,
        {
          x: restingRot.current.x,
          y: restingRot.current.y,
          z: restingRot.current.z,
          duration: 1.8,
          ease: "power2.inOut",
        },
        "back",
      );
  };

  // Clean up on unmount or if user scrolls away while hovered
  useEffect(() => {
    if (idx !== 5) return;
    // If user scrolls away from section 8 while hovered, snap back
    if (scrollArea.currentSection !== 8 && isHovered.current) {
      isHovered.current = false;
      if (hoverTween.current) hoverTween.current.kill();
      // The scroll GSAP timeline will take over position naturally
    }
  }, [scrollArea.currentSection]);

  if (true) {
    // console.log(model);
    const { scene: testScene, animations: testAnimations } = useGLTF(
      headlines[idx].url,
    );
    scene2 = testScene;

    animations2 = testAnimations;
    mixer2 = useGLTFAnimationsOnce(scene2, animations2, currentRef);
    scene2.traverse((child) => {
      if (child.isMesh) {
        // child.material = new THREE.MeshStandardMaterial({
        //   // color: getSparkleColour(scrollArea.currentSection),
        // });
      }
    });
  }

  useEffect(() => {
    let timeline = gsap.timeline({
      // defaults: { ease: "power1.out" },
      defaults: { ease: "none" },

      scrollTrigger: {
        trigger: `.${model.section}`,
        start: "top bottom",
        endTrigger: `.${model.section}`,
        end: "top top",
        scrub: 1.0,
        // snap: {
        //   snapTo: [0, 1],
        //   duration: { min: 0.2, max: 0.8 }, // How long the magnetic pull takes
        //   delay: 0.1, // Wait 100ms after the user's scroll wheel stops
        //   ease: "power1.inOut",
        // },
        // markers: true,
        // preventOverlaps: isInstantScroll ? true : false,

        onEnter: () => {
          // DIRECT MUTATION: Replaces setVisibleModels([idx - 1, idx])
          // Instantly makes the current and previous model visible
          if (currentRef.current) currentRef.current.visible = true;
          if (prevRef.current) prevRef.current.visible = true;

          const areaObj = { ...scrollArea };
          areaObj.currentSection = model.onEnter.currentSection;
          areaObj.prevSection = model.onEnter.prevSection;
          setScrollArea(areaObj);
        },
        onLeaveBack: () => {
          // DIRECT MUTATION: Replaces setVisibleModels(idx == industryModel ? [] : [idx, idx - 1])
          // When scrolling back up, hide this model, but keep the previous one visible
          if (idx === industryModel) {
            if (currentRef.current) currentRef.current.visible = false;
          } else {
            if (currentRef.current) currentRef.current.visible = false;
            if (prevRef.current) prevRef.current.visible = true;
          }

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
        scrub: 1.0,
        // markers: true,

        onEnter: () => {
          setModelAnimationIsHalfWay(idx + 3); // (+ 1 because only starts effect scrollSection 1)
        },
      },
    });

    return () => {
      timeline.kill();
    };
  }, [currentRef]);

  function handleHalfwayPoint() {
    // console.log("Halfway point reached!");
  }

  return (
    <group key={`test${idx}`}>
      <group>
        <primitive
          ref={textTitleRef}
          object={scene2}
          dispose={null}
          scale={headlines[idx].scale}
          visible={scrollArea.currentSection === idx + 3 ? true : false}
          position={model.textPosition}
          rotation={model.textRotation}
        />
      </group>

      <primitive
        ref={currentRef}
        object={scene}
        dispose={null}
        scale={model.scale}
        position={model.position}
        rotation={model.rotation}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
    </group>
  );

  // return (
  //   <group key={`test${idx}`}>
  //     <group>
  //       {/* <spotLight
  //         position={[0, 8, 9]}
  //         intensity={4}
  //         castShadow
  //         shadow-mapSize-width={1024}
  //         shadow-mapSize-height={1024}
  //         shadow-camera-near={0.5}
  //         shadow-camera-far={20}
  //       /> */}
  //       <primitive
  //         ref={textTitleRef} //{testShadowsRef}
  //         object={scene2}
  //         dispose={null}
  //         scale={headlines[idx].scale}
  //         visible={scrollArea.currentSection === idx + 3 ? true : false}
  //         position={model.textPosition}
  //         rotation={model.textRotation}
  //       ></primitive>
  //     </group>

  //     <primitive
  //       ref={currentRef}
  //       object={scene}
  //       dispose={null}
  //       scale={model.scale}
  //       position={model.position}
  //       // visible={visibleModels.includes(idx)}
  //       rotation={model.rotation}
  //     >
  //       {/* <Html position={[-0.6, 1.3, 0]} transform> //Medicine */}
  //       {/* {idx == 3 ? (
  //         <Html
  //           position={[-12, 6, 30]}
  //           rotation={[0.01, Math.PI - 1.2, 0]}
  //           transform
  //         >
  //           <div
  //             className="annotation"
  //             // style={{ color: "white", fontSize: "1px" }}
  //           >
  //             Apple Vision Pro
  //           </div>
  //         </Html>
  //       ) : null} */}
  //     </primitive>
  //   </group>
  // );
}

export default MappedModels;
