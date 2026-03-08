import { useGLTF, useProgress } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useAppContext } from "../../../../context/appContext";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Tilt from "react-parallax-tilt";

gsap.registerPlugin(ScrollTrigger);

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
  const mixer = useGLTFAnimations(scene, animations, astroRef);
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
    // // 1️⃣ MOVEMENT 1: Start (Section 1) -> About Us (Section 2)
    // let timeline1 = gsap.timeline({
    //   defaults: { ease: "none" },
    //   scrollTrigger: {
    //     trigger: ".section-one",
    //     start: "top top",
    //     endTrigger: ".section-two",
    //     end: "top top", // 👈 Finishes EXACTLY when Section 2 locks into place!
    //     scrub: true,
    //     onEnter: () => {
    //       // const areaObj = { ...scrollArea, currentSection: 1, prevSection: 0 };
    //       // setScrollArea(areaObj);
    //     },
    //   },
    // });

    // timeline1
    //   .to(
    //     astroRef.current.position,
    //     { x: -10, y: -20.2, z: 0 },
    //     "simultaneously",
    //   )
    //   .to(
    //     astroRef.current.rotation,
    //     { x: 0.5, y: Math.PI + 0.3, z: 0 },
    //     "simultaneously",
    //   );

    // // 2️⃣ MOVEMENT 2: About Us (Section 2) -> Categories List (Section 3)
    // let timeline2 = gsap.timeline({
    //   defaults: { ease: "none" },
    //   scrollTrigger: {
    //     trigger: ".section-two",
    //     start: "top top",
    //     endTrigger: ".section-three",
    //     end: "top top", // 👈 Finishes EXACTLY when Section 3 locks into place!
    //     scrub: true,
    //     onEnter: () => {
    //       // const areaObj = { ...scrollArea, currentSection: 2, prevSection: 1 };
    //       // setScrollArea(areaObj);
    //     },
    //   },
    // });

    // 1️⃣ MOVEMENT 1: Start (Section 1) -> About Us (Section 2)
    let timeline1 = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: ".section-one",
        start: "top top",
        endTrigger: ".section-two",
        end: "top top", // 👈 Finishes EXACTLY when Section 2 locks into place!
        scrub: true,
      },
    });

    timeline1
      .to(
        astroRef.current.position,
        // 👇 NEW: The "In-between" Position!
        // I've averaged out your start and end coordinates as a starting point.
        { x: -8.5, y: -19.2, z: 2 },
        "simultaneously",
      )
      .to(
        astroRef.current.rotation,
        // 👇 NEW: The "In-between" Rotation!
        { x: 0.25, y: Math.PI + 0.2, z: 0 },
        "simultaneously",
      );

    // 2️⃣ MOVEMENT 2: About Us (Section 2) -> Categories List (Section 3)
    let timeline2 = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: ".section-two",
        start: "top top",
        endTrigger: ".section-three",
        end: "top top", // 👈 Finishes EXACTLY when Section 3 locks into place!
        scrub: true,
      },
    });

    timeline2
      .to(
        astroRef.current.position,
        // 👇 OLD FINAL: This is the position from your original timeline1
        { x: -10, y: -20.2, z: 0 },
        "simultaneously",
      )
      .to(
        astroRef.current.rotation,
        // 👇 OLD FINAL: This is the rotation from your original timeline1
        { x: 0.5, y: Math.PI + 0.3, z: 0 },
        "simultaneously",
      );

    // 3️⃣ MOVEMENT 3: Categories List (Section 3) -> Industry Model (Section 4)
    let timeline3 = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: ".section-three",
        start: "top top",
        endTrigger: ".section-four",
        end: "top top", // 👈 Finishes EXACTLY when Industry locks into place!
        scrub: true,
        onEnter: () => {
          // const areaObj = { ...scrollArea, currentSection: 3, prevSection: 2 };
          // setScrollArea(areaObj);
        },
        onLeave: () => {
          // Hide Astro once we are fully locked into the Industry section
          if (astroRef.current) astroRef.current.visible = false;
        },
        onEnterBack: () => {
          // Show Astro if they scroll back up from Industry
          if (astroRef.current) astroRef.current.visible = true;
        },
      },
    });

    // Add your Astro rotating OUT of the screen here!
    // timeline3.to(astroRef.current.position, { x: -20, y: -30 })

    const uiTrigger2 = ScrollTrigger.create({
      trigger: ".section-two",
      start: "top 90%", // Fires as soon as the section peeks up from the bottom!
      onEnter: () => {
        const areaObj = { ...scrollArea, currentSection: 2, prevSection: 1 };
        setScrollArea(areaObj);
      },
      onLeaveBack: () => {
        const areaObj = { ...scrollArea, currentSection: 1, prevSection: 2 };
        setScrollArea(areaObj);
      },
    });

    // 👇 ADD THIS: Dedicated UI Trigger for Section 3 (Categories List)
    const uiTrigger3 = ScrollTrigger.create({
      trigger: ".section-three",
      start: "top 90%",
      onEnter: () => {
        const areaObj = { ...scrollArea, currentSection: 2.5, prevSection: 2 };
        setScrollArea(areaObj);
        // setTextAnimation(true);
      },
      onLeaveBack: () => {
        const areaObj = { ...scrollArea, currentSection: 2, prevSection: 2.5 };
        setScrollArea(areaObj);
      },
    });

    const textAnimationTrigger = ScrollTrigger.create({
      trigger: ".section-three",
      start: "top 5%", // 👈 Fires right at the end of the 2.5s scroll!
      onEnter: () => {
        // Apply the actual CSS class name, not 'true'!
        setTextAnimation("category-title");
      },
      onLeaveBack: () => {
        // Reset the text so it can fade in again next time
        setTextAnimation("category-title-no-opacity");
      },
      onLeave: () => {
        // Hide it when scrolling down to the Industry model
        setTextAnimation("category-title-no-opacity");
      },
      onEnterBack: () => {
        // Fade it back in when scrolling up from the Industry model
        setTextAnimation("category-title");
      },
    });

    return () => {
      timeline1.kill();
      timeline2.kill();
      timeline3.kill();
      uiTrigger2.kill();
      uiTrigger3.kill();
      textAnimationTrigger.kill();
    };
  }, [astroRef]); // 👈 Remember, no isInstantScroll in the array!

  useEffect(() => {
    if (customizeRef.current) {
      let contactUsTimeline = gsap.timeline({
        // defaults: { ease: "power1.out" },
        defaults: { ease: "none" },
        // preventOverlaps: isInstantScroll ? true : false,
        scrollTrigger: {
          trigger: ".section-eleven",
          start: "top bottom",
          // endTrigger: "#midSection2", //".section-two",
          // end: "bottom bottom",
          scrub: true,
          onEnter: () => {
            // SHOW ASTRO AGAIN!
            if (astroRef.current) astroRef.current.visible = true;
            const areaObj = { ...scrollArea };
            areaObj.currentSection = 10;
            areaObj.prevSection = 9;
            setScrollArea(areaObj);
          },
          onLeaveBack: () => {
            // HIDE ASTRO AGAIN when scrolling back up to the other models
            if (astroRef.current) astroRef.current.visible = false;
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
          "simultaneously",
        )
        .add(() => console.log("WELL THIS WAS ADDED"))
        .to(
          astroRef.current.rotation,
          { x: 0.5, y: Math.PI + 0.3, z: -0 },
          "simultaneously",
        )
        .to(
          customizeRef.current.position,
          { x: 16, y: -2, z: 0 },
          "simultaneously",
        )
        .to(customizeRef.current.rotation, { y: -2.9 }, "simultaneously");
      return () => {
        contactUsTimeline.kill();
      };
    }
  }, [astroRef.current, customizeRef.current]);

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

export function useGLTFAnimations(scene, animations, modelRef) {
  const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);

  useEffect(() => {
    if (!mixer || !animations) return;
    animations.forEach((clip) => mixer.clipAction(clip).play());

    return () => {
      mixer.stopAllAction();
    };
  }, [animations, mixer]);

  useFrame((_state, delta) => {
    // Only update if there is no ref passed, OR if the model is visible
    if (mixer && (!modelRef || modelRef.current?.visible)) {
      mixer.update(delta);
    }
  });

  return mixer;
}

export function useGLTFAnimationsOnce(scene, animations, modelRef) {
  const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);

  useEffect(() => {
    if (!mixer || !animations) return;

    animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.setLoop(THREE.LoopOnce); // Set the animation to play only once
      action.clampWhenFinished = true; // Keep the last frame when finished
      action.play();
    });

    // Clean up animations if the component unmounts
    return () => {
      mixer.stopAllAction();
    };
  }, [animations, mixer]);

  useFrame((_state, delta) => {
    // Only update if there is no ref passed, OR if the model is visible
    if (mixer && (!modelRef || modelRef.current?.visible)) {
      mixer.update(delta);
    }
  });

  return mixer;
}

// export function useGLTFAnimationsOnce(scene, animations) {
//   const { invalidate } = useThree();
//   const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);

//   useEffect(() => {
//     if (!mixer || !animations) return;

//     const actions = animations.map((clip) => {
//       const action = mixer.clipAction(clip);
//       action.setLoop(THREE.LoopOnce); // Set the animation to play only once
//       action.clampWhenFinished = true; // Keep the last frame when finished
//       action.play();
//       return action;
//     });

//     const handler = setInterval(() => invalidate(), 1000 / 60);

//     mixer.addEventListener("finished", () => {
//       clearInterval(handler);
//     });

//     return () => {
//       clearInterval(handler);
//       mixer.removeEventListener("finished");
//     };
//   }, [animations, mixer, invalidate]);

//   useFrame((_state, delta) => mixer && mixer.update(delta));

//   return mixer;
// }

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
