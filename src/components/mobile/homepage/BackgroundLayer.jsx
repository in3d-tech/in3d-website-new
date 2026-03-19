import { memo } from "react";

// modelIdx -1 = astro (no bg image), 0-6 = category backgrounds
const CATEGORY_BACKGROUNDS = {
  0: "/assets/images/backgrounds/Astro_1_Background.webp", // Industry (reuses astro bg)
  1: "https://in3dwebsite.blob.core.windows.net/photos/Medical_Togle-min.jpg",
  2: "/assets/images/backgrounds/security/security.jpg",
  3: "/assets/images/backgrounds/security/security.jpg",
  4: "/assets/images/backgrounds/security/security.jpg",
  5: "/assets/images/backgrounds/military/military_bg.jpg",
  6: "/assets/images/backgrounds/security/security.jpg",
};

// const backgrounds = {
//   1: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
//   2: 'url("https://in3dwebsite.blob.core.windows.net/photos/Medical_Togle-min.jpg")',
//   3: 'url("/assets/images//medicine/medicine_bg.jpg")',
//   4: 'url("/assets/images/backgrounds/microsoft/microsoft_bg.jpg")',
//   5: 'url("/assets/images/backgrounds/security/security.jpg")',
//   6: 'url("https://in3dwebsite.blob.core.windows.net/photos/Ai_Tugle_Finish-min.jpg")',
//   7: 'url("/assets/images/backgrounds/military/military_bg.jpg")',
//   8: 'url("https://in3dwebsite.blob.core.windows.net/photos/Customize_Togle_Finish-min.jpg")',
//   9: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
// };

export const BackgroundLayer = memo(({ activeModelIdx }) => {
  const src = activeModelIdx >= 0 ? CATEGORY_BACKGROUNDS[activeModelIdx] : null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {Object.entries(CATEGORY_BACKGROUNDS).map(([idx, url]) => {
        const isActive = activeModelIdx === Number(idx);
        return (
          <img
            key={idx}
            src={url}
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: isActive ? 0.88 : 0, // ← tweak this value (0.1–0.25 is a good range)
              transition: "opacity 0.9s ease",
              willChange: "opacity",
            }}
          />
        );
      })}
    </div>
  );
});

BackgroundLayer.displayName = "BackgroundLayer";
