import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useState } from "react";
import { gsap } from "gsap";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Model_Data } from "../common/modelData";

export function ModelComponent({
  url,
  setScrollArea,
  scrollArea,
  astroRef,
  visibleModels,
  setVisibleModels,
  textRef,
  setTextAnimation,
}) {
  const { scene, animations } = useGLTF(url);
  const mixer = useGLTFAnimations(scene, animations);

  // gsap.set(".scene", { scale: 0.7 });

  useEffect(() => {
    let timeline = gsap.timeline({
      defaults: { ease: "power1.out" },
      scrollTrigger: {
        trigger: ".section-one",
        start: "top top",
        endTrigger: "#midSection2", //".section-two",
        end: "bottom bottom",
        scrub: 1,
        markers: true,
        onEnter: () => {
          const areaObj = { ...scrollArea };
          areaObj.currentSection = 1;
          areaObj.prevSection = 0;
          setScrollArea(areaObj);
        },
        onEnterBack: () => {
          setVisibleModels([1]);
        },
      },
    });

    //third section

    // let timeline3 = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".section-four",
    //     start: "top bottom",
    //     endTrigger: ".section-five",
    //     end: "top bottom",
    //     onEnter: () => {
    //       const areaObj = { ...scrollArea };
    //       areaObj.currentSection = 3;
    //       areaObj.prevSection = 2;
    //       setScrollArea(areaObj);
    //     },
    //     onLeaveBack: () => {
    //       const areaObj = { ...scrollArea };
    //       areaObj.currentSection = 2;
    //       areaObj.prevSection = 3;
    //       setScrollArea(areaObj);
    //     },
    //   },
    // });

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
  }, [astroRef]);

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

// ---------------------- MODEL 6 ----------------------------

export function MappedModels({
  idx,
  scrollArea,
  setScrollArea,
  currentRef,
  prevRef,
  visibleModels,
  setVisibleModels,
  model,
}) {
  const { scene, animations } = useGLTF(model.url);
  const [isVisible, setIsVisible] = useState(false);
  const mixer = useGLTFAnimations(scene, animations);

  useEffect(() => {
    let timeline = gsap.timeline({
      defaults: { ease: "power1.out" },
      scrollTrigger: {
        trigger: `.${model.section}`,
        start: "top bottom",
        endTrigger: `.${model.section}`,
        end: "top top",
        scrub: 1,
        markers: true,
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
  }, [currentRef]);

  if (idx == 99) {
    scene.traverse((child) => {
      // if (child.material) child.material.wireframe = true;
      if (child?.material?.name == "AI_Body") {
        console.log(child.material);
        child.material.transparent = false;
        // child.material.opacity = 0;
      }
    });
  }

  return (
    <group key={`test${idx}`}>
      <primitive
        ref={currentRef}
        object={scene}
        dispose={null}
        scale={model.scale}
        // position={[3.5, -2.5, 0]}
        // rotation={[0, -1, 0]}

        position={model.position}
        // visible={visibleModels.includes(3)}
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

// ---------------------- MODEL 2 ----------------------------
// ---------------------- MODEL 2 ----------------------------

// export function ModelComponent2({
//   url,
//   astroRef,
//   microsoftRef,
//   scrollArea,
//   setScrollArea,
//   visibleModels,
//   setVisibleModels,
// }) {
//   const { scene, animations } = useGLTF(url);
//   const mixer = useGLTFAnimations(scene, animations);

//   if (url == "/assets/models/microsoft_large.glb") {
//     scene.traverse((child) => {
//       // if (child.isMesh) console.log("heloo world!");
//       // if (child.material) child.material.wireframe = true;
//     });
//   }

//   useEffect(() => {
//     let timeline = gsap.timeline({
//       defaults: { ease: "power1.out" },
//       scrollTrigger: {
//         trigger: ".section-three",
//         start: "top bottom",
//         endTrigger: ".section-three",
//         end: "top top",
//         scrub: 1,
//         markers: true,
//         onEnter: () => {
//           setVisibleModels([2, 3]);
//           const areaObj = { ...scrollArea };
//           areaObj.currentSection = 2;
//           areaObj.prevSection = 1;
//           setScrollArea(areaObj);
//         },
//         onLeaveBack: () => {
//           const areaObj = { ...scrollArea };
//           areaObj.currentSection = 1;
//           areaObj.prevSection = 2;
//           setScrollArea(areaObj);
//         },
//       },
//     });

//     timeline
//       .to(microsoftRef.current.position, { y: -4.5, x: 4 }, "simultaneously")
//       .to(microsoftRef.current.rotation, { y: -0.9 }, "simultaneously")
//       .to(astroRef.current.position, { x: -22, y: -18 }, "simultaneously");
//   }, [microsoftRef]);

//   return (
//     <group>
//       <primitive
//         ref={microsoftRef}
//         object={scene}
//         dispose={null}
//         // scale={[2, 2, 2]}
//         scale={[3, 3, 3]}
//         position={[10, -9, 0]}
//         rotation={[0, 0.9, 0]}
//         // visible={visibleModels.includes(2) ? true : false}
//       />
//     </group>
//   );
// }

// // ---------------------- MODEL 2 end ----------------------------

// // ---------------------- MODEL 3 ----------------------------
// // ---------------------- MODEL 3 ----------------------------

// export function ModelComponent3({
//   url,
//   taasiaRef,
//   microsoftRef,
//   scrollArea,
//   setScrollArea,
//   visibleModels,
//   setVisibleModels,
// }) {
//   const { scene, animations } = useGLTF(url);
//   const mixer = useGLTFAnimations(scene, animations);

//   if (url == "/assets/models/microsoft_large.glb") {
//     scene.traverse((child) => {
//       // if (child.isMesh) console.log("heloo world!");
//       // if (child.material) child.material.wireframe = true;
//     });
//   }

//   useEffect(() => {
//     let timeline = gsap.timeline({
//       defaults: { ease: "power1.out" },
//       scrollTrigger: {
//         trigger: ".section-four",
//         start: "top bottom",
//         endTrigger: ".section-four",
//         end: "top top",
//         scrub: 1,
//         markers: true,
//         onEnter: () => {
//           const areaObj = { ...scrollArea };
//           areaObj.currentSection = 3;
//           areaObj.prevSection = 2;
//           setScrollArea(areaObj);
//         },
//         onLeaveBack: () => {
//           const areaObj = { ...scrollArea };
//           areaObj.currentSection = 2;
//           areaObj.prevSection = 3;
//           setScrollArea(areaObj);
//         },
//       },
//     });

//     timeline
//       .to(taasiaRef.current.position, { y: -4, x: -4 }, "simultaneously")
//       .to(taasiaRef.current.rotation, { y: 0.2 }, "simultaneously")
//       .to(microsoftRef.current.position, { x: 10 }, "simultaneously")
//       .to(microsoftRef.current.rotation, { y: 0.9 }, "simultaneously");
//   }, [taasiaRef]);

//   return (
//     <group>
//       <primitive
//         ref={taasiaRef}
//         object={scene}
//         dispose={null}
//         // scale={[2, 2, 2]}
//         scale={[3, 3, 3]}
//         position={[-12, -8, -0.2]}
//         // position={[-4, -4, -0.2]}
//         // visible={visibleModels.includes(3)}
//         rotation={[0, -0.4, 0]}
//       />
//     </group>
//   );
// }

// // ---------------------- MODEL 4 ----------------------------
// // ---------------------- MODEL 4 ----------------------------

// export function ModelComponent4({
//   url,
//   taasiaRef,
//   medicineRef,
//   scrollArea,
//   setScrollArea,
//   visibleModels,
//   setVisibleModels,
// }) {
//   const { scene, animations } = useGLTF(url);
//   const mixer = useGLTFAnimations(scene, animations);

//   if (url == "/assets/models/microsoft_large.glb") {
//     scene.traverse((child) => {
//       // if (child.isMesh) console.log("heloo world!");
//       // if (child.material) child.material.wireframe = true;
//     });
//   }

//   useEffect(() => {
//     let timeline = gsap.timeline({
//       defaults: { ease: "power1.out" },
//       scrollTrigger: {
//         trigger: ".section-five",
//         start: "top bottom",
//         endTrigger: ".section-five",
//         end: "top top",
//         scrub: 1,
//         markers: true,
//         onEnter: () => {
//           const areaObj = { ...scrollArea };
//           areaObj.currentSection = 4;
//           areaObj.prevSection = 3;
//           setScrollArea(areaObj);
//         },
//         onLeaveBack: () => {
//           const areaObj = { ...scrollArea };
//           areaObj.currentSection = 3;
//           areaObj.prevSection = 4;
//           setScrollArea(areaObj);
//         },
//       },
//     });

//     timeline
//       .to(medicineRef.current.position, { y: -4.5, x: 4 }, "simultaneously")
//       .to(medicineRef.current.rotation, { y: -0.9 }, "simultaneously")
//       .to(taasiaRef.current.position, { y: -8, x: -12 }, "simultaneously")
//       .to(taasiaRef.current.rotation, { y: -0.4 }, "simultaneously");
//   }, [medicineRef]);

//   return (
//     <group>
//       <primitive
//         ref={medicineRef}
//         object={scene}
//         dispose={null}
//         // scale={[2, 2, 2]}
//         scale={[3, 3, 3]}
//         position={[-12, -8, -0.2]}
//         // position={[-4, -4, -0.2]}
//         // visible={visibleModels.includes(3)}
//         rotation={[0, -0.4, 0]}
//       />
//     </group>
//   );
// }
// // ---------------------- MODEL 4 ----------------------------

// // ---------------------- MODEL 5 ----------------------------
// // ---------------------- MODEL 5 ----------------------------

// export function ModelComponent5({
//   url,
//   currentRef: securityRef,

//   prevRef: medicineRef,
//   scrollArea,
//   setScrollArea,
//   visibleModels,
//   setVisibleModels,
// }) {
//   const { scene, animations } = useGLTF(url);
//   const mixer = useGLTFAnimations(scene, animations);

//   if (url == "/assets/models/microsoft_large.glb") {
//     scene.traverse((child) => {
//       // if (child.isMesh) console.log("heloo world!");
//       // if (child.material) child.material.wireframe = true;
//     });
//   }

//   useEffect(() => {
//     let timeline = gsap.timeline({
//       defaults: { ease: "power1.out" },
//       scrollTrigger: {
//         trigger: ".section-six",
//         start: "top bottom",
//         endTrigger: ".section-six",
//         end: "top top",
//         scrub: 1,
//         markers: true,
//         onEnter: () => {
//           const areaObj = { ...scrollArea };
//           areaObj.currentSection = 5;
//           areaObj.prevSection = 4;
//           setScrollArea(areaObj);
//         },
//         onLeaveBack: () => {
//           const areaObj = { ...scrollArea };
//           areaObj.currentSection = 4;
//           areaObj.prevSection = 5;
//           setScrollArea(areaObj);
//         },
//       },
//     });

//     timeline
//       .to(
//         securityRef.current.position,
//         { y: -0.6, duration: 1.5 },
//         "simultaneously"
//       )
//       // { y: -0.6, x: -0.2, z: 4.3 },

//       // .to(securityRef.current.rotation, { y: -1 }, "simultaneously")

//       .to(medicineRef.current.position, { y: -8, x: -12 }, "simultaneously")
//       .to(medicineRef.current.rotation, { y: -0.4 }, "simultaneously")
//       // .to(
//       //   securityRef.current.position,
//       //   { y: -0.6, x: -0.2, z: 4.3, delay: 1 },
//       //   ">"
//       // )
//       .to(securityRef.current.position, { z: 2, x: -2, duration: 1.5 }, ">");
//   }, [securityRef]);

//   return (
//     <group>
//       <primitive
//         ref={securityRef}
//         object={scene}
//         dispose={null}
//         scale={[3, 3, 3]}
//         // position={[3.5, -2.5, 0]}
//         // rotation={[0, -1, 0]}

//         position={[-0.2, -1.7, 4.3]}
//         // visible={visibleModels.includes(3)}
//         rotation={[0, -2.2, 0]}
//       />
//     </group>
//   );
// }
// // ---------------------- MODEL 5 ----------------------------

// // ---------------------- MODEL 6 ----------------------------
// // ---------------------- MODEL 6 ----------------------------

// export function ModelComponent6({
//   url,
//   customizeRef,
//   securityRef,
//   scrollArea,
//   setScrollArea,
//   visibleModels,
//   setVisibleModels,
// }) {
//   const { scene, animations } = useGLTF(url);
//   const [isVisible, setIsVisible] = useState(false);
//   const mixer = useGLTFAnimations(scene, animations);

//   if (url == "/assets/models/microsoft_large.glb") {
//     scene.traverse((child) => {
//       // if (child.isMesh) console.log("heloo world!");
//       // if (child.material) child.material.wireframe = true;
//     });
//   }

//   useEffect(() => {
//     let timeline = gsap.timeline({
//       defaults: { ease: "power1.out" },
//       scrollTrigger: {
//         trigger: ".section-seven",
//         start: "top bottom",
//         endTrigger: ".section-seven",
//         end: "top top",
//         scrub: 1,
//         markers: true,
//         onEnter: () => {
//           const areaObj = { ...scrollArea };
//           areaObj.currentSection = 6;
//           areaObj.prevSection = 5;
//           setScrollArea(areaObj);
//           setIsVisible(true);
//         },
//         onLeaveBack: () => {
//           const areaObj = { ...scrollArea };
//           areaObj.currentSection = 5;
//           areaObj.prevSection = 6;
//           setScrollArea(areaObj);
//         },
//       },
//     });

//     timeline
//       .to(
//         customizeRef.current.position,
//         { y: -2.5, x: 3.5, z: 0.2 },
//         "simultaneously"
//       )
//       .to(customizeRef.current.rotation, { y: -1 }, "simultaneously");
//     // .to(
//     //   securityRef.current.position,
//     //   { y: -0.6, x: -4, z: 4.3 },
//     //   "simultaneously"
//     // )
//     // .to(securityRef.current.rotation, { y: -2.2 }, "simultaneously");
//   }, [customizeRef]);

//   return (
//     <group>
//       <primitive
//         ref={customizeRef}
//         object={scene}
//         dispose={null}
//         scale={[3, 3, 3]}
//         position={[12, -2, 0]}
//         // visible={visibleModels.includes(3)}
//         rotation={[0, -2.9, 0]}
//       />
//     </group>
//   );
// }
