import { useEffect, useRef, Suspense } from "react";
import "../selectedCategories.css";
import { ContactBtn, Logo, VideoPlayer } from "../../common/Logo";
import { categoryObserver } from "../../common/categoryObserver";
import { ModelComponent } from "./ModelComponent";
import { Canvas } from "@react-three/fiber";

export function Customize() {
  const topVidRef1 = useRef(null);
  const topVidRef2 = useRef(null);
  const midVidRef1 = useRef(null);
  const midVidRef2 = useRef(null);
  const midVidRef3 = useRef(null);

  const imageRef = useRef(null);
  const bottomRef = useRef(null);
  const bottomOverlayRef = useRef(null);
  const modelRef = useRef(null);
  const bottomVidRef1 = useRef(null);
  const bottomVidRef2 = useRef(null);

  useEffect(() => {
    if (bottomVidRef1 || bottomVidRef2) {
      console.log({ ref1: bottomVidRef1.current, bottomVidRef2 });
    }
  }, [bottomVidRef1, bottomVidRef2]);

  useEffect(() => {
    const bottomElement = bottomRef.current;
    const bottomOverlay = bottomOverlayRef.current;
    const imageElement = imageRef.current;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.55, // 0.55,
    };

    const botObserver = categoryObserver({
      sectionRef: bottomElement,
      image1Ref: imageElement,
      // textRef: botTextElement,
      observerOptions: observerOptions,
    });

    return () => {
      if (botObserver) {
        botObserver.unobserve(bottomElement);
      }
    };
  }, []);

  return (
    <div
      className="selected-category-content-wrapper-customize"
      style={{ height: "300vh" }}
    >
      <Logo />
      <Top topVidRef1={topVidRef1} topVidRef2={topVidRef2} />
      <div className="selected-content-first-divider">
        <Middle
          midVidRef1={midVidRef1}
          midVidRef2={midVidRef2}
          midVidRef3={midVidRef3}
        />
      </div>
      <div className="selected-content-first-divider">
        <Bottom
          imageRef={imageRef}
          bottomRef={bottomRef}
          bottomOverlayRef={bottomOverlayRef}
          bottomVidRef1={bottomVidRef1}
          bottomVidRef2={bottomVidRef2}
        />
      </div>
      {/* <BottomModel modelRef={modelRef} /> */}
    </div>
  );
}

const ImageOverlayFirst = ({ topVidRef1, topVidRef2 }) => {
  return (
    <div style={{ borderBottom: "4px solid black" }}>
      <div
        className="image-container customize-overlay-one-container"
        // style={{ marginLeft: "20em" }}
      >
        <span
          className="large-image-customize  sc-image-glass-bg"
          style={{ width: "100%" }}
        >
          {/* <img
            style={{ backgroundSize: "cover", width: "100%" }}
            src="/assets/images/backgrounds/customize/Customize_Togle_Finish.jpg"
            // className="large-image"
            alt="Large"
          /> */}
          <VideoPlayer
            src="https://in3dwebsite.blob.core.windows.net/video/ar real estate.mp4"
            startTime={1}
            videoRef={topVidRef1}
          />
        </span>
        <span
          className="large-image-customize bottom-customize  sc-image-glass-bg"
          style={{ width: "100%", right: "3em" }}
        >
          {/* <img
            style={{ backgroundSize: "cover", width: "100%" }}
            src="/assets/images/backgrounds/customize/Customize_Togle_Finish.jpg"
            // className="large-image"
            alt="Large"
          /> */}
          <VideoPlayer
            src="https://in3dwebsite.blob.core.windows.net/video/Globe 3D Store - 14.10.20.mp4"
            startTime={1}
            videoRef={topVidRef2}
          />
        </span>
      </div>
    </div>
  );
};

const Top = ({ topVidRef1, topVidRef2 }) => {
  const headline = "Customize";

  return (
    <div className="selected-content-first-divider-customize">
      <div className="sc-content-left-half-customize">
        <ImageOverlayFirst topVidRef1={topVidRef1} topVidRef2={topVidRef2} />
      </div>
      <div
        className="sc-right-half-customize"
        //   className="selected-content-first-divider-customize"
      >
        <div
          style={{
            fontSize: "3em",
            fontFamily: "gotham-bold",
            width: "80%",
            marginTop: "3em",
          }}
          className="mirosoft-title-one"
        >
          <h1>{headline}</h1>
          {/* <h1>{headline}</h1> */}
        </div>
        <div className="customize-text-one">
          We specialize in 3D and Extended Reality (EX), and as specialists we
          keep an amazing team of developers, 3D generalists, interface and
          graphic artists, and product designers just so we can provide our
          clients with the flexibility and abilities needed to deliver the best
          product
        </div>
        {/* <MiddleThird /> */}
      </div>
    </div>
  );
};

const Middle = ({ midVidRef1, midVidRef2, midVidRef3 }) => {
  return (
    <div className="customize-category-middle">
      {/* <Logo /> */}

      <div className="sc-content-left-half-customize">
        <div
          style={{
            // fontSize: "1.5em",
            // fontFamily: "gotham",
            // opacity: 0.72,
            // width: "80%",
            // lineHeight: "1.8em",
            borderTop: "4px solid black",
            padding: "4em",
          }}
          className="customize-text-one"
        >
          With a constant curiosity and accumulated experience, we have
          successfully developed software products on most of the existing
          hardware platforms in the market today, through smartphones, desktops,
          tablets and all XR headsets including Virtual Reality (VR), Augmented
          Reality (AR), Mixed Reality
        </div>
      </div>

      <div className="selected-content-first-divider-customize">
        <ImageOverlaySecond
          midVidRef1={midVidRef1}
          midVidRef2={midVidRef2}
          midVidRef3={midVidRef3}
        />
      </div>
    </div>
  );
};

const ImageOverlaySecond = ({ midVidRef1, midVidRef2, midVidRef3 }) => {
  return (
    <div className="sc-right-half">
      <div className="image-container">
        <span
          className="large-image-customize sc-image-glass-bg"
          style={{ width: "100%", height: "16em", left: "2em" }}
        >
          {/* <img
            style={{ backgroundSize: "cover", width: "100%" }}
            src="/assets/images/backgrounds/customize/Customize_Togle_Finish.jpg"
            // className="large-image"
            alt="Large"
          /> */}
          <VideoPlayer
            videoRef={midVidRef1}
            startTime={1}
            src="https://in3dwebsite.blob.core.windows.net/video/BIM Construction with Hololens.mp4"
          />
        </span>
        <span
          className="large-image-customize bottom-customize  sc-image-glass-bg"
          style={{ width: "100%", height: "16em", right: "5em", bottom: "2em" }}
        >
          {/* <img
            style={{ backgroundSize: "cover", width: "100%" }}
            src="/assets/images/backgrounds/customize/Customize_Togle_Finish.jpg"
            // className="large-image"
            alt="Large"
          /> */}
          <VideoPlayer
            videoRef={midVidRef2}
            startTime={1}
            src="https://in3dwebsite.blob.core.windows.net/video/Package scanning and moving pilot.mp4"
          />
        </span>
        <span
          className="large-image-customize top-customize  sc-image-glass-bg"
          style={{ width: "100%", height: "16em" }}
        >
          {/* <img
            style={{ backgroundSize: "cover", width: "100%" }}
            src="/assets/images/backgrounds/customize/Customize_Togle_Finish.jpg"
            // className="large-image"
            alt="Large"
          /> */}
          <VideoPlayer
            videoRef={midVidRef3}
            startTime={1}
            src="https://in3dwebsite.blob.core.windows.net/video/Hotze - VR Rakal.mp4"
          />
        </span>
      </div>
    </div>
  );
};

const ImageOverlayThird = ({
  bottomOverlayRef,
  bottomVidRef1,
  bottomVidRef2,
}) => {
  return (
    <div
      className="border-div"
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        width: "85%",
      }}
    >
      <div>
        <span
          className="large-image-customize sc-image-glass-bg"
          style={{ width: "90%" }}
        >
          {/* <img
            ref={bottomOverlayRef}
            style={{ backgroundSize: "cover", width: "100%" }}
            src="/assets/images/backgrounds/customize/Customize_Togle_Finish.jpg"
            // className="large-image"
            alt="Large"
          /> */}
          <VideoPlayer
            src={
              "https://in3dwebsite.blob.core.windows.net/video/Hololens 2 - Guides (2).mp4"
            }
            videoRef={bottomVidRef1}
            startTime={7}
          />
        </span>
      </div>
      <div>
        <span
          className="large-image-customize sc-image-glass-bg"
          style={{ width: "90%" }}
        >
          {/* <img
            style={{ backgroundSize: "cover", width: "100%" }}
            src="/assets/images/backgrounds/customize/Customize_Togle_Finish.jpg"
            // className="large-image"
            alt="Large"
          /> */}
          <VideoPlayer
            src={
              "https://in3dwebsite.blob.core.windows.net/video/Hololens 1 - Remote Assist (2).mp4"
            }
            videoRef={bottomVidRef2}
            startTime={3}
          />
        </span>
      </div>
    </div>
  );
};

const Bottom = ({
  imageRef,
  bottomRef,
  bottomOverlayRef,
  bottomVidRef1,
  bottomVidRef2,
}) => {
  return (
    <div
      ref={bottomRef}
      className="selected-category-content-wrapper-customize-bot"
    >
      <div className="selected-content-first-divider">
        <div
          className="sc-content-left-half-customize"
          style={{ width: "100%" }}
        >
          <div
            ref={imageRef}
            style={{
              backgroundImage:
                // 'url("/assets/images/backgrounds/customize/customize-dna.jpg")',
                'url("https://in3dwebsite.blob.core.windows.net/photos/customize-dna-min.jpg")',
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "100%",
              width: "100%",
              opacity: 1,
              borderTopRightRadius: "12px",
              borderBottomRightRadius: "12px",
            }}
            className="overlay-color-customize"
          >
            {/* <img
              alt="tes"
              style={{ width: "100%", height: "100%" }}
              src="https://in3dwebsite.blob.core.windows.net/photos/customize-dna-min.jpg"
            /> */}
          </div>
        </div>
      </div>

      <div
        className="selected-content-first-divider-customize"
        style={{
          flex: 1.5,
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "column",
        }}
      >
        <div className="customize-text-bottom">
          With years of experience working with a huge variety of sectors and
          different businesses, we provide assitance with needed authorizations
          and hardware modifications required by INFOSEC, worker's committees,
          legal, and collaborating with major company IT teams for a better
          design and implementation of tailer-made solutions that started as a
          vision of one diligent employee
        </div>
        <div className="customize-overlay-bottom">
          <ImageOverlayThird
            bottomOverlayRef={bottomOverlayRef}
            bottomVidRef1={bottomVidRef1}
            bottomVidRef2={bottomVidRef2}
          />
        </div>
      </div>

      <div
        style={{
          borderTop: "4px solid rgb(0,0,0,0.6)",
          position: "absolute",
          top: "296vh",
          width: "50%",
          right: 0,
        }}
      ></div>
    </div>
  );
};

const BottomModel = ({ modelRef }) => (
  <div style={{ height: "70vh", display: "flex" }}>
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Canvas
        // style={{ border: "1px solid black", zIndex: 54433 }}
        camera={{ position: [0, 0, 10], fov: 75 }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <directionalLight position={[0, 10, 0]} intensity={1} />
        {/* <OrbitControls /> */}
        {/* <Stars count={2/000} /> */}
        {/* <Camera /> */}
        <Suspense fallback={null}>
          {/* <ModelComponent url={"/assets/models/engenir_model.glb"} /> */}
          <ModelComponent
            url={"/assets/models/costimize_model_v02.glb"}
            modelRef={modelRef}
            // position={[9, -5, -3]}
            rotation={[0, -0.7, 0]}
            scale={[8, 8, 8]}
          />
        </Suspense>
      </Canvas>
    </div>
    <div
      style={{
        position: "absolute",
        bottom: "-268%",
        left: "2em",
        zIndex: 1,
      }}
    >
      <ContactBtn isFromSelectedCategory />
    </div>
  </div>
);
