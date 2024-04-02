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
  const [isVisible, setIsVisible] = useState(false);
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
          // console.log("just entered section of idx: ", idx);
          setVisibleModels([idx - 1, idx]);
          const areaObj = { ...scrollArea };
          areaObj.currentSection = model.onEnter.currentSection;
          areaObj.prevSection = model.onEnter.prevSection;
          setScrollArea(areaObj);
        },
        onLeaveBack: () => {
          // console.log("just Leave Back section of idx: ", idx, "and", [
          //   idx - 1,
          //   idx,
          //   idx + 1,
          // ]);
          setVisibleModels(idx == industryModel ? [] : [idx, idx - 1]);
          const areaObj = { ...scrollArea };
          areaObj.currentSection = model.onLeave.currentSection;
          areaObj.prevSection = model.onLeave.prevSection;
          setScrollArea(areaObj);
        },
      },
      // onLeave: () => console.log("just onLeave section of idx: ", idx),
      // onEnterBack: () => console.log("just onEnterBack section of idx: ", idx),
    });

    model.timeline(timeline, currentRef, prevRef);
  }, [currentRef, isInstantScroll]);

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

// // ANIMATE ALL

// // ----------------------------------------------------------------
// // ----------------------------------------------------------------
// // ----------------------------------------------------------------
// // if (idx == 99) {
// //   scene.traverse((child) => {
// //     // if (child.material) child.material.wireframe = true;
// //     if (child?.material?.name == "AI_Body") {
// //       console.log(child.material);
// //       child.material.transparent = false;
// //       // child.material.opacity = 0;
// //     }
// //   });
// // }

export default MappedModels;
