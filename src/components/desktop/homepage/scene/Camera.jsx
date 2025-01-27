import { useThree } from "@react-three/fiber";
import { useRef } from "react";

export function Camera() {
  const camera = useRef();

  const { viewport, size } = useThree();
  return (
    <perspectiveCamera
      ref={camera}
      position-z={5}
      aspect={size.width / size.height}
      fov={30}
      near={0.5}
      far={2000}
    />
  );
}
