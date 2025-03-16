export const preloadImage = (src) => {
  const img = new Image();
  img.src = src;
};

export const firstImagesToLoad = [
  "https://in3dwebsite.blob.core.windows.net/photos/Customize_Togle_Finish-min.jpg",
  "https://in3dwebsite.blob.core.windows.net/photos/Ai_Tugle_Finish-min.jpg",
  "https://in3dwebsite.blob.core.windows.net/photos/Microsoft_Tugle-min.jpg",
  "https://in3dwebsite.blob.core.windows.net/photos/Militery_Togle_Finish2-min.jpg",
  "https://in3dwebsite.blob.core.windows.net/photos/Security_Togle_Finish2-min.jpg",
  "https://in3dwebsite.blob.core.windows.net/photos/Industry_Togle-min.jpg",
  "https://in3dwebsite.blob.core.windows.net/photos/Medical_Togle-min.jpg",
  "https://in3dwebsite.blob.core.windows.net/photos/astronaut_P1_stronger-min.png",
  "https://in3dwebsite.blob.core.windows.net/photos/about-2-min.png",
  "https://in3dwebsite.blob.core.windows.net/photos/about-3-min.png",
  "https://in3dwebsite.blob.core.windows.net/photos/about-4-min.png",
  "https://in3dwebsite.blob.core.windows.net/photos/astronaut6-min.png",
  "https://in3dwebsite.blob.core.windows.net/photos/industry-hat-min.png",
  "https://in3dwebsite.blob.core.windows.net/photos/industry-machine-min.jpg",
  "https://in3dwebsite.blob.core.windows.net/photos/industry-large-min.jpg",
  "https://in3dwebsite.blob.core.windows.net/photos/medical_overlay_1-min.jpg",
  "https://in3dwebsite.blob.core.windows.net/photos/med-overlay-bot-min.jpg",
  "https://in3dwebsite.blob.core.windows.net/photos/handshake_newer.png",
  "https://in3dwebsite.blob.core.windows.net/photos/microsoft-building-min.jpg",
  "https://in3dwebsite.blob.core.windows.net/photos/customize-dna-min.jpg",
  "https://in3dwebsite.blob.core.windows.net/photos/ai-1-min.png",
  "https://in3dwebsite.blob.core.windows.net/photos/ai-2-min.png",
];

export const preloadVideos = ({
  setVideosPreloaded,
  batchSize = 5,
  videosPreloaded,
}) => {
  if (videosPreloaded) {
    return;
  }
  const videoSources = [
    "https://in3dwebsite.blob.core.windows.net/video/Hololens 2 - Guides (2).mp4",
    "https://in3dwebsite.blob.core.windows.net/video/Hololens 1 - Remote Assist (2).mp4",
    "https://in3dwebsite.blob.core.windows.net/video/ar real estate.mp4",
    "https://in3dwebsite.blob.core.windows.net/video/Globe 3D Store - 14.10.20.mp4",
    "https://in3dwebsite.blob.core.windows.net/video/BIM Construction with Hololens.mp4",
    "https://in3dwebsite.blob.core.windows.net/video/Package scanning and moving pilot.mp4",
    "https://in3dwebsite.blob.core.windows.net/video/Hotze - VR Rakal.mp4",
    "https://in3dwebsite.blob.core.windows.net/video/ICL - Smart 3D Warehouse.mp4",
    "https://in3dwebsite.blob.core.windows.net/video/agoran 2.mp4",
    "https://in3dwebsite.blob.core.windows.net/video/AR Factory Real Time Control Panel Data - 2 level (3).mp4",
    "https://in3dwebsite.blob.core.windows.net/video/Kornit Guide (1).mp4",
    "https://in3dwebsite.blob.core.windows.net/video/Intel Remote Assist and Guides (1).mp4",
    "https://in3dwebsite.blob.core.windows.net/video/Medical - Real time operation (1).mp4",
    "https://in3dwebsite.blob.core.windows.net/video/Mesh Hololens - Remote Collaboration.mp4",
    "https://in3dwebsite.blob.core.windows.net/video/What can HoloLens 2 do_.mp4",
    "https://in3dwebsite.blob.core.windows.net/video/Medical Holoportation - Ichilov (1) (1).mp4",
    "https://in3dwebsite.blob.core.windows.net/video/Boat 3D Scan.mp4",
    "https://in3dwebsite.blob.core.windows.net/video/Rafael - Family - Truck (1).mp4",
    "https://in3dwebsite.blob.core.windows.net/video/Rafael - Family - Missile (1).mp4",
    "https://in3dwebsite.blob.core.windows.net/video/VR - Fire Department - Elevator Simulator (1).mp4",
    "https://in3dwebsite.blob.core.windows.net/video/Hololens-Abach-Treatment-Simulator.mp4",
  ];

  const loadVideo = (src) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.src = src;
      video.preload = "metadata";

      // video.currentTime = 5;

      video.onloadedmetadata = () => {
        video.currentTime = 4;
      };

      video.oncanplay = () => {
        // console.log(`Preloaded part of: ${src}`);
        resolve(video);
      };
      video.onerror = () => reject(new Error(`Failed to load video: ${src}`));
    });
  };

  const preloadBatch = async (batch) => {
    // console.log(`Preloading batch: ${batch}`);
    return Promise.all(batch.map((src) => loadVideo(src)));
  };

  const staggeredPreload = async (sources, batchSize) => {
    let index = 0;
    while (index < sources.length) {
      const batch = sources.slice(index, index + batchSize);
      await preloadBatch(batch);
      index += batchSize;
    }
    setVideosPreloaded(true);
  };

  staggeredPreload(videoSources, batchSize).catch((error) =>
    console.error(error)
  );
};
