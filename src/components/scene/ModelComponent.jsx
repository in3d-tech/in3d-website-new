import { useGLTF, useProgress } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useAppContext } from "../../context/appContext";

export function AstroModel({
  url,
  astroRef,
  visibleModels,
  setVisibleModels,
  textRef,
  setTextAnimation,
  customizeRef,
}) {
  const {
    isInstantScroll,
    scrollArea,
    setScrollArea,
    isAstroModelDrawn,
    setIsAstroModelDrawn,
  } = useAppContext();

  const { scene, animations } = useGLTF(url);
  const mixer = useGLTFAnimations(scene, animations);
  const { active } = useProgress();

  // gsap.set(".scene", { scale: 0.7 });

  const isFullyRenderedRef = useRef(false);

  // Use useFrame to check if the object is fully rendered on every frame
  useFrame(() => {
    // Check if the object is visible in the scene and loaded
    if (astroRef.current && scene && !isFullyRenderedRef.current) {
      // Check if all objects in the scene have been rendered
      const fullyRendered = scene.children.every((child) => child.visible);
      if (
        fullyRendered &&
        isAstroModelDrawn === false &&
        active === false &&
        scene
      ) {
        // Object is fully rendered
        isFullyRenderedRef.current = true;
        setTimeout(() => setIsAstroModelDrawn(true), 1000);
        console.log("Astro object is fully rendered!");
      }
    }
  });

  useEffect(() => {
    let timeline = gsap.timeline({
      defaults: { ease: "power1.out" },
      scrollTrigger: {
        trigger: ".section-one",
        start: "top top",
        endTrigger: ".section-two", //"#midSection2", //".section-two",
        end: "bottom bottom",
        scrub: 1,
        preventOverlaps: isInstantScroll ? true : false,
        fastScrollEnd: true, // 2250,
        // markers: true,
        onEnter: () => {
          // if (!visibleModels.length) setVisibleModels(true);
          const areaObj = { ...scrollArea };
          areaObj.currentSection = 1;
          areaObj.prevSection = 0;
          setScrollArea(areaObj);
        },
        // onEnterBack: () => {
        //   console.log("eneterd back");
        //   // setVisibleModels([1]);
        // },
        // onLeave: () => {
        //   console.log("on leaving function");
        // },
        // onEnterBack: () => {
        //   console.log("we entered back");
        // },
      },
    });

    timeline
      .to(
        astroRef.current.position,
        { x: -10, y: -20.2, z: 0 },
        "simultaneously"
      )
      .to(
        astroRef.current.rotation,
        { x: 0.5, y: Math.PI + 0.3, z: -0 },
        "simultaneously"
      );
    // .add(
    //   () => console.log("maybe we can add a functinoality like this"),
    //   ">"
    // );

    let textTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-two",
        start: "top bottom",
        // endTrigger: textRef,
        // end: "top top",
        // markers: true,
        once: true,
        onEnter: () => {
          setTextAnimation("category-title");
          setVisibleModels([]);
        },
      },
    });

    if (customizeRef.current) {
      let contactUsTimeline = gsap.timeline({
        defaults: { ease: "power1.out" },
        scrollTrigger: {
          trigger: ".section-ten",
          start: "top bottom",
          // endTrigger: "#midSection2", //".section-two",
          // end: "bottom bottom",
          scrub: 1,
          onEnter: () => {
            const areaObj = { ...scrollArea };
            areaObj.currentSection = 9;
            areaObj.prevSection = 8;
            setScrollArea(areaObj);
          },
          onLeaveBack: () => {
            const areaObj = { ...scrollArea };
            areaObj.currentSection = 8;
            areaObj.prevSection = 9;
            setScrollArea(areaObj);
          },
        },
      });

      contactUsTimeline
        .to(
          astroRef.current.position,
          { x: -10, y: -24.2, z: -2 },
          "simultaneously"
        )
        .to(
          astroRef.current.rotation,
          { x: 0.4, y: Math.PI + 0.3, z: -0 },
          "simultaneously"
        )
        .to(
          customizeRef.current.position,
          { x: 16, y: -2, z: 0 },
          "simultaneously"
        )
        .to(customizeRef.current.rotation, { y: -2.9 }, "simultaneously");
      // .to(astroRef.current.rotation, { y: Math.PI }, ">")
      // .to(astroRef.current.rotation, { y: -Math.PI / 2 + 0.5 }, ">");
    }
  }, [astroRef, isInstantScroll, customizeRef.current]); // , customizeRef.current

  const isVisibile =
    scrollArea.currentSection === 0 ||
    scrollArea.currentSection == 1 ||
    scrollArea.currentSection == 2 ||
    scrollArea.currentSection == 8 ||
    scrollArea.currentSection == 9;

  return (
    // <group>
    <primitive
      ref={astroRef}
      object={scene}
      dispose={null}
      scale={[3, 3, 3]}
      position={[-5, -18.2, -10]}
      rotation={[0.05, Math.PI / 2 + 0, 0]}
      visible={isVisibile}
    />
    // </group>
  );
}

// ---------------------- All other models ----------------------------

// export function MappedModels({
//   idx,
//   currentRef,
//   prevRef,
//   visibleModels,
//   setVisibleModels,
//   model,
//   allModelPositions,
// }) {
//   if (idx == 7) return null;

//   const { isInstantScroll, scrollArea, setScrollArea } = useAppContext();

//   const { scene, animations } = useGLTF(model.url);
//   const [isVisible, setIsVisible] = useState(false);
//   const mixer = useGLTFAnimations(scene, animations);
//   const industryModel = 0;

//   useEffect(() => {
//     let timeline = gsap.timeline({
//       defaults: { ease: "power1.out" },

//       scrollTrigger: {
//         trigger: `.${model.section}`,
//         start: "top bottom",
//         endTrigger: `.${model.section}`,
//         end: "top top",
//         scrub: 1,
//         // markers: true,
//         preventOverlaps: isInstantScroll ? true : false,
//         fastScrollEnd: true, // 2500 is default,
//         onEnter: () => {
//           // console.log("just entered section of idx: ", idx);
//           setVisibleModels([idx - 1, idx]);
//           const areaObj = { ...scrollArea };
//           areaObj.currentSection = model.onEnter.currentSection;
//           areaObj.prevSection = model.onEnter.prevSection;
//           setScrollArea(areaObj);
//           // checkModelPosition({ modelByIdx: idx, refs: allModelPositions });
//         },
//         onLeaveBack: () => {
//           // console.log("just Leave Back section of idx: ", idx, "and", [
//           //   idx - 1,
//           //   idx,
//           //   idx + 1,
//           // ]);
//           setVisibleModels(idx == industryModel ? [] : [idx, idx - 1]);
//           const areaObj = { ...scrollArea };
//           areaObj.currentSection = model.onLeave.currentSection;
//           areaObj.prevSection = model.onLeave.prevSection;
//           setScrollArea(areaObj);
//         },
//       },
//       // onLeave: () => console.log("just onLeave section of idx: ", idx),
//       // onEnterBack: () => console.log("just onEnterBack section of idx: ", idx),
//     });

//     model.timeline(timeline, currentRef, prevRef);
//   }, [currentRef, isInstantScroll]);

//   return (
//     <group key={`test${idx}`}>
//       <primitive
//         ref={currentRef}
//         object={scene}
//         dispose={null}
//         scale={model.scale}
//         position={model.position}
//         visible={visibleModels.includes(idx)}
//         rotation={model.rotation}
//       />
//     </group>
//   );
// }

// ANIMATE ALL

export function useGLTFAnimations(scene, animations) {
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

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// if (idx == 99) {
//   scene.traverse((child) => {
//     // if (child.material) child.material.wireframe = true;
//     if (child?.material?.name == "AI_Body") {
//       console.log(child.material);
//       child.material.transparent = false;
//       // child.material.opacity = 0;
//     }
//   });
// }
