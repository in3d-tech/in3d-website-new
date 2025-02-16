import { useThree } from "@react-three/fiber";
import { useRef } from "react";
import { ASTRO, CUSTOMIZATION } from "../../../common/modelData";

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

export const Lights = ({
  scrollArea,
  titleOnMainPageHovered,
  hoveredTitleLight,
  customizeHasRendered,
}) => {
  return (
    <>
      {
        <ambientLight
          intensity={
            scrollArea?.currentSection == CUSTOMIZATION
              ? 2
              : scrollArea.currentSection == ASTRO
              ? 0.2
              : 1
          }
        />
      }
      {customizeHasRendered ? (
        <>
          <directionalLight
            color={
              titleOnMainPageHovered ? hoveredTitleLight : "rgb(200,255,255)"
            }
            intensity={5}
            position={[-25, 50, 10]}
            castShadow
          />
          <directionalLight
            intensity={1}
            position={[20, 0, -1]}
            castShadow
            color={
              titleOnMainPageHovered ? hoveredTitleLight : "rgb(254,200,255)"
            }
          />
        </>
      ) : null}
    </>
  );
};
