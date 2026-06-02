import { useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { ASTRO, CUSTOMIZATION } from "../../../common/modelData";
import { gsap } from "gsap";

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
  const keyLight = useRef();
  const fillLight = useRef();

  useEffect(() => {
    if (!keyLight.current || !fillLight.current) return;
    gsap.to(keyLight.current, {
      intensity: customizeHasRendered ? 5 : 0,
      duration: 0.6,
      ease: "power2.out",
    });
    gsap.to(fillLight.current, {
      intensity: customizeHasRendered ? 1 : 0,
      duration: 0.6,
      ease: "power2.out",
    });
  }, [customizeHasRendered]);

  return (
    <>
      <ambientLight
        intensity={
          scrollArea?.currentSection == CUSTOMIZATION
            ? 2
            : scrollArea.currentSection == ASTRO
              ? 0.2
              : 1
        }
      />
      <directionalLight
        ref={keyLight}
        intensity={0}
        position={[-25, 50, 10]}
        castShadow
        color={titleOnMainPageHovered ? hoveredTitleLight : "rgb(200,255,255)"}
      />
      <directionalLight
        ref={fillLight}
        intensity={0}
        position={[20, 0, -1]}
        castShadow
        color={titleOnMainPageHovered ? hoveredTitleLight : "rgb(254,200,255)"}
      />
    </>
  );
};

// export const Lights = ({
//   scrollArea,
//   titleOnMainPageHovered,
//   hoveredTitleLight,
//   customizeHasRendered,
// }) => {
//   return (
//     <>
//       {
//         <ambientLight
//           intensity={
//             scrollArea?.currentSection == CUSTOMIZATION
//               ? 2
//               : scrollArea.currentSection == ASTRO
//               ? 0.2
//               : 1
//           }
//         />
//       }
//       {customizeHasRendered ? (
//         <>
//           <directionalLight
//             color={
//               titleOnMainPageHovered ? hoveredTitleLight : "rgb(200,255,255)"
//             }
//             intensity={5}
//             position={[-25, 50, 10]}
//             castShadow
//           />
//           <directionalLight
//             intensity={1}
//             position={[20, 0, -1]}
//             castShadow
//             color={
//               titleOnMainPageHovered ? hoveredTitleLight : "rgb(254,200,255)"
//             }
//           />
//         </>
//       ) : null}
//     </>
//   );
// };
