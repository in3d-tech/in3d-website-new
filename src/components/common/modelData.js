export const ASTRO = 1;
export const INDUSTRY = 3;
export const MEDICINE = 4;
export const MICROSOFT = 5;
export const SECURITY = 6;
export const AI = 7;
export const MILITARY = 8;
export const CUSTOMIZATION = 9;
export const ABOUT_US = 10;

export const Model_Data = [
  {
    url: "/assets/models/engenir_model.glb",
    refs: ["taasia", "astro"],
    section: "section-four",
    onEnter: {
      currentSection: 3,
      prevSection: 2,
    },
    onLeave: { currentSection: 2, prevSection: 3 },
    scale: [3, 3, 3],
    position: [13.5, -5, -0.2],

    rotation: [0, 0.2, 0],
    timeline: (tl, currentRef, prevRef, textRef) =>
      tl

        ?.to(
          currentRef.current.position,
          { y: -3.75, x: 2.5, z: 1.5 },
          "simultaneously"
        )
        .to(textRef.current.position, { y: 1.5 }, "simultaneously")
        .to(currentRef.current.rotation, { y: Math.PI + 0.3 }, "simultaneously")
        .to(
          prevRef.current.position,
          { x: -18, y: 0, z: -5 },
          "simultaneously"
        ),
    textUrl: "/assets/models/fonts/industry-thin.glb",
    textPosition: [0, 4.5, 0],
    textRotation: [0.2, 0, 0],
    textScale: [7, 7, 7],
    // textTimeline: (tl, textRef) =>
  },

  // MEDICINE
  {
    url: "/assets/models/medical_model1 (1).glb",
    refs: ["medicine", "microsoft"],
    section: "section-five",
    onEnter: {
      currentSection: 4,
      prevSection: 3,
    },
    onLeave: { currentSection: 3, prevSection: 4 },

    scale: [3, 3, 3],
    // position: [-10, -4, -0.2],
    position: [-10, -4, 3],
    rotation: [0, 0.2, 0],

    timeline: (tl, currentRef, prevRef, textRef) =>
      tl
        ?.to(
          currentRef.current.position,
          { x: 4.55, z: -1, y: -3 },
          "simultaneously"
        )
        .to(textRef.current.position, { y: 3, z: -4 }, "simultaneously")
        .to(currentRef.current.rotation, { y: 0 }, "simultaneously")
        // ?.to(currentRef.current.position, { x: 4.5, z: -1.5 }, "simultaneously")
        // .to(currentRef.current.rotation, { y: 0 }, "simultaneously")

        .to(prevRef.current.position, { y: -5, x: 13.5 }, "simultaneously")
        .to(prevRef.current.rotation, { y: 0.2 }, "simultaneously"),
    textUrl: "/assets/models/fonts/medicine-thin.glb",
    textPosition: [0, -4, 2],
    textRotation: [0.2, 0, 0],
    textScale: [15, 15, 15],
  },

  // MICROSOFT

  {
    url: "/assets/models/microsoft_model.glb",
    refs: ["medicine", "microsoft"],
    section: "section-six",
    onEnter: {
      currentSection: 5,
      prevSection: 4,
    },
    onLeave: { currentSection: 4, prevSection: 5 },
    scale: [3, 3, 3],

    position: [13, -9, -0.2],
    rotation: [0, 0.9, 0],
    timeline: (tl, currentRef, prevRef, textRef) =>
      tl
        ?.to(
          currentRef.current.position,
          { y: -4, x: 1, z: -0.2 },
          "simultaneously"
        )
        .to(
          textRef.current.position,
          { x: -0.7, y: 1, z: -2 },
          "simultaneously"
        )
        .to(currentRef.current.rotation, { y: -0.9 }, "simultaneously")
        .to(prevRef.current.position, { y: -8, x: -12 }, "simultaneously")
        .to(prevRef.current.rotation, { y: -0.4 }, "simultaneously"),
    textUrl: "/assets/models/fonts/microsoft -thin.glb",
    textPosition: [-12, -1, 1],
    textRotation: [0.1, 0, 0],
    textScale: [9.5, 9.5, 9.5],
  },

  // SECURITY
  {
    url: "/assets/models/security.glb",
    refs: ["security", "medicine"],
    section: "section-seven",
    onEnter: {
      currentSection: 6,
      prevSection: 5,
    },
    onLeave: { currentSection: 5, prevSection: 6 },
    scale: [3, 3, 3],
    position: [-0.5, -0.5, 6],
    rotation: [0, Math.PI + 1, 0],
    timeline: (tl, currentRef, prevRef, textRef) =>
      tl
        ?.to(
          currentRef.current.position,
          { y: -0.5, x: -1.3, z: 3.2 },
          "simultaneously"
        )
        .to(textRef.current.position, { x: 0.5, y: -0.39 }, "simultaneously")
        .to(currentRef.current.rotation, { y: Math.PI + 1.3 }, "simultaneously")
        .to(prevRef.current.position, { x: 13 }, "simultaneously")
        .to(prevRef.current.rotation, { y: 0.9 }, "simultaneously"),
    textUrl: "/assets/models/fonts/text_security.glb",
    textPosition: [0.5, -2, 4],
    textRotation: [-0.01, -0.03, 0],
    textScale: [1.1, 1.1, 1.1],
  },

  //   ARTIFICIAL INTELLIGENCE
  {
    url: "/assets/models/ai_model.glb",
    refs: ["ai", "security"],
    section: "section-eight",
    onEnter: {
      currentSection: 7,
      prevSection: 6,
    },
    onLeave: { currentSection: 6, prevSection: 7 },
    scale: [1, 1, 1],
    position: [5, -5, 2],
    rotation: [0, 0, 0],
    timeline: (tl, currentRef, prevRef, textRef) =>
      tl
        ?.to(
          currentRef.current.position,
          { y: -1.6, x: 0.5, z: 4.2 },
          "simultaneously"
        )
        .to(textRef.current.position, { y: 1, z: -2 }, "simultaneously")
        .to(currentRef.current.rotation, { y: -3 }, "simultaneously")
        .to(
          prevRef.current.position,
          { x: -5, y: -0.5, z: 3.5 },
          "simultaneously"
        )
        .to(prevRef.current.rotation, { y: Math.PI + 1 }, "simultaneously"),
    textUrl: "/assets/models/fonts/ai-thin.glb",
    textPosition: [-1, 9, -6],
    textRotation: [0, 0.12, -0],
    textScale: [7, 7, 7],
  },

  // MILITARY
  {
    url: "/assets/models/military.glb",
    refs: ["military", "ai"],
    section: "section-nine",
    onEnter: {
      currentSection: 8,
      prevSection: 7,
    },
    onLeave: { currentSection: 7, prevSection: 8 },
    scale: [2, 2, 2],

    position: [-0.2, -1.7, 6],
    rotation: [0, -2.2, 0],
    timeline: (tl, currentRef, prevRef, textRef) =>
      tl
        ?.to(
          currentRef.current.position,
          { y: -1.2, x: -1.5, z: 2.8 },
          "simultaneously"
        )
        .to(textRef.current.position, { y: 2 }, "simultaneously")
        .to(currentRef.current.rotation, { y: 1 }, "simultaneously")
        .to(prevRef.current.position, { x: 10 }, "simultaneously")
        .to(prevRef.current.rotation, { y: 0.9 }, "simultaneously"),
    textUrl: "/assets/models/fonts/military-thin.glb",
    textPosition: [1.2, -6, -2],
    textRotation: [0.2, 0, 0],
    textScale: [12, 12, 12],
  },

  // CUSTOMIZE

  {
    url: "/assets/models/costimize_model_v02.glb",
    refs: ["security", "customize"],
    section: "section-ten",
    onEnter: {
      currentSection: 9,
      prevSection: 8,
    },
    onLeave: { currentSection: 8, prevSection: 9 },
    scale: [3, 3, 3],
    position: [13, -2, 0],
    rotation: [0, 0, 0],
    timeline: (tl, currentRef, prevRef, textRef) =>
      tl
        .to(
          currentRef.current.position,
          { y: -3, x: 1.5, z: 3 },
          "simultaneously"
        )
        .to(textRef.current.position, { z: 0 }, "simultaneously")

        .to(currentRef.current.rotation, { y: -2.2 }, "simultaneously")
        .to(
          prevRef.current.position,
          { x: -0.2, y: -1.7, z: 6 },
          "simultaneously"
        )
        .to(prevRef.current.rotation, { y: -2.2 }, "simultaneously"),
    textUrl: "/assets/models/fonts/customization-thin.glb",
    textPosition: [-2.3, 2, -14],
    textRotation: [0.1, 0, 0],
    textScale: [6, 6, 6],
  },
];
