import { Suspense, lazy } from "react";
import { useGLTF } from "@react-three/drei";

const LazyMobileView = lazy(() => import("./homepage/HomeScreenMobile"));

const CATEGORY_MODEL_URLS = [
  "/assets/models/engenir_model.glb",
  "/assets/models/medical_model1 (1).glb",
  "/assets/models/microsoft_model.glb",
  "/assets/models/security.glb",
  "/assets/models/ai_model.glb",
  "/assets/models/military.glb",
  "/assets/models/costimize_model_v02.glb",
];

CATEGORY_MODEL_URLS.forEach((url) => useGLTF.preload(url));

export function MobileView() {
  return (
    <>
      <Suspense fallback={null}>
        <LazyMobileView />
      </Suspense>
    </>
  );
}
