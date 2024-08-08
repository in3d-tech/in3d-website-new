import { ContactBtn, Logo, VideoPlayer } from "../../common/Logo";
import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ModelComponent } from "./ModelComponent";

export function Microsoft() {
  const [displayVideos, setDisplayVideos] = useState(false);
  const topVidoe1Ref = useRef(null);
  const topVidoe2Ref = useRef(null);

  useEffect(() => {
    console.log("microsoft rendered");
    if (!displayVideos) {
      setTimeout(() => setDisplayVideos(true), 1500);
    }
  }, []);

  return (
    <div
      className="selected-category-content-wrapper"
      style={{ height: "270vh" }}
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
          top: "22em",
          right: "-7em",
          zIndex: -2,
          width: "60%",
        }}
      >
        <img
          // src="/assets/images/backgrounds/microsoft/microsoft-shake-cutout.png"
          src="https://in3dwebsite.blob.core.windows.net/photos/microsoft-shake-cutout-min.png"
          style={{ width: "90%" }}
        ></img>
      </div>
      <Bottom />
      {/* <BottomModel /> */}
    </div>
  );
}

const Bottom = () => {
  return (
    <div
      className="selected-content-second-divider"
      style={{ display: "flex", height: "100%" }}
    >
      <div
        className="left-half-placeholder"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          borderTop: "4px solid black",
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
        <ImageOverlay />
      </div>
    </div>
  );
};

const ImageOverlay = () => {
  return (
    <div className="sc-right-half">
      <div className="image-container">
        <span
          className="large-image-industry sc-image-glass-bg"
          style={{ height: "20em", zIndex: 2, right: "10em", top: "4em" }}
        >
          {/* <img
            src="/assets/images/backgrounds/microsoft/Microsoft_Tugle.jpg"
            // className="large-image"
            alt="Large"
            style={{ width: "100%", height: "100%" }}
          /> */}
          {/* <VideoPlayer src="/assets/images/backgrounds/microsoft/Mesh Hololens - Remote Collaboration.mp4" /> */}
          <VideoPlayer src="https://in3dwebsite.blob.core.windows.net/video/Mesh Hololens - Remote Collaboration.mp4" />
        </span>
        <span
          className="small-image-industry top-left-industry sc-image-glass-bg"
          style={{ left: "20em", top: "1em" }}
        >
          {/* <img
            src="/assets/images/backgrounds/microsoft/Microsoft_Tugle.jpg"
            // className="small-image top-left"
            alt="Top Left"
            style={{ width: "100%" }}
          /> */}
          {/* <VideoPlayer src="/assets/images/backgrounds/microsoft/What can HoloLens 2 do_.mp4" /> */}
          <VideoPlayer src="https://in3dwebsite.blob.core.windows.net/video/What can HoloLens 2 do_.mp4" />
        </span>

        <span
          className="small-image-industry bottom-left-industry sc-image-glass-bg"
          style={{ left: "20em" }}
        >
          {/* <img
            // style={{ width: "92%" }}
            src="/assets/images/backgrounds/microsoft/Microsoft_Tugle.jpg"
            // className="small-image bottom-left"
            alt="Bottom Left"
            style={{ width: "100%" }}
          /> */}
          {/* <VideoPlayer src="/assets/images/backgrounds/microsoft/Medical Holoportation - Ichilov.mp4" /> */}
          <VideoPlayer src="https://in3dwebsite.blob.core.windows.net/video/Medical Holoportation - Ichilov (1) (1).mp4" />
        </span>
      </div>
    </div>
  );
};

const Top = ({
  // middleRef,
  // middleImageRef,
  // overlayRef,
  // middleTextRef,
  displayVideos,
  topVidoe1Ref,
  topVidoe2Ref,
}) => {
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
        <div
          className="image-container"
          style={{
            marginLeft: "22em",
            marginTop: "14em",
            // transform: "grayscale(100%)",
          }}
        >
          <span
            className="large-image-customize sc-image-glass-bg"
            style={{ width: "100%" }}
          >
            {/* <img
              style={{ backgroundSize: "cover", width: "100%" }}
              ref={bottomImageRef}
              src="/assets/images/backgrounds/microsoft/Microsoft_Tugle.jpg"
              alt="Large"
              // className="bottom-image"
            /> */}
            {displayVideos ? (
              <VideoPlayer
                src={
                  // "/assets/images/backgrounds/microsoft/Hololens 2 - Guides.mp4"
                  "https://in3dwebsite.blob.core.windows.net/video/Hololens 2 - Guides (2).mp4"
                }
                videoRef={topVidoe1Ref}
                startTime={7}
              />
            ) : null}
          </span>
          <span
            className="large-image-customize bottom-customize sc-image-glass-bg"
            style={{ width: "100%" }}
          >
            {/* <img
              style={{ backgroundSize: "cover", width: "100%" }}
              src="/assets/images/backgrounds/microsoft/Microsoft_Tugle.jpg"
              alt="Large"
              // className="bottom-image"
              ref={bottomImage2Ref}
            /> */}
            {displayVideos ? (
              <VideoPlayer
                src={
                  // "/assets/images/backgrounds/microsoft/Hololens 1 - Remote Assist.mp4"
                  "https://in3dwebsite.blob.core.windows.net/video/Hololens 1 - Remote Assist (2).mp4"
                }
                videoRef={topVidoe2Ref}
                startTime={28}
              />
            ) : null}
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
        >
          <h1 style={{ borderBottom: "4px solid black" }}>{"Microsoft"}</h1>
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
              marginRight: "8em",
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
          border: "1px solid black",
          position: "absolute",
          bottom: "4em",
          left: 0,
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
            url={"/assets/models/microsoft_model.glb"}
            modelRef={modelRef}
            dontRotate
            position={[1, -5, -5]}
            scale={[6, 6, 6]}
            rotation={[0.2, 0, 0]}
          />
        </Suspense>
      </Canvas>
    </div>
    <div
      style={{
        position: "absolute",
        bottom: "-168%",
        left: "2em",
        zIndex: 1,
      }}
    >
      <ContactBtn isFromSelectedCategory />
    </div>
  </div>
);
