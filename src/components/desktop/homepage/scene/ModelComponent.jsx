import { useGLTF, useProgress } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useAppContext } from "../../../../context/appContext";
// import Tilt from "react-parallax-tilt";

export function AstroModel({
  url,
  astroRef,
  setVisibleModels,
  setTextAnimation,
  customizeRef,
}) {
  const {
    isInstantScroll,
    scrollArea,
    setScrollArea,
    isAstroModelDrawn,
    setIsAstroModelDrawn,
    setCustomizeHasRendered,
  } = useAppContext();

  const { scene, animations } = useGLTF(url);
  const mixer = useGLTFAnimations(scene, animations);
  const { active } = useProgress();

  // gsap.set(".scene", { scale: 0.7 });

  const isFullyRenderedRef = useRef(false);

  useFrame(() => {
    // Check if the object is visible in the scene and loaded - not working
    if (astroRef.current && scene && !isFullyRenderedRef.current) {
      // Check if all objects in the scene have been rendered - not working
      const fullyRendered = scene.children.every((child) => child.visible);
      if (
        fullyRendered &&
        isAstroModelDrawn === false &&
        active === false &&
        scene
      ) {
        // Object is fully rendered
        isFullyRenderedRef.current = true;
        setTimeout(() => {
          setIsAstroModelDrawn(true);
          setCustomizeHasRendered(true);
        }, 1000);
        console.log("Astro object rendered!");
      }
    }
  });

  useEffect(() => {
    if (scene && astroRef.current && !isFullyRenderedRef.current) {
      // Check if all objects in the scene have been rendered
      const fullyRendered = scene.children.every((child) => child.visible);

      if (fullyRendered && isAstroModelDrawn === false) {
        setTimeout(() => {
          setIsAstroModelDrawn(true);
          setCustomizeHasRendered(true);
        }, 1000);
        console.log("Astro object rendered!");
      }
    }
  }, [scene, setIsAstroModelDrawn]);

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
        // fastScrollEnd: false, // 2250,
        // markers: true,
        onEnter: () => {
          // if (!visibleModels.length) setVisibleModels(true);
          const areaObj = { ...scrollArea };
          areaObj.currentSection = 1;
          areaObj.prevSection = 0;
          setScrollArea(areaObj);
        },
      },
    });

    timeline
      // .to(astroRef.current.position, { x: -7, y: -16.2 }, "simultaneously")
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

    let sectionTwoTimeline = gsap.timeline({
      defaults: { ease: "power1.out" },
      scrollTrigger: {
        trigger: ".section-two",
        start: "top 80%",
        endTrigger: ".section-two", //"#midSection2", //".section-two",
        end: "bottom bottom",
        // markers: true,
        scrub: 1,
        preventOverlaps: isInstantScroll ? true : false,
        // fastScrollEnd: false, // 2250,
        // markers: true,
        onEnter: () => {
          // if (!visibleModels.length) setVisibleModels(true);
          const areaObj = { ...scrollArea };
          areaObj.currentSection = 2;
          areaObj.prevSection = 1;
          setScrollArea(areaObj);
        },
        onLeave: () => {
          const areaObj = { ...scrollArea };
          // areaObj.currentSection = 3;
          // areaObj.prevSection = 2;
          // setScrollArea(areaObj);
        },
        onLeaveBack: () => {
          const areaObj = { ...scrollArea };
          areaObj.currentSection = 1;
          areaObj.prevSection = 2;
          setScrollArea(areaObj);
        },
      },
    });

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

    return () => {
      timeline.kill();
      textTimeline.kill();
    };
  }, [astroRef, isInstantScroll]); // , customizeRef.current

  useEffect(() => {
    if (customizeRef.current) {
      let contactUsTimeline = gsap.timeline({
        defaults: { ease: "power1.out" },
        preventOverlaps: isInstantScroll ? true : false,
        scrollTrigger: {
          trigger: ".section-eleven",
          start: "top bottom",
          // endTrigger: "#midSection2", //".section-two",
          // end: "bottom bottom",
          scrub: 1,
          onEnter: () => {
            const areaObj = { ...scrollArea };
            areaObj.currentSection = 10;
            areaObj.prevSection = 9;
            setScrollArea(areaObj);
          },
          onLeaveBack: () => {
            const areaObj = { ...scrollArea };
            areaObj.currentSection = 9;
            areaObj.prevSection = 10;
            setScrollArea(areaObj);
          },
        },
      });

      contactUsTimeline
        .to(
          astroRef.current.position,
          { x: -10, y: -23.2, z: -9 },
          "simultaneously"
        )
        .add(() => console.log("WELL THIS WAS ADDED"))
        .to(
          astroRef.current.rotation,
          { x: 0.5, y: Math.PI + 0.3, z: -0 },
          "simultaneously"
        )
        .to(
          customizeRef.current.position,
          { x: 16, y: -2, z: 0 },
          "simultaneously"
        )
        .to(customizeRef.current.rotation, { y: -2.9 }, "simultaneously");
      return () => {
        contactUsTimeline.kill();
      };
    }
  }, [astroRef.current, isInstantScroll, customizeRef.current]);

  const isVisibile =
    scrollArea.currentSection === 0 ||
    scrollArea.currentSection == 1 ||
    scrollArea.currentSection == 2 ||
    scrollArea.currentSection == 8 ||
    scrollArea.currentSection == 9;

  return (
    // <group>
    // <Tilt>
    <primitive
      ref={astroRef}
      object={scene}
      dispose={null}
      scale={[3, 3, 3]}
      position={[-5, -18.2, -10]}
      rotation={[0.05, Math.PI / 2 + 0, 0]}
      // visible={isVisibile}
    />
    // </Tilt>

    // </group>
  );
}

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

export function useGLTFAnimationsOnce(scene, animations) {
  const { invalidate } = useThree();
  const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);

  useEffect(() => {
    if (!mixer || !animations) return;

    const actions = animations.map((clip) => {
      const action = mixer.clipAction(clip);
      action.setLoop(THREE.LoopOnce); // Set the animation to play only once
      action.clampWhenFinished = true; // Keep the last frame when finished
      action.play();
      return action;
    });

    const handler = setInterval(() => invalidate(), 1000 / 60);

    mixer.addEventListener("finished", () => {
      clearInterval(handler);
    });

    return () => {
      clearInterval(handler);
      mixer.removeEventListener("finished");
    };
  }, [animations, mixer, invalidate]);

  useFrame((_state, delta) => mixer && mixer.update(delta));

  return mixer;
}

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
