import { useGLTF, useProgress } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useAppContext } from "../../context/appContext";
import { useGLTFAnimations } from "./ModelComponent";
import { useFrame } from "@react-three/fiber";

// ---------------------- All other models ----------------------------

function MappedModels({
  idx,
  currentRef,
  prevRef,
  visibleModels,
  setVisibleModels,
  model,
  allModelPositions,
}) {
  if (idx == 7) return null;

  const {
    isInstantScroll,
    scrollArea,
    setScrollArea,
    setJustEnteredSection,
    setCustomizeHasRendered,
  } = useAppContext();

  const { scene, animations } = useGLTF(model.url);
  const mixer = useGLTFAnimations(scene, animations);
  const { active } = useProgress();
  const industryModel = 0;

  const isCustomizedRendered = useRef(false);

  useFrame(() => {
    if (idx == 1) {
      // Check if the object is visible in the scene and loaded - not working
      if (currentRef.current && scene && !isCustomizedRendered.current) {
        // Check if all objects in the scene have been rendered - not working
        const fullyRendered = scene.children.every((child) => child.visible);
        if (fullyRendered && active === false && scene) {
          // Object is fully rendered
          isCustomizedRendered.current = true;
          setCustomizeHasRendered(true);
          // setTimeout(() => setIsAstroModelDrawn(true), 1000);
          console.log("customize object is fully rendered!");
        }
      }
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

    model.timeline(timeline, currentRef, prevRef);

    timeline.eventCallback("onUpdate", () => {
      // Calculate the current progress of the animation
      const currentProgress = timeline.progress();
      // console.log({ currentProgress });

      // Check if the halfway point has not been reached and if we are past halfway
      if (!halfwayReachedForward && currentProgress >= 0.5) {
        // Set the flag to true to indicate that halfway point has been reached
        halfwayReachedForward = true;

        // Call your function to set state or perform any other action
        handleHalfwayPoint();
      }
    });

    // this second trigger is for timing the text animation with the model movement
    gsap.to(`.${model.section}`, {
      scrollTrigger: {
        trigger: `.${model.section}`,
        start: "top 50%",
        scrub: 1,
        // markers: true,

        onEnter: () => {
          console.log("onEnter animation");
          setJustEnteredSection(idx + 2); // (+ 1 because only starts effect scrollSection 1)
        },
      },
    });

    return () => {
      timeline.kill();
    };
  }, [currentRef, isInstantScroll]);

  function handleHalfwayPoint() {
    console.log("Halfway point reached!");
  }

  return (
    <group key={`test${idx}`}>
      <primitive
        ref={currentRef}
        object={scene}
        dispose={null}
        scale={model.scale}
        position={model.position}
        visible={visibleModels.includes(idx)}
        rotation={model.rotation}
      />
    </group>
  );
}

export default MappedModels;
