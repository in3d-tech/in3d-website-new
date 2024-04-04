export function checkModelPosition(idx, currentRef) {
  console.log(currentRef.current.position);

  const positionByModel = [
    //industry
    {
      start: { position: [13, -5, -0.2], rotation: [0, -1.2, 0] },
      shown: { position: [3, -4, 1.5], rotation: [0, -2.7, 0] },
    },
    //med
    {
      start: { position: [-10, -4, -0.2], rotation: [0, 0.2, 0] },
      shown: { position: [7, -4, 0], rotation: [0, 0, 0] },
    },
    //microsoft
    {
      start: { position: [10, -9, -0.2], rotation: [0, 0.9, 0] },
      shown: { position: [3.5, -4.5, 0.2], rotation: [0, -0.9, 0] },
    },
    //security
    {
      start: { position: [-0.5, -0.5, 6], rotation: [0, Math.PI + 1, 0] },
      shown: { position: [-1.3, -0.5, 3.2], rotation: [0, Math.PI + 1.3, 0] },
    },
    //ai
    {
      start: { position: [5, -5, 2], rotation: [0, Math.PI, 0] },
      shown: { position: [1, -1.5, 3.4], rotation: [0, -0.9, 0] },
    },
    // military
    {
      start: { position: [-0.2, -1.7, 6], rotation: [0, -2.2, 0] },
      shown: { position: [-1.5, -1.2, 2.8], rotation: [0, 1, 0] },
    },
    //customize
    {
      start: { position: [13, -2, 0], rotation: [0, -2.9, 0] },
      shown: { position: [3.5, -2.5, 0.2], rotation: [0, -1, 0] },
    },
  ];
}
