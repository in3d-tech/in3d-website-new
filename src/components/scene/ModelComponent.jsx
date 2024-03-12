import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

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

  if (url == "/assets/models/astronaut_position (1).glb") {
    scene.traverse((child) => {
      // if (child.material) child.material.wireframe = true;
      if (child.material) {
        if (child.name == "Meteor-M2_Material_#0_0") {
          child.material.transparent = true;
          child.material.opacity = 0.5;
        }
        // child.material.transparent = true;
        // child.material.opacity = 0.8;
      }
    });
  }

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
          // console.log("entered 1 MODEL? ");
          const areaObj = { ...scrollArea };
          areaObj.currentSection = 1;
          areaObj.prevSection = 0;
          setScrollArea(areaObj);
        },
        onEnterBack: () => {
          // console.log("eneter back babbbyt");
          setVisibleModels([1]);
          // console.log(" this is enter back 1??");
          // const areaObj = { ...scrollArea };
          // areaObj.currentSection = 1;
          // areaObj.prevSection = 2;
          // setScrollArea(areaObj);
        },
      },
    });

    //third section

    let timeline3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-four",
        start: "top bottom",
        endTrigger: ".section-five",
        end: "top bottom",
        onEnter: () => {
          // console.log("entered -3 ? ");
          const areaObj = { ...scrollArea };
          areaObj.currentSection = 3;
          areaObj.prevSection = 2;
          setScrollArea(areaObj);
        },
        onLeaveBack: () => {
          // console.log(" onLEAVE 3??");

          const areaObj = { ...scrollArea };
          areaObj.currentSection = 2;
          areaObj.prevSection = 3;
          setScrollArea(areaObj);
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
    // .from(
    //   ".helper, .tester",
    //   {
    //     y: 260,
    //     x: 200,
    //     stagger: 0.1,
    //     duration: 0.8,
    //     ease: "back",
    //   },
    //   "simultaneously"
    // );
    // above istext from earlier examplee --------<

    // .to(textRef.current, { xPercent: -20, yPercent: -30 }, "simultaneously");

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
        // scale={[2, 2, 2]}
        scale={[3, 3, 3]}
        // position={[-10, -20.2, 0]}
        // rotation={[0.5, Math.PI + 0.3, -0]}
        position={[-9, -18.2, -7]}
        rotation={[0, Math.PI / 2 + 0.5, 0]}
        // visible={visibleModels.includes(1) ? true : false}
      />
    </group>
  );
}

// ---------------------- MODEL 2 ----------------------------
// ---------------------- MODEL 2 ----------------------------

export function ModelComponent2({
  url,
  astroRef,
  microsoftRef,
  scrollArea,
  setScrollArea,
  visibleModels,
  setVisibleModels,
}) {
  const { scene, animations } = useGLTF(url);
  const mixer = useGLTFAnimations(scene, animations);

  if (url == "/assets/models/microsoft_large.glb") {
    scene.traverse((child) => {
      // if (child.isMesh) console.log("heloo world!");
      // if (child.material) child.material.wireframe = true;
    });
  }

  useEffect(() => {
    let timeline = gsap.timeline({
      defaults: { ease: "power1.out" },
      scrollTrigger: {
        trigger: ".section-three",
        start: "top bottom",
        endTrigger: ".section-three",
        end: "top top",
        scrub: 1,
        markers: true,
        onEnter: () => {
          // console.log("entered section 2?");
          setVisibleModels([2, 3]);
          const areaObj = { ...scrollArea };
          areaObj.currentSection = 2;
          areaObj.prevSection = 1;
          setScrollArea(areaObj);
        },
        onLeaveBack: () => {
          // console.log(" enter back 2??");

          const areaObj = { ...scrollArea };
          areaObj.currentSection = 1;
          areaObj.prevSection = 2;
          setScrollArea(areaObj);
        },
      },
    });

    timeline
      .to(microsoftRef.current.position, { y: -4.5, x: 4 }, "simultaneously")
      .to(microsoftRef.current.rotation, { y: -0.9 }, "simultaneously")
      .to(astroRef.current.position, { x: -22, y: -18 }, "simultaneously");
  }, [microsoftRef]);

  return (
    <group>
      <primitive
        ref={microsoftRef}
        object={scene}
        dispose={null}
        // scale={[2, 2, 2]}
        scale={[3, 3, 3]}
        position={[10, -9, 0]}
        rotation={[0, 0.9, 0]}
        // visible={visibleModels.includes(2) ? true : false}
      />
    </group>
  );
}

// ---------------------- MODEL 2 end ----------------------------

// ---------------------- MODEL 3 ----------------------------
// ---------------------- MODEL 3 ----------------------------

export function ModelComponent3({
  url,
  taasiaRef,
  microsoftRef,
  scrollArea,
  setScrollArea,
  visibleModels,
  setVisibleModels,
}) {
  const { scene, animations } = useGLTF(url);
  const mixer = useGLTFAnimations(scene, animations);

  if (url == "/assets/models/microsoft_large.glb") {
    scene.traverse((child) => {
      // if (child.isMesh) console.log("heloo world!");
      // if (child.material) child.material.wireframe = true;
    });
  }

  useEffect(() => {
    let timeline = gsap.timeline({
      defaults: { ease: "power1.out" },
      scrollTrigger: {
        trigger: ".section-four",
        start: "top bottom",
        endTrigger: ".section-four",
        end: "top top",
        scrub: 1,
        markers: true,
        onEnter: () => {
          // console.log("entered 3 model? ");
          const areaObj = { ...scrollArea };
          areaObj.currentSection = 3;
          areaObj.prevSection = 2;
          setScrollArea(areaObj);
        },
        onLeaveBack: () => {
          // console.log(" onLEAVE 3??");

          const areaObj = { ...scrollArea };
          areaObj.currentSection = 2;
          areaObj.prevSection = 3;
          setScrollArea(areaObj);
        },
      },
    });

    timeline
      .to(taasiaRef.current.position, { y: -4, x: -4 }, "simultaneously")
      .to(taasiaRef.current.rotation, { y: 0.2 }, "simultaneously")
      .to(microsoftRef.current.position, { x: 10 }, "simultaneously")
      .to(microsoftRef.current.rotation, { y: 0.9 }, "simultaneously");
  }, [taasiaRef]);

  return (
    <group>
      <primitive
        ref={taasiaRef}
        object={scene}
        dispose={null}
        // scale={[2, 2, 2]}
        scale={[3, 3, 3]}
        position={[-12, -8, -0.2]}
        // position={[-4, -4, -0.2]}
        // visible={visibleModels.includes(3)}
        rotation={[0, -0.4, 0]}
      />
    </group>
  );
}

// ---------------------- MODEL 4 ----------------------------
// ---------------------- MODEL 4 ----------------------------

export function ModelComponent4({
  url,
  taasiaRef,
  medicineRef,
  scrollArea,
  setScrollArea,
  visibleModels,
  setVisibleModels,
}) {
  const { scene, animations } = useGLTF(url);
  const mixer = useGLTFAnimations(scene, animations);

  if (url == "/assets/models/microsoft_large.glb") {
    scene.traverse((child) => {
      // if (child.isMesh) console.log("heloo world!");
      // if (child.material) child.material.wireframe = true;
    });
  }

  useEffect(() => {
    let timeline = gsap.timeline({
      defaults: { ease: "power1.out" },
      scrollTrigger: {
        trigger: ".section-five",
        start: "top bottom",
        endTrigger: ".section-five",
        end: "top top",
        scrub: 1,
        markers: true,
        onEnter: () => {
          // console.log("entered 3 model? ");
          const areaObj = { ...scrollArea };
          areaObj.currentSection = 4;
          areaObj.prevSection = 3;
          setScrollArea(areaObj);
        },
        onLeaveBack: () => {
          // console.log(" onLEAVE 3??");

          const areaObj = { ...scrollArea };
          areaObj.currentSection = 3;
          areaObj.prevSection = 4;
          setScrollArea(areaObj);
        },
      },
    });

    timeline
      .to(medicineRef.current.position, { y: -4.5, x: 4 }, "simultaneously")
      .to(medicineRef.current.rotation, { y: -0.9 }, "simultaneously")
      .to(taasiaRef.current.position, { y: -8, x: -12 }, "simultaneously")
      .to(taasiaRef.current.rotation, { y: -0.4 }, "simultaneously");
  }, [medicineRef]);

  return (
    <group>
      <primitive
        ref={medicineRef}
        object={scene}
        dispose={null}
        // scale={[2, 2, 2]}
        scale={[3, 3, 3]}
        position={[-12, -8, -0.2]}
        // position={[-4, -4, -0.2]}
        // visible={visibleModels.includes(3)}
        rotation={[0, -0.4, 0]}
      />
    </group>
  );
}
// ---------------------- MODEL 4 ----------------------------

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
