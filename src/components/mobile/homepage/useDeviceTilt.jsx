import { useEffect, useRef, useCallback, useState } from "react";

/* ─────────────────────────────────────────────────────────────
 *  useDeviceTilt  –  robust device-orientation hook for R3F
 *
 *  Returns:
 *    tiltTarget   – ref with { x, y } offset values for your useFrame loop
 *    requestTilt  – call this on a user gesture to (re-)request permission
 *    tiltStatus   – "idle" | "listening" | "denied" | "unsupported"
 *
 *  Fixes applied vs. the original implementation:
 *    ✓ Works after page refresh (no stale closures)
 *    ✓ Re-calibrates on every fresh listen (no permanent drift)
 *    ✓ Handles iOS 13+ permission prompt reliably
 *    ✓ Retries automatically on user gesture if first attempt failed
 *    ✓ Survives React strict-mode double-mount
 *    ✓ Graceful fallback on unsupported browsers
 * ───────────────────────────────────────────────────────────── */

const TILT_RANGE_DEG = 30;
const MAX_OFFSET_X = 0.15;
const MAX_OFFSET_Y = 0.15;

export function useDeviceTilt() {
  const tiltTarget = useRef({ x: 0, y: 0 });
  const [tiltStatus, setTiltStatus] = useState("idle"); // idle | listening | denied | unsupported

  // Mutable refs so the event handler always reads fresh values
  const initialBeta = useRef(null);
  const initialGamma = useRef(null);
  const handlerRef = useRef(null);
  const statusRef = useRef("idle");

  // Keep statusRef in sync for use inside callbacks
  const updateStatus = useCallback((s) => {
    statusRef.current = s;
    setTiltStatus(s);
  }, []);

  /* ── The actual orientation handler ── */
  const orientationHandler = useCallback((e) => {
    const { beta, gamma } = e;
    if (beta == null || gamma == null) return;

    // Re-calibrate: capture the device's resting orientation on the first valid event.
    // This resets every time we start listening, so refreshes / re-mounts are fine.
    if (initialBeta.current === null) {
      initialBeta.current = beta;
      initialGamma.current = gamma;
    }

    const deltaBeta = beta - initialBeta.current;
    const deltaGamma = gamma - initialGamma.current;

    const normX = Math.max(-1, Math.min(1, deltaBeta / TILT_RANGE_DEG));
    const normY = Math.max(-1, Math.min(1, deltaGamma / TILT_RANGE_DEG));

    tiltTarget.current = {
      x: normX * MAX_OFFSET_X,
      y: normY * MAX_OFFSET_Y,
    };
  }, []);

  /* ── Start listening (idempotent) ── */
  const startListening = useCallback(() => {
    // Clean up any existing listener first
    if (handlerRef.current) {
      window.removeEventListener("deviceorientation", handlerRef.current);
    }

    // Reset calibration so we get a fresh "zero" position
    initialBeta.current = null;
    initialGamma.current = null;
    tiltTarget.current = { x: 0, y: 0 };

    handlerRef.current = orientationHandler;
    window.addEventListener("deviceorientation", orientationHandler, {
      passive: true,
    });
    updateStatus("listening");
  }, [orientationHandler, updateStatus]);

  /* ── Public: request permission and start (call on a user gesture) ── */
  const requestTilt = useCallback(async () => {
    // 1. Check basic support
    if (
      typeof window === "undefined" ||
      !("DeviceOrientationEvent" in window)
    ) {
      updateStatus("unsupported");
      return;
    }

    // 2. iOS 13+ requires an explicit permission request from a user gesture
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      try {
        const state = await DeviceOrientationEvent.requestPermission();
        if (state === "granted") {
          startListening();
        } else {
          updateStatus("denied");
        }
      } catch (err) {
        // This fires if called outside a user gesture or if the user dismissed the dialog
        console.warn("[useDeviceTilt] Permission request failed:", err);
        updateStatus("denied");
      }
      return;
    }

    // 3. Non-iOS: just start listening directly
    startListening();
  }, [startListening, updateStatus]);

  /* ── Auto-start on mount for non-iOS devices ── */
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("DeviceOrientationEvent" in window)
    ) {
      updateStatus("unsupported");
      return;
    }

    // iOS needs a user gesture — don't auto-start, let `requestTilt` handle it.
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      // But DO set up a one-time gesture catcher as a convenience.
      // This covers the "first interaction after page load" case.
      const gestureHandler = () => {
        if (statusRef.current === "idle" || statusRef.current === "denied") {
          requestTilt();
        }
      };
      window.addEventListener("touchstart", gestureHandler, { once: true });
      window.addEventListener("click", gestureHandler, { once: true });

      return () => {
        window.removeEventListener("touchstart", gestureHandler);
        window.removeEventListener("click", gestureHandler);
        if (handlerRef.current) {
          window.removeEventListener("deviceorientation", handlerRef.current);
        }
      };
    }

    // Non-iOS: start immediately
    startListening();

    return () => {
      if (handlerRef.current) {
        window.removeEventListener("deviceorientation", handlerRef.current);
      }
    };
  }, [requestTilt, startListening, updateStatus]);

  return { tiltTarget, requestTilt, tiltStatus };
}
