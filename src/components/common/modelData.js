// export const getModelData = (idx, tl) => {
export const Model_Data = [
  // TAASIA

  {
    url: "/assets/models/engenir_model_new.glb",
    refs: ["taasia", "astro"],
    section: "section-three",
    onEnter: {
      currentSection: 2,
      prevSection: 1,
    },
    onLeave: { currentSection: 1, prevSection: 2 },
    scale: [3, 3, 3],

    // position: [3, -4, 1],
    // rotation: [0, -2.7, 0],
    position: [13, -5, -0.2],
    rotation: [0, -1.2, 0],
    // visible={visibleModels.includes(3)}
    timeline: (tl, currentRef, prevRef) =>
      tl
        ?.to(
          currentRef.current.position,
          { y: -4, x: 3, z: 1 },
          "simultaneously"
        )
        .to(currentRef.current.rotation, { y: -2.7 }, "simultaneously")
        .to(prevRef.current.position, { x: -22, y: -18 }, "simultaneously"),
  },

  // MEDICINE
  {
    url: "/assets/models/medical_model.glb",
    refs: ["medicine", "microsoft"],
    section: "section-four",
    onEnter: {
      currentSection: 3,
      prevSection: 2,
    },
    onLeave: { currentSection: 2, prevSection: 3 },

    scale: [3, 3, 3],
    position: [-9, -4, -0.2],
    rotation: [0, 0.2, 0],
    // visible={visibleModels.includes(3)}

    timeline: (tl, currentRef, prevRef) =>
      tl
        ?.to(
          currentRef.current.position,
          { y: -3.5, x: 7, z: 0 },
          "simultaneously"
        )
        .to(currentRef.current.rotation, { y: 0 }, "simultaneously")
        .to(prevRef.current.position, { y: -5, x: 13 }, "simultaneously")
        .to(prevRef.current.rotation, { y: -1.2 }, "simultaneously"),
  },

  // MICROSOFT

  {
    url: "/assets/models/microsoft_large.glb",
    refs: ["medicine", "microsoft"],
    section: "section-five",
    onEnter: {
      currentSection: 4,
      prevSection: 3,
    },
    onLeave: { currentSection: 3, prevSection: 4 },
    scale: [3, 3, 3],

    position: [10, -9, -0.2],
    // visible={visibleModels.includes(3)}
    rotation: [0, 0.9, 0],
    timeline: (tl, currentRef, prevRef) =>
      tl
        ?.to(currentRef.current.position, { y: -4.5, x: 4 }, "simultaneously")
        .to(currentRef.current.rotation, { y: -0.9 }, "simultaneously")
        .to(prevRef.current.position, { y: -8, x: -12 }, "simultaneously")
        .to(prevRef.current.rotation, { y: -0.4 }, "simultaneously"),
  },

  // SECURITY
  {
    url: "/assets/models/millitary_model_for_web.glb",
    refs: ["security", "medicine"],
    section: "section-six",
    onEnter: {
      currentSection: 5,
      prevSection: 4,
    },
    onLeave: { currentSection: 4, prevSection: 5 },
    scale: [3, 3, 3],

    position: [-0.2, -1.7, 4.3],
    // visible={visibleModels.includes(3)}
    rotation: [0, -2.2, 0],
    timeline: (tl, currentRef, prevRef) =>
      tl
        ?.to(
          currentRef.current.position,
          { y: -0.6, duration: 1.5 },
          "simultaneously"
        )
        .to(prevRef.current.position, { x: 10 }, "simultaneously")
        .to(prevRef.current.rotation, { y: 0.9 }, "simultaneously"),
    // .to(currentRef.current.position, { z: 2, x: -2, duration: 1.5 }, ">"),
  },

  // ARTIFICIAL INTELLIGENCE
  {
    url: "/assets/models/millitary_model_for_web.glb",
    refs: ["security", "medicine"],
    section: "section-seven",
    onEnter: {
      currentSection: 6,
      prevSection: 5,
    },
    onLeave: { currentSection: 5, prevSection: 6 },
    scale: [3, 3, 3],

    position: [-0.2, -1.7, 4.3],
    // visible={visibleModels.includes(3)}
    rotation: [0, -2.2, 0],
    timeline: (tl, currentRef, prevRef) =>
      tl
        ?.to(
          currentRef.current.position,
          { y: -0.6, duration: 1.5 },
          "simultaneously"
        )
        .to(prevRef.current.position, { x: 10 }, "simultaneously")
        .to(prevRef.current.rotation, { y: 0.9 }, "simultaneously"),
    // .to(currentRef.current.position, { z: 2, x: -2, duration: 1.5 }, ">"),
  },

  // MILITARY
  {
    url: "/assets/models/millitary_model_for_web.glb",
    refs: ["security", "medicine"],
    section: "section-eight",
    onEnter: {
      currentSection: 7,
      prevSection: 6,
    },
    onLeave: { currentSection: 6, prevSection: 7 },
    scale: [3, 3, 3],

    position: [-0.2, -1.7, 4.3],
    // visible={visibleModels.includes(3)}
    rotation: [0, -2.2, 0],
    timeline: (tl, currentRef, prevRef) =>
      tl
        ?.to(
          currentRef.current.position,
          { y: -0.6, duration: 1.5 },
          "simultaneously"
        )
        .to(prevRef.current.position, { x: 10 }, "simultaneously")
        .to(prevRef.current.rotation, { y: 0.9 }, "simultaneously"),
    // .to(currentRef.current.position, { z: 2, x: -2, duration: 1.5 }, ">"),
  },

  // CUSTOMIZE

  //   {
  //     url: "/assets/models/costimize_model_v02.glb",
  //     refs: ["security", "customize"],
  //     section: "section-nine",
  //     onEnter: {
  //       currentSection: 6,
  //       prevSection: 5,
  //     },
  //     onLeave: { currentSection: 5, prevSection: 6 },
  //     scale: [3, 3, 3],
  //     position: [12, -2, 0],
  //     // visible={visibleModels.includes(3)}
  //     rotation: [0, -2.9, 0],
  //     timeline: (tl, currentRef) =>
  //       tl
  //         .to(
  //           currentRef.current.position,
  //           { y: -2.5, x: 3.5, z: 0.2 },
  //           "simultaneously"
  //         )
  //         .to(currentRef.current.rotation, { y: -1 }, "simultaneously"),
  //   },
];
