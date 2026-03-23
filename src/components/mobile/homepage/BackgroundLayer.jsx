import { memo } from "react";

// modelIdx -1 = astro (no bg image), 0-6 = category backgrounds
const CATEGORY_BACKGROUNDS = {
  0: "/assets/images/backgrounds/taasia/taasia_bg.jpg", // Industry (reuses astro bg)
  1: "/assets/images/backgrounds/medicine/medicine_bg.jpg",
  2: "/assets/images/backgrounds/microsoft/microsoft_bg.jpg",
  3: "/assets/images/backgrounds/security/security.jpg",
  4: "/assets/images/backgrounds/ai/ai_bg.png",
  5: "/assets/images/backgrounds/military/military_bg.jpg",
  6: "/assets/images/backgrounds/customize/Costumize_Smoke_Background_V01.png",
};

// const backgrounds = {
//   1: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
//   2: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
//   2.5: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
//   3: 'url("/assets/images/backgrounds/taasia/taasia_bg.jpg")',
//   4: 'url("/assets/images/backgrounds/medicine/medicine_bg.jpg")',
//   5: 'url("/assets/images/backgrounds/microsoft/microsoft_bg.jpg")',
//   6: 'url("/assets/images/backgrounds/security/security.jpg")',
//   7: 'url("/assets/images/backgrounds/ai/ai_bg.png")',
//   8: 'url("/assets/images/backgrounds/military/military_bg.jpg")',
//   9: 'url("/assets/images/backgrounds/customize/Costumize_Smoke_Background_V01.png")',
//   10: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
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
