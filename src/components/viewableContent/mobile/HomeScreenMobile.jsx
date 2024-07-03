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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const LazySelectedContent = lazy(() => import("./CategoryDetails"));

function HomeScreenMobile() {
  const [isMenuCentered, setIsMenuCentered] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [tilt, setTilt] = useState({ tiltLR: 0, tiltFB: 0, dir: 0 });
  const [slide, setSlide] = useState(0);
  const astroRef = useRef();
  const [startExpandedAnimation, setStartExpandedAnimation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [debug, setDebug] = useState("yessss");

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

  if (!isMobile) setTimeout(() => setIsMobile(true), 5000);

  useEffect(() => {
    if (!isAstroModelDrawn) return;
    if (!startExpandedAnimation) {
      setTimeout(() => {
        setCustomizeHasRendered(true);
        setStartExpandedAnimation(true);
      }, 200);
    }
  }, [isAstroModelDrawn]);

  useEffect(() => {
    // Handler to handle device tilt event
    const handleTilt = (event) => {
      setTilt({
        tiltLR: event.gamma,
        tiltFB: event.beta,
        dir: event.alpha,
      });
    };

    // Add and cleanup the event listener
    window.addEventListener("deviceorientation", handleTilt);

    return () => {
      window.removeEventListener("deviceorientation", handleTilt);
    };
  }, []); // On mount and unmount

  // const orientation = useScreenOrientation();

  // console.log({ orientation });

  return (
    <>
      <div
        className="swiper"
        style={{
          // border: "1px solid yellow",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          zIndex: 1,
          // background: "white",
        }}
      >
        <div style={{ color: "yellow", position: "absolute" }}>{debug} </div>
        <TiltDiv setDebug={setDebug} />
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={(e) => {
            console.log("slide change", e.realIndex);
            setSlide(e.realIndex);
            if (e.realIndex > 1) setMobileBackground(e.realIndex - 1);
          }}
          onSwiper={(swiper) => console.log(swiper)}
          style={{ height: "100%" }}
        >
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
        </Swiper>
      </div>
      <MenuWheel
        setSelectedMenuActionMobile={setSelectedMenuActionMobile}
        handleMenuClick={handleMenuClick}
        isMenuCentered={isMenuCentered}
        selectedMenuActionMobile={selectedMenuActionMobile}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <div
        className={isMenuCentered ? "mobile-menu-opened-bg" : ""}
        style={{
          // minWidth: "100%",
          width: "100%",
          height: "100vh",
          position: "fixed",
          overflow: "hidden",
          top: 0,
          left: 0,
          background: isMenuCentered ? "" : backgrounds[mobileBackground],
          // opacity: 0.4,
          zIndex: isMenuCentered ? 3 : 0,
          transition: "background 1s",
        }}
      >
        {isMenuCentered ? (
          <div
            className="h-nav-in3d-icon"
            style={{ animationDelay: "0.6s", left: "39%" }}
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

        <div className="home-categories-map-mobile">
          {categories.map((category, idx) => (
            <HomeScreenCategoryText
              key={idx}
              idx={idx}
              selectedMenuActionMobile={selectedMenuActionMobile}
              setSelectedMenuActionMobile={setSelectedMenuActionMobile}
              setSelectedCategory={setSelectedCategory}
            />
          ))}
        </div>
        <Scene astroRef={astroRef} />
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
  2: 'url("/assets/images/backgrounds/taasia/taasia_bg.jpg")',
  3: 'url("/assets/images/backgrounds//medicine/medicine_bg.jpg")',
  4: 'url("/assets/images/backgrounds/microsoft/microsoft_bg.jpg")',
  5: 'url("/assets/images/backgrounds/security/security.jpg")',
  6: 'url("/assets/images/backgrounds/ai/ai_bg.png',
  7: 'url("/assets/images/backgrounds/military/military_bg.jpg")',
  8: 'url("/assets/images/backgrounds/customize/Costumize_Smoke_Background_V01.png")',
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

const TitleWithAnimation = ({ isMobile }) => (
  <div
    style={{
      top: "0em",
      left: "1em",
      height: "10em",
      zIndex: 1,
      position: "absolute",
      width: "50%",
    }}
    // className="container"
  >
    <div
      style={{
        fontSize: "2em",
        marginTop: "1em",
      }}
      className="text-animate simply-header"
    >
      SIMPLY
    </div>
    <div
      style={{
        textAlign: "center",
        fontSize: "2em",
      }}
      className="text-animate simply-header"
    >
      <TextScrambleComponent isHomepage isMobile={isMobile} />
    </div>
  </div>
);

const Scene = ({ astroRef }) => {
  return (
    <div className="canvas-container-mobile">
      <Canvas>
        {/* <LoaderComponent /> */}
        <ambientLight intensity={0.8} />
        <directionalLight intensity={3} />
        <Camera />
        <Sparkles
          count={300}
          scale={10}
          size={2}
          color="pink" //{getSparkleColour(scrollArea.currentSection)}
        />
        <Suspense fallback={null}>
          <AstroModel
            url={"/assets/models/astronaut_new5 (3).glb"}
            astroRef={astroRef}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export function AstroModel({ url, astroRef, setTextAnimation }) {
  const { isAstroModelDrawn, setIsAstroModelDrawn } = useAppContext();

  const { scene, animations } = useGLTF(url);
  const mixer = useGLTFAnimations(scene, animations);

  const { active, progress, errors, total } = useProgress();

  useEffect(() => {
    console.log(progress);
  }, [progress]);
  // gsap.set(".scene", { scale: 0.7 });

  const isFullyRenderedRef = useRef(false);

  // Use useFrame to check if the object is fully rendered on every frame
  useFrame(() => {
    // Check if the object is visible in the scene and loaded
    if (astroRef.current && scene && !isFullyRenderedRef.current) {
      // Check if all objects in the scene have been rendered
      const fullyRendered = scene.children.every((child) => child.visible);
      if (
        fullyRendered &&
        isAstroModelDrawn === false &&
        active === false &&
        scene
      ) {
        // Object is fully rendered
        isFullyRenderedRef.current = true;
        setTimeout(() => setIsAstroModelDrawn(true), 1000);
        console.log("Astro object is fully rendered!");
      }
    }
  });

  useEffect(() => {
    if (scene && astroRef.current && !isFullyRenderedRef.current) {
      // Check if all objects in the scene have been rendered
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

const TiltDiv = ({ setDebug }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // useEffect(() => {
  //   const requestDeviceOrientationPermission = async () => {
  //     if (typeof DeviceOrientationEvent.requestPermission === "function") {
  //       try {
  //         const response = await DeviceOrientationEvent.requestPermission();
  //         if (response === "granted") {
  //           console.log("in 1");
  //           window.addEventListener("deviceorientation", handleOrientation);
  //         }
  //       } catch (error) {
  //         console.log("in 2");
  //         console.error(error);
  //       }
  //     } else {
  //       console.log("in 3");
  //       window.addEventListener("deviceorientation", handleOrientation);
  //     }
  //   };

  //   requestDeviceOrientationPermission();

  //   return () => {
  //     window.removeEventListener("deviceorientation", handleOrientation);
  //   };
  // }, []);

  useEffect(() => {
    const handleOrientation = (event) => {
      const { beta, gamma } = event; // beta is front-back, gamma is left-right

      // Setting a range for gamma (-90 to 90) degrees
      const maxGamma = 45; // Maximum gamma angle we want to handle

      // Normalize gamma value (-1 to 1), preserving the sign
      let normalizedGamma =
        Math.min(maxGamma, Math.max(-maxGamma, gamma)) / maxGamma;

      // Reversing the direction of movement for gamma
      normalizedGamma = -normalizedGamma;

      // Set the new position based on normalized gamma
      setPosition({
        x: normalizedGamma * 50, // Adjust the multiplier to control the distance the div moves
      });
    };

    const requestDeviceOrientationPermission = async () => {
      setDebug("in 3");

      if (typeof DeviceOrientationEvent.requestPermission === "function") {
        setDebug("in 2");

        try {
          setDebug("in 2.5");

          const response = await DeviceOrientationEvent.requestPermission();
          setDebug("in 2.9");

          setDebug(response);

          if (response === "granted") {
            console.log("in 6");
            setDebug("in 1");
            window.addEventListener("deviceorientation", handleOrientation);
          }
        } catch (error) {
          setDebug("in 2", error);
          console.error(error);
        }
      } else {
        console.log("in 3");
        setDebug("in 3");
        window.addEventListener("deviceorientation", handleOrientation);
      }
    };

    requestDeviceOrientationPermission();

    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: `calc(50% + ${position.x}vw)`,
    transform: "translate(-50%, -50%)",
    width: "50px",
    height: "50px",
    backgroundColor: "red",
    borderRadius: "50%",
  };

  return <div style={style} />;
};
