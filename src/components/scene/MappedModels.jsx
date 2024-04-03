import { useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useAppContext } from "../../context/appContext";
import { useGLTFAnimations } from "./ModelComponent";

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

  const { isInstantScroll, scrollArea, setScrollArea } = useAppContext();

  const { scene, animations } = useGLTF(model.url);
  const mixer = useGLTFAnimations(scene, animations);
  const industryModel = 0;

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

    let halfwayReached = false;

    model.timeline(timeline, currentRef, prevRef);

    timeline.eventCallback("onUpdate", () => {
      // Calculate the current progress of the animation
      const currentProgress = timeline.progress();

      // Check if the halfway point has not been reached and if we are past halfway
      if (!halfwayReached && currentProgress >= 0.5) {
        // Set the flag to true to indicate that halfway point has been reached
        halfwayReached = true;

        // Call your function to set state or perform any other action
        handleHalfwayPoint();
      }
    });
    return () => {
      // Dispose the timeline
      timeline.kill();
    };
  }, [currentRef, isInstantScroll]);

  function handleHalfwayPoint() {
    // Perform actions you want to do at halfway point
    // For example, set state or trigger some other functionality
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
