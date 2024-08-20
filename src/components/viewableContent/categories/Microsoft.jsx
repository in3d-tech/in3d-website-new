import { ContactBtn, Logo, VideoPlayer } from "../../common/Logo";
import { useEffect, useRef, useState, Suspense } from "react";
// import { Canvas } from "@react-three/fiber";W
// import { ModelComponent } from "./ModelComponent";
// import { useAppContext } from "../../../context/appContext";

export function Microsoft() {
  const [displayVideos, setDisplayVideos] = useState(false);
  const topVidoe1Ref = useRef(null);
  const topVidoe2Ref = useRef(null);
  const bottomVidRef1 = useRef(null);
  const bottomVidContainerRef = useRef(null);
  const bottomVidRef3 = useRef(null);
  const bottomTextContainerRef = useRef(null);
  const bottomTextRef = useRef(null);

  // const { videosPreloaded } = useAppContext();

  useEffect(() => {
    if (!displayVideos) {
      setTimeout(() => setDisplayVideos(true), 1500);
    }
  }, []);

  useEffect(() => {
    const bottomContainer = bottomVidContainerRef.current;
    const bottomTextContainer = bottomTextContainerRef.current;
    const bottomText = bottomTextRef.current;

    const observerOptionsBottom = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3, // Trigger when 80% of the middle section is in view
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (bottomContainer) {
            bottomContainer.classList.add("sc-right-half-microsoft");
            bottomTextContainer.classList.add("border-top-animation-microsoft");
          }
          if (bottomText) {
            bottomText.classList.add("microsoft-text-bottom");
          }
        }
      });
    }, observerOptionsBottom);

    observer.observe(bottomContainer);

    return () => {
      if (observer && bottomContainer) {
        observer.unobserve(bottomContainer);
      }
    };
  }, []);

  return (
    <div
      className="selected-category-content-wrapper"
      style={{ height: "200vh" }}
    >
      <Logo />
      <Top
        displayVideos={displayVideos}
        topVidoe1Ref={topVidoe1Ref}
        topVidoe2Ref={topVidoe2Ref}
      />
      <div
        style={{
          position: "absolute",
          top: "14em",
          right: "-14em",
          zIndex: -2,
          width: "68%",
        }}
      >
        <img
          src="https://in3dwebsite.blob.core.windows.net/photos/handshake_newer.png"
          // src="https://in3dwebsite.blob.core.windows.net/photos/microsoft-shake-cutout-min.png"
          style={{ width: "100%" }}
        />
      </div>
      <Bottom
        bottomVidRef1={bottomVidRef1}
        bottomVidRef3={bottomVidRef3}
        bottomVidContainerRef={bottomVidContainerRef}
        bottomTextContainerRef={bottomTextContainerRef}
        bottomTextRef={bottomTextRef}
      />
      {/* <BottomModel /> */}
    </div>
  );
  W;
}

const Bottom = ({
  bottomVidRef1,
  bottomVidRef3,
  bottomVidContainerRef,
  bottomTextRef,
  bottomTextContainerRef,
}) => {
  return (
    <div
      className="selected-content-second-divider"
      style={{ display: "flex", height: "100%" }}
    >
      <div
        ref={bottomTextContainerRef}
        className="left-half-placeholder"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          // borderTop: "4px solid black",
          height: "60%",
          marginTop: "12em",
        }}
      >
        <p
          style={{
            width: "50%",
            fontFamily: "gotham",
            fontSize: "1.4em",
            opacity: 0.7,
            lineHeight: "1.6em",
          }}
          ref={bottomTextRef}
          // className="microsoft-text-bottom"
        >
          As partners, in3D is your perfect go-to for any Microsoft MR products.
          <br /> <br /> In3D and Microsoft's teams share a strong connection and
          a combined vision on the important roles of MR technology
        </p>
      </div>
      <div
        className="right-half-placeholder"
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ImageOverlay
          bottomVidRef1={bottomVidRef1}
          bottomVidRef3={bottomVidRef3}
          bottomVidContainerRef={bottomVidContainerRef}
        />
      </div>
    </div>
  );
};

const ImageOverlay = ({
  bottomVidRef1,
  bottomVidRef3,
  bottomVidContainerRef,
}) => {
  return (
    <div ref={bottomVidContainerRef} className="no-opacity">
      <div className="image-container">
        <span
          className="large-image-industry sc-image-glass-bg micro-bot-vid-large"
          style={{
            // height: "18em",
            zIndex: 2,
            right: "10em",
            height: "15em",
          }}
        >
          <VideoPlayer src="https://in3dwebsite.blob.core.windows.net/video/Mesh Hololens - Remote Collaboration.mp4" />
        </span>
        <span
          className="small-image-industry top-left-microsoft sc-image-glass-bg microsoft-bottom-vid-container-size"
          style={{ left: "0em", top: "5em" }}
        >
          <VideoPlayer
            src="https://in3dwebsite.blob.core.windows.net/video/What can HoloLens 2 do_.mp4"
            videoRef={bottomVidRef1}
            startTime={4}
          />
        </span>

        <span
          className="small-image-industry bottom-left-microsoft sc-image-glass-bg microsoft-bottom-vid-container-size"
          style={{ left: "0em", bottom: "4em" }}
        >
          <VideoPlayer
            src="https://in3dwebsite.blob.core.windows.net/video/Medical Holoportation - Ichilov (1) (1).mp4"
            startTime={2}
            videoRef={bottomVidRef3}
          />
        </span>
      </div>
    </div>
  );
};

const Top = ({ displayVideos, topVidoe1Ref, topVidoe2Ref }) => {
  const middleRef = useRef(null);
  const middleImageRef = useRef(null);
  const overlayRef = useRef(null);
  const middleTextRef = useRef(null);
  const bottomRef = useRef(null);
  const bottomTextRef = useRef(null);
  const bottomImageRef = useRef(null);
  const bottomImage2Ref = useRef(null);
  return (
    <div
      ref={middleRef}
      style={{
        height: "100%",
        display: "flex",
        position: "relative",
      }}
      className="mid-mid"
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%",
        }}
        className="overlay-image-microsoft"
      >
        <img
          ref={overlayRef}
          className="overlay-color-microsoft"
          // src="/assets/images/backgrounds/microsoft/microsoft-building.jpg"
          src="https://in3dwebsite.blob.core.windows.net/photos/microsoft-building-min.jpg"
          alt="background"
          style={{
            width: "100%",
            backgroundPosition: "center",
            // transform: "scale(.5)",
            // transform: "translateX(-600px)",
          }}
        />
      </div>

      <div style={{ flex: 1 }}>
        <div className="image-container image-top-container-microsoft microsoft-top-vid-container">
          <span
            className="large-image-customize sc-image-glass-bg"
            style={{ width: "100%", height: "17em" }}
          >
            {true ? (
              <VideoPlayer
                src={
                  "https://in3dwebsite.blob.core.windows.net/video/Hololens 2 - Guides (2).mp4"
                }
                videoRef={topVidoe1Ref}
                startTime={5}
              />
            ) : null}
          </span>
          <span
            className="large-image-customize  sc-image-glass-bg"
            style={{ width: "100%", top: "-3em", right: "8em", height: "17em" }}
          >
            <VideoPlayer
              src={
                "https://in3dwebsite.blob.core.windows.net/video/Hololens 1 - Remote Assist (2).mp4"
              }
              videoRef={topVidoe2Ref}
              startTime={3}
            />
          </span>
        </div>
      </div>

      <div
        className="idk-man"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          marginTop: "5em",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: "3em",
            fontFamily: "gotham-bold",
            width: "60%",
          }}
          className="mirosoft-title-one "
        >
          <h1 className="microsoft-header-title">{"Microsoft"}</h1>
        </div>
        <div
          ref={middleTextRef}
          className="mid-text"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontSize: "1.4em",
              fontFamily: "gotham",
              lineHeight: "1.8em",
              textAlign: "center",
              width: "70%",
              marginRight: "4em",
            }}
            className="text-animation"
          >
            <span>
              In3D us the official and inclusive Mixed Reality (MR) partner of
              Microsoft Israel
            </span>
          </p>
        </div>
      </div>

      <div
        style={{
          width: "50%",
          // border: "1px solid black",
          position: "absolute",
          bottom: "4em",
          left: 0,
        }}
      ></div>
    </div>
  );
};

// const BottomModel = ({ modelRef }) => (
//   <div style={{ height: "70vh", display: "flex" }}>
//     <div
//       style={{
//         flex: 1,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Canvas
//         // style={{ border: "1px solid black", zIndex: 54433 }}
//         camera={{ position: [0, 0, 10], fov: 75 }}
//       >
//         <ambientLight intensity={1} />
//         <pointLight position={[10, 10, 10]} />
//         <directionalLight position={[0, 10, 0]} intensity={1} />
//         {/* <OrbitControls /> */}
//         {/* <Stars count={2/000} /> */}
//         {/* <Camera /> */}
//         <Suspense fallback={null}>
//           {/* <ModelComponent url={"/assets/models/engenir_model.glb"} /> */}
//           <ModelComponent
//             url={"/assets/models/microsoft_model.glb"}
//             modelRef={modelRef}
//             dontRotate
//             position={[1, -5, -5]}
//             scale={[6, 6, 6]}
//             rotation={[0.2, 0, 0]}
//           />
//         </Suspense>
//       </Canvas>
//     </div>
//     <div
//       style={{
//         position: "absolute",
//         bottom: "-168%",
//         left: "2em",
//         zIndex: 1,
//       }}
//     >
//       <ContactBtn isFromSelectedCategory />
//     </div>
//   </div>
// );
