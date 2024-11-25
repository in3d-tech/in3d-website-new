import { useGLTF, useProgress } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState, useRef, lazy } from "react";
import { useAppContext } from "../../../context/appContext";
import { Camera } from "../../scene/Camera";
import * as THREE from "three";
import { Sparkles } from "@react-three/drei";
import { HomeScreenCategoryText } from "./CategoryHsDetails";
import { MenuAboutContact, MenuWheel } from "../../navs/mobile/MenuWheel";
import { TextScrambleComponent } from "../../common/shuffleTexts";
// import useScreenOrientation from "../../common/useScreenOrientation";
// import { SelectedCategory } from "./CategoryDetails";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
import { DeviceTilt } from "../../common/SwipeAndTilt";

const INDUSTRY = 0;
const MEDICINE = 1;
const MICROSOFT = 2;
const SECURITY = 3;
const AI = 4;
const MILITARY = 5;
const CUSTOMIZATION = 6;
const ABOUT_US = 7;

const LazySelectedContent = lazy(() => import("./CategoryDetails"));

function HomeScreenMobile() {
  const [isMenuCentered, setIsMenuCentered] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  // const [tilt, setTilt] = useState({ tiltLR: 0, tiltFB: 0, dir: 0 });
  // const [slide, setSlide] = useState(0);
  const astroRef = useRef();
  const [startExpandedAnimation, setStartExpandedAnimation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [debug, setDebug] = useState("yessss");
  const [selectedCategoryItemByIdx, setSelectedCategoryItemByIdx] =
    useState(-1);
  const {
    selectedCategory,
    setSelectedCategory,
    mobileBackground,
    setMobileBackground,
    isAstroModelDrawn,
    setCustomizeHasRendered,
    selectedMenuActionMobile,
    setSelectedMenuActionMobile,
  } = useAppContext();

  const handleMenuClick = (wasCategoryClicked) => {
    if (!isMenuCentered) {
      document.body.style.overflow = "hidden";
    } else {
      if (!selectedCategory) document.body.style.overflowY = "auto";
    }
    if (!wasCategoryClicked) {
      setIsMenuCentered(!isMenuCentered);
    }
  };

  const handleCategoryClick = (action) => {
    setSelectedAction(action);
  };

  useEffect(() => {
    if (!isMobile) setTimeout(() => setIsMobile(true), 5000);
  }, []);

  useEffect(() => {
    if (!isAstroModelDrawn) return;
    if (!startExpandedAnimation) {
      setTimeout(() => {
        setCustomizeHasRendered(true);
        setStartExpandedAnimation(true);
      }, 200);
    }
  }, [isAstroModelDrawn]);

  return (
    <>
      <MenuWheel
        setSelectedMenuActionMobile={setSelectedMenuActionMobile}
        handleMenuClick={handleMenuClick}
        isMenuCentered={isMenuCentered}
        selectedMenuActionMobile={selectedMenuActionMobile}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <div
        className={
          isMenuCentered
            ? "homescreen-mobile mobile-menu-opened-bg"
            : "homescreen-mobile"
        }
        style={{
          background: isMenuCentered ? "" : backgrounds[mobileBackground],
          zIndex: isMenuCentered ? 3 : 0,
          transition: "background 1s",
          // border: "2px solid yellow",
        }}
      >
        {isMenuCentered ? (
          <div
            className="h-nav-in3d-icon"
            style={{ animationDelay: "0.6s", left: "37%" }}
          >
            <img
              className="in3d-fixed-logo"
              style={{ width: "6em" }}
              src="/assets/images/in3d-logo-white.png"
            />
          </div>
        ) : null}
        {isMenuCentered ? (
          <MenuAboutContact
            isMenuCentered={isMenuCentered}
            handleMenuClick={handleMenuClick}
          />
        ) : null}
      </div>
      (
      <div className="home-categories-wrapper-mobile">
        {startExpandedAnimation ? (
          <TitleWithAnimation isMobile={isMobile} />
        ) : null}
        <div
          style={{
            width: "100%",
            height: "50px",
            marginTop: "68vh",
          }}
        ></div>
        <div
          className="home-categories-map-mobile"
          style={{ opacity: selectedCategory ? 0 : "" }}
        >
          {categories.map((category, idx) => (
            <HomeScreenCategoryText
              selectedCategory={selectedCategory}
              key={idx}
              idx={idx}
              selectedMenuActionMobile={selectedMenuActionMobile}
              setSelectedMenuActionMobile={setSelectedMenuActionMobile}
              setSelectedCategory={setSelectedCategory}
              selectedCategoryItemByIdx={selectedCategoryItemByIdx}
              setSelectedCategoryItemByIdx={setSelectedCategoryItemByIdx}
            />
          ))}
        </div>
        <Scene
          astroRef={astroRef}
          setMobileBackground={setMobileBackground}
          selectedCategory={selectedCategory}
          setDebug={setDebug}
          selectedCategoryItemByIdx={selectedCategoryItemByIdx}
        />
      </div>
      )
      <Suspense fallback={null}>
        {selectedCategory ? <LazySelectedContent /> : null}
      </Suspense>
    </>
  );
}

export default HomeScreenMobile;

const backgrounds = {
  1: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
  2: 'url("https://in3dwebsite.blob.core.windows.net/photos/Medical_Togle-min.jpg")',
  3: 'url("/assets/images/backgrounds//medicine/medicine_bg.jpg")',
  4: 'url("/assets/images/backgrounds/microsoft/microsoft_bg.jpg")',
  5: 'url("/assets/images/backgrounds/security/security.jpg")',
  6: 'url("https://in3dwebsite.blob.core.windows.net/photos/Ai_Tugle_Finish-min.jpg',
  7: 'url("/assets/images/backgrounds/military/military_bg.jpg")',
  8: 'url("https://in3dwebsite.blob.core.windows.net/photos/Customize_Togle_Finish-min.jpg")',
  9: 'url("/assets/images/backgrounds/Astro_1_Background.webp")',
};

const categories = [
  "INDUSTRY",
  "MEDICINE",
  "MICROSOFT",
  "SECURITY",
  "ARTIFICAL INTELLIGENCE",
  "MILITARY",
  "CUSTOMIZATION",
  "About",
  "ABOUTCONTACT",
];

const TitleWithAnimation = ({ isMobile }) => {
  return (
    <div
      style={{
        top: "0em",
        left: "1em",
        height: "10em",
        zIndex: 1,
        position: "absolute",
        width: "50%",
        // border: "2px solid yellow",
      }}
      // className="container"
    >
      <div
        style={{
          fontSize: "1.8em",
          marginTop: "1em",
          animationDelay: "2.5s",
        }}
        className="text-animate simply-header"
      >
        SIMPLY
      </div>
      <div
        style={{
          textAlign: "center",
          // fontSize: "1em",
          animationDelay: "2.5s",
        }}
        className="text-animate simply-header"
      >
        <TextScrambleComponent isHomepage isMobile={isMobile} />
      </div>
    </div>
  );
};

const Scene = ({
  astroRef,
  setMobileBackground,
  selectedCategory,
  setDebug,
  selectedCategoryItemByIdx,
}) => {
  const [slide, setSlide] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ tiltLR: 0, tiltFB: 0, dir: 0 });
  const [tempTiltValue, setTempTiltValue] = useState(null);

  // const sparklesColour = {
  //   "-1": "",
  //   [INDUSTRY]: "rgb(13,168,136, 0.1)",
  //   [MEDICINE]: "rgb(61,220,233, 0.1)",
  //   [MICROSOFT]: "rgb(0,0,255, 0.1)",
  //   [SECURITY]: "rgb(153,88,18, 0.1)",
  //   [AI]: "rgb(61,217,233, 0.1)",
  //   [MILITARY]: "rgb(80,123,63, 0.2)",
  //   [CUSTOMIZATION]: "rgb(240,183,94, 0.2)",
  // };

  const bgColours = {
    "-1": "",
    [INDUSTRY]: "rgb(13,168,136, 0.1)",
    [MEDICINE]: "rgb(13,168,136, 0.1)",
    [MICROSOFT]: "rgb(0,0,255, 0.1)",
    [SECURITY]: "rgb(0,0,255, 0.1)",
    [AI]: "rgb(0,0,255, 0.1)",
    [MILITARY]: "rgb(240,183,94, 0.2)",
    [CUSTOMIZATION]: "rgb(240,183,94, 0.2)",
    [ABOUT_US]: "rgb(240,183,94, 0.2)",
  };

  const handleTiltChange = (tiltData) => {
    setTilt({
      tiltLR: tiltData.gamma,
      tiltFB: tiltData.beta,
      dir: tiltData.alpha,
    });
  };

  useEffect(() => {
    if (!tempTiltValue) {
      setTimeout(() => setTempTiltValue(tilt), 2000);
    }
  }, []);

  // console.log("hello world");

  return (
    <div className="canvas-container-mobile">
      {/* <div
        style={{
          color: "yellow",
          position: "absolute",
          right: "1em",
          top: 0,
          width: "200px",
          height: "200px",
          zIndex: 50,
          border: "1px solid orange",
        }}
      >
        {"tiltLR: " + tilt.tiltLR}
        <br />
        {"tiltFB: " + tilt.tiltFB}
        <br />
        {"DIR: " + tilt.dir}
      </div> */}
      {!selectedCategory ? (
        <>
          <DeviceTilt
            setDebug={setDebug}
            position={position}
            setPosition={setPosition}
            onTiltChange={handleTiltChange}
          />
        </>
      ) : null}
      <Canvas
        style={{
          backgroundColor: bgColours[selectedCategoryItemByIdx],
          transition: "backgroundColor: 5s ease-in-out",
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight intensity={3} />
        <Camera />
        <Sparkles count={300} scale={10} size={2} color="pink" />
        <Suspense fallback={null}>
          <AstroModel
            url={"/assets/models/astronaut_new5 (3).glb"}
            astroRef={astroRef}
            position={position}
            setPosition={setPosition}
            tilt={tilt}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export function AstroModel({ url, astroRef, tilt }) {
  const { isAstroModelDrawn, setIsAstroModelDrawn } = useAppContext();
  const { scene, animations } = useGLTF(url);
  const mixer = useGLTFAnimations(scene, animations);

  const { active, progress, errors, total } = useProgress();

  const isFullyRenderedRef = useRef(false);

  // Define rotation limits and sensitivity multipliers for both X and Y axes
  const minRotationY = Math.PI - 0.42;
  const maxRotationY = Math.PI - 0.28;
  const minRotationX = 0.41;
  const maxRotationX = 0.64;

  const ySensitivity = 0.0001; // Sensitivity for Y-axis
  const xSensitivity = 0.0001; // Sensitivity for X-axis

  useEffect(() => {
    console.log(progress);
  }, [progress]);

  useFrame(() => {
    // Check if the object is visible in the scene and loaded
    if (astroRef.current && scene && !isFullyRenderedRef.current) {
      const fullyRendered = scene.children.every((child) => child.visible);
      if (
        fullyRendered &&
        isAstroModelDrawn === false &&
        active === false &&
        scene
      ) {
        isFullyRenderedRef.current = true;
        setTimeout(() => setIsAstroModelDrawn(true), 1000);
        console.log("Astro object is fully rendered!");
      }
    }

    if (astroRef.current) {
      // Update Y rotation based on tiltLR values
      const newRotationY =
        astroRef.current.rotation.y + tilt.tiltLR * ySensitivity;
      // Update X rotation based on tiltFB values
      const newRotationX =
        astroRef.current.rotation.x + tilt.tiltFB * xSensitivity;

      // Apply constraints for Y rotation
      if (newRotationY <= maxRotationY && newRotationY >= minRotationY) {
        astroRef.current.rotation.y = newRotationY;
      }

      // Apply constraints for X rotation
      if (newRotationX <= maxRotationX && newRotationX >= minRotationX) {
        astroRef.current.rotation.x = newRotationX;
      }
    }
  });

  useEffect(() => {
    if (scene && astroRef.current && !isFullyRenderedRef.current) {
      const fullyRendered = scene.children.every((child) => child.visible);

      if (fullyRendered && isAstroModelDrawn === false) {
        setTimeout(() => setIsAstroModelDrawn(true), 1500);
        console.log("Astro object is fully rendered!");
      }
    }
  }, [isAstroModelDrawn]);

  return (
    <group>
      <primitive
        ref={astroRef}
        object={scene}
        dispose={null}
        scale={[1, 1, 1]}
        position={[-3.75, -5, -0.5]}
        rotation={[0.54, Math.PI - 0.35, 0]}
      />
    </group>
  );
}

function useGLTFAnimations(scene, animations) {
  const { invalidate } = useThree();
  const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);

  useEffect(() => {
    if (!mixer || !animations) return;

    animations.forEach((clip) => mixer.clipAction(clip).play());

    const handler = setInterval(() => invalidate(), 1000 / 60);
    return () => clearInterval(handler);
  }, [animations, mixer, invalidate]);

  useFrame((_state, delta) => mixer && mixer.update(delta));

  return mixer;
}
