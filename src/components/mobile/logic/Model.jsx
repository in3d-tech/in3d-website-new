import { useState } from "react";
import { useAppContext } from "../../../context/appContext";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  INDUSTRY,
  MEDICINE,
  MICROSOFT,
  SECURITY,
  AI,
  MILITARY,
  CUSTOMIZATION,
} from "../../common/modelData";
import { useGLTFAnimations } from "../../scene/ModelComponent";

const MAX_ROTATION_SPEED = 0.05; // Maximum rotation speed
const DECAY_FACTOR = 0.95; // Decay factor for inertia

export function Model({ url, modelRef, selectedCategory }) {
  const { isAstroModelDrawn, setIsAstroModelDrawn } = useAppContext();

  const { scene, animations } = useGLTF(url);
  const mixer = useGLTFAnimations(scene, animations);

  // const { active, progress, errors, total } = useProgress();

  const [isDragging, setIsDragging] = useState(false); // State to check if user is interacting
  const [initialX, setInitialX] = useState(null); // To store initial pointer or touch position
  const [rotationFactor, setRotationFactor] = useState(0); // Temporarily store the rotation change
  const [inertia, setInertia] = useState(0); // Store inertia for smooth stopping

  const modelAttributes = {
    [INDUSTRY]: {
      rotation: [0, 0, 0],
      scale: [2.3, 2.3, 2.3],
      position: [0, -2, 0],
    },
    [MEDICINE]: {
      rotation: [0, 0, 0],
      scale: [1.3, 1.3, 1.3],
      position: [2.35, -2, 0],
    },
    [MICROSOFT]: {
      rotation: [0, 0, 0],
      scale: [1.4, 1.4, 1.4],
      position: [0, -3, 0],
    },
    [SECURITY]: {
      rotation: [0, Math.PI, 0],
      scale: [4.4, 4.4, 4.4],
      position: [-0.2, -1.6, 0],
    },
    [AI]: {
      rotation: [0, 0.5, 0],
      scale: [1.25, 1.25, 1.25],
      position: [-0.2, -2.2, 0],
    },
    [MILITARY]: {
      rotation: [0, 0.2, 0],
      scale: [2.4, 2.4, 2.4],
      position: [0, -2.1, 0],
    },
    [CUSTOMIZATION]: {
      rotation: [0, 0.5, 0],
      scale: [1.9, 1.9, 1.9],
      position: [0, -2.3, 0],
    },
  };

  const handlePointerDown = (event) => {
    setIsDragging(true);

    setInitialX(event.clientX); // Get the initial pointer position

    setInertia(0); // Reset inertia on new drag
  };

  const handlePointerMove = (event) => {
    if (isDragging && initialX !== null) {
      const currentX = event.clientX;
      const deltaX = currentX - initialX;
      let newRotationFactor = deltaX * 0.01;
      newRotationFactor = Math.min(
        MAX_ROTATION_SPEED,
        Math.max(-MAX_ROTATION_SPEED, newRotationFactor)
      ); // Clamp the speed

      setRotationFactor(newRotationFactor); // Calculate the rotation factor based on pointer movement
      setInitialX(currentX); // Update initial pointer position for continuous rotation
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setInitialX(null);
    setInertia(rotationFactor); // Store the last rotation factor as inertia
    setRotationFactor(0); // Reset the rotation factor
  };

  const handleTouchStart = (event) => {
    if (event.touches && event.touches.length > 0) {
      setIsDragging(true);
      setInitialX(event.touches[0].clientX); // Get the initial touch position
      setInertia(0); // Reset inertia on new drag
    }
  };

  const handleTouchMove = (event) => {
    if (
      isDragging &&
      initialX !== null &&
      event.touches &&
      event.touches.length > 0
    ) {
      const currentX = event.touches[0].clientX;
      const deltaX = currentX - initialX;
      let newRotationFactor = deltaX * 0.01;
      newRotationFactor = Math.min(
        MAX_ROTATION_SPEED,
        Math.max(-MAX_ROTATION_SPEED, newRotationFactor)
      ); // Clamp the speed

      setRotationFactor(newRotationFactor); // Calculate the rotation factor based on touch movement
      setInitialX(currentX); // Update initial touch position for continuous rotation
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setInitialX(null);
    setInertia(rotationFactor); // Store the last rotation factor as inertia
    setRotationFactor(0); // Reset the rotation factor
  };

  useFrame(() => {
    if (scene) {
      scene.rotation.y += rotationFactor;

      // Apply inertia if not dragging
      if (!isDragging && Math.abs(inertia) > 0.0001) {
        scene.rotation.y += inertia;
        setInertia(inertia * DECAY_FACTOR); // Decay inertia over time
      }
    }
  });

  return (
    <group
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp} // Handle pointer cancel event
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd} // Handle touch cancel event
    >
      <primitive
        ref={modelRef}
        object={scene}
        dispose={null}
        scale={modelAttributes[selectedCategory].scale}
        position={modelAttributes[selectedCategory].position}
        rotation={modelAttributes[selectedCategory].rotation}
      />
    </group>
  );
}
