import { useGLTFAnimations } from "../../scene/ModelComponent";
import { Html, useGLTF, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ModelComponent({
  url,
  modelRef,
  dontRotate,
  position,
  scale,
  rotation,
}) {
  const { scene, animations } = useGLTF(url);
  const mixer = useGLTFAnimations(scene, animations);
  // const modelRef = useRef();
  // useEffect(() => {
  //   console.log("Model loaded:", scene);
  //   console.log("Animations:", animations);

  //   scene.traverse((child) => {
  //     if (child.isMesh) {
  //       child.material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  //       // Log mesh names and bounding box
  //       child.geometry.computeBoundingBox();
  //       console.log("Mesh Name:", child.name);
  //       console.log("Bounding Box:", child.geometry.boundingBox);
  //     }
  //   });
  // }, [scene]);

  // Additional debugging helper
  // useHelper(scene, THREE.BoxHelper, "boundingBox");

  useFrame((state, delta) => {
    if (modelRef?.current && !dontRotate) {
      modelRef.current.rotation.y += delta * 0.1; // Adjust the speed by changing the multiplier
    }
  });

  return (
    <group>
      <primitive
        ref={modelRef}
        scale={scale ? scale : [5, 5, 5]}
        // position={[0, -5, -3]}
        position={position ? position : [0, -5, -3]}
        rotation={rotation ? rotation : [0, 0, 0]}
        object={scene}
        dispose={null}
        visible={true}
      >
        {/* <Html position={[1, 2, 1]}>
          <div
            style={{
              height: "200px",
              width: "200px",
              background: "white",
              opacity: 0.5,
            }}
          ></div>
        </Html> */}
      </primitive>
    </group>
  );
}
