import { Suspense, lazy } from "react";

const LazyMobileView = lazy(() => import("./homepage/HomeScreenMobile"));

export function MobileView() {
  return (
    <>
      <Suspense fallback={null}>
        <LazyMobileView />
      </Suspense>
    </>
  );
}
