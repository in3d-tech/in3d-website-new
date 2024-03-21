import { useGLTF, useProgress } from "@react-three/drei";
import { useEffect, useMemo, useState } from "react";
import { gsap } from "gsap";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function AstroModel({
  url,
  setScrollArea,
  scrollArea,
  astroRef,
  visibleModels,
  setVisibleModels,
  textRef,
  setTextAnimation,
  customizeRef,
  isInstantScroll,
}) {
  const { scene, animations } = useGLTF(url);
  const mixer = useGLTFAnimations(scene, animations);

  const { active, progress, errors, total } = useProgress();

  useEffect(() => {
    console.log(progress);
  }, [progress]);
  // gsap.set(".scene", { scale: 0.7 });

  useEffect(() => {
    console.log("ASTRO REEFFFFF");
    let timeline = gsap.timeline({
      defaults: { ease: "power1.out" },
      scrollTrigger: {
        trigger: ".section-one",
        start: "top top",
        endTrigger: "#midSection2", //".section-two",
        end: "bottom bottom",
        scrub: 1,
        preventOverlaps: isInstantScroll ? true : false,
        fastScrollEnd: true, // 2250,
        // markers: true,
        onEnter: () => {
          if (!visibleModels) setVisibleModels(true);
          const areaObj = { ...scrollArea };
          areaObj.currentSection = 1;
          areaObj.prevSection = 0;
          setScrollArea(areaObj);
        },
        onEnterBack: () => {
          // setVisibleModels([1]);
        },
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

    let textTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-two",
        start: "top top",
        // endTrigger: textRef,
        // end: "top top",
        once: true,
        onEnter: () => {
          setTextAnimation("category-title");
        },
      },
    });

    if (customizeRef.current) {
      let contactUsTimeline = gsap.timeline({
        defaults: { ease: "power1.out" },
        scrollTrigger: {
          trigger: ".section-ten",
          start: "top top",
          // endTrigger: "#midSection2", //".section-two",
          // end: "bottom bottom",
          scrub: 1,
          // markers: true,
          onEnter: () => {
            const areaObj = { ...scrollArea };
            areaObj.currentSection = 9;
            areaObj.prevSection = 8;
            setScrollArea(areaObj);
          },
          onLeave: () => {
            // setVisibleModels([1]);
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
          { x: 6, y: -13, z: -22 },
          "simultaneously"
        )
        .to(astroRef.current.rotation, { x: 0.5, y: 0, z: 0 }, "simultaneously")
        .to(
          customizeRef.current.position,
          { x: 12, y: -2, z: 0 },
          "simultaneously"
        )
        .to(customizeRef.current.rotation, { y: -2.9 }, "simultaneously");
      // .to(astroRef.current.rotation, { y: -Math.PI / 2 + 0.5 }, ">");
    }
  }, [astroRef, isInstantScroll]);

  return (
    <group>
      <primitive
        ref={astroRef}
        object={scene}
        dispose={null}
        scale={[3, 3, 3]}
        position={[-9, -18.2, -7]}
        rotation={[0.05, Math.PI / 2 + 0.5, 0]}
        // visible={visibleModels.includes(1) ? true : false}
      />
    </group>
  );
}

// ---------------------- All other models ----------------------------

export function MappedModels({
  idx,
  scrollArea,
  setScrollArea,
  currentRef,
  prevRef,
  visibleModels,
  setVisibleModels,
  model,
  isInstantScroll,
}) {
  if (idx == 7) return null;
  const { scene, animations } = useGLTF(model.url);
  const [isVisible, setIsVisible] = useState(false);
  const mixer = useGLTFAnimations(scene, animations);

  useEffect(() => {
    console.log("OTHJER MODELS REFFFFF");
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
        fastScrollEnd: true, //2500,
        onEnter: () => {
          const areaObj = { ...scrollArea };
          areaObj.currentSection = model.onEnter.currentSection;
          areaObj.prevSection = model.onEnter.prevSection;
          setScrollArea(areaObj);
        },
        onLeaveBack: () => {
          const areaObj = { ...scrollArea };
          areaObj.currentSection = model.onLeave.currentSection;
          areaObj.prevSection = model.onLeave.prevSection;
          setScrollArea(areaObj);
        },
      },
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
        visible={visibleModels ? true : false}
        rotation={model.rotation}
      />
    </group>
  );
}

// ANIMATE ALL

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
