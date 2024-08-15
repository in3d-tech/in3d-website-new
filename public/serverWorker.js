const CACHE_NAME = "video-cache-v1";
const videoUrls = [
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

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(videoUrls);
      })
      .catch((error) => {
        console.error("Failed to cache:", error);
      })
  );
});

self.addEventListener("fetch", (event) => {
  if (videoUrls.includes(event.request.url)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request).then((response) => {
            let responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
            return response;
          })
        );
      })
    );
  }
});
