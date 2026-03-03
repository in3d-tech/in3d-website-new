import { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";

export default function LenisProvider({ children }) {
  const lenisRef = useRef();

  useEffect(() => {
    // 1. Update Lenis on every GSAP tick
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000); // Convert GSAP's seconds to milliseconds
    }

    // 2. Add to GSAP ticker
    gsap.ticker.add(update);

    // 3. Disable GSAP's lag smoothing so it doesn't fight Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: false, // We disabled this so GSAP can take full control
        lerp: 0.05, // Lower = heavier/smoother. Default is 0.1
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
